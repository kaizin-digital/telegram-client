# Response Types

This section documents all the response types used by the Telegram Bot API client.

## ApiResponse<T>

The base response type for all API calls.

```typescript
interface ApiResponse<T> {
  ok: boolean;
  result?: T;
  error_code?: number;
  description?: string;
}
```

- `ok` - True if the request was successful
- `result` - The result of the request (if successful)
- `error_code` - The error code (if unsuccessful)
- `description` - A human-readable description of the error (if unsuccessful)

## User

Represents a Telegram user or bot.

```typescript
interface User {
  id: number;                    // Unique identifier for this user or bot
  is_bot: boolean;               // True, if this user is a bot
  first_name: string;            // User's or bot's first name
  last_name?: string;            // Optional. User's or bot's last name
  username?: string;             // Optional. User's or bot's username
  language_code?: string;        // Optional. IETF language tag of the user's language
  is_premium?: true;             // Optional. True, if this user is a Telegram Premium user
  added_to_attachment_menu?: true; // Optional. True, if this user added the bot to the attachment menu
}
```

## Chat

Represents a chat.

```typescript
interface Chat {
  id: number;                    // Unique identifier for this chat
  type: 'private' | 'group' | 'supergroup' | 'channel'; // Type of chat
  title?: string;                // Optional. Title, for supergroups, channels and group chats
  username?: string;             // Optional. Username, for private chats, supergroups and channels if available
  first_name?: string;           // Optional. First name of the other party in a private chat
  last_name?: string;            // Optional. Last name of the other party in a private chat
  is_forum?: true;               // Optional. True, if the supergroup chat is a forum
}
```

## Message

Represents a message.

