# Documentation Summary

This document provides an overview of all the documentation available for the Telegram Bot API client.

## API Reference

Detailed documentation for all available methods and types:

1. [Client Methods](api/client-methods.md) - All methods available on the TelegramClient
2. [Response Types](api/response-types.md) - Complete type definitions for all responses
3. [Parameter Types](api/parameter-types.md) - Type definitions for all method parameters
4. [Error Handling](api/error-handling.md) - Information about error types and handling

## Guides

Step-by-step tutorials and conceptual guides:

1. [Getting Started](guides/getting-started.md) - Installation and basic usage
2. [Sending Messages](guides/sending-messages.md) - How to send different types of messages
3. [Receiving Updates](guides/receiving-updates.md) - Handling incoming updates
4. [Webhooks vs Long Polling](guides/webhooks-vs-long-polling.md) - Comparison and implementation
5. [Handling Media](guides/handling-media.md) - Working with photos, videos, and other media
6. [Inline Keyboards](guides/inline-keyboards.md) - Creating interactive keyboards
7. [Payment Processing](guides/payment-processing.md) - Working with payments and invoices
8. [Error Handling](guides/error-handling.md) - Best practices for handling errors
9. [Working with AI Agents](guides/ai-agents.md) - Using the library with AI agents

## Overview

The documentation covers the following main areas:

### Client Methods
- **Authentication**: `getMe()`
- **Message Operations**: `sendMessage()`, `forwardMessage()`, `copyMessage()`
- **Media Operations**: `sendPhoto()`, `sendVideo()`, `sendDocument()`, `sendMediaGroup()`
- **Location Services**: `sendLocation()`, `sendVenue()`
- **Interactive Elements**: `sendPoll()`, `sendDice()`, `answerCallbackQuery()`
- **Chat Management**: `banChatMember()`, `unbanChatMember()`, `getChat()`, `leaveChat()`
- **Payment Operations**: `sendInvoice()`, `createInvoiceLink()`, `answerShippingQuery()`, `answerPreCheckoutQuery()`
- **Webhook Management**: `setWebhook()`, `deleteWebhook()`, `getWebhookInfo()`

### Core Concepts
- Type safety with comprehensive TypeScript definitions
- Error handling with additional context for AI agents
- Support for all Telegram Bot API methods
- Bun runtime optimization
- Dependency-free implementation

### Error Handling
The library provides enhanced error information for AI agents, including:
- Error message from Telegram
- Error code (HTTP status code)
- Method that caused the error
- Parameters that were passed to the method

### Media Handling
- Support for photos, videos, documents, audio files, voice messages, and video notes
- File upload and download capabilities
- Media group sending functionality

### Interactive Features
- Inline keyboards with callback queries
- Reply keyboards
- Force reply and remove keyboard options
- Web app integration support

This comprehensive documentation should provide everything needed to effectively use and understand the Telegram Bot API client library.