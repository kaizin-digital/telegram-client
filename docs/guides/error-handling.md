# Error Handling

Learn best practices for handling errors when working with the Telegram Bot API to create robust and reliable bots.

## Overview

Proper error handling is crucial for creating reliable Telegram bots. The Telegram Bot API can return various types of errors, and your bot should be prepared to handle them gracefully.

## Understanding TelegramError

The `TelegramError` class extends JavaScript's built-in `Error` class and provides additional context about what went wrong:

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
    console.error('General error:', error);
  }
}
```

## Common Telegram API Error Codes

### Client-Side Errors (4xx)

- **400 (Bad Request)**: Usually indicates invalid parameters were passed to the API method
  ```typescript
  // Common causes:
  // - Invalid chat ID
  // - Message text too long (>4096 characters)
  // - Invalid parse mode
  // - Missing required parameters
  ```

- **401 (Unauthorized)**: The bot token is invalid or has been revoked
  ```typescript
  // This suggests the token is wrong or expired
  ```

- **403 (Forbidden)**: The bot is not allowed to perform the requested action
  ```typescript
  // Common causes:
  // - Bot is banned from a group/channel
  // - Insufficient permissions
  // - Chat doesn't exist or is inaccessible
  ```

- **404 (Not Found)**: The specified resource (e.g., chat, message) does not exist
  ```typescript
  // Common causes:
  // - Invalid chat ID
  // - Message ID doesn't exist
  // - User has blocked the bot
  ```

- **429 (Too Many Requests)**: The bot has exceeded the rate limit
  ```typescript
  // The error.parameters may contain 'retry_after' field with seconds to wait
  ```

### Server-Side Errors (5xx)

- **500 (Internal Server Error)**: A temporary error on Telegram's side
- **502 (Bad Gateway)**: A temporary error on Telegram's side
- **503 (Service Unavailable)**: Telegram is temporarily unavailable

## Comprehensive Error Handling

### Basic Error Handling

```typescript
import { TelegramClient, TelegramError } from '@bot-machine/telegram-client';

const client = new TelegramClient('YOUR_BOT_TOKEN');

async function sendMessageWithBasicErrorHandling(chatId: number | string, text: string) {
  try {
    const message = await client.sendMessage({
      chat_id: chatId,
      text: text
    });
    
    console.log(`Message sent successfully: ${message.message_id}`);
    return message;
  } catch (error) {
    if (error instanceof TelegramError) {
      console.error(`Failed to send message: ${error.message} (Code: ${error.code})`);
      return null; // or handle the error as appropriate for your use case
    } else {
      console.error('Unexpected error:', error);
      throw error; // Re-throw for higher-level handling
    }
  }
}
```

### Advanced Error Handling with Specific Response

```typescript
import { TelegramClient, TelegramError } from '@bot-machine/telegram-client';