```typescript
interface Message {
  message_id: number;             // Unique message identifier inside this chat
  message_thread_id?: number;     // Optional. Unique identifier of a message thread to which the message belongs
  from?: User;                    // Optional. Sender of the message; empty for messages sent to channels
  sender_chat?: Chat;             // Optional. Sender of the message, sent on behalf of a chat
  date: number;                   // Date the message was sent in Unix time
  chat: Chat;                     // Chat the message belongs to
  forward_from?: User;            // Optional. For forwarded messages, sender of the original message
  forward_from_chat?: Chat;       // Optional. For messages forwarded from channels
  forward_from_message_id?: number; // Optional. For messages forwarded from channels
  forward_signature?: string;     // Optional. For messages forwarded from channels
  forward_sender_name?: string;   // Optional. Sender's name for forwarded messages
  forward_date?: number;          // Optional. For forwarded messages, date the original message was sent
  is_topic_message?: true;        // Optional. True, if the message is sent to a forum topic
  is_automatic_forward?: true;    // Optional. True, if the message is a channel post automatically forwarded
  reply_to_message?: Message;     // Optional. For replies, the original message
  via_bot?: User;                 // Optional. Bot through which the message was sent
  edit_date?: number;             // Optional. Date the message was last edited
  has_protected_content?: true;   // Optional. True, if the message can't be forwarded
  media_group_id?: string;        // Optional. The unique identifier of a media message group
  author_signature?: string;      // Optional. Signature of the post author for messages in channels
  text?: string;                  // Optional. For text messages, the actual UTF-8 text
  entities?: MessageEntity[];     // Optional. Special entities like usernames, URLs, bot commands, etc.
  animation?: Animation;          // Optional. Message is an animation
  audio?: Audio;                  // Optional. Message is an audio file
  document?: Document;            // Optional. Message is a general file
  photo?: PhotoSize[];            // Optional. Message is a photo
  sticker?: Sticker;              // Optional. Message is a sticker
  story?: Story;                  // Optional. Message is a forwarded story
  video?: Video;                  // Optional. Message is a video
  video_note?: VideoNote;         // Optional. Message is a video note
  voice?: Voice;                  // Optional. Message is a voice message
  caption?: string;               // Optional. Caption for media
  caption_entities?: MessageEntity[]; // Optional. Special entities in the caption
  has_media_spoiler?: true;       // Optional. True, if the caption must be shown above media
  contact?: Contact;              // Optional. Message is a shared contact
  dice?: Dice;                    // Optional. Message is a dice with random value
  game?: Game;                    // Optional. Message is a game
  poll?: Poll;                    // Optional. Message is a native poll
  venue?: Venue;                  // Optional. Message is a venue
  location?: Location;            // Optional. Message is a shared location
  new_chat_members?: User[];      // Optional. New members that were added to the group
  left_chat_member?: User;        // Optional. A member was removed from the group
  new_chat_title?: string;        // Optional. A chat title was changed
  new_chat_photo?: PhotoSize[];   // Optional. A chat photo was changed
  delete_chat_photo?: true;       // Optional. Service message: the chat photo was deleted
  group_chat_created?: true;      // Optional. Service message: the group has been created
  supergroup_chat_created?: true; // Optional. Service message: the supergroup has been created
  channel_chat_created?: true;    // Optional. Service message: the channel has been created
  message_auto_delete_timer_changed?: MessageAutoDeleteTimerChanged; // Optional. Auto-delete timer settings changed
  migrate_to_chat_id?: number;    // Optional. The group has been migrated to a supergroup
  migrate_from_chat_id?: number;  // Optional. The supergroup has been migrated from a group
  pinned_message?: Message;       // Optional. Specified message was pinned
  invoice?: Invoice;              // Optional. Message is an invoice for a payment
  successful_payment?: SuccessfulPayment; // Optional. Message is a successful payment
  user_shared?: UserShared;       // Optional. Service message: a user was shared with the bot
  chat_shared?: ChatShared;       // Optional. Service message: a chat was shared with the bot
  connected_website?: string;     // Optional. The domain name of the website on which the user has logged in
  write_access_allowed?: WriteAccessAllowed; // Optional. Service message: user allowed the bot to write messages
  passport_data?: PassportData;   // Optional. Telegram Passport data
  proximity_alert_triggered?: ProximityAlertTriggered; // Optional. Proximity alert was triggered
  forum_topic_created?: ForumTopicCreated; // Optional. Service message: forum topic created
  forum_topic_edited?: ForumTopicEdited; // Optional. Service message: forum topic edited
  forum_topic_closed?: ForumTopicClosed; // Optional. Service message: forum topic closed
  forum_topic_reopened?: ForumTopicReopened; // Optional. Service message: forum topic reopened
  general_forum_topic_hidden?: GeneralForumTopicHidden; // Optional. Service message: 'General' forum topic hidden
  general_forum_topic_unhidden?: GeneralForumTopicUnhidden; // Optional. Service message: 'General' forum topic unhidden
  giveaway_created?: Giveaway;    // Optional. Service message: a scheduled giveaway was created
  giveaway?: Giveaway;            // Optional. The message is a scheduled giveaway message
  giveaway_winners?: GiveawayWinners; // Optional. A giveaway with public winners was completed
  giveaway_completed?: GiveawayCompleted; // Optional. Service message: a giveaway without public winners was completed
  video_chat_scheduled?: VideoChatScheduled; // Optional. Service message: video chat scheduled
  video_chat_started?: VideoChatStarted; // Optional. Service message: video chat started
  video_chat_ended?: VideoChatEnded; // Optional. Service message: video chat ended
  video_chat_participants_invited?: VideoChatParticipantsInvited; // Optional. Service message: new participants invited to the video chat
  web_app_data?: WebAppData;      // Optional. Service message: data sent by a Web App
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply; // Optional. Inline keyboard attached to the message
}
```

## MessageEntity

Represents one special entity in a text message.

```typescript
interface MessageEntity {
  type: 'mention' | 'hashtag' | 'cashtag' | 'bot_command' | 'url' | 'email' | 'phone_number' | 'bold' | 'italic' | 'underline' | 'strikethrough' | 'spoiler' | 'code' | 'pre' | 'text_link' | 'text_mention' | 'custom_emoji';
  offset: number;           // Offset in UTF-16 code units to the start of the entity
  length: number;           // Length of the entity in UTF-16 code units
  url?: string;             // Optional. For "text_link" only, url that will be opened after user taps on the text
  user?: User;              // Optional. For "text_mention" only, the mentioned user
  language?: string;        // Optional. For "pre" only, the programming language of the entity text
  custom_emoji_id?: string; // Optional. For "custom_emoji" only, unique identifier of the custom emoji
}
```

## PhotoSize

Represents one size of a photo or a file / sticker thumbnail.

```typescript
interface PhotoSize {
  file_id: string;          // Identifier for this file
  file_unique_id: string;   // Unique identifier for this file
  width: number;            // Photo width
  height: number;           // Photo height
  file_size?: number;       // Optional. File size in bytes
}
```

