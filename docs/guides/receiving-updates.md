# Receiving Updates

Learn how to receive and handle incoming messages and events from users using the Telegram Bot API client.

## Overview

Your bot can receive updates in two ways:
1. **Long Polling** - Using the `getUpdates` method to periodically check for new messages
2. **Webhooks** - Setting up an HTTPS endpoint where Telegram sends updates automatically

This guide covers the long polling approach. For webhooks, see the [Webhooks vs Long Polling](../guides/webhooks-vs-long-polling.md) guide.

## Basic Update Reception

### Using getUpdates Method

The simplest way to receive updates is using the `getUpdates` method:

```typescript
import { TelegramClient, Update } from '@bot-machine/telegram-client';

const client = new TelegramClient('YOUR_BOT_TOKEN');

async function checkForUpdates() {
  try {
    // Get recent updates
    const updates: Update[] = await client.getUpdates();
    
    // Process each update
    for (const update of updates) {
      console.log(`Received update with ID: ${update.update_id}`);
      
      // Handle messages
      if (update.message) {
        console.log(`Received message from ${update.message.from?.first_name}: ${update.message.text}`);
        // Handle the message
        await handleMessage(update.message);
      }
      
      // Handle edited messages
      if (update.edited_message) {
        console.log(`Message was edited: ${update.edited_message.text}`);
      }
      
      // Handle callback queries (from inline keyboards)
      if (update.callback_query) {
        console.log(`Received callback query: ${update.callback_query.data}`);
        await handleCallbackQuery(update.callback_query);
      }
    }
  } catch (error) {
    console.error('Error getting updates:', error);
  }
}

// Run the update check once
checkForUpdates();
```

### Long Polling Loop

For continuous operation, create a loop that periodically checks for updates:

```typescript
import { TelegramClient, Update, Message } from '@bot-machine/telegram-client';

const client = new TelegramClient('YOUR_BOT_TOKEN');

// Keep track of the latest update ID to avoid processing the same update multiple times
let lastUpdateId = 0;

async function startPolling() {
  console.log('Starting to poll for updates...');
  
  while (true) {
    try {
      // Get updates since the last processed update
      const updates = await client.getUpdates({
        offset: lastUpdateId + 1,
        timeout: 30  // Long polling timeout (in seconds)
      });
      
      // Process each update
      for (const update of updates) {
        lastUpdateId = update.update_id;
        await processUpdate(update);
      }
      
      // Add a small delay to prevent excessive API calls if no updates are received
      if (updates.length === 0) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error('Error in polling loop:', error);
      
      // Add a delay before retrying to prevent rapid error loops
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}

async function processUpdate(update: Update) {
  console.log(`Processing update ID: ${update.update_id}`);
  
  // Handle different types of updates
  if (update.message) {
    await handleMessage(update.message);
  } else if (update.callback_query) {
    await handleCallbackQuery(update.callback_query);
  } else if (update.inline_query) {
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
  } else {
    console.log('Unknown update type:', Object.keys(update));
  }
}

async function handleMessage(message: Message) {
  const chatId = message.chat.id;
  const userId = message.from?.id;
  const text = message.text;

  console.log(`Received message from user ${userId} in chat ${chatId}: ${text}`);

  // Handle different message types and commands
  if (text) {
    if (text === '/start') {
      await client.sendMessage({
        chat_id: chatId,
        text: 'Welcome! This is a simple echo bot.'
      });
    } else if (text === '/help') {
      await client.sendMessage({
        chat_id: chatId,
        text: 'I am a simple bot that echoes your messages. Just send me any text!'
      });
    } else {
      // Echo the message back to the user
      await client.sendMessage({
        chat_id: chatId,
        text: `You said: ${text}`,
        reply_to_message_id: message.message_id
      });
    }
  }
}

async function handleCallbackQuery(callbackQuery: any) {
  console.log(`Received callback query from ${callbackQuery.from.first_name}: ${callbackQuery.data}`);
  
  // Answer the callback query to remove the loading indicator
  await client.answerCallbackQuery({
    callback_query_id: callbackQuery.id,
    text: 'Callback received!',
    show_alert: false
  });
  
  // Optionally send a message in response
  await client.sendMessage({
    chat_id: callbackQuery.message?.chat.id,
    text: `Callback data: ${callbackQuery.data}`
  });
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

// Start the polling
startPolling();
```

