# Webhooks vs Long Polling

Understanding the two approaches to receive updates from Telegram and how to implement each one.

## Overview

There are two main ways to receive updates from Telegram:

1. **Long Polling** - Your bot periodically queries the Telegram servers to check for new updates
2. **Webhooks** - Telegram sends updates directly to your server via HTTP POST requests

Each approach has its own advantages and trade-offs.

## Long Polling

### How It Works

With long polling, your bot makes requests to the Telegram API at regular intervals to check for new updates. You can specify a `timeout` parameter that allows the server to hold the request open for a period of time, reducing the number of empty responses.

### Advantages

- Simpler to set up - no need for SSL certificate or public server
- Good for testing and development
- More predictable resource usage
- No need to maintain an open connection

### Disadvantages

- Potential delays in receiving updates (depending on polling frequency)
- Higher API usage (frequent requests even when no updates are available)
- Can be less efficient at scale

### Implementation

```typescript
import { TelegramClient, Update, Message } from '@bot-machine/telegram-client';

const client = new TelegramClient('YOUR_BOT_TOKEN');

let lastUpdateId = 0;

async function startLongPolling() {
  console.log('Starting long polling...');
  
  while (true) {
    try {
      // Get updates with a 30-second timeout (long polling)
      const updates = await client.getUpdates({
        offset: lastUpdateId + 1,
        timeout: 30,  // Wait up to 30 seconds for new updates
        allowed_updates: ['message', 'callback_query']  // Only receive messages and callbacks
      });
      
      for (const update of updates) {
        lastUpdateId = update.update_id;
        await processUpdate(update);
      }
      
      // Small delay if no updates were received
      if (updates.length === 0) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error('Error in long polling:', error);
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds before retrying
    }
  }
}

async function processUpdate(update: Update) {
  if (update.message) {
    await handleMessage(update.message);
  } else if (update.callback_query) {
    await handleCallbackQuery(update.callback_query);
  }
}

async function handleMessage(message: Message) {
  console.log(`Received message: ${message.text}`);
  
  await client.sendMessage({
    chat_id: message.chat.id,
    text: `Echo: ${message.text}`,
    reply_to_message_id: message.message_id
  });
}

async function handleCallbackQuery(callbackQuery: any) {
  await client.answerCallbackQuery({
    callback_query_id: callbackQuery.id,
    text: 'Callback received!'
  });
  
  await client.sendMessage({
    chat_id: callbackQuery.message?.chat.id,
    text: `Callback: ${callbackQuery.data}`
  });
}

// Start the long polling
startLongPolling();
```

## Webhooks

### How It Works

With webhooks, you provide Telegram with a URL where it should send update notifications. Telegram will send HTTP POST requests with JSON payloads containing the update data to your server.

### Advantages

- Near real-time updates
- More efficient - only uses resources when there are updates to process
- Better for production bots with high traffic
- Lower latency in receiving updates

### Disadvantages

- Requires a publicly accessible HTTPS server
- Requires SSL certificate (self-signed certificates are not accepted by Telegram)
- More complex setup and maintenance

### Implementation

#### 1. Setting up the Webhook

First, configure your webhook URL:

```typescript
import { TelegramClient } from '@bot-machine/telegram-client';

const client = new TelegramClient('YOUR_BOT_TOKEN');

async function setupWebhook() {
  try {
    const webhookUrl = 'https://your-domain.com/webhook'; // Replace with your actual URL
    
    await client.setWebhook({
      url: webhookUrl,
      // Optional: specify which update types you want to receive
      allowed_updates: ['message', 'callback_query', 'inline_query'],
      // Optional: maximum allowed simultaneous HTTPS connections
      max_connections: 40,  // Default is 40, values between 1-100 are accepted
      // Optional: specify secret token for webhook security
      secret_token: 'your-very-secure-secret-token'  // Up to 256 characters
    });
    
    console.log('Webhook set successfully!');
    
    // Get information about the current webhook
    const webhookInfo = await client.getWebhookInfo();
    console.log('Webhook info:', webhookInfo);
    
  } catch (error) {
    console.error('Error setting webhook:', error);
  }
}

setupWebhook();
```

#### 2. Creating a Webhook Handler

You need a server to handle incoming webhook requests. Here's an example using Express.js:

```typescript
import express from 'express';
import { TelegramClient, Update, Message } from '@bot-machine/telegram-client';
import bodyParser from 'body-parser';

const app = express();
const client = new TelegramClient('YOUR_BOT_TOKEN');

// Use raw body parser for potential signature verification
app.use(bodyParser.json());

// Webhook endpoint - this should match the URL you used in setWebhook
app.post('/webhook', async (req, res) => {
  try {
    // Verify the request is from Telegram (optional but recommended)
    // You can verify the secret token if you set one when configuring the webhook
    const receivedToken = req.get('X-Telegram-Bot-Api-Secret-Token');
    if (receivedToken !== 'your-very-secure-secret-token') {
      console.warn('Received webhook with invalid token');
      return res.status(403).send('Forbidden');
    }
    
    // Get the update from Telegram
    const update: Update = req.body;
    
    console.log('Received update:', update.update_id);
    
    // Process different types of updates
    if (update.message) {
      // Handle incoming message
      await handleMessage(update.message);
    } else if (update.callback_query) {
      // Handle callback query from inline keyboards
      await handleCallbackQuery(update.callback_query);
    } else if (update.inline_query) {
      // Handle inline query
      await handleInlineQuery(update.inline_query);
    } else if (update.chosen_inline_result) {
      await handleChosenInlineResult(update.chosen_inline_result);
    } else if (update.shipping_query) {
      await handleShippingQuery(update.shipping_query);
    } else if (update.pre_checkout_query) {
      await handlePreCheckoutQuery(update.pre_checkout_query);
    } else if (update.poll) {
      await handlePoll(update.poll);
    } else if (update.poll_answer) {
      await handlePollAnswer(update.poll_answer);
    } else if (update.my_chat_member) {
      await handleMyChatMember(update.my_chat_member);
    } else if (update.chat_member) {
      await handleChatMember(update.chat_member);
    } else if (update.chat_join_request) {
      await handleChatJoinRequest(update.chat_join_request);
    }
    
    // Respond quickly to acknowledge receipt of the update
    res.status(200).json({ status: 'OK' });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

async function handleMessage(message: Message) {
  console.log(`Received message from ${message.from?.first_name}: ${message.text}`);
  
  // Echo the message back to the user
  if (message.text && message.chat) {
    await client.sendMessage({
      chat_id: message.chat.id,
      text: `You said: ${message.text}`,
      reply_to_message_id: message.message_id
    });
  }
}

async function handleCallbackQuery(callbackQuery: any) {
  console.log(`Received callback query: ${callbackQuery.data}`);
  
  // Answer the callback query
  await client.answerCallbackQuery({
    callback_query_id: callbackQuery.id,
    text: 'Callback received!',
    show_alert: false
  });
  
  // Optionally send a message in response
  if (callbackQuery.message?.chat) {
    await client.sendMessage({
      chat_id: callbackQuery.message.chat.id,
      text: `Callback data: ${callbackQuery.data}`
    });
  }
}

// Add handlers for other update types as needed
async function handleInlineQuery(inlineQuery: any) {
  console.log(`Received inline query from ${inlineQuery.from.first_name}`);
}

async function handleChosenInlineResult(chosenInlineResult: any) {
  console.log(`Chosen inline result: ${chosenInlineResult.result_id}`);
}

async function handleShippingQuery(shippingQuery: any) {
  console.log(`Received shipping query from ${shippingQuery.from.first_name}`);
}

async function handlePreCheckoutQuery(preCheckoutQuery: any) {
  console.log(`Received pre-checkout query from ${preCheckoutQuery.from.first_name}`);
}

async function handlePoll(poll: any) {
  console.log(`Received poll update: ${poll.id}`);
}

async function handlePollAnswer(pollAnswer: any) {
  console.log(`Received poll answer from user ${pollAnswer.user.id}`);
}

async function handleMyChatMember(chatMemberUpdated: any) {
  console.log(`My chat member status updated in chat ${chatMemberUpdated.chat.id}`);
}

async function handleChatMember(chatMemberUpdated: any) {
  console.log(`Chat member status updated in chat ${chatMemberUpdated.chat.id}`);
}

async function handleChatJoinRequest(chatJoinRequest: any) {
  console.log(`Received chat join request from ${chatJoinRequest.from.first_name}`);
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Webhook server listening on port ${PORT}`);
});
```

#### 3. Removing the Webhook

To switch back to long polling or remove the webhook:

```typescript
async function removeWebhook() {
  try {
    // Remove the webhook to switch back to getUpdates
    await client.deleteWebhook({
      // Optional: drop pending updates
      drop_pending_updates: true
    });
    
    console.log('Webhook removed successfully!');
  } catch (error) {
    console.error('Error removing webhook:', error);
  }
}