## Animation

Represents an animation file (GIF or H.264/MPEG-4 AVC without sound).

```typescript
interface Animation {
  file_id: string;          // Identifier for this file
  file_unique_id: string;   // Unique identifier for this file
  width: number;            // Video width as defined by sender
  height: number;           // Video height as defined by sender
  duration: number;         // Duration of the video in seconds as defined by sender
  thumb?: PhotoSize;        // Optional. Animation thumbnail as defined by sender
  file_name?: string;       // Optional. Original animation filename as defined by sender
  mime_type?: string;       // Optional. MIME type of the file as defined by sender
  file_size?: number;       // Optional. File size in bytes
}
```

## Audio

Represents an audio file to be treated as music by the Telegram clients.

```typescript
interface Audio {
  file_id: string;          // Identifier for this file
  file_unique_id: string;   // Unique identifier for this file
  duration: number;         // Duration of the audio in seconds as defined by sender
  performer?: string;       // Optional. Performer of the audio as defined by sender or by audio tags
  title?: string;           // Optional. Title of the audio as defined by sender or by audio tags
  file_name?: string;       // Optional. Original filename as defined by sender
  mime_type?: string;       // Optional. MIME type of the file as defined by sender
  file_size?: number;       // Optional. File size in bytes
  thumb?: PhotoSize;        // Optional. Thumbnail of the album cover to which the music file belongs
}
```

## Document

Represents a general file (as opposed to photos, voice messages and audio files).

```typescript
interface Document {
  file_id: string;          // Identifier for this file
  file_unique_id: string;   // Unique identifier for this file
  thumb?: PhotoSize;        // Optional. Document thumbnail as defined by sender
  file_name?: string;       // Optional. Original filename as defined by sender
  mime_type?: string;       // Optional. MIME type of the file as defined by sender
  file_size?: number;       // Optional. File size in bytes
}
```

## Video

Represents a video file.

```typescript
interface Video {
  file_id: string;          // Identifier for this file
  file_unique_id: string;   // Unique identifier for this file
  width: number;            // Video width as defined by sender
  height: number;           // Video height as defined by sender
  duration: number;         // Duration of the video in seconds as defined by sender
  thumb?: PhotoSize;        // Optional. Video thumbnail
  file_name?: string;       // Optional. Original filename as defined by sender
  mime_type?: string;       // Optional. MIME type of the file as defined by sender
  file_size?: number;       // Optional. File size in bytes
}
```

## VideoNote

Represents a video message (available in Telegram apps as of v.4.0).

```typescript
interface VideoNote {
  file_id: string;          // Identifier for this file
  file_unique_id: string;   // Unique identifier for this file
  length: number;           // Video width and height (diameter of the video message) as defined by sender
  duration: number;         // Duration of the video in seconds as defined by sender
  thumb?: PhotoSize;        // Optional. Video thumbnail
  file_size?: number;       // Optional. File size in bytes
}
```

## Voice

Represents a voice note.

```typescript
interface Voice {
  file_id: string;          // Identifier for this file
  file_unique_id: string;   // Unique identifier for this file
  duration: number;         // Duration of the audio in seconds as defined by sender
  mime_type?: string;       // Optional. MIME type of the file as defined by sender
  file_size?: number;       // Optional. File size in bytes
}
```

## Contact

Represents a phone contact.

```typescript
interface Contact {
  phone_number: string;     // Contact's phone number
  first_name: string;       // Contact's first name
  last_name?: string;       // Optional. Contact's last name
  user_id?: number;         // Optional. Contact's user identifier in Telegram
  vcard?: string;           // Optional. Additional data about the contact in the form of a vCard
}
```

## Dice

Represents an animated emoji that displays a random value.

```typescript
interface Dice {
  emoji: string;            // Emoji on which the dice throw animation is based
  value: number;            // Value of the dice, 1-6 for '🎲', '🎯' and '🎳' base emoji, 1-5 for '🏀' and '⚽' base emoji, 1-64 for '🎰' base emoji
}
```

## Poll

This object contains information about a poll.

