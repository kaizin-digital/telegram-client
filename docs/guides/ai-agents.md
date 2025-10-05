# Working with AI Agents

Learn how to integrate the Telegram Bot API client with AI agents for intelligent bot behavior and responses.

## Overview

Modern Telegram bots can leverage AI agents to provide more intelligent, context-aware, and personalized interactions. This guide covers how to effectively use the `@bot-machine/telegram-client` library with AI agents.

## AI Agent Integration Patterns

### 1. Simple AI Response Generation

The most basic integration is using an AI agent to generate responses to user messages:

```typescript
import { TelegramClient, Message } from '@bot-machine/telegram-client';

// Mock AI agent function (replace with your actual AI agent)
async function generateAIResponse(userMessage: string): Promise<string> {
  // This would be your actual AI agent call
  // For example, using OpenAI API, Hugging Face, or a custom model
  const responses = [
    `I understand you're saying: "${userMessage}". That's interesting!`,
    `Thanks for telling me about: "${userMessage}".`,
    `I've processed your message: "${userMessage}" and found it informative.`
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

const client = new TelegramClient('YOUR_BOT_TOKEN');

async function handleAIBotMessage(message: Message) {
  if (!message.text) {
    // Only handle text messages
    return;
  }
  
  try {
    // Generate AI response
    const aiResponse = await generateAIResponse(message.text);
    
    // Send the AI-generated response
    await client.sendMessage({
      chat_id: message.chat.id,
      text: aiResponse,
      reply_to_message_id: message.message_id
    });
  } catch (error) {
    console.error('Error generating AI response:', error);
    
    // Send a fallback message
    await client.sendMessage({
      chat_id: message.chat.id,
      text: 'Sorry, I\'m having trouble processing your request right now. Please try again later.',
      reply_to_message_id: message.message_id
    });
  }
}
```

### 2. Context-Aware Conversations

Maintain conversation context for more coherent interactions:

```typescript
interface ConversationContext {
  userId: number;
  messages: Array<{ role: 'user' | 'assistant'; content: string; timestamp: number }>;
  lastInteraction: number;
}

class AIConversationManager {
  private contexts: Map<number, ConversationContext> = new Map();
  private readonly contextTimeout = 30 * 60 * 1000; // 30 minutes
  
  async processMessage(userId: number, userMessage: string): Promise<string> {
    // Get or create conversation context
    let context = this.contexts.get(userId);
    
    if (!context) {
      context = {
        userId,
        messages: [],
        lastInteraction: Date.now()
      };
    }
    
    // Add user message to context
    context.messages.push({
      role: 'user',
      content: userMessage,
      timestamp: Date.now()
    });
    
    // Clean up old messages (keep last 10)
    if (context.messages.length > 10) {
      context.messages = context.messages.slice(-10);
    }
    
    // Generate AI response with context
    const aiResponse = await this.generateResponseWithHistory(context.messages);
    
    // Add AI response to context
    context.messages.push({
      role: 'assistant',
      content: aiResponse,
      timestamp: Date.now()
    });
    
    // Update context
    context.lastInteraction = Date.now();
    this.contexts.set(userId, context);
    
    return aiResponse;
  }
  
  private async generateResponseWithHistory(
    messages: Array<{ role: 'user' | 'assistant'; content: string; timestamp: number }>
  ): Promise<string> {
    // This would be your actual AI agent call with conversation history
    // For example: send the full conversation history to an LLM
    const recentMessages = messages.slice(-6); // Use last 3 exchanges
    const conversationSummary = recentMessages
      .map(msg => `${msg.role === 'user' ? 'User' : 'Bot'}: ${msg.content}`)
      .join('\n');
    
    // Mock response - in real implementation, call your AI agent with the conversation summary
    return `I see you've said: "${messages[messages.length - 1].content}". Context: ${conversationSummary.substring(0, 200)}...`;
  }
  
  // Clean up stale contexts periodically
  cleanup() {
    const now = Date.now();
    for (const [userId, context] of this.contexts.entries()) {
      if (now - context.lastInteraction > this.contextTimeout) {
        this.contexts.delete(userId);
      }
    }
  }
}