## Filtering Update Types

You can specify which types of updates you want to receive:

```typescript
// Only receive messages and callback queries
const updates = await client.getUpdates({
  allowed_updates: ['message', 'callback_query']
});

// Receive all update types except chat_member
const allUpdates = await client.getUpdates({
  allowed_updates: ['message', 'edited_message', 'channel_post', 'edited_channel_post', 
                   'inline_query', 'chosen_inline_result', 'callback_query', 
                   'shipping_query', 'pre_checkout_query', 'poll', 'poll_answer', 
                   'my_chat_member', 'chat_member', 'chat_join_request']
});
```

## Handling Different Message Types

### Text Messages

```typescript
function isTextMessage(message: Message): message is Message & { text: string } {
  return typeof message.text === 'string';
}

async function handleTextMessage(client: TelegramClient, message: Message) {
  if (!isTextMessage(message)) {
    return;
  }
  
  const chatId = message.chat.id;
  const text = message.text;
  
  // Process commands
  if (text.startsWith('/')) {
    const command = text.split(' ')[0].substring(1);
    const args = text.split(' ').slice(1).join(' ');
    
    switch (command) {
      case 'start':
        await client.sendMessage({
          chat_id: chatId,
          text: 'Welcome to our bot!'
        });
        break;
      case 'help':
        await client.sendMessage({
          chat_id: chatId,
          text: 'Available commands: /start, /help, /info'
        });
        break;
      default:
        await client.sendMessage({
          chat_id: chatId,
          text: `Unknown command: /${command}`
        });
    }
  } else {
    // Process regular text messages
    await client.sendMessage({
      chat_id: chatId,
      text: `You said: ${text}`,
      reply_to_message_id: message.message_id
    });
  }
}
```

### Media Messages

```typescript
async function handleMediaMessage(client: TelegramClient, message: Message) {
  // Handle photos
  if (message.photo) {
    console.log(`Received a photo with ${message.photo.length} sizes`);
    const largestPhoto = message.photo[message.photo.length - 1];
    
    await client.sendMessage({
      chat_id: message.chat.id,
      text: `Thanks for the photo! File size: ${largestPhoto.file_size} bytes`
    });
  }
  
  // Handle documents
  if (message.document) {
    console.log(`Received a document: ${message.document.file_name}`);
    await client.sendMessage({
      chat_id: message.chat.id,
      text: `Received document: ${message.document.file_name}`
    });
  }
  
  // Handle videos
  if (message.video) {
    console.log(`Received a video: ${message.video.file_name}`);
    await client.sendMessage({
      chat_id: message.chat.id,
      text: `Received video: ${message.video.file_name || 'Unnamed video'}`
    });
  }
}
```

### Location Messages

```typescript
async function handleLocationMessage(client: TelegramClient, message: Message) {
  if (message.location) {
    await client.sendMessage({
      chat_id: message.chat.id,
      text: `Location received: ${message.location.latitude}, ${message.location.longitude}`
    });
    
    // You can also send a venue based on the location
    await client.sendVenue({
      chat_id: message.chat.id,
      latitude: message.location.latitude,
      longitude: message.location.longitude,
      title: 'Location you shared',
      address: 'Coordinates shared by user'
    });
  }
}
```

## Complete Message Handler

Here's a comprehensive message handler that processes different types of messages:

```typescript
import { TelegramClient, Message } from '@bot-machine/telegram-client';

async function handleMessage(client: TelegramClient, message: Message) {
  const chatId = message.chat.id;
  
  // Handle text messages
  if (message.text) {
    await handleTextMessage(client, message);
  }
  // Handle photos
  else if (message.photo) {
    await client.sendMessage({
      chat_id: chatId,
      text: 'Thanks for the photo!',
      reply_to_message_id: message.message_id
    });
  }
  // Handle documents
  else if (message.document) {
    await client.sendMessage({
      chat_id: chatId,
      text: `Received document: ${message.document.file_name}`,
      reply_to_message_id: message.message_id
    });
  }
  // Handle videos
  else if (message.video) {
    await client.sendMessage({
      chat_id: chatId,
      text: `Received video: ${message.video.file_name || 'Unnamed video'}`,
      reply_to_message_id: message.message_id
    });
  }
  // Handle locations
  else if (message.location) {
    await client.sendMessage({
      chat_id: chatId,
      text: `Location: ${message.location.latitude}, ${message.location.longitude}`,
      reply_to_message_id: message.message_id
    });
  }
  // Handle contacts
  else if (message.contact) {
    await client.sendMessage({
      chat_id: chatId,
      text: `Contact received: ${message.contact.first_name} (${message.contact.phone_number})`,
      reply_to_message_id: message.message_id
    });
  }
  // Handle stickers
  else if (message.sticker) {
    await client.sendMessage({
      chat_id: chatId,
      text: `Nice sticker! It's a ${message.sticker.emoji} sticker`,
      reply_to_message_id: message.message_id
    });
  }
  // Handle voice messages
  else if (message.voice) {
    await client.sendMessage({
      chat_id: chatId,
      text: 'I received your voice message!',
      reply_to_message_id: message.message_id
    });
  }
  // Handle video notes
  else if (message.video_note) {
    await client.sendMessage({
      chat_id: chatId,
      text: 'I received a video note!',
      reply_to_message_id: message.message_id
    });
  }
  // Handle other message types
  else {
    await client.sendMessage({
      chat_id: chatId,
      text: 'I received a message, but I\'m not sure how to handle it.',
      reply_to_message_id: message.message_id
    });
  }
}

async function handleTextMessage(client: TelegramClient, message: Message & { text: string }) {
  const chatId = message.chat.id;
  const text = message.text;
  
  // Handle commands
  if (text.startsWith('/')) {
    const command = text.split(' ')[0].substring(1);
    const args = text.split(' ').slice(1).join(' ');
    
    switch (command) {
      case 'start':
        await client.sendMessage({
          chat_id: chatId,
          text: 'Welcome! This is a sample bot.'
        });
        break;
      case 'help':
        await client.sendMessage({
          chat_id: chatId,
          text: 'Commands available: /start, /help, /info, /time'
        });
        break;
      case 'info':
        await client.sendMessage({
          chat_id: chatId,
          text: `Your chat ID is: ${chatId}\nYour user ID is: ${message.from?.id}`
        });
        break;
      case 'time':
        await client.sendMessage({
          chat_id: chatId,
          text: `Current time: ${new Date().toLocaleString()}`
        });
        break;
      default:
        await client.sendMessage({
          chat_id: chatId,
          text: `Unknown command: /${command}`
        });
    }
  } else {
    // Echo back non-command text messages
    await client.sendMessage({
      chat_id: chatId,
      text: `You said: ${text}`,
      reply_to_message_id: message.message_id
    });
  }
}
```

## Error Handling in Update Processing

Always handle errors when processing updates:

```typescript
import { TelegramClient, Update, TelegramError } from '@bot-machine/telegram-client';

async function safeProcessUpdate(client: TelegramClient, update: Update) {
  try {
    if (update.message) {
      await handleMessage(client, update.message);
    } else if (update.callback_query) {
      await handleCallbackQuery(update.callback_query);
    }
  } catch (error) {
    console.error(`Error processing update ${update.update_id}:`, error);
    
    if (error instanceof TelegramError) {
      console.error(`Telegram API error: ${error.message} (code: ${error.code})`);
      
      // Handle specific error codes
      switch (error.code) {
        case 403:
          console.log('Bot was blocked by the user or kicked from the group/channel');
          break;
        case 429:
          const retryAfter = error.parameters?.retry_after || 5;
          console.log(`Rate limited, waiting ${retryAfter} seconds`);
          await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
          break;
        default:
          console.log(`Other API error: ${error.code}`);
      }
    } else {
      console.error('Unexpected error:', error);
    }
  }
}
```

## Next Steps

Now that you know how to receive and handle updates using long polling, learn about:

- [Webhooks vs Long Polling](../guides/webhooks-vs-long-polling.md) to understand both approaches
- [Handling media files](../guides/handling-media.md) that users send to your bot
- [Creating interactive keyboards](../guides/inline-keyboards.md) for user interaction
- [Error handling best practices](../guides/error-handling.md) for production bots