```typescript
interface Poll {
  id: string;                           // Unique poll identifier
  question: string;                     // Poll question, 1-300 characters
  options: PollOption[];                // List of poll options
  total_voter_count: number;            // Total number of users that voted in the poll
  is_closed: boolean;                   // True, if the poll is closed
  is_anonymous: boolean;                // True, if the poll is anonymous
  type: 'regular' | 'quiz';             // Poll type, currently can be 'regular' or 'quiz'
  allows_multiple_answers: boolean;     // True, if the poll allows multiple answers
  correct_option_id?: number;           // Optional. 0-based identifier of the correct answer option
  explanation?: string;                 // Optional. Text that is shown when a user chooses an incorrect answer or taps on the lamp icon in a quiz-style poll
  explanation_entities?: MessageEntity[]; // Optional. Special entities like usernames, URLs, bot commands, etc. that appear in the explanation
  open_period?: number;                 // Optional. Amount of time in seconds the poll will be active after creation
  close_date?: number;                  // Optional. Point in time (Unix timestamp) when the poll will be automatically closed
}
```

## PollOption

This object contains information about one answer option in a poll.

```typescript
interface PollOption {
  text: string;             // Option text, 1-100 characters
  voter_count: number;      // Number of users that voted for this option
}
```

## Location

Represents a point on the map.

```typescript
interface Location {
  longitude: number;        // Longitude as defined by sender
  latitude: number;         // Latitude as defined by sender
  horizontal_accuracy?: number; // Optional. The radius of uncertainty for the location, measured in meters
  live_period?: number;     // Optional. Time relative to the message sending date, during which the location can be updated
  heading?: number;         // Optional. The direction in which user is moving, in degrees
  proximity_alert_radius?: number; // Optional. The maximum distance for proximity alerts about approaching another chat member, in meters
}
```

## Venue

Represents a venue.

```typescript
interface Venue {
  location: Location;       // Venue location
  title: string;            // Name of the venue
  address: string;          // Address of the venue
  foursquare_id?: string;   // Optional. Foursquare identifier of the venue
  foursquare_type?: string; // Optional. Foursquare type of the venue
  google_place_id?: string; // Optional. Google Places identifier of the venue
  google_place_type?: string; // Optional. Google Places type of the venue
}
```

## UserProfilePhotos

This object represent a user's profile pictures.

```typescript
interface UserProfilePhotos {
  total_count: number;      // Total number of profile pictures the target user has
  photos: PhotoSize[][];    // Requested profile pictures (in up to 4 sizes each)
}
```

## File

This object represents a file ready to be downloaded.

```typescript
interface File {
  file_id: string;          // Identifier for this file
  file_unique_id: string;   // Unique identifier for this file
  file_size?: number;       // Optional. File size in bytes, if known
  file_path?: string;       // Optional. File path
}
```

## WebAppData

Describes data sent from a Web App to the bot.

```typescript
interface WebAppData {
  data: string;             // The data
  button_text: string;      // Text of the web_app keyboard button from which the Web App was opened
}
```

## WebhookInfo

Contains information about the current status of a webhook.

```typescript
interface WebhookInfo {
  url: string;                          // Webhook URL, may be empty if webhook is not set up
  has_custom_certificate: boolean;      // True, if a custom certificate was provided for webhook certificate checks
  pending_update_count: number;         // Number of updates awaiting delivery
  ip_address?: string;                  // Optional. Currently used webhook IP address
  last_error_date?: number;             // Optional. Unix time for the most recent error that happened when trying to deliver an update via webhook
  last_error_message?: string;          // Optional. Error message in human-readable format for the most recent error that happened when trying to deliver an update via webhook
  last_synchronization_error_date?: number; // Optional. Unix time of the most recent error that happened when trying to synchronize available updates with Telegram datacenters
  max_connections?: number;             // Optional. Maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery
  allowed_updates?: string[];           // Optional. A list of update types the bot is subscribed to
}
```

## Update

This object represents an incoming update.