// Usage
const conversationManager = new AIConversationManager();

async function handleContextualMessage(message: Message) {
  try {
    if (!message.text || !message.from?.id) {
      return;
    }
    
    // Process message with context
    const response = await conversationManager.processMessage(message.from.id, message.text);
    
    // Send response
    await client.sendMessage({
      chat_id: message.chat.id,
      text: response,
      reply_to_message_id: message.message_id
    });
  } catch (error) {
    console.error('Error in contextual AI processing:', error);
    
    await client.sendMessage({
      chat_id: message.chat.id,
      text: 'I\'m having trouble with our conversation. Let\'s start fresh!',
      reply_to_message_id: message.message_id
    });
  }
}
```

## Best Practices for AI Agent Integration

### 1. Error Handling for AI Failures

AI services can fail or be unavailable. Always implement fallbacks:

```typescript
import { TelegramClient, TelegramError } from '@bot-machine/telegram-client';

async function sendMessageWithAI(client: TelegramClient, chatId: number, userMessage: string) {
  let aiResponse: string | null = null;
  let fallbackUsed = false;
  
  try {
    // Try to generate response with AI agent
    aiResponse = await generateAIResponse(userMessage);
  } catch (aiError) {
    console.error('AI agent failed:', aiError);
    fallbackUsed = true;
    
    // Use fallback response
    aiResponse = `I understand you said: "${userMessage}". I'm currently experiencing technical difficulties but will get back to you soon.`;
  }
  
  try {
    // Send response via Telegram
    await client.sendMessage({
      chat_id: chatId,
      text: aiResponse,
    });
    
    // Log if fallback was used
    if (fallbackUsed) {
      console.log('Sent fallback message due to AI failure');
    }
  } catch (telegramError) {
    if (telegramError instanceof TelegramError) {
      console.error(`Telegram API Error: ${telegramError.message} (Code: ${telegramError.code})`);
      
      // Additional handling based on error code
      if (telegramError.code === 403) {
        console.log('Bot may be blocked by user');
      } else if (telegramError.code === 429) {
        console.log('Rate limited by Telegram');
      }
    }
  }
}
```

### 2. Rate Limiting for AI Services

Prevent overwhelming your AI service with too many requests:

```typescript
class AIRateLimiter {
  private requests: Map<string, number[]> = new Map();
  private readonly maxRequests = 10; // Max requests per minute per user
  private readonly timeWindow = 60 * 1000; // 1 minute window
  
  async canMakeRequest(userId: string): Promise<boolean> {
    const now = Date.now();
    const userRequests = this.requests.get(userId) || [];
    
    // Remove requests older than the time window
    const recentRequests = userRequests.filter(timestamp => 
      now - timestamp < this.timeWindow
    );
    
    // Check if user is within rate limit
    if (recentRequests.length >= this.maxRequests) {
      return false;
    }
    
    // Add current request
    recentRequests.push(now);
    this.requests.set(userId, recentRequests);
    
    return true;
  }
  
  async waitUntilAvailable(userId: string): Promise<void> {
    while (!(await this.canMakeRequest(userId))) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
    }
  }
}

const aiRateLimiter = new AIRateLimiter();

async function handleRateLimitedAIRequest(message: Message) {
  if (!message.from?.id) {
    return;
  }
  
  const userId = message.from.id.toString();
  
  try {
    // Wait if rate limited
    await aiRateLimiter.waitUntilAvailable(userId);
    
    // Process with AI
    if (message.text) {
      const response = await generateAIResponse(message.text);
      
      await client.sendMessage({
        chat_id: message.chat.id,
        text: response,
        reply_to_message_id: message.message_id
      });
    }
  } catch (error) {
    console.error('Error in rate-limited AI request:', error);
    await client.sendMessage({
      chat_id: message.chat.id,
      text: 'Sorry, I\'m receiving too many requests right now. Please wait a moment and try again.',
      reply_to_message_id: message.message_id
    });
  }
}
```

### 3. Caching AI Responses

Cache responses to reduce API calls and improve response time:

```typescript
class AICache {
  private cache: Map<string, { response: string; timestamp: number; ttl: number }> = new Map();
  
