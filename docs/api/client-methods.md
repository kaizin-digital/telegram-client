# Client Methods

This section documents all the methods available on the `TelegramClient` class.

## Constructor

```typescript
const client = new TelegramClient(token: string);
```

- `token` - Your Telegram Bot API token

## getMe()

A simple method for testing your bot's authentication token. Returns basic information about the bot.

```typescript
const me = await client.getMe();
```

**Response Type:** `User`

## sendMessage(params: SendMessageParams)

Send text messages.

```typescript
const message = await client.sendMessage({
  chat_id: 123456789,
  text: 'Hello world!'
});
```

**Parameters:**
- `chat_id` - Unique identifier for the target chat or username of the target channel
- `text` - Text of the message to be sent
- Additional optional parameters like `parse_mode`, `entities`, `disable_web_page_preview`, `disable_notification`, etc.

**Response Type:** `Message`

## getUpdates(params?: GetUpdatesParams)

Receive incoming updates using long polling.

```typescript
const updates = await client.getUpdates({
  offset: 123456789,
  timeout: 30
});
```

**Parameters:**
- `offset` - Identifier of the first update to be returned
- `limit` - Limits the number of updates to be retrieved
- `timeout` - Timeout in seconds for long polling
- `allowed_updates` - List of update types to receive

**Response Type:** `Update[]`

## forwardMessage(params: ForwardMessageParams)

Forward messages of any kind.

```typescript
const message = await client.forwardMessage({
  chat_id: 123456789,
  from_chat_id: 987654321,
  message_id: 123
});
```

**Response Type:** `Message`

## copyMessage(params: CopyMessageParams)

Use this method to copy messages of any kind.

```typescript
const result = await client.copyMessage({
  chat_id: 123456789,
  from_chat_id: 987654321,
  message_id: 123
});
```

**Response Type:** `{ message_id: number }`

## sendPhoto(params: SendPhotoParams)

Send photos.

```typescript
const message = await client.sendPhoto({
  chat_id: 123456789,
  photo: 'PHOTO_FILE_ID',
  caption: 'A beautiful photo'
});
```

**Response Type:** `Message`

## sendAudio(params: SendAudioParams)

Send audio files.

```typescript
const message = await client.sendAudio({
  chat_id: 123456789,
  audio: 'AUDIO_FILE_ID',
  caption: 'An audio file'
});
```

**Response Type:** `Message`

## sendDocument(params: SendDocumentParams)

Send general files.

```typescript
const message = await client.sendDocument({
  chat_id: 123456789,
  document: 'DOCUMENT_FILE_ID',
  caption: 'A document'
});
```

**Response Type:** `Message`

## sendVideo(params: SendVideoParams)

Send video files.

```typescript
const message = await client.sendVideo({
  chat_id: 123456789,
  video: 'VIDEO_FILE_ID',
  caption: 'A video'
});
```

**Response Type:** `Message`

## sendAnimation(params: SendAnimationParams)

Send animation files (GIF or H.264/MPEG-4 AVC video without sound).

```typescript
const message = await client.sendAnimation({
  chat_id: 123456789,
  animation: 'ANIMATION_FILE_ID',
  caption: 'An animation'
});
```

**Response Type:** `Message`

## sendVoice(params: SendVoiceParams)

Send audio files as voice messages.

```typescript
const message = await client.sendVoice({
  chat_id: 123456789,
  voice: 'VOICE_FILE_ID',
  caption: 'A voice message'
});
```

**Response Type:** `Message`

## sendVideoNote(params: SendVideoNoteParams)

Send video note messages.

```typescript
const message = await client.sendVideoNote({
  chat_id: 123456789,
  video_note: 'VIDEONOTE_FILE_ID'
});
```

**Response Type:** `Message`

## sendMediaGroup(params: SendMediaGroupParams)

Send a group of photos, videos, documents or audios as an album.

```typescript
const messages = await client.sendMediaGroup({
  chat_id: 123456789,
  media: [
    { type: 'photo', media: 'PHOTO1_FILE_ID' },
    { type: 'photo', media: 'PHOTO2_FILE_ID' }
  ]
});
```

**Response Type:** `Message[]`

## sendLocation(params: SendLocationParams)

Send point on the map.

```typescript
const message = await client.sendLocation({
  chat_id: 123456789,
  latitude: 37.7749,
  longitude: -122.4194
});
```

**Response Type:** `Message`

## editMessageLiveLocation(params: EditMessageLiveLocationParams)

Edit live location messages.

```typescript
const message = await client.editMessageLiveLocation({
  chat_id: 123456789,
  message_id: 123,
  latitude: 37.7849,
  longitude: -122.4094
});
```

**Response Type:** `Message | boolean`

## stopMessageLiveLocation(params: StopMessageLiveLocationParams)

Stop updating a live location message.

```typescript
const message = await client.stopMessageLiveLocation({
  chat_id: 123456789,
  message_id: 123
});
```

**Response Type:** `Message | boolean`

## sendVenue(params: SendVenueParams)

Send information about a venue.

```typescript
const message = await client.sendVenue({
  chat_id: 123456789,
  latitude: 37.7749,
  longitude: -122.4194,
  title: 'Golden Gate Bridge',
  address: 'San Francisco, CA'
});
```

**Response Type:** `Message`

## sendContact(params: SendContactParams)

Send phone contacts.