```typescript
interface Update {
  update_id: number;                    // The update's unique identifier
  message?: Message;                    // Optional. New incoming message of any kind
  edited_message?: Message;             // Optional. New version of a message that is known to the bot and was edited
  channel_post?: Message;               // Optional. New incoming channel post of any kind
  edited_channel_post?: Message;        // Optional. New version of a channel post that is known to the bot and was edited
  business_connection?: BusinessConnection; // Optional. The bot was connected to or disconnected from a business account
  business_message?: Message;           // Optional. New message from a connected business account
  edited_business_message?: Message;    // Optional. New version of a message from a connected business account
  deleted_business_messages?: BusinessMessagesDeleted; // Optional. Messages were deleted from a connected business account
  message_reaction?: MessageReactionUpdated; // Optional. A reaction to a message was changed by a user
  message_reaction_count?: MessageReactionCountUpdated; // Optional. Reactions to a message with anonymous reactions were changed
  inline_query?: InlineQuery;           // Optional. New incoming inline query
  chosen_inline_result?: ChosenInlineResult; // Optional. The result of an inline query that was chosen by a user
  callback_query?: CallbackQuery;       // Optional. New incoming callback query
  shipping_query?: ShippingQuery;       // Optional. New incoming shipping query
  pre_checkout_query?: PreCheckoutQuery; // Optional. New incoming pre-checkout query
  purchased_paid_media?: PurchasedPaidMedia; // Optional. A user purchased paid media with the help of the bot
  poll?: Poll;                          // Optional. New poll state
  poll_answer?: PollAnswer;             // Optional. A user changed their answer in a non-anonymous poll
  my_chat_member?: ChatMemberUpdated;   // Optional. The bot's chat member status was updated in a chat
  chat_member?: ChatMemberUpdated;      // Optional. A chat member's status was updated in a chat
  chat_join_request?: ChatJoinRequest;  // Optional. A request to join the chat has been sent
  chat_boost?: ChatBoostUpdated;        // Optional. A chat boost was added or changed
  removed_chat_boost?: ChatBoostRemoved; // Optional. A chat boost was removed
}
```

## ChatMemberUpdated

This object represents changes in the status of a chat member.

```typescript
interface ChatMemberUpdated {
  chat: Chat;                           // Chat the user belongs to
  from: User;                           // Performer of the action, which resulted in the change
  date: number;                         // Date the change was done in Unix time
  old_chat_member: ChatMember;          // Previous information about the chat member
  new_chat_member: ChatMember;          // New information about the chat member
  invite_link?: ChatInviteLink;         // Optional. Chat invite link, which was used by the user to join the chat
  via_chat_folder_invite_link?: boolean; // Optional. True, if the user joined the chat via a chat folder invite link
}
```

## CallbackQuery

This object represents an incoming callback query from a callback button in an inline keyboard.

```typescript
interface CallbackQuery {
  id: string;                           // Unique identifier for this query
  from: User;                           // Sender
  message?: Message;                    // Optional. Message with the callback button that originated the query
  inline_message_id?: string;           // Optional. Identifier of the message sent via the bot in inline mode
  chat_instance: string;                // Global identifier, uniquely corresponding to the chat to which the message with the callback button was sent
  data?: string;                        // Optional. Data associated with the callback button
  game_short_name?: string;             // Optional. Short name of a Game to be returned
}
```

## ChatInviteLink

Represents an invite link for a chat.

```typescript
interface ChatInviteLink {
  invite_link: string;                  // The invite link
  creator: User;                        // Creator of the link
  creates_join_request: boolean;        // True, if users joining the chat via the link need to be approved by chat administrators
  is_primary: boolean;                  // True, if the link is primary
  is_revoked: boolean;                  // True, if the link is revoked
  name?: string;                        // Optional. Invite link name
  expire_date?: number;                 // Optional. Point in time (Unix timestamp) when the link will expire
  member_limit?: number;                // Optional. Maximum number of users that can be members of the chat simultaneously
  pending_join_request_count?: number;  // Optional. Number of pending join requests created using this link
}
```

## Sticker

This object represents a sticker.

```typescript
interface Sticker {
  file_id: string;                      // Identifier for this file
  file_unique_id: string;               // Unique identifier for this file
  type: 'regular' | 'mask' | 'custom_emoji'; // Type of the sticker
  width: number;                        // Sticker width
  height: number;                       // Sticker height
  is_animated: boolean;                 // True, if the sticker is animated
  is_video: boolean;                    // True, if the sticker is a video sticker
  thumb?: PhotoSize;                    // Optional. Sticker thumbnail in the .WEBP or .JPG format
  emoji?: string;                       // Optional. Emoji associated with the sticker
  set_name?: string;                    // Optional. Name of the sticker set to which the sticker belongs
  premium_animation?: File;             // Optional. For premium regular stickers, premium animation for the sticker
  mask_position?: MaskPosition;         // Optional. For mask stickers, the position where the mask should be placed
  custom_emoji_id?: string;             // Optional. For custom emoji stickers, unique identifier of the custom emoji
  needs_repainting?: boolean;           // Optional. True, if the sticker must be repainted to a text color in messages
  file_size?: number;                   // Optional. File size in bytes
}
```

