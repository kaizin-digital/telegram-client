# @bot-machine/telegram-client

A lightweight, type-safe Telegram Bot API client for Bun, written in TypeScript.

## Features

- 🚀 Built with Bun for maximum performance
- 📝 Full TypeScript support with comprehensive type definitions
- 🔒 Type-safe API responses
- 🌐 Supports all core Telegram Bot API methods
- 📦 Lightweight and dependency-free
- 🛠️ Simple and intuitive API

## Installation

```bash
# Using bun
bun add @bot-machine/telegram-client

# Using npm
npm install @bot-machine/telegram-client

# Using yarn
yarn add @bot-machine/telegram-client
```

## Quick Start

```typescript
import { TelegramClient } from '@bot-machine/telegram-client';

// Initialize the client with your bot token
const client = new TelegramClient('YOUR_BOT_TOKEN');

// Get bot information
const me = await client.getMe();
console.log(`Hello, I'm ${me.first_name}!`);

// Send a message
const message = await client.sendMessage({
  chat_id: 123456789,
  text: 'Hello from TypeScript!'
});

console.log(`Message sent: ${message.text}`);
```

## Comprehensive Examples

### Example 1: Handling Different Message Types
```typescript
import { TelegramClient, Message } from '@bot-machine/telegram-client';

async function handleMessages(client: TelegramClient) {
  try {
    // Get recent updates
    const updates = await client.getUpdates({ limit: 10 });
    
    for (const update of updates) {
      if (update.message) {
        const message = update.message;
        
        // Handle different message types
        if (message.text) {
          console.log(`Received text message: ${message.text}`);
          await handleTextMessage(client, message);
        } else if (message.photo) {
          console.log(`Received photo message with ${message.photo.length} photos`);
          await handlePhotoMessage(client, message);
        } else if (message.document) {
          console.log(`Received document: ${message.document.file_name}`);
          await handleDocumentMessage(client, message);
        }
      }
    }
  } catch (error) {
    console.error('Error handling messages:', error);
  }
}

async function handleTextMessage(client: TelegramClient, message: Message) {
  const { chat, text } = message;
  
  // Simple echo bot
  await client.sendMessage({
    chat_id: chat.id,
    text: `You said: ${text}`,
    reply_to_message_id: message.message_id
  });
}

async function handlePhotoMessage(client: TelegramClient, message: Message) {
  const { chat } = message;
  
  await client.sendMessage({
    chat_id: chat.id,
    text: 'Nice photo! Thanks for sharing.',
    reply_to_message_id: message.message_id
  });
}

async function handleDocumentMessage(client: TelegramClient, message: Message) {
  const { chat, document } = message;
  
  await client.sendMessage({
    chat_id: chat.id,
    text: `Received document: ${document.file_name}`,
    reply_to_message_id: message.message_id
  });
}
```

### Example 2: Creating Inline Keyboard and Handling Callbacks
```typescript
import { TelegramClient, SendMessageParams, InlineKeyboardButton } from '@bot-machine/telegram-client';

async function sendInteractiveMessage(client: TelegramClient, chatId: number) {
  // Create inline keyboard with options
  const inlineKeyboard: InlineKeyboardButton[][] = [
    [
      { text: 'Option 1', callback_data: 'option1' },
      { text: 'Option 2', callback_data: 'option2' }
    ],
    [
      { text: 'More Info', url: 'https://example.com' }
    ]
  ];
  
  const params: SendMessageParams = {
    chat_id: chatId,
    text: 'Please select an option:',
    reply_markup: {
      inline_keyboard: inlineKeyboard
    }
  };
  
  return await client.sendMessage(params);
}

// To handle callbacks, you would typically set up a webhook or use getUpdates
// to receive CallbackQuery updates
```

### Example 3: Error Handling and Retries for AI Agents
```typescript
import { TelegramClient, TelegramError } from '@bot-machine/telegram-client';
import { setTimeout } from 'timers/promises';

async function sendMessageWithRetry(
  client: TelegramClient,
  params: { chat_id: number | string; text: string },
  maxRetries: number = 3
): Promise<any> {
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt} of ${maxRetries}`);
      const result = await client.sendMessage(params);
      console.log('Message sent successfully');
      return result;
    } catch (error) {
      lastError = error;
      
      if (error instanceof TelegramError) {
        console.log(`Attempt ${attempt} failed with error:`, error.message);
        console.log('Error code:', error.code);
        console.log('Method:', error.method);
        console.log('Parameters:', error.parameters);
        
        // For rate limiting errors (429), wait for the specified time
        if (error.code === 429) {
          const retryAfter = error.parameters?.retry_after || 5;
          console.log(`Rate limited. Waiting ${retryAfter} seconds...`);
          await setTimeout(retryAfter * 1000);
          continue;
        }
        
        // Don't retry for certain types of errors
        if ([400, 401, 403].includes(error.code)) {
          console.log(`Non-retryable error: ${error.code}. Stopping.`);
          break;
        }
      }
      
      console.log(`Attempt ${attempt} failed with general error:`, error);
      
      // Wait before retrying (exponential backoff could be implemented here)
      if (attempt < maxRetries) {
        await setTimeout(1000); // Wait 1 second before retrying
      }
    }
  }
  
  console.log(`All ${maxRetries} attempts failed. Last error:`, lastError);
  throw lastError;
}
```