```typescript
const message = await client.sendContact({
  chat_id: 123456789,
  phone_number: '+1234567890',
  first_name: 'John',
  last_name: 'Doe'
});
```

**Response Type:** `Message`

## sendPoll(params: SendPollParams)

Send a native poll.

```typescript
const message = await client.sendPoll({
  chat_id: 123456789,
  question: 'What is your favorite programming language?',
  options: ['JavaScript', 'TypeScript', 'Python', 'Rust']
});
```

**Response Type:** `Message`

## sendDice(params: SendDiceParams)

Send an animated emoji that will display a random value.

```typescript
const message = await client.sendDice({
  chat_id: 123456789
});
```

**Response Type:** `Message`

## sendChatAction(params: SendChatActionParams)

Tell the user that something is happening on the bot's side.

```typescript
await client.sendChatAction({
  chat_id: 123456789,
  action: 'typing'
});
```

**Response Type:** `boolean`

## getUserProfilePhotos(params: GetUserProfilePhotosParams)

Get a list of profile pictures for a user.

```typescript
const photos = await client.getUserProfilePhotos({
  user_id: 123456789,
  limit: 5
});
```

**Response Type:** `UserProfilePhotos`

## getFile(params: GetFileParams)

Get basic info about a file and prepare it for downloading.

```typescript
const file = await client.getFile({
  file_id: 'FILE_ID'
});
```

**Response Type:** `File`

## banChatMember(params: BanChatMemberParams)

Ban a user in a group, a supergroup or a channel.

```typescript
const result = await client.banChatMember({
  chat_id: -100123456789,
  user_id: 123456789
});
```

**Response Type:** `boolean`

## unbanChatMember(params: UnbanChatMemberParams)

Unban a previously banned user in a supergroup or channel.

```typescript
const result = await client.unbanChatMember({
  chat_id: -100123456789,
  user_id: 123456789
});
```

**Response Type:** `boolean`

## answerCallbackQuery(params: AnswerCallbackQueryParams)

Send answer to a callback query initiated by an inline keyboard callback button.

```typescript
const result = await client.answerCallbackQuery({
  callback_query_id: 'CALLBACK_QUERY_ID',
  text: 'Callback received!'
});
```

**Response Type:** `boolean`

## editMessageText(params: EditMessageTextParams)

Edit text and game messages.

```typescript
const message = await client.editMessageText({
  chat_id: 123456789,
  message_id: 123,
  text: 'Updated message text'
});
```

**Response Type:** `Message | boolean`

## editMessageReplyMarkup(params: EditMessageReplyMarkupParams)

Edit only the reply markup of messages.

```typescript
const message = await client.editMessageReplyMarkup({
  chat_id: 123456789,
  message_id: 123,
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'Button 1', callback_data: 'button1' },
        { text: 'Button 2', callback_data: 'button2' }
      ]
    ]
  }
});
```

**Response Type:** `Message | boolean`

## deleteMessage(params)

Delete a message.

```typescript
const result = await client.deleteMessage({
  chat_id: 123456789,
  message_id: 123
});
```

**Response Type:** `boolean`

## sendInvoice(params: SendInvoiceParams)

Send invoices.

```typescript
const message = await client.sendInvoice({
  chat_id: 123456789,
  title: 'Product Name',
  description: 'Product Description',
  payload: 'custom-payload',
  provider_token: 'PROVIDER_TOKEN',
  currency: 'USD',
  prices: [
    { label: 'Product', amount: 10000 }  // 100.00 in the smallest currency unit
  ]
});
```

**Response Type:** `Message`

## createInvoiceLink(params: CreateInvoiceLinkParams)

Create invoice link.

```typescript
const invoiceLink = await client.createInvoiceLink({
  title: 'Product Name',
  description: 'Product Description',
  payload: 'custom-payload',
  provider_token: 'PROVIDER_TOKEN',
  currency: 'USD',
  prices: [
    { label: 'Product', amount: 10000 }  // 100.00 in the smallest currency unit
  ]
});
```

**Response Type:** `string`

## answerShippingQuery(params: AnswerShippingQueryParams)

Reply to shipping queries.

```typescript
const result = await client.answerShippingQuery({
  shipping_query_id: 'SHIPPING_QUERY_ID',
  ok: true,
  shipping_options: [
    {
      id: 'shipping-option-id',
      title: 'Shipping Option',
      prices: [
        { label: 'Shipping', amount: 500 }  // 5.00 in the smallest currency unit
      ]
    }
  ]
});
```

**Response Type:** `boolean`

## answerPreCheckoutQuery(params: AnswerPreCheckoutQueryParams)

Reply to pre-checkout queries.

```typescript
const result = await client.answerPreCheckoutQuery({
  pre_checkout_query_id: 'PRE_CHECKOUT_QUERY_ID',
  ok: true
});
```

**Response Type:** `boolean`

## setWebhook(params: SetWebhookParams)

Specify an HTTPS URL to receive incoming updates via webhook.

```typescript
const result = await client.setWebhook({
  url: 'https://your-domain.com/webhook',
  allowed_updates: ['message', 'callback_query']
});
```

**Response Type:** `boolean`

## deleteWebhook(params?: DeleteWebhookParams)

Remove webhook integration.

```typescript
const result = await client.deleteWebhook();
```

**Response Type:** `boolean`

## getWebhookInfo()

Get information about the current webhook.

```typescript
const webhookInfo = await client.getWebhookInfo();
```

**Response Type:** `WebhookInfo`