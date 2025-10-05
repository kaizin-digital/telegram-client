# Inline Keyboards

Learn how to create interactive keyboards that appear directly in the chat, allowing users to interact with your bot without typing commands.

## Overview

Inline keyboards are special reply markups that appear directly in the chat alongside your message. They contain buttons that trigger specific actions when pressed by the user, such as sending a specific text message or initiating a callback query.

## Types of Inline Keyboard Buttons

There are several types of buttons you can include in inline keyboards:

1. **Callback buttons** - Send a callback query to your bot
2. **URL buttons** - Open a URL in the user's browser
3. **Web App buttons** - Open a Web App
4. **Login buttons** - Allow users to log in to a website
5. **Inline query buttons** - Initiate inline queries

## Creating Inline Keyboards

### Basic Callback Buttons

The most common type of inline keyboard button is the callback button, which sends a callback query to your bot:

```typescript
import { TelegramClient, InlineKeyboardButton, InlineKeyboardMarkup } from '@bot-machine/telegram-client';

const client = new TelegramClient('YOUR_BOT_TOKEN');

// Define the inline keyboard
const inlineKeyboard: InlineKeyboardButton[][] = [
  [
    { text: 'Option 1', callback_data: 'option1' },
    { text: 'Option 2', callback_data: 'option2' }
  ],
  [
    { text: 'More Info', callback_data: 'info' }
  ]
];

// Create the reply markup
const replyMarkup: InlineKeyboardMarkup = {
  inline_keyboard: inlineKeyboard
};

// Send a message with the inline keyboard
await client.sendMessage({
  chat_id: 123456789,
  text: 'Please select an option:',
  reply_markup: replyMarkup
});
```

### URL Buttons

URL buttons open a specified URL when pressed:

```typescript
const inlineKeyboard: InlineKeyboardButton[][] = [
  [
    { text: 'Visit Our Website', url: 'https://example.com' },
    { text: 'Check GitHub', url: 'https://github.com' }
  ]
];

await client.sendMessage({
  chat_id: 123456789,
  text: 'Useful links:',
  reply_markup: {
    inline_keyboard: inlineKeyboard
  }
});
```

### Mixed Buttons

You can mix different types of buttons in the same keyboard:

```typescript
const inlineKeyboard: InlineKeyboardButton[][] = [
  [
    { text: 'Yes', callback_data: 'yes' },
    { text: 'No', callback_data: 'no' }
  ],
  [
    { text: 'Website', url: 'https://example.com' },
    { text: 'Contact', url: 'mailto:contact@example.com' }
  ]
];

await client.sendMessage({
  chat_id: 123456789,
  text: 'Do you want to visit our website?',
  reply_markup: {
    inline_keyboard: inlineKeyboard
  }
});
```

## Handling Callback Queries

When a user presses a callback button, Telegram sends a callback query to your bot. You need to handle these queries:

```typescript
import { TelegramClient, Update, CallbackQuery } from '@bot-machine/telegram-client';

const client = new TelegramClient('YOUR_BOT_TOKEN');

async function handleUpdate(update: Update) {
  // Handle callback queries
  if (update.callback_query) {
    await handleCallbackQuery(update.callback_query);
  }
}

async function handleCallbackQuery(callbackQuery: CallbackQuery) {
  const userId = callbackQuery.from.id;
  const data = callbackQuery.data;
  const chatId = callbackQuery.message?.chat.id;
  
  console.log(`Callback query received from user ${userId}: ${data}`);
  
  // Answer the callback query to remove the loading indicator
  await client.answerCallbackQuery({
    callback_query_id: callbackQuery.id,
    text: `You selected: ${data}`,  // Optional: show a notification to the user
    show_alert: false  // If true, shows as an alert instead of a notification
  });
  
  // Optionally send a new message in response
  if (chatId) {
    await client.sendMessage({
      chat_id: chatId,
      text: `Your selection: ${data}`,
      reply_to_message_id: callbackQuery.message?.message_id
    });
  }
}
```

### Advanced Callback Handling

Here's a more sophisticated callback handler:

```typescript
async function handleCallbackQuery(callbackQuery: CallbackQuery) {
  const data = callbackQuery.data || '';
  const chatId = callbackQuery.message?.chat.id;
  const messageId = callbackQuery.message?.message_id;
  
  // Use a switch statement or map to handle different callback data
  switch (data) {
    case 'option1':
      await client.answerCallbackQuery({
        callback_query_id: callbackQuery.id,
        text: 'You selected Option 1!'
      });
      
      if (chatId && messageId) {
        // Edit the original message to reflect the selection
        await client.editMessageText({
          chat_id: chatId,
          message_id: messageId,
          text: 'You selected Option 1! Thanks for your choice.',
          reply_markup: { inline_keyboard: [] } // Remove the inline keyboard
        });
      }
      break;
      
    case 'option2':
      await client.answerCallbackQuery({
        callback_query_id: callbackQuery.id,
        text: 'You selected Option 2!'
      });
      
      if (chatId) {
        // Send a new message instead of editing the old one
        await client.sendMessage({
          chat_id: chatId,
          text: 'You selected Option 2! Great choice.'
        });
      }
      break;
      
    case 'info':
      await client.answerCallbackQuery({
        callback_query_id: callbackQuery.id,
        text: 'Here is more information about our services.',
        show_alert: true  // Shows as an alert popup
      });
      break;
      
    default:
      await client.answerCallbackQuery({
        callback_query_id: callbackQuery.id,
        text: 'Unknown option'
      });
  }
}
```

## Practical Examples

### Survey/Feedback Form

```typescript
async function sendFeedbackForm(chatId: number) {
  const inlineKeyboard: InlineKeyboardButton[][] = [
    [
      { text: '⭐⭐⭐⭐⭐', callback_data: 'rating_5' },
      { text: '⭐⭐⭐⭐', callback_data: 'rating_4' },
      { text: '⭐⭐⭐', callback_data: 'rating_3' }
    ],
    [
      { text: '⭐⭐', callback_data: 'rating_2' },
      { text: '⭐', callback_data: 'rating_1' }
    ],
    [
      { text: 'Provide detailed feedback', callback_data: 'detailed_feedback' }
    ]
  ];
  
  const replyMarkup: InlineKeyboardMarkup = {
    inline_keyboard: inlineKeyboard
  };
  
  await client.sendMessage({
    chat_id: chatId,
    text: 'How would you rate our service?',
    reply_markup: replyMarkup
  });
}
```

### Product Selection

```typescript
interface Product {
  id: string;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: '1', name: 'T-Shirt', price: 19.99 },
  { id: '2', name: 'Hoodie', price: 39.99 },
  { id: '3', name: 'Jeans', price: 49.99 }
];

async function sendProductList(chatId: number, products: Product[]) {
  // Create a dynamic inline keyboard based on the products
  const inlineKeyboard: InlineKeyboardButton[][] = products.map(product => [
    {
      text: `${product.name} - $${product.price.toFixed(2)}`,
      callback_data: `buy_${product.id}`
    }
  ]);
  
  // Add a "View Cart" button at the bottom
  inlineKeyboard.push([
    { text: '🛒 View Cart', callback_data: 'view_cart' }
  ]);
  
  await client.sendMessage({
    chat_id: chatId,
    text: 'Available products:',
    reply_markup: {
      inline_keyboard: inlineKeyboard
    }
  });
}
```

### Pagination

```typescript
// Function to create a paginated inline keyboard
function createPaginationKeyboard(currentPage: number, totalPages: number): InlineKeyboardButton[][] {
  const keyboard: InlineKeyboardButton[][] = [[]];
  
  // Previous button (if not on the first page)
  if (currentPage > 1) {
    keyboard[0].push({
      text: '⬅️ Previous',
      callback_data: `page_${currentPage - 1}`
    });
  }
  
  // Current page indicator
  keyboard[0].push({
    text: `${currentPage} / ${totalPages}`,
    callback_data: 'current_page'  // This button doesn't do anything, just shows the page
  });
  
  // Next button (if not on the last page)
  if (currentPage < totalPages) {
    keyboard[0].push({
      text: 'Next ➡️',
      callback_data: `page_${currentPage + 1}`
    });
  }
  
  return keyboard;
}

async function sendPagedContent(chatId: number, page: number) {
  // Simulate getting content for the current page
  const content = `Content for page ${page}\n\nLorem ipsum dolor sit amet...`;
  
  // For this example, assume 5 total pages
  const totalPages = 5;
  
  const replyMarkup: InlineKeyboardMarkup = {
    inline_keyboard: createPaginationKeyboard(page, totalPages)
  };
  
  await client.sendMessage({
    chat_id: chatId,
    text: content,
    reply_markup: replyMarkup
  });
}
```

## Editing Messages with Inline Keyboards

You can update messages to change the inline keyboard without sending a new message:

```typescript
// Function to update a message with a new inline keyboard
async function updateMessageKeyboard(chatId: number, messageId: number, newText: string, newKeyboard: InlineKeyboardButton[][]) {
  await client.editMessageText({
    chat_id: chatId,
    message_id: messageId,
    text: newText,
    reply_markup: {
      inline_keyboard: newKeyboard
    }
  });
}

// Example: Update a keyboard based on user selection
async function handleCallbackQuery(callbackQuery: CallbackQuery) {
  const data = callbackQuery.data || '';
  const chatId = callbackQuery.message?.chat.id;
  const messageId = callbackQuery.message?.message_id;
  
  if (!chatId || !messageId) {
    await client.answerCallbackQuery({
      callback_query_id: callbackQuery.id,
      text: 'Error: Chat or message not found'
    });
    return;
  }
  
  let newText = '';
  let newKeyboard: InlineKeyboardButton[][] = [];
  
  switch (data) {
    case 'start':
      newText = 'Welcome! Choose an option:';
      newKeyboard = [
        [
          { text: 'Settings', callback_data: 'settings' },
          { text: 'Help', callback_data: 'help' }
        ]
      ];
      break;
      
    case 'settings':
      newText = 'Settings menu. What would you like to adjust?';
      newKeyboard = [
        [
          { text: 'Language', callback_data: 'lang' },
          { text: 'Notifications', callback_data: 'notify' }
        ],
        [
          { text: 'Back', callback_data: 'start' }
        ]
      ];
      break;
      
    case 'help':
      newText = 'Need help? Here are some options:';
      newKeyboard = [
        [
          { text: 'FAQ', callback_data: 'faq' },
          { text: 'Contact Support', callback_data: 'support' }
        ],
        [
          { text: 'Back', callback_data: 'start' }
        ]
      ];
      break;
      
    default:
      newText = 'Unknown option. Choose again:';
      newKeyboard = [
        [
          { text: 'Settings', callback_data: 'settings' },
          { text: 'Help', callback_data: 'help' }
        ]
      ];
  }
  
  try {
    await updateMessageKeyboard(chatId, messageId, newText, newKeyboard);
    await client.answerCallbackQuery({
      callback_query_id: callbackQuery.id,
      text: 'Selection updated!'
    });
  } catch (error) {
    console.error('Error updating message:', error);
    await client.answerCallbackQuery({
      callback_query_id: callbackQuery.id,
      text: 'Sorry, there was an error updating the menu.'
    });
  }
}
```

## Best Practices

### 1. Keep Callback Data Short

Telegram limits callback data to 64 bytes, so keep your callback_data concise:

```typescript
// Good - short and descriptive
{ text: 'Yes', callback_data: 'y' }
{ text: 'No', callback_data: 'n' }

// Also good - more descriptive but still concise
{ text: 'Confirm Order', callback_data: 'confirm_123' }
{ text: 'Cancel Order', callback_data: 'cancel_123' }
```

### 2. Use Consistent Naming

Use a consistent naming convention for your callback data:

```typescript
// Examples of good naming conventions:
'btn_like_123'      // for like button with item ID
'action_edit_456'   // for edit action with item ID
'cmd_start'         // for command buttons
'nav_prev_2'        // for navigation with page number
```

### 3. Handle Errors Gracefully

Always handle errors when working with inline keyboards:

```typescript
async function safeSendMessageWithKeyboard(chatId: number, text: string, keyboard: InlineKeyboardButton[][]) {
  try {
    await client.sendMessage({
      chat_id: chatId,
      text: text,
      reply_markup: {
        inline_keyboard: keyboard
      }
    });
  } catch (error) {
    console.error('Error sending message with keyboard:', error);
    
    // Fallback to sending without keyboard
    await client.sendMessage({
      chat_id: chatId,
      text: text + '\n\n[Note: Interactive buttons could not be displayed]'
    });
  }
}
```

### 4. Update Your Message Text

When a user interacts with an inline keyboard button, consider updating the message text to reflect the action:

```typescript
async function handleLikeCallback(callbackQuery: CallbackQuery) {
  const chatId = callbackQuery.message?.chat.id;
  const messageId = callbackQuery.message?.message_id;
  
  if (chatId && messageId) {
    // Update the message to show it was liked
    await client.editMessageText({
      chat_id: chatId,
      message_id: messageId,
      text: callbackQuery.message!.text + '\n\n👍 Liked by user!',
      // Optionally remove the like button
      reply_markup: {
        inline_keyboard: [
          // Different buttons or no buttons at all
          [{ text: 'Liked ✓', callback_data: 'liked' }]
        ]
      }
    });
  }
  
  await client.answerCallbackQuery({
    callback_query_id: callbackQuery.id,
    text: 'Thanks for liking!'
  });
}
```

## Complete Example: Interactive Bot with Inline Keyboard

Here's a complete example of a bot that uses inline keyboards for interaction:

```typescript
import { TelegramClient, Update, Message, CallbackQuery } from '@bot-machine/telegram-client';

class InteractiveBot {
  private client: TelegramClient;
  
  constructor(token: string) {
    this.client = new TelegramClient(token);
  }
  
  async handleUpdate(update: Update) {
    if (update.message) {
      await this.handleMessage(update.message);
    } else if (update.callback_query) {
      await this.handleCallbackQuery(update.callback_query);
    }
  }
  
  async handleMessage(message: Message) {
    const chatId = message.chat.id;
    const text = message.text;
    
    if (text === '/start') {
      await this.sendMainMenu(chatId);
    } else if (text === '/menu') {
      await this.sendMainMenu(chatId);
    } else {
      await this.client.sendMessage({
        chat_id: chatId,
        text: 'Use /start or /menu to see the interactive menu',
        reply_to_message_id: message.message_id
      });
    }
  }
  
  async sendMainMenu(chatId: number) {
    const menuKeyboard = [
      [
        { text: '📊 Analytics', callback_data: 'analytics' },
        { text: '⚙️ Settings', callback_data: 'settings' }
      ],
      [
        { text: '❓ Help', callback_data: 'help' },
        { text: 'ℹ️ About', callback_data: 'about' }
      ]
    ];
    
    await this.client.sendMessage({
      chat_id: chatId,
      text: 'Welcome to the Interactive Bot! Choose an option:',
      reply_markup: {
        inline_keyboard: menuKeyboard
      }
    });
  }
  
  async handleCallbackQuery(callbackQuery: CallbackQuery) {
    const data = callbackQuery.data || '';
    const chatId = callbackQuery.message?.chat.id;
    
    if (!chatId) {
      await this.client.answerCallbackQuery({
        callback_query_id: callbackQuery.id,
        text: 'Error processing your request'
      });
      return;
    }
    
    let responseText = '';
    let newKeyboard = null;
    
    switch (data) {
      case 'analytics':
        responseText = '📊 Analytics Dashboard\n\nViews: 1,234\nClicks: 567\nConversions: 12\n\nSelect an option:';
        newKeyboard = [
          [
            { text: 'Weekly', callback_data: 'analytics_weekly' },
            { text: 'Monthly', callback_data: 'analytics_monthly' }
          ],
          [
            { text: 'Back to Menu', callback_data: 'main_menu' }
          ]
        ];
        break;
        
      case 'settings':
        responseText = '⚙️ Settings\n\nConfigure your preferences:';
        newKeyboard = [
          [
            { text: 'Language', callback_data: 'lang_settings' },
            { text: 'Notifications', callback_data: 'notify_settings' }
          ],
          [
            { text: 'Privacy', callback_data: 'privacy_settings' },
            { text: 'Back to Menu', callback_data: 'main_menu' }
          ]
        ];
        break;
        
      case 'help':
        responseText = '❓ Help Center\n\nNeed assistance? Here are some options:';
        newKeyboard = [
          [
            { text: 'FAQ', callback_data: 'faq' },
            { text: 'Contact Support', callback_data: 'support' }
          ],
          [
            { text: 'Back to Menu', callback_data: 'main_menu' }
          ]
        ];
        break;
        
      case 'about':
        responseText = 'ℹ️ About This Bot\n\nVersion: 1.0.0\nCreated with @bot-machine/telegram-client\n\nThis is a sample interactive bot.';
        newKeyboard = [
          [
            { text: 'Back to Menu', callback_data: 'main_menu' }
          ]
        ];
        break;
        
      default:
        if (data === 'main_menu') {
          await this.sendMainMenu(chatId);
          await this.client.answerCallbackQuery({
            callback_query_id: callbackQuery.id,
            text: 'Returning to main menu...'
          });
          return;
        }
        responseText = `Unknown option: ${data}`;
    }
    
    if (newKeyboard) {
      // Edit the message to show the submenu
      await this.client.editMessageText({
        chat_id: chatId,
        message_id: callbackQuery.message?.message_id,
        text: responseText,
        reply_markup: {
          inline_keyboard: newKeyboard
        }
      });
    } else {
      // Just send a response without changing the keyboard
      await this.client.sendMessage({
        chat_id: chatId,
        text: responseText
      });
    }
    
    await this.client.answerCallbackQuery({
      callback_query_id: callbackQuery.id,
      text: 'Option selected'
    });
  }
}

// Initialize and use the bot
const bot = new InteractiveBot('YOUR_BOT_TOKEN');

// In your update processing loop:
// setInterval(async () => {
//   const updates = await bot.client.getUpdates({ timeout: 30 });
//   for (const update of updates) {
//     await bot.handleUpdate(update);
//   }
// }, 1000);
```

## Next Steps

Now that you know how to create interactive inline keyboards, learn about:

- [Error handling best practices](../guides/error-handling.md) for robust bots
- [Working with AI agents](../guides/ai-agents.md) using this library