async function sendMessageWithAdvancedHandling(
  client: TelegramClient,
  chatId: number | string,
  text: string
) {
  try {
    const message = await client.sendMessage({
      chat_id: chatId,
      text: text
    });
    
    return { success: true, message, error: null };
  } catch (error) {
    if (error instanceof TelegramError) {
      // Handle specific error codes
      switch (error.code) {
        case 400:
          console.error('Bad request - check your message parameters:', error.parameters);
          return { 
            success: false, 
            message: null, 
            error: { type: 'BAD_REQUEST', details: error.message } 
          };
          
        case 401:
          console.error('Unauthorized - invalid bot token');
          throw new Error('Invalid bot token');
          
        case 403:
          console.error('Forbidden - bot may be blocked or kicked from chat');
          return { 
            success: false, 
            message: null, 
            error: { type: 'FORBIDDEN', details: 'Bot is not allowed to send messages to this chat' } 
          };
          
        case 404:
          console.error('Chat not found - invalid chat ID');
          return { 
            success: false, 
            message: null, 
            error: { type: 'NOT_FOUND', details: 'Chat not found' } 
          };
          
        case 429:
          const retryAfter = error.parameters?.retry_after || 5;
          console.error(`Rate limited - wait ${retryAfter} seconds before retrying`);
          return { 
            success: false, 
            message: null, 
            error: { 
              type: 'RATE_LIMITED', 
              details: `Rate limited, retry after ${retryAfter} seconds`,
              retryAfter 
            } 
          };
          
        default:
          console.error(`Unexpected Telegram API error (${error.code}): ${error.message}`);
          return { 
            success: false, 
            message: null, 
            error: { type: 'UNEXPECTED_ERROR', details: error.message } 
          };
      }
    } else {
      console.error('Unexpected non-Telegram error:', error);
      throw error; // Re-throw non-Telegram errors
    }
  }
}
```

## Rate Limiting and Retry Logic

### Implementing Retry with Exponential Backoff

```typescript
import { TelegramClient, TelegramError } from '@bot-machine/telegram-client';

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
          await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
          continue; // Skip the general delay and try again immediately
        }
        
        // Don't retry for certain types of errors
        if ([400, 401, 403, 404].includes(error.code)) {
          console.log(`Non-retryable error: ${error.code}. Stopping.`);
          break;
        }
      } else {
        console.log(`Attempt ${attempt} failed with general error:`, error);
      }
      
      // Wait before retrying (exponential backoff could be implemented here)
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000; // 2^attempt seconds
        console.log(`Waiting ${delay/1000} seconds before retrying...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  console.log(`All ${maxRetries} attempts failed. Last error:`, lastError);
  throw lastError;
}

// Usage
const client = new TelegramClient('YOUR_BOT_TOKEN');
try {
  const result = await sendMessageWithRetry(client, {
    chat_id: 123456789,
    text: 'Hello with retry logic!'
  });
  console.log('Final result:', result);
} catch (error) {
  console.error('All retry attempts failed:', error);
}
```

## Error Handling for Different API Methods

### Handling getUpdates Errors

```typescript
import { TelegramClient, Update, TelegramError } from '@bot-machine/telegram-client';

async function safePollForUpdates(client: TelegramClient, lastUpdateId: number = 0) {
  try {
    const updates: Update[] = await client.getUpdates({
      offset: lastUpdateId + 1,
      timeout: 30
    });
    
    return { success: true, updates, newLastUpdateId: lastUpdateId };
  } catch (error) {
    if (error instanceof TelegramError) {
      console.error(`Error getting updates: ${error.message} (Code: ${error.code})`);
      
      // For rate-limiting errors, apply backoff
      if (error.code === 429) {
        const retryAfter = error.parameters?.retry_after || 5;
        await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
        return { success: false, updates: [], newLastUpdateId: lastUpdateId };
      }
      
      // Return empty array to continue polling
      return { success: false, updates: [], newLastUpdateId: lastUpdateId };
    } else {
      console.error('Unexpected error getting updates:', error);
      return { success: false, updates: [], newLastUpdateId: lastUpdateId };
    }
  }
}
```

### Handling Media-Related Errors

```typescript
async function sendPhotoWithFallback(client: TelegramClient, chatId: number, photo: string, caption: string) {
  try {
    const message = await client.sendPhoto({
      chat_id: chatId,
      photo: photo,
      caption: caption
    });
    
    return { success: true, message };
  } catch (error) {
    if (error instanceof TelegramError) {
      console.error(`Failed to send photo: ${error.message} (Code: ${error.code})`);
      
      // If the photo failed, try sending just the caption as a text message
      if (error.code === 400) {
        try {
          console.log('Attempting to send as text message instead of photo...');
          const textMessage = await client.sendMessage({
            chat_id: chatId,
            text: caption
          });
          
          return { success: true, message: textMessage, fallbackUsed: true };
        } catch (fallbackError) {
          console.error('Fallback to text message also failed:', fallbackError);
          return { success: false, error: fallbackError };
        }
      }
      
      return { success: false, error };
    }
    
    return { success: false, error };
  }
}
```

## Global Error Handling

### Creating an Error Handler Middleware

```typescript
import { TelegramClient, Update, Message, TelegramError } from '@bot-machine/telegram-client';

class ErrorHandler {
  private client: TelegramClient;
  
  constructor(client: TelegramClient) {
    this.client = client;
  }
  
  async handleApiError(
    error: any,
    context?: string,
    fallbackMessage?: string,
    chatId?: number | string
  ) {
    console.error(`Error in ${context || 'unknown context'}:`, error);
    
    if (error instanceof TelegramError) {
      console.error(`Telegram API Error (${error.code}): ${error.message}`);
      console.error(`Method: ${error.method}`);
      console.error(`Parameters:`, error.parameters);
      
      // Log specific details based on error code
      switch (error.code) {
        case 400:
          console.error('Bad Request - check parameters');
          break;
        case 401:
          console.error('Unauthorized - invalid token');
          break;
        case 403:
          console.error('Forbidden - bot may be blocked');
          break;
        case 429:
          const retryAfter = error.parameters?.retry_after;
          console.error(`Rate limited, retry after: ${retryAfter} seconds`);
          break;
      }
      
      // Optionally send an error message to the user if chat ID is provided
      if (chatId && fallbackMessage) {
        try {
          await this.client.sendMessage({
            chat_id: chatId,
            text: fallbackMessage
          });
        } catch (msgError) {
          console.error('Failed to send fallback message:', msgError);
        }
      }
      
      return { 
        success: false, 
        errorType: 'TELEGRAM_API_ERROR', 
        errorCode: error.code,
        message: error.message 
      };
    } else {
      console.error('Non-Telegram error:', error);
      return { 
        success: false, 
        errorType: 'GENERAL_ERROR', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }
}

// Usage example
const client = new TelegramClient('YOUR_BOT_TOKEN');
const errorHandler = new ErrorHandler(client);

async function processMessage(message: Message) {
  try {
    // Your message processing logic here
    await client.sendMessage({
      chat_id: message.chat.id,
      text: `Echo: ${message.text}`
    });
  } catch (error) {
    await errorHandler.handleApiError(
      error,
      'processMessage',
      'Sorry, there was an error processing your message.',
      message.chat.id
    );
  }
}
```

## Error Logging and Monitoring

### Structured Error Logging

```typescript
interface BotErrorLog {
  timestamp: string;
  errorType: string;
  errorCode?: number;
  method?: string;
  parameters?: any;
  message: string;
  stack?: string;
  context?: string;
}

class BotErrorLogger {
  private logs: BotErrorLog[] = [];
  
  logError(error: any, context?: string) {
    const log: BotErrorLog = {
      timestamp: new Date().toISOString(),
      errorType: error.constructor?.name || typeof error,
      message: error.message || String(error),
      stack: error.stack,
      context
    };
    
    if (error instanceof TelegramError) {
      log.errorCode = error.code;
      log.method = error.method;
      log.parameters = error.parameters;
    }
    
    this.logs.push(log);
    
    // Keep only the last 1000 logs to prevent memory issues
    if (this.logs.length > 1000) {
      this.logs = this.logs.slice(-1000);
    }
    
    // Also log to console (or your preferred logging system)
    console.error('[Bot Error]', JSON.stringify(log, null, 2));
  }
  
  getLogs() {
    return this.logs;
  }
  
  getRecentErrors(limit: number = 10) {
    return this.logs.slice(-limit);
  }
}

// Usage
const errorLogger = new BotErrorLogger();

async function safeSendMessage(client: TelegramClient, chatId: number, text: string) {
  try {
    return await client.sendMessage({ chat_id: chatId, text });
  } catch (error) {
    errorLogger.logError(error, 'sendMessage');
    throw error;
  }
}
```

## Testing Error Scenarios

### Mocking Errors for Testing

```typescript
// Example of how you might test error handling
async function testErrorHandling() {
  const client = new TelegramClient('YOUR_BOT_TOKEN');
  
  // Example: Try to send a message to an invalid chat ID to test 403/404 handling
  try {
    await client.sendMessage({
      chat_id: 0, // Invalid chat ID to trigger an error
      text: 'This should fail'
    });
  } catch (error) {
    if (error instanceof TelegramError) {
      console.log(`Expected error occurred: ${error.message} (Code: ${error.code})`);
      // Test your error handling logic here
    }
  }
  
  // Example: Try to send a message that's too long to test 400 handling
  try {
    await client.sendMessage({
      chat_id: 123456789, // Valid chat ID
      text: 'A'.repeat(5000) // Message too long (> 4096 chars) to trigger 400 error
    });
  } catch (error) {
    if (error instanceof TelegramError) {
      console.log(`Expected bad request error: ${error.message} (Code: ${error.code})`);
      // Test your error handling logic here
    }
  }
}
```

## Best Practices for Error Handling

### 1. Always Check for TelegramError

```typescript
// Good practice: Always check if the error is a TelegramError
try {
  await client.getMe();
} catch (error) {
  if (error instanceof TelegramError) {
    // Handle Telegram API-specific errors
    console.error(`Telegram error: ${error.message} (Code: ${error.code})`);
  } else {
    // Handle other types of errors
    console.error('General error:', error);
  }
}
```

### 2. Implement Circuit Breaker Pattern

```typescript
class CircuitBreaker {
  private failureCount = 0;
  private lastFailureTime: number | null = null;
  private isOpen = false;
  private readonly failureThreshold = 5;
  private readonly timeout = 60000; // 1 minute
  
  call<T>(fn: () => Promise<T>): Promise<T> {
    if (this.isOpen) {
      if (Date.now() - (this.lastFailureTime || 0) > this.timeout) {
        // Attempt to close the circuit
        this.isOpen = false;
        this.failureCount = 0;
      } else {
        return Promise.reject(new Error('Circuit breaker is OPEN'));
      }
    }
    
    return fn()
      .then(result => {
        this.onSuccess();
        return result;
      })
      .catch(error => {
        this.onFailure();
        throw error;
      });
  }
  
  private onSuccess() {
    this.failureCount = 0;
    this.isOpen = false;
  }
  
  private onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    
    if (this.failureCount >= this.failureThreshold) {
      this.isOpen = true;
    }
  }
}

// Usage with the Telegram client
const circuitBreaker = new CircuitBreaker();
const client = new TelegramClient('YOUR_BOT_TOKEN');

async function safeApiCall() {
  return await circuitBreaker.call(() => client.getMe());
}
```

### 3. Use Timeout for Long-Running Operations

```typescript
function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => 
      setTimeout(() => reject(new Error('Operation timed out')), timeoutMs)
    ) as Promise<T>
  ]);
}

// Usage
try {
  const result = await withTimeout(client.sendMessage({
    chat_id: 123456789,
    text: 'Hello!'
  }), 10000); // 10 second timeout
} catch (error) {
  if (error.message === 'Operation timed out') {
    console.error('API call timed out');
  } else {
    console.error('Other error:', error);
  }
}
```

## Summary

Effective error handling in your Telegram bot should include:

1. Always checking if errors are `TelegramError` instances
2. Handling specific error codes appropriately 
3. Implementing retry logic for transient errors
4. Properly logging errors for monitoring
5. Using fallback mechanisms when possible
6. Implementing circuit breakers for resilience
7. Setting appropriate timeouts

With proper error handling, your bot will be more robust and provide a better experience for users even when things go wrong.

## Next Steps

Now that you understand error handling, learn about:

- [Working with AI agents](../guides/ai-agents.md) using this library for intelligent bot behavior