# Working with Payments

Learn how to implement payment functionality in your Telegram bot using the payment and invoice methods.

## Overview

The Telegram Bot API provides built-in payment functionality that allows users to make secure payments directly within Telegram. This guide covers how to implement the complete payment flow in your bot.

## Prerequisites

Before implementing payments, you need to:

1. Configure a payment provider
2. Get a provider token from your payment provider
3. Understand the required business information

Payment providers supported by Telegram include:
- Stripe
- PayPal
- Other providers supported by Telegram

To get started with payments, contact @BotFather and use the `/setpaymentprovider` command to set up your payment provider.

## Complete Payment Flow

The complete payment flow involves several steps:

1. **Sending an Invoice** - Present the user with payment details
2. **Handling Shipping Queries** - If physical goods are involved
3. **Handling Pre-Checkout Queries** - Final validation before payment
4. **Receiving Successful Payment** - Process the completed payment
5. **Sending Confirmation** - Confirm the purchase to the user

## Sending Invoices

Use the `sendInvoice` method to send payment requests to users:

```typescript
import { TelegramClient, LabeledPrice } from '@bot-machine/telegram-client';

const client = new TelegramClient('YOUR_BOT_TOKEN');

async function sendInvoice(chatId: number) {
  // Define the prices breakdown
  const prices: LabeledPrice[] = [
    {
      label: 'Product',
      amount: 999  // Amount in the smallest currency units (e.g., cents for USD)
    },
    {
      label: 'Tax',
      amount: 100  // 1.00 in smallest currency units
    }
  ];

  try {
    const message = await client.sendInvoice({
      chat_id: chatId,
      title: 'Premium Subscription',
      description: '1-year premium subscription to our service',
      payload: 'premium-subscription-payload',  // Custom data to track this payment
      provider_token: 'PROVIDER_TOKEN',  // Token from your payment provider
      currency: 'USD',  // ISO 4217 currency code
      prices: prices,
      start_parameter: 'subscribe',  // Start param for deep linking (optional)
      photo_url: 'https://example.com/subscription-image.jpg',  // Optional product image
      photo_width: 512,  // Optional photo width
      photo_height: 512,  // Optional photo height
      need_name: true,  // Ask for user's name
      need_phone_number: false,  // Don't ask for phone number
      need_email: true,  // Ask for email address
      need_shipping_address: false,  // Don't require shipping address
      is_flexible: false,  // Set to true if shipping options are needed
      reply_markup: {  // Optional inline keyboard
        inline_keyboard: [
          [
            { text: 'Get Premium', callback_data: 'get_premium' }
          ]
        ]
      }
    });

    console.log(`Invoice sent with message ID: ${message.message_id}`);
    return message;
  } catch (error) {
    console.error('Error sending invoice:', error);
    throw error;
  }
}
```

## Creating Invoice Links

For sharing payments easily, you can create static payment links:

```typescript
async function createInvoiceLink() {
  const prices: LabeledPrice[] = [
    {
      label: 'Product',
      amount: 2999  // 29.99 in smallest currency units
    }
  ];

  try {
    const invoiceLink = await client.createInvoiceLink({
      title: 'Product Purchase',
      description: 'High-quality product with premium features',
      payload: 'product-purchase-payload',
      provider_token: 'PROVIDER_TOKEN',
      currency: 'USD',
      prices: prices,
      max_tip_amount: 500,  // Maximum tip amount (5.00)
      suggested_tip_amounts: [100, 200, 500],  // Suggested tip amounts
      need_name: true,
      need_phone_number: false,
      need_email: true,
      need_shipping_address: false,
      is_flexible: false
    });

    console.log(`Invoice link created: ${invoiceLink}`);
    return invoiceLink;
  } catch (error) {
    console.error('Error creating invoice link:', error);
    throw error;
  }
}
```

## Handling Shipping Queries

If your product requires shipping, you'll need to handle shipping queries:

