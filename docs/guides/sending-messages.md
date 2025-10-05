# Sending Messages

Learn how to send different types of messages using the Telegram Bot API client.

## Basic Text Messages

The most common type of message is a text message. Use the `sendMessage` method:

```typescript
import { TelegramClient } from '@bot-machine/telegram-client';

const client = new TelegramClient('YOUR_BOT_TOKEN');

// Send a simple text message
const message = await client.sendMessage({
  chat_id: 123456789, // Replace with a real chat ID
  text: 'Hello, world!'
});

console.log(`Message sent with ID: ${message.message_id}`);
```

### Message Formatting

You can format your messages using different parse modes:

```typescript
// Using HTML parse mode
await client.sendMessage({
  chat_id: 123456789,
  text: '<b>Bold text</b>, <i>italic text</i>, <a href="https://example.com">link</a>',
  parse_mode: 'HTML'
});

// Using MarkdownV2 parse mode
await client.sendMessage({
  chat_id: 123456789,
  text: '*Bold text*, _italic text_, [link](https://example.com), `code`',
  parse_mode: 'MarkdownV2'
});

// Using entities for more precise formatting
await client.sendMessage({
  chat_id: 123456789,
  text: 'This message contains formatted text',
  entities: [
    {
      type: 'bold',
      offset: 5,
      length: 7  // "message" will be bold
    },
    {
      type: 'italic',
      offset: 19,
      length: 8  // "formatted" will be italic
    }
  ]
});
```

## Reply Messages

You can reply to existing messages:

```typescript
// Reply to a specific message
await client.sendMessage({
  chat_id: 123456789,
  text: 'This is a reply',
  reply_to_message_id: 123 // ID of the message to reply to
});
```

## Silent Messages

Send messages without notification sound:

```typescript
await client.sendMessage({
  chat_id: 123456789,
  text: 'This is a silent message',
  disable_notification: true
});
```

## Protected Content

Send messages that cannot be forwarded or saved:

```typescript
await client.sendMessage({
  chat_id: 123456789,
  text: 'This content is protected and cannot be forwarded',
  protect_content: true
});
```

## Sending Media

### Photos

```typescript
// Send a photo by file ID (if you've previously sent or received the photo)
await client.sendPhoto({
  chat_id: 123456789,
  photo: 'PHOTO_FILE_ID',
  caption: 'This is a photo with a caption'
});

// Send a photo by URL
await client.sendPhoto({
  chat_id: 123456789,
  photo: 'https://example.com/photo.jpg',
  caption: 'This is a photo from a URL'
});
```

### Documents

```typescript
// Send a document
await client.sendDocument({
  chat_id: 123456789,
  document: 'DOCUMENT_FILE_ID',
  caption: 'This is a document'
});

// Send a document with a specific filename
await client.sendDocument({
  chat_id: 123456789,
  document: 'DOCUMENT_FILE_ID',
  caption: 'Official document',
  file_name: 'report.pdf' // Note: This parameter might not work with file IDs, only with new uploads
});
```

### Videos

```typescript
// Send a video
await client.sendVideo({
  chat_id: 123456789,
  video: 'VIDEO_FILE_ID',
  caption: 'Check out this video!',
  duration: 120, // Duration in seconds
  width: 1920,
  height: 1080
});
```

### Audio Files

```typescript
// Send an audio file
await client.sendAudio({
  chat_id: 123456789,
  audio: 'AUDIO_FILE_ID',
  caption: 'Listen to this',
  performer: 'Artist Name',
  title: 'Song Title',
  duration: 180 // Duration in seconds
});
```

### Voice Messages

```typescript
// Send a voice message
await client.sendVoice({
  chat_id: 123456789,
  voice: 'VOICE_FILE_ID',
  caption: 'My voice message',
  duration: 60 // Duration in seconds
});
```

## Sending Media Groups

Send multiple photos, videos, or other media as an album:

```typescript
import { InputMediaPhoto, InputMediaVideo } from '@bot-machine/telegram-client';

await client.sendMediaGroup({
  chat_id: 123456789,
  media: [
    {
      type: 'photo',
      media: 'PHOTO_FILE_ID_1',
      caption: 'First photo'
    } as InputMediaPhoto,
    {
      type: 'photo',
      media: 'PHOTO_FILE_ID_2',
      caption: 'Second photo'
    } as InputMediaPhoto,
    {
      type: 'video',
      media: 'VIDEO_FILE_ID',
      caption: 'A video'
    } as InputMediaVideo
  ]
});
```

## Sending Locations

Send geographic locations:

```typescript
// Send a location
await client.sendLocation({
  chat_id: 123456789,
  latitude: 37.7749,
  longitude: -122.4194
});

// Send a live location (updates for a specific period)
await client.sendLocation({
  chat_id: 123456789,
  latitude: 37.7749,
  longitude: -122.4194,
  live_period: 600 // Location will update for 10 minutes (600 seconds)
});
```

## Sending Venues

Send information about a venue:

```typescript
await client.sendVenue({
  chat_id: 123456789,
  latitude: 37.7749,
  longitude: -122.4194,
  title: 'Golden Gate Bridge',
  address: 'Presidio, San Francisco, CA'
});
```

## Sending Contacts

Send phone contacts:

```typescript
await client.sendContact({
  chat_id: 123456789,
  phone_number: '+1234567890',
  first_name: 'John',
  last_name: 'Doe'
});
```

## Sending Polls

Create and send polls:

```typescript
// Send a regular poll
await client.sendPoll({
  chat_id: 123456789,
  question: 'What is your favorite programming language?',
  options: [
    'JavaScript',
    'TypeScript',
    'Python',
    'Rust'
  ],
  is_anonymous: false,
  allows_multiple_answers: false
});

// Send a quiz
await client.sendPoll({
  chat_id: 123456789,
  question: 'What is 2+2?',
  options: [
    '3',
    '4',
    '5',
    '6'
  ],
  type: 'quiz',
  correct_option_id: 1, // Index of the correct answer (0-based)
  explanation: 'The correct answer is 4'
});
```

## Sending Dice

Send animated dice messages:

```typescript
// Send a regular dice
await client.sendDice({
  chat_id: 123456789
});

// Send a specific type of dice
await client.sendDice({
  chat_id: 123456789,
  emoji: '🎯' // Can be '🎯', '🏀', '⚽', '🎲', '🎳', or '🎰'
});
```

## Sending with Action Indicators

Indicate to the user what the bot is doing:

```typescript
// Show that the bot is typing
await client.sendChatAction({
  chat_id: 123456789,
  action: 'typing'
});

// Show that the bot is uploading a photo
await client.sendChatAction({
  chat_id: 123456789,
  action: 'upload_photo'
});

// Other available actions:
// 'upload_video', 'record_video', 'record_voice', 'upload_voice',
// 'upload_document', 'find_location', 'record_video_note', 'upload_video_note'
```

## Complete Example

Here's a complete example that demonstrates various message sending capabilities:

```typescript
import { TelegramClient, InputMediaPhoto } from '@bot-machine/telegram-client';

async function sendMultipleMessageTypes(client: TelegramClient, chatId: number) {
  try {
    // Send a formatted text message
    await client.sendMessage({
      chat_id: chatId,
      text: '<b>Welcome!</b> This is a <i>formatted</i> message.',
      parse_mode: 'HTML'
    });

    // Send a photo with caption
    await client.sendPhoto({
      chat_id: chatId,
      photo: 'PHOTO_FILE_ID',
      caption: 'Here is a photo for you!'
    });

    // Send a media group
    await client.sendMediaGroup({
      chat_id: chatId,
      media: [
        {
          type: 'photo',
          media: 'PHOTO1_FILE_ID',
          caption: 'First photo'
        } as InputMediaPhoto,
        {
          type: 'photo',
          media: 'PHOTO2_FILE_ID',
          caption: 'Second photo'
        } as InputMediaPhoto
      ]
    });

    // Send a poll
    await client.sendPoll({
      chat_id: chatId,
      question: 'How are you doing today?',
      options: [
        'Great!',
        'Good',
        'Okay',
        'Not so good'
      ],
      is_anonymous: true
    });

    console.log('All messages sent successfully!');
  } catch (error) {
    console.error('Error sending messages:', error);
  }
}
```

## Sending Invoices

To send invoices to users for payments, use the `sendInvoice` method:

```typescript
// Send an invoice
const invoiceMessage = await client.sendInvoice({
  chat_id: 123456789,
  title: 'Premium Subscription',
  description: '1-year premium subscription to our service',
  payload: 'premium-subscription-payload',
  provider_token: 'YOUR_PROVIDER_TOKEN',  // Get this from BotFather
  currency: 'USD',  // Three-letter currency code
  prices: [
    {
      label: 'Subscription',
      amount: 999  // Amount in cents (9.99 USD)
    },
    {
      label: 'Tax',
      amount: 100  // 1.00 USD
    }
  ],
  start_parameter: 'subscribe',
  photo_url: 'https://example.com/subscription-image.jpg',
  need_name: true,
  need_email: true,
  need_shipping_address: false,  // Set to true if shipping is required
  is_flexible: false  // Set to true if shipping options should be requested
});

console.log(`Invoice sent with message ID: ${invoiceMessage.message_id}`);
```

## Creating Invoice Links

For sharing invoices easily, you can create invoice links:

```typescript
// Create a payment link
const invoiceLink = await client.createInvoiceLink({
  title: 'Product Purchase',
  description: 'High-quality product with premium features',
  payload: 'product-purchase-payload',
  provider_token: 'YOUR_PROVIDER_TOKEN',
  currency: 'USD',
  prices: [
    {
      label: 'Product',
      amount: 2999  // Amount in cents (29.99 USD)
    }
  ],
  need_name: true,
  need_email: true,
  need_phone_number: true
});

console.log(`Invoice link created: ${invoiceLink}`);
```

## Error Handling

Always implement error handling when sending messages:

```typescript
import { TelegramClient, TelegramError } from '@bot-machine/telegram-client';

const client = new TelegramClient('YOUR_BOT_TOKEN');

try {
  const message = await client.sendMessage({
    chat_id: 123456789,
    text: 'Hello!'
  });
  console.log(`Message sent: ${message.message_id}`);
} catch (error) {
  if (error instanceof TelegramError) {
    console.error(`Telegram error: ${error.message}`);
    console.error(`Error code: ${error.code}`);
    
    // Handle specific error codes
    switch (error.code) {
      case 400:
        console.error('Bad request - check your parameters');
        break;
      case 403:
        console.error('Bot is not allowed to send messages to this user');
        break;
      case 429:
        console.error('Rate limited - wait before sending more messages');
        break;
      default:
        console.error(`Unexpected error: ${error.code}`);
    }
  } else {
    console.error('General error:', error);
  }
}
```

## Next Steps

Now that you know how to send various types of messages, learn how to:

- [Receive and handle updates](../guides/receiving-updates.md) from users
- [Work with webhooks or long polling](../guides/webhooks-vs-long-polling.md) to receive messages
- [Handle media files](../guides/handling-media.md) from users
- [Create interactive keyboards](../guides/inline-keyboards.md)