  async get(key: string): Promise<string | null> {
    const item = this.cache.get(key);
    if (!item) {
      return null;
    }
    
    // Check if item is expired
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return item.response;
  }
  
  async set(key: string, response: string, ttl: number = 300000): Promise<void> { // 5 minutes default
    this.cache.set(key, { response, timestamp: Date.now(), ttl });
  }
  
  // Clean up expired items periodically
  cleanup() {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key);
      }
    }
  }
}

const aiCache = new AICache();

async function handleCachedAIRequest(message: Message) {
  if (!message.text) {
    return;
  }
  
  // Create cache key based on message text
  const cacheKey = `${message.from?.id || 'unknown'}:${message.text.substring(0, 100)}`;
  
  try {
    // Try to get from cache first
    let response = await aiCache.get(cacheKey);
    
    if (!response) {
      // Generate new response
      response = await generateAIResponse(message.text);
      
      // Cache the response (valid for 5 minutes)
      await aiCache.set(cacheKey, response, 5 * 60 * 1000);
    }
    
    // Send response
    await client.sendMessage({
      chat_id: message.chat.id,
      text: response,
      reply_to_message_id: message.message_id
    });
  } catch (error) {
    console.error('Error in cached AI request:', error);
    await client.sendMessage({
      chat_id: message.chat.id,
      text: 'Sorry, I\'m having trouble processing your request.',
      reply_to_message_id: message.message_id
    });
  }
}
```

## Complete AI Bot Example

Here's a complete example integrating AI with the Telegram client:

```typescript
import { TelegramClient, Update, Message, TelegramError } from '@bot-machine/telegram-client';

// AI Agent Service (in a real implementation, this would call your actual AI service)
class AIService {
  async processMessage(message: string): Promise<{ response: string; confidence: number }> {
    // Mock AI processing - in reality, this would call an LLM API
    const responses = [
      { text: `I understand your message: "${message}". Can you tell me more?`, confidence: 0.8 },
      { text: `Thanks for sharing: "${message}". How can I help you?`, confidence: 0.75 },
      { text: `Interesting point about "${message}". What else would you like to discuss?`, confidence: 0.85 }
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    return { 
      response: randomResponse.text, 
      confidence: randomResponse.confidence 
    };
  }
}

// Error Handling for AI Operations
class AIErrorHandler {
  async handleAIError(error: any, chatId: number | string, originalMessageId?: number) {
    console.error('AI Service Error:', error);
    
    // Determine appropriate response based on error type
    let errorMessage = 'I\'m currently experiencing technical difficulties. Please try again later.';
    
    if (error.message?.includes('rate limit')) {
      errorMessage = 'I\'ve reached my processing limit. Please wait a moment and try again.';
    } else if (error.message?.includes('timeout')) {
      errorMessage = 'The AI service is taking too long to respond. Please try again.';
    }
    
    try {
      await client.sendMessage({
        chat_id: chatId,
        text: errorMessage,
        reply_to_message_id: originalMessageId
      });
    } catch (sendError) {
      console.error('Failed to send error message:', sendError);
    }
  }
}

// Main AI Bot Class
class AITelegramBot {
  private client: TelegramClient;
  private aiService: AIService;
  private errorHandler: AIErrorHandler;
  private lastUpdateId = 0;
  
  constructor(token: string) {
    this.client = new TelegramClient(token);
    this.aiService = new AIService();
    this.errorHandler = new AIErrorHandler();
  }
  
  async startPolling() {
    console.log('Starting AI bot polling...');
    
    while (true) {
      try {
        const updates = await this.client.getUpdates({
          offset: this.lastUpdateId + 1,
          timeout: 30
        });
        
        for (const update of updates) {
          this.lastUpdateId = update.update_id;
          
          if (update.message) {
            await this.handleMessage(update.message);
          }
        }
        
        // Small delay if no updates
        if (updates.length === 0) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } catch (error) {
        console.error('Error in polling loop:', error);
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds before retrying
      }
    }
  }
  