```typescript
import { ShippingQuery } from '@bot-machine/telegram-client';

async function handleShippingQuery(shippingQuery: ShippingQuery) {
  console.log(`Received shipping query from user: ${shippingQuery.from.id}`);
  console.log(`Shipping address:`, shippingQuery.shipping_address);

  // Validate the shipping address and return available shipping options
  try {
    // In this example, we'll offer 2 shipping options based on the country
    let shippingOptions: any[] = [];
    
    if (shippingQuery.shipping_address.country_code === 'US') {
      // Domestic shipping options for US
      shippingOptions = [
        {
          id: 'standard_us',
          title: 'Standard Shipping (5-7 business days)',
          prices: [
            { label: 'Shipping', amount: 500 }  // 5.00 USD
          ]
        },
        {
          id: 'express_us',
          title: 'Express Shipping (2-3 business days)',
          prices: [
            { label: 'Shipping', amount: 1500 }  // 15.00 USD
          ]
        }
      ];
    } else {
      // International shipping options
      shippingOptions = [
        {
          id: 'standard_intl',
          title: 'International Standard (10-14 business days)',
          prices: [
            { label: 'Shipping', amount: 1200 }  // 12.00 USD
          ]
        },
        {
          id: 'express_intl',
          title: 'International Express (5-7 business days)',
          prices: [
            { label: 'Shipping', amount: 2500 }  // 25.00 USD
          ]
        }
      ];
    }

    // Approve the shipping query with the available options
    await client.answerShippingQuery({
      shipping_query_id: shippingQuery.id,
      ok: true,
      shipping_options: shippingOptions
    });
  } catch (error) {
    console.error('Error handling shipping query:', error);
    
    // Reject the shipping query if there was an error
    await client.answerShippingQuery({
      shipping_query_id: shippingQuery.id,
      ok: false,
      error_message: 'Sorry, we cannot ship to your location at this time.'
    });
  }
}
```

## Handling Pre-Checkout Queries

Before the user completes the payment, handle pre-checkout queries for final validation:

```typescript
import { PreCheckoutQuery } from '@bot-machine/telegram-client';

async function handlePreCheckoutQuery(preCheckoutQuery: PreCheckoutQuery) {
  console.log(`Received pre-checkout query from user: ${preCheckoutQuery.from.id}`);
  console.log(`Product: ${preCheckoutQuery.invoice_payload}`);
  console.log(`Currency: ${preCheckoutQuery.currency}`);
  console.log(`Amount: ${preCheckoutQuery.total_amount}`);

  try {
    // Perform any necessary validation here
    // For example: check if the item is still available
    // or if the user is eligible for this purchase
    
    // In this example, we'll approve all valid pre-checkout queries
    await client.answerPreCheckoutQuery({
      pre_checkout_query_id: preCheckoutQuery.id,
      ok: true
    });
    
    console.log('Pre-checkout query approved');
  } catch (error) {
    console.error('Error handling pre-checkout query:', error);
    
    // Reject the pre-checkout query with an error message
    await client.answerPreCheckoutQuery({
      pre_checkout_query_id: preCheckoutQuery.id,
      ok: false,
      error_message: 'Sorry, this purchase cannot be processed at this time. Please contact support.'
    });
  }
}
```

## Processing Successful Payments

When a payment is completed, Telegram sends a message with payment details:

```typescript
import { Message } from '@bot-machine/telegram-client';

async function handleSuccessfulPayment(message: Message, client: TelegramClient) {
  if (!message.successful_payment) {
    return; // This message doesn't contain payment info
  }

  const payment = message.successful_payment;
  console.log(`Received successful payment from user: ${message.from?.id}`);
  console.log(`Payment details:`, {
    currency: payment.currency,
    total_amount: payment.total_amount,
    invoice_payload: payment.invoice_payload,
    shipping_option_id: payment.shipping_option_id,
    order_info: payment.order_info,
    telegram_payment_charge_id: payment.telegram_payment_charge_id,
    provider_payment_charge_id: payment.provider_payment_charge_id
  });

  // Process the order in your system
  try {
    // Fulfill the order - e.g., send access to premium content, process physical shipment, etc.
    await fulfillOrder(payment.invoice_payload, message.from?.id, payment.order_info);
    
    // Send confirmation to the user
    await client.sendMessage({
      chat_id: message.chat.id,
      text: `Thank you for your purchase! Your order has been confirmed.\n\n` +
            `Order ID: ${payment.invoice_payload}\n` +
            `Amount: ${(payment.total_amount / 100).toFixed(2)} ${payment.currency}\n` +
            `Payment ID: ${payment.telegram_payment_charge_id}`
    });
  } catch (error) {
    console.error('Error processing successful payment:', error);
    
    // Notify the user if there was an issue processing their order
    await client.sendMessage({
      chat_id: message.chat.id,
      text: 'Thank you for your payment. We are processing your order and will update you shortly.'
    });
  }
}

async function fulfillOrder(invoicePayload: string, userId: number, orderInfo: any) {
  // Implement your order fulfillment logic here
  // Examples:
  // - Grant access to premium features
  // - Send digital products
  // - Process physical shipment
  // - Update user records
  console.log(`Fulfilling order: ${invoicePayload} for user: ${userId}`);
}
```

## Complete Payment Implementation Example

Here's a complete example integrating all payment functionality:

```typescript
import { TelegramClient, Update, Message, ShippingQuery, PreCheckoutQuery } from '@bot-machine/telegram-client';

class PaymentBot {
  private client: TelegramClient;

  constructor(token: string) {
    this.client = new TelegramClient(token);
  }

  async processUpdate(update: Update) {
    if (update.message) {
      await this.handleMessage(update.message);
    } else if (update.shipping_query) {
      await this.handleShippingQuery(update.shipping_query);
    } else if (update.pre_checkout_query) {
      await this.handlePreCheckoutQuery(update.pre_checkout_query);
    }
  }

  async handleMessage(message: Message) {
    if (message.text === '/buy') {
      await this.sendInvoice(message.chat.id);
    } else if (message.successful_payment) {
      await this.handleSuccessfulPayment(message);
    } else {
      // Handle other messages
      await this.client.sendMessage({
        chat_id: message.chat.id,
        text: 'Send /buy to purchase our premium subscription!',
        reply_to_message_id: message.message_id
      });
    }
  }

  async sendInvoice(chatId: number) {
    try {
      await this.client.sendInvoice({
        chat_id: chatId,
        title: 'Premium Subscription',
        description: 'One year of premium access to all features',
        payload: `premium_sub_${Date.now()}`,
        provider_token: process.env.PROVIDER_TOKEN!, // Store your provider token in environment variables
        currency: 'USD',
        prices: [
          { label: 'Premium Subscription (1 year)', amount: 999 }, // $9.99
          { label: 'Tax', amount: 100 } // $1.00
        ],
        photo_url: 'https://example.com/premium-subscription.jpg',
        need_email: true,
        is_flexible: true, // Will require shipping options (even though it's digital)
        disable_notification: false,
        reply_markup: {
          inline_keyboard: [
            [
              { text: 'Subscribe Now', callback_data: 'subscribe' }
            ]
          ]
        }
      });
    } catch (error) {
      console.error('Error sending invoice:', error);
      await this.client.sendMessage({
        chat_id: chatId,
        text: 'Sorry, we could not process your purchase request. Please try again later.'
      });
    }
  }

  async handleShippingQuery(shippingQuery: ShippingQuery) {
    // For digital products, you might not need shipping options
    // But if you do require them for address information, provide empty options:
    await this.client.answerShippingQuery({
      shipping_query_id: shippingQuery.id,
      ok: true,
      shipping_options: [] // No shipping needed for digital products
    });
  }

  async handlePreCheckoutQuery(preCheckoutQuery: PreCheckoutQuery) {
    console.log(`Processing pre-checkout for user: ${preCheckoutQuery.from.id}`);
    
    // Validate the order - in real implementation you might check:
    // - Item availability
    // - User eligibility
    // - Payment limits
    if (this.validateOrder(preCheckoutQuery)) {
      await this.client.answerPreCheckoutQuery({
        pre_checkout_query_id: preCheckoutQuery.id,
        ok: true
      });
    } else {
      await this.client.answerPreCheckoutQuery({
        pre_checkout_query_id: preCheckoutQuery.id,
        ok: false,
        error_message: 'The requested item is not available at this time.'
      });
    }
  }

  validateOrder(query: PreCheckoutQuery): boolean {
    // Implement your order validation logic
    return query.total_amount > 0;
  }

  async handleSuccessfulPayment(message: Message) {
    console.log(`Received successful payment from ${message.from?.first_name}`);
    
    // Process the successful payment in your system
    await this.processPayment(message.successful_payment!);
    
    // Send confirmation
    await this.client.sendMessage({
      chat_id: message.chat.id,
      text: `Thank you for your purchase! Your premium subscription is now active.`
    });
  }

  async processPayment(payment: any) {
    // Implement your payment processing logic
    // - Update user subscription status
    // - Grant access to premium features
    // - Log the payment for accounting
    console.log(`Processing payment: ${payment.telegram_payment_charge_id}`);
  }
}

// Usage
const paymentBot = new PaymentBot(process.env.TELEGRAM_BOT_TOKEN!);
```

## Security Considerations

When implementing payments, keep these security practices in mind:

1. **Validate everything**: Always validate prices, payment amounts, and user data
2. **Store provider tokens securely**: Never hardcode provider tokens in your source code
3. **Check payment status**: Verify payment status through your provider's API if needed
4. **Protect sensitive data**: Don't log sensitive payment information
5. **Handle errors gracefully**: Implement proper error handling to prevent failed payments from causing issues
6. **Use environment variables**: Store tokens and sensitive information in environment variables

## Error Handling

When working with payments, you should handle these common errors:

- Payment provider token is invalid
- Insufficient funds in user's account
- Payment method declined
- Network issues during payment processing

## Testing Payments

To test payments in development:
1. Use Telegram's test environment with test credit card numbers
2. Use your payment provider's test/sandbox mode
3. Test the complete flow including shipping queries and pre-checkout validation
4. Test error scenarios to ensure proper handling

## Next Steps

Now that you understand payment processing, learn about:

- [Error handling best practices](./error-handling.md) for production bots
- [Webhooks vs Long Polling](./webhooks-vs-long-polling.md) to understand both approaches
- [Working with AI Agents](./ai-agents.md) for intelligent payment flows