removeWebhook();
```

## Comparing the Approaches

| Aspect | Long Polling | Webhooks |
|--------|--------------|----------|
| Setup Complexity | Simple | Complex |
| Resource Usage | Predictable | Efficient |
| Update Latency | Higher (polling interval) | Lower (near real-time) |
| Server Requirements | Any | Public HTTPS server |
| SSL Certificate | Not required | Required |
| Scalability | Moderate | High |
| Error Handling | Simple retries | Requires server maintenance |

## When to Use Each Approach

### Use Long Polling When:
- Developing or testing your bot
- You don't have a public server or SSL certificate
- Your bot has low traffic
- You want a simpler setup
- You're running the bot on a local machine

### Use Webhooks When:
- Deploying a production bot
- Your bot has high traffic
- You need near real-time updates
- You have a reliable, public HTTPS server
- You want to minimize API calls and resource usage

## Complete Example: Toggle Between Both Approaches

Here's an example that demonstrates how you might implement a bot that can work with either approach:

```typescript
import { TelegramClient, Update, Message } from '@bot-machine/telegram-client';
import express from 'express';
import bodyParser from 'body-parser';

class TelegramBot {
  private client: TelegramClient;
  private pollingMode: boolean;
  private app?: express.Application;
  private server?: any;
  private lastUpdateId = 0;
  
  constructor(token: string, pollingMode: boolean = true) {
    this.client = new TelegramClient(token);
    this.pollingMode = pollingMode;
  }
  
  async start() {
    if (this.pollingMode) {
      console.log('Starting in long polling mode...');
      this.startLongPolling();
    } else {
      console.log('Starting in webhook mode...');
      this.startWebhook();
    }
  }
  
  private async startLongPolling() {
    console.log('Long polling started...');
    
    while (true) {
      try {
        const updates = await this.client.getUpdates({
          offset: this.lastUpdateId + 1,
          timeout: 30
        });
        
        for (const update of updates) {
          this.lastUpdateId = update.update_id;
          await this.processUpdate(update);
        }
        
        if (updates.length === 0) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } catch (error) {
        console.error('Error in long polling:', error);
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
  }
  
  private async startWebhook() {
    this.app = express();
    this.app.use(bodyParser.json());
    
    this.app.post('/webhook', async (req, res) => {
      try {
        const update: Update = req.body;
        await this.processUpdate(update);
        res.status(200).json({ status: 'OK' });
      } catch (error) {
        console.error('Error in webhook:', error);
        res.status(500).json({ error: 'Server error' });
      }
    });
    
    const PORT = process.env.PORT || 3000;
    this.server = this.app.listen(PORT, () => {
      console.log(`Webhook server running on port ${PORT}`);
    });
  }
  
  private async processUpdate(update: Update) {
    if (update.message) {
      await this.handleMessage(update.message);
    } else if (update.callback_query) {
      await this.handleCallbackQuery(update.callback_query);
    }
  }
  
  private async handleMessage(message: Message) {
    console.log(`Received message: ${message.text}`);
    
    if (message.text === '/mode') {
      const modeText = this.pollingMode ? 'long polling' : 'webhook';
      await this.client.sendMessage({
        chat_id: message.chat.id,
        text: `Bot is running in ${modeText} mode`
      });
    } else {
      await this.client.sendMessage({
        chat_id: message.chat.id,
        text: `Echo: ${message.text}`,
        reply_to_message_id: message.message_id
      });
    }
  }
  
  private async handleCallbackQuery(callbackQuery: any) {
    await this.client.answerCallbackQuery({
      callback_query_id: callbackQuery.id,
      text: 'Callback received!'
    });
  }
}

// Usage:
// For long polling (default)
const bot = new TelegramBot('YOUR_BOT_TOKEN', true);
bot.start();

// For webhook mode
// const bot = new TelegramBot('YOUR_BOT_TOKEN', false);
// bot.start();
```

## Security Considerations

When using webhooks, ensure you:

1. Use HTTPS with a valid SSL certificate
2. Validate incoming requests (use secret tokens)
3. Process requests quickly to avoid timeouts
4. Implement rate limiting if needed
5. Monitor your server logs for suspicious activity

## Next Steps

Now that you understand both approaches for receiving updates, learn how to:

- [Handle media files](../guides/handling-media.md) that users send to your bot
- [Create interactive keyboards](../guides/inline-keyboards.md) for user interaction
- [Handle errors effectively](../guides/error-handling.md) in production