### Example 4: Setting up Webhook Instead of Long Polling
```typescript
import { TelegramClient } from '@bot-machine/telegram-client';

const client = new TelegramClient('YOUR_BOT_TOKEN');

async function setupWebhook() {
  try {
    // Set your webhook URL - this should be an HTTPS URL where Telegram can send updates
    const webhookUrl = 'https://your-domain.com/webhook';  // Replace with your actual URL
    
    await client.setWebhook({
      url: webhookUrl,
      // Optional: specify which update types you want to receive
      allowed_updates: ['message', 'callback_query', 'inline_query'],
      // Optional: maximum allowed simultaneous HTTPS connections
      max_connections: 40,  // Default is 40, values between 1-100 are accepted
      // Optional: pass a certificate file if using self-signed certificate
      // certificate: 'path/to/certificate.pem',
      // Optional: specify secret token for webhook security
      secret_token: 'your-secret-token'  // Up to 256 characters, avoids unauthorized requests
    });
    
    console.log('Webhook set successfully!');
    
    // Get information about the current webhook
    const webhookInfo = await client.getWebhookInfo();
    console.log('Webhook info:', webhookInfo);
    
  } catch (error) {
    console.error('Error setting webhook:', error);
  }
}

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

// Call setupWebhook to configure the webhook
setupWebhook();
```

### Example 5: Webhook Handler Implementation
```typescript
// This is an example of how to implement a webhook handler with Express.js
// You'll need to install: npm install express body-parser

import express from 'express';
import { TelegramClient, Update } from '@bot-machine/telegram-client';
import bodyParser from 'body-parser';

const app = express();
const client = new TelegramClient('YOUR_BOT_TOKEN');

// Parse JSON bodies
app.use(bodyParser.json());

// Webhook endpoint - this should match the URL you used in setWebhook
app.post('/webhook', async (req, res) => {
  try {
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

async function handleCallbackQuery(callbackQuery: CallbackQuery) {
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

async function handleInlineQuery(inlineQuery: InlineQuery) {
  // This is a simplified example - in practice, you'd return actual query results
  console.log(`Received inline query from ${inlineQuery.from.first_name}: ${inlineQuery.query}`);
  
  // Telegram doesn't allow responding to inline queries from webhooks
  // You would typically handle these with getUpdates if needed
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Webhook server listening on port ${PORT}`);
});
```

Webhook vs. Long Polling:

- **Webhooks** are more efficient for high-volume bots, as Telegram pushes updates to your server
- **Long Polling** (using getUpdates) is simpler to set up and good for low-volume or testing scenarios
- Webhooks require a public HTTPS endpoint, while long polling works from any location
- For production bots with many users, webhooks are generally preferred
```

## API Reference

### TelegramClient

#### Constructor

```typescript
const client = new TelegramClient(token: string);
```

- `token` - Your Telegram Bot API token

#### Methods

##### `getMe()`

A simple method for testing your bot's authentication token. Returns basic information about the bot.

```typescript
const me = await client.getMe();
```

##### `sendMessage(params: SendMessageParams)`

Send text messages.

```typescript
const message = await client.sendMessage({
  chat_id: 123456789,
  text: 'Hello world!'
});
```

##### `getUpdates(params?: GetUpdatesParams)`

Receive incoming updates using long polling.

```typescript
const updates = await client.getUpdates({
  offset: 123456789,
  timeout: 30
});
```

## Error Handling

All API errors are thrown as `TelegramError` instances which include additional context properties to help AI agents understand and handle errors better:

```typescript
import { TelegramClient, TelegramError } from '@bot-machine/telegram-client';

const client = new TelegramClient('YOUR_BOT_TOKEN');

try {
  const me = await client.getMe();
} catch (error) {
  if (error instanceof TelegramError) {
    console.error(`Telegram API Error: ${error.message}`);
    console.error(`Error code: ${error.code}`);
    console.error(`Method that failed: ${error.method}`);
    console.error(`Parameters that caused the error:`, error.parameters);
  }
}
```

### Error Properties for AI Agents

The `TelegramError` includes these properties to help AI agents make better decisions:
- `message`: Human-readable error description from Telegram
- `code`: Numeric error code from Telegram (e.g., 400, 401, 404)
- `method`: The API method that was called when the error occurred
- `parameters`: The parameters that were passed to the method

This additional context helps AI agents understand what went wrong and potentially take corrective action.

## Usage with AI Agents

When using this library with AI agents, consider these best practices:

1. Always implement proper error handling as shown above
2. Use the additional error context to make intelligent retry decisions
3. Leverage the type safety to validate inputs before making API calls
4. Use the response types to understand the structure of returned data

Example with enhanced error handling for AI agents:

```typescript
import { TelegramClient, TelegramError } from '@bot-machine/telegram-client';

const client = new TelegramClient('YOUR_BOT_TOKEN');

async function sendMessageSafely(chatId: number | string, text: string) {
  try {
    // Validate inputs before sending
    if (!text || text.trim().length === 0) {
      throw new Error('Message text cannot be empty');
    }
    
    if (!chatId) {
      throw new Error('Chat ID is required');
    }

    const message = await client.sendMessage({
      chat_id: chatId,
      text
    });
    
    console.log(`Message sent successfully with ID: ${message.message_id}`);
    return message;
    
  } catch (error) {
    if (error instanceof TelegramError) {
      // AI agents can use the error details to make decisions
      switch (error.code) {
        case 400:
          // Bad request - likely invalid parameters
          console.error('Bad request:', error.parameters);
          break;
        case 401:
          // Unauthorized - invalid token
          console.error('Bot token may be invalid');
          break;
        case 403:
          // Forbidden - bot blocked by user or other permissions issue
          console.error('Bot may be blocked by the user');
          break;
        case 429:
          // Too many requests - implement backoff
          console.error('Rate limited, consider implementing backoff');
          break;
        default:
          console.error(`Telegram API Error (${error.code}): ${error.message}`);
      }
      
      // Re-throw to allow for higher-level handling
      throw error;
    } else if (error instanceof Error) {
      console.error(`General error: ${error.message}`);
      throw error;
    }
  }
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.