  private async handleMessage(message: Message) {
    // Only process text messages
    if (!message.text) {
      return;
    }
    
    // Don't respond to messages from bots (avoid loops)
    if (message.from?.is_bot) {
      return;
    }
    
    console.log(`Processing message from ${message.from?.first_name}: ${message.text}`);
    
    try {
      // Process message with AI
      const aiResult = await this.aiService.processMessage(message.text);
      
      // Only respond if confidence is high enough
      if (aiResult.confidence > 0.7) {
        await this.client.sendMessage({
          chat_id: message.chat.id,
          text: aiResult.response,
          reply_to_message_id: message.message_id
        });
      } else {
        // For low confidence, maybe send a default response
        await this.client.sendMessage({
          chat_id: message.chat.id,
          text: 'I\'m not quite sure how to respond to that. Can you rephrase?',
          reply_to_message_id: message.message_id
        });
      }
    } catch (error) {
      await this.errorHandler.handleAIError(error, message.chat.id, message.message_id);
    }
  }
}

// Usage
const aiBot = new AITelegramBot('YOUR_BOT_TOKEN');
aiBot.startPolling();
```

## Advanced Integration Patterns

### 1. Multi-Modal AI Processing

Process different types of content with specialized AI models:

```typescript
class MultiModalAIProcessor {
  async processContent(message: Message): Promise<string> {
    // Process text
    if (message.text) {
      return await this.processText(message.text);
    }
    // Process images
    else if (message.photo) {
      const largestPhoto = message.photo[message.photo.length - 1];
      return await this.processImage(largestPhoto.file_id, message.caption || '');
    }
    // Process other content types
    else if (message.document) {
      return await this.processDocument(message.document.file_id, message.document.file_name || '');
    }
    else if (message.voice) {
      return await this.processVoice(message.voice.file_id);
    }
    else {
      return "I received content that I'm not able to process right now. Could you send a text message instead?";
    }
  }
  
  private async processText(text: string): Promise<string> {
    // Process with text-focused AI model
    return `I've analyzed your text: "${text}". What would you like to know?`;
  }
  
  private async processImage(photoId: string, caption: string): Promise<string> {
    // In a real implementation, you would download the image and analyze it
    return `I've received an image${caption ? ` with caption: "${caption}"` : ''}. Image analysis coming soon!`;
  }
  
  private async processDocument(docId: string, fileName: string): Promise<string> {
    return `I've received a document: "${fileName}". Document processing coming soon!`;
  }
  
  private async processVoice(voiceId: string): Promise<string> {
    return "I've received a voice message. Voice transcription coming soon!";
  }
}

// Usage
const multiModalProcessor = new MultiModalAIProcessor();

async function handleMultiModalMessage(message: Message) {
  try {
    const response = await multiModalProcessor.processContent(message);
    
    await client.sendMessage({
      chat_id: message.chat.id,
      text: response,
      reply_to_message_id: message.message_id
    });
  } catch (error) {
    console.error('Multi-modal processing error:', error);
    await client.sendMessage({
      chat_id: message.chat.id,
      text: 'Sorry, I had trouble processing your message. Please try sending a text message.',
      reply_to_message_id: message.message_id
    });
  }
}
```

### 2. AI-Powered Content Moderation

Use AI to moderate messages before they're processed:

```typescript
class AIModerator {
  async moderateMessage(text: string): Promise<{ allowed: boolean; reason?: string }> {
    // In a real implementation, you would call a content moderation AI service
    // For this example, we'll use basic rule checking
    
    const prohibitedWords = ['spam', 'abuse', 'inappropriate'];
    
    for (const word of prohibitedWords) {
      if (text.toLowerCase().includes(word)) {
        return {
          allowed: false,
          reason: `Message contains prohibited content: ${word}`
        };
      }
    }
    
    // Check message length
    if (text.length > 1000) {
      return {
        allowed: false,
        reason: 'Message is too long'
      };
    }
    
    return { allowed: true };
  }
}

const aiModerator = new AIModerator();

async function handleModeratedMessage(message: Message) {
  if (!message.text) {
    // For non-text content, you might want to implement other moderation checks
    await handleMultiModalMessage(message);
    return;
  }
  
  try {
    const moderationResult = await aiModerator.moderateMessage(message.text);
    
    if (!moderationResult.allowed) {
      console.log(`Message blocked: ${moderationResult.reason}`);
      await client.sendMessage({
        chat_id: message.chat.id,
        text: 'Your message was not allowed based on our content policy.',
        reply_to_message_id: message.message_id
      });
      return;
    }
    
    // Process the allowed message
    await handleMultiModalMessage(message);
  } catch (error) {
    console.error('Moderation error:', error);
    // Still process the message but log the error
    await handleMultiModalMessage(message);
  }
}
```

## Monitoring and Analytics

Track AI interactions to improve your bot:

```typescript
interface AIInteractionLog {
  timestamp: Date;
  userId: number;
  input: string;
  response: string;
  confidence: number;
  processingTime: number;
  success: boolean;
}

class AIAnalytics {
  private logs: AIInteractionLog[] = [];
  
