# @bot-machine/telegram-client Documentation

Welcome to the comprehensive documentation for the type-safe Telegram Bot API client built with Bun and TypeScript.

## Overview

This library provides a lightweight, type-safe interface to interact with the Telegram Bot API, built specifically for the Bun runtime environment. It offers full TypeScript support and comprehensive type definitions for all Telegram Bot API methods.

### Key Features

- 🚀 Built with Bun for maximum performance
- 📝 Full TypeScript support with comprehensive type definitions
- 🔒 Type-safe API responses
- 🌐 Supports all core Telegram Bot API methods
- 📦 Lightweight and dependency-free
- 🛠️ Simple and intuitive API

### Prerequisites

- [Bun](https://bun.sh/) runtime environment
- A valid Telegram Bot token (get one from [@BotFather](https://t.me/BotFather))

## Table of Contents

### API Reference

Detailed documentation for all available methods and types:

- [Client Methods](api/client-methods.md) - All methods available on the TelegramClient
- [Response Types](api/response-types.md) - Complete type definitions for all responses
- [Parameter Types](api/parameter-types.md) - Type definitions for all method parameters
- [Error Handling](api/error-handling.md) - Information about error types and handling

### Guides

Step-by-step tutorials and conceptual guides:

- [Getting Started](guides/getting-started.md) - Installation and basic usage
- [Sending Messages](guides/sending-messages.md) - How to send different types of messages
- [Receiving Updates](guides/receiving-updates.md) - Handling incoming updates
- [Webhooks vs Long Polling](guides/webhooks-vs-long-polling.md) - Comparison and implementation
- [Handling Media](guides/handling-media.md) - Working with photos, videos, and other media
- [Inline Keyboards](guides/inline-keyboards.md) - Creating interactive keyboards
- [Payment Processing](guides/payment-processing.md) - Working with payments and invoices
- [Error Handling](guides/error-handling.md) - Best practices for handling errors
- [Working with AI Agents](guides/ai-agents.md) - Using the library with AI agents

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

## Support

For support, please open an issue on the [GitHub repository](https://github.com/kaizin-digital/telegram-client).