import { TelegramClient } from './telegram-client';
import { Update } from './telegram-types';

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.error('TELEGRAM_BOT_TOKEN environment variable not set.');
  process.exit(1);
}

const client = new TelegramClient(token);

console.log('Starting polling...');
console.log('Press Ctrl+C to stop.');

client.startPolling((update: Update) => {
  console.log('Received update:', JSON.stringify(update, null, 2));
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('Stopping polling...');
  client.stopPolling();
  process.exit(0);
});
