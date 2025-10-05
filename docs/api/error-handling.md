# Error Handling

This section documents the error handling system in the Telegram Bot API client.

## TelegramError

The `TelegramError` class is thrown when the Telegram API returns an error. It extends the standard JavaScript Error class and provides additional context properties to help understand and handle errors.

```typescript
class TelegramError extends Error {
  constructor(
    message: string,                    // Human-readable error description from Telegram
    public readonly code?: number,      // Numeric error code from Telegram (e.g., 400, 401, 404)
    public readonly parameters?: Record<string, any>, // Parameters that were passed to the method that caused the error
    public readonly method?: string,    // The API method that was called when the error occurred
  ) {
    super(message);
    this.name = 'TelegramError';
  }
}
```

### Properties

The `TelegramError` class has the following properties:

- `message`: A human-readable error description provided by the Telegram API
- `code`: The numeric error code returned by the Telegram API (e.g., 400 for bad request, 401 for unauthorized, 404 for not found, 429 for rate limiting)
- `parameters`: The parameters that were passed to the API method that caused the error (helpful for debugging)
- `method`: The name of the API method that was called when the error occurred
- `name`: Always 'TelegramError'

### Common Error Codes

Here are some common error codes you might encounter:

- `400`: Bad Request - Usually indicates invalid parameters were passed to the API method
- `401`: Unauthorized - The bot token is invalid or has been revoked
- `403`: Forbidden - The bot is not allowed to perform the requested action (e.g., banned from a group)
- `404`: Not Found - The specified resource (e.g., chat, message) does not exist
- `429`: Too Many Requests - The bot has exceeded the rate limit; check `parameters.retry_after` for the recommended wait time
- `500`: Internal Server Error - A temporary error on Telegram's side
- `502`: Bad Gateway - A temporary error on Telegram's side

### Error Handling Example

```typescript
import { TelegramClient, TelegramError } from '@bot-machine/telegram-client';

const client = new TelegramClient('YOUR_BOT_TOKEN');

try {
  const me = await client.getMe();
  console.log(`Hello, I'm ${me.first_name}!`);
} catch (error) {
  if (error instanceof TelegramError) {
    console.error(`Telegram API Error: ${error.message}`);
    console.error(`Error code: ${error.code}`);
    console.error(`Method that failed: ${error.method}`);
    console.error(`Parameters that caused the error:`, error.parameters);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

### Enhanced Error Handling for AI Agents

When using this library with AI agents, the additional error context helps make intelligent decisions:

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
          const retryAfter = error.parameters?.retry_after || 5;
          console.error(`Rate limited. Wait ${retryAfter} seconds before retrying.`);
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

### Error Properties for AI Agents

The `TelegramError` includes these properties to help AI agents make better decisions:

- `message`: Human-readable error description from Telegram
- `code`: Numeric error code from Telegram (e.g., 400, 401, 404)
- `method`: The API method that was called when the error occurred
- `parameters`: The parameters that were passed to the method

This additional context helps AI agents understand what went wrong and potentially take corrective action.