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