  logInteraction(
    userId: number,
    input: string,
    response: string,
    confidence: number,
    processingTime: number,
    success: boolean
  ) {
    this.logs.push({
      timestamp: new Date(),
      userId,
      input,
      response,
      confidence,
      processingTime,
      success
    });
    
    // Keep only the last 1000 logs to prevent memory issues
    if (this.logs.length > 1000) {
      this.logs = this.logs.slice(-1000);
    }
  }
  
  getStats() {
    if (this.logs.length === 0) {
      return { averageConfidence: 0, totalInteractions: 0, successRate: 0 };
    }
    
    const totalInteractions = this.logs.length;
    const successfulInteractions = this.logs.filter(log => log.success).length;
    const averageConfidence = this.logs.reduce((sum, log) => sum + log.confidence, 0) / totalInteractions;
    const successRate = successfulInteractions / totalInteractions;
    
    return {
      averageConfidence,
      totalInteractions,
      successRate
    };
  }
}

const aiAnalytics = new AIAnalytics();

// Example usage in message handling
async function handleTrackedMessage(message: Message) {
  const startTime = Date.now();
  
  try {
    if (!message.text) {
      return;
    }
    
    const result = await aiService.processMessage(message.text);
    
    await client.sendMessage({
      chat_id: message.chat.id,
      text: result.response,
      reply_to_message_id: message.message_id
    });
    
    // Log successful interaction
    aiAnalytics.logInteraction(
      message.from!.id,
      message.text,
      result.response,
      result.confidence,
      Date.now() - startTime,
      true
    );
  } catch (error) {
    // Log failed interaction
    aiAnalytics.logInteraction(
      message.from!.id,
      message.text || '',
      'Error occurred',
      0,
      Date.now() - startTime,
      false
    );
    
    console.error('AI processing failed:', error);
    await client.sendMessage({
      chat_id: message.chat.id,
      text: 'Sorry, I had trouble processing your message.',
      reply_to_message_id: message.message_id
    });
  }
}
```

## Summary

When integrating AI agents with your Telegram bot:

1. Always implement proper error handling with fallback mechanisms
2. Use rate limiting to prevent overwhelming AI services
3. Implement caching for frequently asked questions
4. Maintain conversation context for better interactions
5. Add content moderation if needed
6. Monitor AI interactions to improve your bot
7. Consider multi-modal processing for richer interactions
8. Set appropriate timeouts for AI service calls

## Next Steps

Now that you understand how to integrate AI agents with your Telegram bot, consider:

- Exploring specific AI services like OpenAI API, Hugging Face, or Claude
- Implementing more sophisticated memory and context management
- Adding multimedia processing capabilities
- Creating specialized AI agents for different tasks
- Implementing advanced analytics and user behavior tracking