## StickerSet

This object represents a sticker set.

```typescript
interface StickerSet {
  name: string;                         // Sticker set name
  title: string;                        // Sticker set title
  sticker_type: 'regular' | 'mask' | 'custom_emoji'; // Type of stickers in the set
  is_animated: boolean;                 // True, if the sticker set contains animated stickers
  is_video: boolean;                    // True, if the sticker set contains video stickers
  stickers: Sticker[];                  // List of all set stickers
  thumb?: PhotoSize;                    // Optional. Sticker set thumbnail in the .WEBP, .TGS, or .WEBM format
}
```

## MaskPosition

This object describes the position on faces where a mask should be placed by default.

```typescript
interface MaskPosition {
  point: 'forehead' | 'eyes' | 'mouth' | 'chin'; // The part of the face relative to which the mask should be placed
  x_shift: number;                      // Shift by X-axis measured in widths of the mask scaled to the face size, from left to right
  y_shift: number;                      // Shift by Y-axis measured in heights of the mask scaled to the face size, from top to bottom
  scale: number;                        // Mask scaling coefficient
}
```

## Game

This object represents a game.

```typescript
interface Game {
  title: string;                        // Title of the game
  description: string;                  // Description of the game
  photo: PhotoSize[];                   // Photo that will be displayed in the game message in chats
  text?: string;                        // Optional. Brief description of the game or high scores included in the game message
  text_entities?: MessageEntity[];      // Optional. Special entities that appear in text, in the same format as entities in message objects
  animation?: Animation;                // Optional. Animation that will be displayed in the game message in chats
}
```

## GameHighScore

This object represents one row of the high scores table for a game.

```typescript
interface GameHighScore {
  position: number;                     // Position in high score table for the game
  user: User;                           // User
  score: number;                        // Score
}
```

## Invoice

This object contains basic information about an invoice.

```typescript
interface Invoice {
  title: string;                        // Product name
  description: string;                  // Product description
  start_parameter: string;              // Unique bot deep-linking parameter that can be used to generate this invoice
  currency: string;                     // Three-letter ISO 4217 currency code
  total_amount: number;                 // Total price in the smallest units of the currency
}
```

## SuccessfulPayment

This object contains basic information about a successful payment.

```typescript
interface SuccessfulPayment {
  currency: string;                     // Three-letter ISO 4217 currency code
  total_amount: number;                 // Total price in the smallest units of the currency
  invoice_payload: string;              // Bot specified invoice payload
  shipping_option_id?: string;          // Optional. Identifier of the shipping option chosen by the user
  order_info?: OrderInfo;               // Optional. Order information provided by the user
  telegram_payment_charge_id: string;   // Telegram payment identifier
  provider_payment_charge_id: string;   // Provider payment identifier
}
```

## OrderInfo

This object represents information about an order.

```typescript
interface OrderInfo {
  name?: string;                        // Optional. User name
  phone_number?: string;                // Optional. User's phone number
  email?: string;                       // Optional. User email
  shipping_address?: ShippingAddress;   // Optional. User shipping address
}
```

## ShippingAddress

This object represents a shipping address.

```typescript
interface ShippingAddress {
  country_code: string;                 // ISO 3166-1 alpha-2 country code
  state: string;                        // State, if applicable
  city: string;                         // City
  street_line1: string;                 // First line for the address
  street_line2: string;                 // Second line for the address
  post_code: string;                    // Address post code
}
```

## PassportData

Describes Telegram Passport data shared with the bot by the user.

```typescript
interface PassportData {
  data: EncryptedPassportElement[];     // Array with information about documents and other Telegram Passport elements that was shared with the bot
  credentials: EncryptedCredentials;    // Encrypted credentials required to decrypt the data
}
```

## TelegramError

This error is thrown when the Telegram API returns an error.

```typescript
class TelegramError extends Error {
  constructor(
    message: string,                    // Human-readable error description
    public readonly code?: number,      // Numeric error code from Telegram (e.g., 400, 401, 404)
    public readonly parameters?: Record<string, any>, // Parameters that were passed to the method that caused the error
    public readonly method?: string,    // The API method that was called when the error occurred
  ) {
    super(message);
    this.name = 'TelegramError';
  }
}
```