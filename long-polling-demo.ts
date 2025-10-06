import { TelegramClient } from './telegram-client';
import type { Update } from './telegram-types';

/**
 * Long Polling Demo for Telegram Bot
 * This script demonstrates how to use long polling to receive updates from Telegram
 */
class LongPollingDemo {
  private client: TelegramClient;
  private pollingTimeout: number;
  private maxRetries: number;
  private currentOffset: number = 0;
  private pollInterval: number = 1000; // 1 second between requests if no updates

  constructor(botToken: string, pollingTimeout: number = 30, maxRetries: number = 3) {
    this.client = new TelegramClient(botToken);
    this.pollingTimeout = pollingTimeout;
    this.maxRetries = maxRetries;
  }

  /**
   * Process an individual update
   */
  private async processUpdate(update: Update): Promise<void> {
    console.log(`\n--- Received Update ID: ${update.update_id} ---`);
    
    if (update.message) {
      console.log(`Message from ${update.message.from?.first_name} (${update.message.from?.id}):`);
      console.log(`Text: ${update.message.text || '[no text]'}`);
      console.log(`Chat ID: ${update.message.chat.id}`);
    } else if (update.callback_query) {
      console.log(`Callback query from ${update.callback_query.from.first_name}:`);
      console.log(`Data: ${update.callback_query.data || '[no data]'}`);
      console.log(`Message ID: ${update.callback_query.message?.message_id || '[no message]'}`);
    } else if (update.inline_query) {
      console.log(`Inline query from ${update.inline_query.from.first_name}:`);
      console.log(`Query: ${update.inline_query.query}`);
    } else {
      console.log('Received update with no recognizable message type:', Object.keys(update));
    }
    
    // Update the offset to ensure we don't process the same update again
    this.currentOffset = update.update_id + 1;
  }

  /**
   * Handle errors during long polling
   */
  private async handlePollingError(error: any, attempt: number): Promise<boolean> {
    console.error(`\n[Attempt ${attempt}/${this.maxRetries}] Error during polling:`, error.message || error);
    
    if (attempt >= this.maxRetries) {
      console.error('Max retries reached. Stopping polling.');
      return false; // Stop polling
    }
    
    // Wait before retrying (with exponential backoff)
    const waitTime = Math.pow(2, attempt) * 1000; // 2^attempt * 1000ms
    console.log(`Waiting ${waitTime / 1000}s before retrying...`);
    await this.sleep(waitTime);
    
    return true; // Continue polling
  }

  /**
   * Sleep for the specified number of milliseconds
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Start the long polling process
   */
  public async startPolling(allowedUpdates?: string[]): Promise<void> {
    console.log('🚀 Starting long polling demo...');
    console.log(`   Timeout: ${this.pollingTimeout}s`);
    console.log(`   Max retries: ${this.maxRetries}`);
    console.log(`   Allowed updates: ${allowedUpdates ? allowedUpdates.join(', ') : 'all (except chat_member)'}`);
    console.log('   Press Ctrl+C to stop\n');

    let failedAttempts = 0;

    try {
      while (true) {
        try {
          // Fetch updates with long polling
          const updates = await this.client.getUpdates({
            offset: this.currentOffset,
            timeout: this.pollingTimeout,
            allowed_updates: allowedUpdates,
          });

          if (updates.length > 0) {
            console.log(`\n📥 Received ${updates.length} update(s)`);
            
            // Process each update
            for (const update of updates) {
              await this.processUpdate(update);
            }
            
            failedAttempts = 0; // Reset failure counter on success
          } else {
            // When no updates are returned, we still want to continue
            console.log(`\n⏳ No new updates (offset: ${this.currentOffset})`);
          }
        } catch (error) {
          const shouldContinue = await this.handlePollingError(error, ++failedAttempts);
          if (!shouldContinue) {
            break;
          }
        }
        
        // Small delay between requests to prevent excessive requests in case of issues
        await this.sleep(this.pollInterval);
      }
    } catch (error) {
      console.error('Fatal error in polling loop:', error);
    } finally {
      console.log('\n🛑 Long polling stopped');
    }
  }
}

// Example usage
async function main(): Promise<void> {
  // Get bot token from environment variable or command line argument
  const token = process.env.TELEGRAM_BOT_TOKEN || process.argv[2];
  
  if (!token) {
    console.error('❌ Error: Bot token is required');
    console.log('Usage:');
    console.log('  bun run long-polling-demo.ts [BOT_TOKEN]');
    console.log('  or set the TELEGRAM_BOT_TOKEN environment variable');
    console.log('\nFor testing without a real token, you can use a dummy token to see the error handling:');
    console.log('  bun run long-polling-demo.ts dummy_token');
    process.exit(1);
  }

  // Initialize the demo with appropriate timeout and allowed update types
  const demo = new LongPollingDemo(token, 30, 3);
  
  // Example of limiting update types to only messages and callback queries
  const allowedUpdates = ['message', 'callback_query', 'inline_query'];
  
  // Start polling
  await demo.startPolling(allowedUpdates);
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n🛑 Received SIGINT. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n\n🛑 Received SIGTERM. Shutting down gracefully...');
  process.exit(0);
});

if (require.main === module) {
  main().catch(error => {
    console.error('Unhandled error in main:', error);
    process.exit(1);
  });
}