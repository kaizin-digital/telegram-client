# Getting Started

This guide will help you get started with the type-safe Telegram Bot API client built with Bun and TypeScript.

## Prerequisites

Before you begin, ensure you have:

1. [Bun](https://bun.sh/) runtime installed (version 1.0 or higher)
2. A Telegram Bot token from [@BotFather](https://t.me/BotFather)

If you don't have a bot token yet, talk to [@BotFather](https://t.me/BotFather) on Telegram:
1. Send `/newbot` command
2. Follow the instructions to create your bot
3. Copy the provided token

## Installation

To install the package in your project, run:

Using Bun:
```bash
bun add @bot-machine/telegram-client
```

Using npm:
```bash
npm install @bot-machine/telegram-client
```

Using yarn:
```bash
yarn add @bot-machine/telegram-client
```

## Quick Start

Here's a simple example to get your bot up and running:

```typescript
import { TelegramClient } from '@bot-machine/telegram-client';

// Initialize the client with your bot token
const client = new TelegramClient('YOUR_BOT_TOKEN');

async function main() {
  try {
    // Get bot information
    const me = await client.getMe();
    console.log(`Hello, I'm ${me.first_name}!`);

    // Send a message
    const message = await client.sendMessage({
      chat_id: 123456789, // Replace with a real chat ID
      text: 'Hello from TypeScript!'
    });

    console.log(`Message sent: ${message.text}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
```

## Basic Usage

### Creating a Client Instance

```typescript
import { TelegramClient } from '@bot-machine/telegram-client';

const client = new TelegramClient('YOUR_BOT_TOKEN');
```

### Checking Bot Information

```typescript
const me = await client.getMe();
console.log(`Bot username: @${me.username}`);
console.log(`Bot name: ${me.first_name}`);
```

### Sending a Basic Text Message

```typescript
const message = await client.sendMessage({
  chat_id: 123456789, // Replace with a real chat ID
  text: 'Hello, world!'
});

console.log(`Message ID: ${message.message_id}`);
```

### Using Message Formatting

```typescript
const message = await client.sendMessage({
  chat_id: 123456789, // Replace with a real chat ID
  text: '<b>Bold text</b> and <i>italic text</i>',
  parse_mode: 'HTML'
});
```

## Error Handling

Always implement proper error handling in your bot:

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
  } else {
    console.error('General error:', error);
  }
}
```

## Environment Variables

For security, store your bot token in an environment variable:

```typescript
import { TelegramClient } from '@bot-machine/telegram-client';

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  throw new Error('TELEGRAM_BOT_TOKEN environment variable is required');
}

const client = new TelegramClient(token);
```

## Running Your Bot

Create an `index.ts` file with your bot code, then run:

```bash
bun run index.ts
```

## Next Steps

Now that you have your bot set up, explore these guides to build more advanced functionality:

- [Sending Messages](../guides/sending-messages.md) - Learn how to send various types of messages
- [Receiving Updates](../guides/receiving-updates.md) - Handle incoming messages and events
- [Webhooks vs Long Polling](../guides/webhooks-vs-long-polling.md) - Understand the two ways to receive updates
- [Handling Media](../guides/handling-media.md) - Work with photos, videos, and other media
- [Inline Keyboards](../guides/inline-keyboards.md) - Create interactive keyboards
- [Error Handling](../guides/error-handling.md) - Best practices for handling errors