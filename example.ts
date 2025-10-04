// example.ts - Example usage of the Telegram Client library

import { TelegramClient } from './index';

async function runExample() {
  // Initialize the client with your bot token (use environment variable in production)
  const botToken = process.env.TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE';
  const client = new TelegramClient(botToken);

  try {
    // Get bot information
    const me = await client.getMe();
    console.log(`Hello, I'm ${me.first_name}!`);

    // Example of sending a message (uncomment and set a valid chat_id to test)
    /*
    const message = await client.sendMessage({
      chat_id: 123456789, // Replace with a valid chat ID
      text: 'Hello from the example script!',
    });
    console.log('Message sent:', message.text);
    */

    // Example of getting webhook info
    const webhookInfo = await client.getWebhookInfo();
    console.log('Current webhook info:', webhookInfo);

  } catch (error) {
    console.error('Error in example:', error);
  }
}

// Run the example
runExample();