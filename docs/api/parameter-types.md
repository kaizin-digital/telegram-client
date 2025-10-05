# Parameter Types

This section documents all the parameter types used by the Telegram Bot API client methods.

## SendMessageParams

Parameters for the sendMessage method.

```typescript
interface SendMessageParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target channel
  message_thread_id?: number;            // Optional. Unique identifier for the target message thread (topic) of the forum
  text: string;                          // Text of the message to be sent, 1-4096 characters after entities parsing
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML'; // Optional. Mode for parsing entities in the message text
  entities?: MessageEntity[];            // Optional. A JSON-serialized list of special entities that appear in message text
  disable_web_page_preview?: boolean;    // Optional. Disables link previews for links in this message
  disable_notification?: boolean;        // Optional. Sends the message silently
  protect_content?: boolean;             // Optional. Protects the contents of the sent message from forwarding and saving
  reply_to_message_id?: number;          // Optional. If the message is a reply, ID of the original message
  allow_sending_without_reply?: boolean; // Optional. Pass True if the message should be sent even if the specified replied-to message is not found
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply; // Optional. Additional interface options
}
```

## GetUpdatesParams

Parameters for the getUpdates method.

```typescript
interface GetUpdatesParams {
  offset?: number;                       // Optional. Identifier of the first update to be returned
  limit?: number;                        // Optional. Limits the number of updates to be retrieved
  timeout?: number;                      // Optional. Timeout in seconds for long polling
  allowed_updates?: string[];            // Optional. A JSON-serialized list of the update types you want your bot to receive
}
```

## ForwardMessageParams

Parameters for the forwardMessage method.

```typescript
interface ForwardMessageParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target channel
  message_thread_id?: number;            // Optional. Unique identifier for the target message thread (topic) of the forum
  from_chat_id: number | string;         // Unique identifier for the chat where the original message was sent
  disable_notification?: boolean;        // Optional. Sends the message silently
  protect_content?: boolean;             // Optional. Protects the contents of the forwarded message from forwarding and saving
  message_id: number;                    // Message identifier in the chat specified in from_chat_id
}
```

## CopyMessageParams

Parameters for the copyMessage method.

```typescript
interface CopyMessageParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target channel
  message_thread_id?: number;            // Optional. Unique identifier for the target message thread (topic) of the forum
  from_chat_id: number | string;         // Unique identifier for the chat where the original message was sent
  message_id: number;                    // Message identifier in the chat specified in from_chat_id
  caption?: string;                      // Optional. New caption for media, 0-1024 characters after entities parsing
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML'; // Optional. Mode for parsing entities in the new caption
  caption_entities?: MessageEntity[];    // Optional. A JSON-serialized list of special entities that appear in the new caption
  disable_notification?: boolean;        // Optional. Sends the message silently
  protect_content?: boolean;             // Optional. Protects the contents of the sent message from forwarding and saving
  reply_to_message_id?: number;          // Optional. If the message is a reply, ID of the original message
  allow_sending_without_reply?: boolean; // Optional. Pass True if the message should be sent even if the specified replied-to message is not found
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply; // Optional. Additional interface options
}
```

## SendPhotoParams

Parameters for the sendPhoto method.

```typescript
interface SendPhotoParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target channel
  message_thread_id?: number;            // Optional. Unique identifier for the target message thread (topic) of the forum
  photo: string;                         // Photo to send
  caption?: string;                      // Optional. Photo caption (may also be used when resending photos by file_id)
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML'; // Optional. Mode for parsing entities in the photo caption
  caption_entities?: MessageEntity[];    // Optional. A JSON-serialized list of special entities that appear in the caption
  has_spoiler?: boolean;                 // Optional. Pass True if the photo needs to be covered with a spoiler animation
  disable_notification?: boolean;        // Optional. Sends the message silently
  protect_content?: boolean;             // Optional. Protects the contents of the sent message from forwarding and saving
  reply_to_message_id?: number;          // Optional. If the message is a reply, ID of the original message
  allow_sending_without_reply?: boolean; // Optional. Pass True if the message should be sent even if the specified replied-to message is not found
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply; // Optional. Additional interface options
}
```

## SendAudioParams

Parameters for the sendAudio method.

```typescript
interface SendAudioParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target channel
  message_thread_id?: number;            // Optional. Unique identifier for the target message thread (topic) of the forum
  audio: string;                         // Audio file to send
  caption?: string;                      // Optional. Audio caption, 0-1024 characters after entities parsing
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML'; // Optional. Mode for parsing entities in the audio caption
  caption_entities?: MessageEntity[];    // Optional. A JSON-serialized list of special entities that appear in the caption
  duration?: number;                     // Optional. Duration of the audio in seconds
  performer?: string;                    // Optional. Performer
  title?: string;                        // Optional. Track name
  thumb?: string;                        // Optional. Thumbnail of the file sent
  disable_notification?: boolean;        // Optional. Sends the message silently
  protect_content?: boolean;             // Optional. Protects the contents of the sent message from forwarding and saving
  reply_to_message_id?: number;          // Optional. If the message is a reply, ID of the original message
  allow_sending_without_reply?: boolean; // Optional. Pass True if the message should be sent even if the specified replied-to message is not found
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply; // Optional. Additional interface options
}
```

## SendDocumentParams

Parameters for the sendDocument method.

```typescript
interface SendDocumentParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target channel
  message_thread_id?: number;            // Optional. Unique identifier for the target message thread (topic) of the forum
  document: string;                      // File to send
  thumb?: string;                        // Optional. Thumbnail of the file sent
  caption?: string;                      // Optional. Document caption (may also be used when resending documents by file_id)
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML'; // Optional. Mode for parsing entities in the document caption
  caption_entities?: MessageEntity[];    // Optional. A JSON-serialized list of special entities that appear in the caption
  disable_content_type_detection?: boolean; // Optional. Disables automatic server-side content type detection for files uploaded using multipart/form-data
  disable_notification?: boolean;        // Optional. Sends the message silently
  protect_content?: boolean;             // Optional. Protects the contents of the sent message from forwarding and saving
  reply_to_message_id?: number;          // Optional. If the message is a reply, ID of the original message
  allow_sending_without_reply?: boolean; // Optional. Pass True if the message should be sent even if the specified replied-to message is not found
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply; // Optional. Additional interface options
}
```

## SendVideoParams

Parameters for the sendVideo method.

```typescript
interface SendVideoParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target channel
  message_thread_id?: number;            // Optional. Unique identifier for the target message thread (topic) of the forum
  video: string;                         // Video to send
  duration?: number;                     // Optional. Duration of sent video in seconds
  width?: number;                        // Optional. Video width
  height?: number;                       // Optional. Video height
  thumb?: string;                        // Optional. Thumbnail of the file sent
  caption?: string;                      // Optional. Video caption (may also be used when resending videos by file_id)
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML'; // Optional. Mode for parsing entities in the video caption
  caption_entities?: MessageEntity[];    // Optional. A JSON-serialized list of special entities that appear in the caption
  has_spoiler?: boolean;                 // Optional. Pass True if the video needs to be covered with a spoiler animation
  supports_streaming?: boolean;          // Optional. Pass True if the uploaded video is suitable for streaming
  disable_notification?: boolean;        // Optional. Sends the message silently
  protect_content?: boolean;             // Optional. Protects the contents of the sent message from forwarding and saving
  reply_to_message_id?: number;          // Optional. If the message is a reply, ID of the original message
  allow_sending_without_reply?: boolean; // Optional. Pass True if the message should be sent even if the specified replied-to message is not found
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply; // Optional. Additional interface options
}
```

## SendAnimationParams

Parameters for the sendAnimation method.

```typescript
interface SendAnimationParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target channel
  message_thread_id?: number;            // Optional. Unique identifier for the target message thread (topic) of the forum
  animation: string;                     // Animation to send
  duration?: number;                     // Optional. Duration of sent animation in seconds
  width?: number;                        // Optional. Animation width
  height?: number;                       // Optional. Animation height
  thumb?: string;                        // Optional. Thumbnail of the file sent
  caption?: string;                      // Optional. Animation caption (may also be used when resending animations by file_id)
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML'; // Optional. Mode for parsing entities in the animation caption
  caption_entities?: MessageEntity[];    // Optional. A JSON-serialized list of special entities that appear in the caption
  has_spoiler?: boolean;                 // Optional. Pass True if the animation needs to be covered with a spoiler animation
  disable_notification?: boolean;        // Optional. Sends the message silently
  protect_content?: boolean;             // Optional. Protects the contents of the sent message from forwarding and saving
  reply_to_message_id?: number;          // Optional. If the message is a reply, ID of the original message
  allow_sending_without_reply?: boolean; // Optional. Pass True if the message should be sent even if the specified replied-to message is not found
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply; // Optional. Additional interface options
}
```

## SendVoiceParams

Parameters for the sendVoice method.

```typescript
interface SendVoiceParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target channel
  message_thread_id?: number;            // Optional. Unique identifier for the target message thread (topic) of the forum
  voice: string;                         // Audio file to send
  caption?: string;                      // Optional. Voice message caption, 0-1024 characters after entities parsing
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML'; // Optional. Mode for parsing entities in the voice caption
  caption_entities?: MessageEntity[];    // Optional. A JSON-serialized list of special entities that appear in the caption
  duration?: number;                     // Optional. Duration of the voice message in seconds
  disable_notification?: boolean;        // Optional. Sends the message silently
  protect_content?: boolean;             // Optional. Protects the contents of the sent message from forwarding and saving
  reply_to_message_id?: number;          // Optional. If the message is a reply, ID of the original message
  allow_sending_without_reply?: boolean; // Optional. Pass True if the message should be sent even if the specified replied-to message is not found
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply; // Optional. Additional interface options
}
```

## SendVideoNoteParams

Parameters for the sendVideoNote method.

```typescript
interface SendVideoNoteParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target channel
  message_thread_id?: number;            // Optional. Unique identifier for the target message thread (topic) of the forum
  video_note: string;                    // Video note to send
  duration?: number;                     // Optional. Duration of sent video in seconds
  length?: number;                       // Optional. Video width and height
  thumb?: string;                        // Optional. Thumbnail of the file sent
  disable_notification?: boolean;        // Optional. Sends the message silently
  protect_content?: boolean;             // Optional. Protects the contents of the sent message from forwarding and saving
  reply_to_message_id?: number;          // Optional. If the message is a reply, ID of the original message
  allow_sending_without_reply?: boolean; // Optional. Pass True if the message should be sent even if the specified replied-to message is not found
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply; // Optional. Additional interface options
}
```

## SendMediaGroupParams

Parameters for the sendMediaGroup method.

```typescript
interface SendMediaGroupParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target channel
  message_thread_id?: number;            // Optional. Unique identifier for the target message thread (topic) of the forum
  media: (InputMediaPhoto | InputMediaVideo)[]; // A JSON-serialized array describing messages to be sent
  disable_notification?: boolean;        // Optional. Sends the message silently
  protect_content?: boolean;             // Optional. Protects the contents of the sent message from forwarding and saving
  reply_to_message_id?: number;          // Optional. If the messages are a reply, ID of the original message
  allow_sending_without_reply?: boolean; // Optional. Pass True if the messages should be sent even if the specified replied-to message is not found
}
```

## SendLocationParams

Parameters for the sendLocation method.

```typescript
interface SendLocationParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target channel
  message_thread_id?: number;            // Optional. Unique identifier for the target message thread (topic) of the forum
  latitude: number;                      // Latitude of the location
  longitude: number;                     // Longitude of the location
  horizontal_accuracy?: number;          // Optional. The radius of uncertainty for the location, measured in meters
  live_period?: number;                  // Optional. Period in seconds for which the location will be updated
  heading?: number;                      // Optional. The direction in which user is moving, in degrees
  proximity_alert_radius?: number;       // Optional. The maximum distance for proximity alerts about approaching another chat member, in meters
  disable_notification?: boolean;        // Optional. Sends the message silently
  protect_content?: boolean;             // Optional. Protects the contents of the sent message from forwarding and saving
  reply_to_message_id?: number;          // Optional. If the message is a reply, ID of the original message
  allow_sending_without_reply?: boolean; // Optional. Pass True if the message should be sent even if the specified replied-to message is not found
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply; // Optional. Additional interface options
}
```

## EditMessageLiveLocationParams

Parameters for the editMessageLiveLocation method.

```typescript
interface EditMessageLiveLocationParams {
  chat_id?: number | string;             // Optional. Required if inline_message_id is not specified
  message_id?: number;                   // Optional. Required if inline_message_id is not specified
  inline_message_id?: string;            // Optional. Required if chat_id and message_id are not specified
  latitude: number;                      // Latitude of new location
  longitude: number;                     // Longitude of new location
  live_period?: number;                  // Optional. New period in seconds during which the location can be updated
  horizontal_accuracy?: number;          // Optional. The radius of uncertainty for the location, measured in meters
  heading?: number;                      // Optional. The direction in which user is moving, in degrees
  proximity_alert_radius?: number;       // Optional. The maximum distance for proximity alerts about approaching another chat member, in meters
  reply_markup?: InlineKeyboardMarkup;   // Optional. A JSON-serialized object for a new inline keyboard
}
```

## StopMessageLiveLocationParams

Parameters for the stopMessageLiveLocation method.

```typescript
interface StopMessageLiveLocationParams {
  chat_id?: number | string;             // Optional. Required if inline_message_id is not specified
  message_id?: number;                   // Optional. Required if inline_message_id is not specified
  inline_message_id?: string;            // Optional. Required if chat_id and message_id are not specified
  reply_markup?: InlineKeyboardMarkup;   // Optional. A JSON-serialized object for a new inline keyboard
}
```

## SendVenueParams

Parameters for the sendVenue method.

```typescript
interface SendVenueParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target channel
  message_thread_id?: number;            // Optional. Unique identifier for the target message thread (topic) of the forum
  latitude: number;                      // Latitude of the venue
  longitude: number;                     // Longitude of the venue
  title: string;                         // Name of the venue
  address: string;                       // Address of the venue
  foursquare_id?: string;                // Optional. Foursquare identifier of the venue
  foursquare_type?: string;              // Optional. Foursquare type of the venue
  google_place_id?: string;              // Optional. Google Places identifier of the venue
  google_place_type?: string;            // Optional. Google Places type of the venue
  disable_notification?: boolean;        // Optional. Sends the message silently
  protect_content?: boolean;             // Optional. Protects the contents of the sent message from forwarding and saving
  reply_to_message_id?: number;          // Optional. If the message is a reply, ID of the original message
  allow_sending_without_reply?: boolean; // Optional. Pass True if the message should be sent even if the specified replied-to message is not found
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply; // Optional. Additional interface options
}
```

## SendContactParams

Parameters for the sendContact method.

```typescript
interface SendContactParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target channel
  message_thread_id?: number;            // Optional. Unique identifier for the target message thread (topic) of the forum
  phone_number: string;                  // Contact's phone number
  first_name: string;                    // Contact's first name
  last_name?: string;                    // Optional. Contact's last name
  vcard?: string;                        // Optional. Additional data about the contact in the form of a vCard
  disable_notification?: boolean;        // Optional. Sends the message silently
  protect_content?: boolean;             // Optional. Protects the contents of the sent message from forwarding and saving
  reply_to_message_id?: number;          // Optional. If the message is a reply, ID of the original message
  allow_sending_without_reply?: boolean; // Optional. Pass True if the message should be sent even if the specified replied-to message is not found
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply; // Optional. Additional interface options
}
```

## SendPollParams

Parameters for the sendPoll method.

```typescript
interface SendPollParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target channel
  message_thread_id?: number;            // Optional. Unique identifier for the target message thread (topic) of the forum
  question: string;                      // Poll question, 1-300 characters
  options: string[];                     // A JSON-serialized list of answer options, 2-10 strings 1-100 characters each
  is_anonymous?: boolean;                // Optional. True, if the poll needs to be anonymous
  type?: 'regular' | 'quiz';             // Optional. Poll type
  allows_multiple_answers?: boolean;     // Optional. True, if the poll allows multiple answers
  correct_option_id?: number;            // Optional. 0-based identifier of the correct answer option
  explanation?: string;                  // Optional. Text that is shown when a user chooses an incorrect answer or taps on the lamp icon in a quiz-style poll
  explanation_parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML'; // Optional. Mode for parsing entities in the explanation
  explanation_entities?: MessageEntity[]; // Optional. A JSON-serialized list of special entities that appear in the poll explanation
  open_period?: number;                  // Optional. Amount of time in seconds the poll will be active after creation
  close_date?: number;                   // Optional. Point in time (Unix timestamp) when the poll will be automatically closed
  is_closed?: boolean;                   // Optional. Pass True if the poll needs to be immediately closed
  disable_notification?: boolean;        // Optional. Sends the message silently
  protect_content?: boolean;             // Optional. Protects the contents of the sent message from forwarding and saving
  reply_to_message_id?: number;          // Optional. If the message is a reply, ID of the original message
  allow_sending_without_reply?: boolean; // Optional. Pass True if the message should be sent even if the specified replied-to message is not found
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply; // Optional. Additional interface options
}
```

## SendDiceParams

Parameters for the sendDice method.

```typescript
interface SendDiceParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target channel
  message_thread_id?: number;            // Optional. Unique identifier for the target message thread (topic) of the forum
  emoji?: '🎲' | '🎯' | '🏀' | '⚽' | '🎳' | '🎰'; // Optional. Emoji on which the dice throw animation is based
  disable_notification?: boolean;        // Optional. Sends the message silently
  protect_content?: boolean;             // Optional. Protects the contents of the sent message from forwarding and saving
  reply_to_message_id?: number;          // Optional. If the message is a reply, ID of the original message
  allow_sending_without_reply?: boolean; // Optional. Pass True if the message should be sent even if the specified replied-to message is not found
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply; // Optional. Additional interface options
}
```

## SendChatActionParams

Parameters for the sendChatAction method.

```typescript
interface SendChatActionParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target channel
  message_thread_id?: number;            // Optional. Unique identifier for the target message thread (topic) of the forum
  action: 'typing' | 'upload_photo' | 'record_video' | 'upload_video' | 'record_voice' | 'upload_voice' | 'upload_document' | 'find_location' | 'record_video_note' | 'upload_video_note'; // Type of action to broadcast
}
```

## GetUserProfilePhotosParams

Parameters for the getUserProfilePhotos method.

```typescript
interface GetUserProfilePhotosParams {
  user_id: number;                       // Unique identifier of the target user
  offset?: number;                       // Optional. Sequential number of the first photo to be returned
  limit?: number;                        // Optional. Limits the number of photos to be retrieved
}
```

## GetFileParams

Parameters for the getFile method.

```typescript
interface GetFileParams {
  file_id: string;                       // File identifier to get info about
}
```

## BanChatMemberParams

Parameters for the banChatMember method.

```typescript
interface BanChatMemberParams {
  chat_id: number | string;              // Unique identifier for the target group or username of the target supergroup or channel
  user_id: number;                       // Unique identifier of the target user
  until_date?: number;                   // Optional. Date when the user will be unbanned, unix time
  revoke_messages?: boolean;             // Optional. Pass True to delete all messages from the chat for the user that is being removed
}
```

## UnbanChatMemberParams

Parameters for the unbanChatMember method.

```typescript
interface UnbanChatMemberParams {
  chat_id: number | string;              // Unique identifier for the target group or username of the target supergroup or channel
  user_id: number;                       // Unique identifier of the target user
  only_if_banned?: boolean;              // Optional. Do nothing if the user is not banned
}
```

## RestrictChatMemberParams

Parameters for the restrictChatMember method.

```typescript
interface RestrictChatMemberParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target supergroup
  user_id: number;                       // Unique identifier of the target user
  permissions: ChatPermissions;          // New user permissions
  use_independent_chat_permissions?: boolean; // Optional. Pass True if chat permissions are set independently
  until_date?: number;                   // Optional. Date when restrictions will be lifted for the user, unix time
}
```

## PromoteChatMemberParams

Parameters for the promoteChatMember method.

```typescript
interface PromoteChatMemberParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target channel
  user_id: number;                       // Unique identifier of the target user
  is_anonymous?: boolean;                // Optional. Pass True if the administrator's presence in the chat is hidden
  can_manage_chat?: boolean;             // Optional. Pass True if the administrator can access the chat event log, chat statistics, message statistics in channels, see channel members, see anonymous administrators in supergroups and ignore slow mode
  can_post_messages?: boolean;           // Optional. Pass True if the administrator can create channel posts, channels only
  can_edit_messages?: boolean;           // Optional. Pass True if the administrator can edit messages of other users and can pin messages, channels only
  can_delete_messages?: boolean;         // Optional. Pass True if the administrator can delete messages of other users
  can_manage_video_chats?: boolean;      // Optional. Pass True if the administrator can manage video chats
  can_restrict_members?: boolean;        // Optional. Pass True if the administrator can restrict, ban or unban chat members
  can_promote_members?: boolean;         // Optional. Pass True if the administrator can add new administrators with a subset of their own privileges
  can_change_info?: boolean;             // Optional. Pass True if the administrator can change chat title, photo and other settings
  can_invite_users?: boolean;            // Optional. Pass True if the administrator can invite new users to the chat
  can_pin_messages?: boolean;            // Optional. Pass True if the administrator can pin messages, supergroups only
  can_post_stories?: boolean;            // Optional. Pass True if the administrator can post stories to the chat
  can_edit_stories?: boolean;            // Optional. Pass True if the administrator can edit stories posted by other users
  can_delete_stories?: boolean;          // Optional. Pass True if the administrator can delete stories posted by other users
  can_manage_topics?: boolean;           // Optional. Pass True if the administrator can manage topics
}
```

## SetChatAdministratorCustomTitleParams

Parameters for the setChatAdministratorCustomTitle method.

```typescript
interface SetChatAdministratorCustomTitleParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target supergroup
  user_id: number;                       // Unique identifier of the target user
  custom_title: string;                  // New custom title for the administrator; 0-16 characters, emoji are not allowed
}
```

## SetChatPermissionsParams

Parameters for the setChatPermissions method.

```typescript
interface SetChatPermissionsParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target supergroup
  permissions: ChatPermissions;          // New default chat permissions
  use_independent_chat_permissions?: boolean; // Optional. Pass True if chat permissions are set independently
}
```

## ExportChatInviteLinkParams

Parameters for the exportChatInviteLink method.

```typescript
interface ExportChatInviteLinkParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target channel
}
```

## CreateChatInviteLinkParams

Parameters for the createChatInviteLink method.

```typescript
interface CreateChatInviteLinkParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target channel
  name?: string;                         // Optional. Invite link name; 0-32 characters
  expire_date?: number;                  // Optional. Point in time (Unix timestamp) when the link will expire
  member_limit?: number;                 // Optional. Maximum number of users that can be members of the chat simultaneously
  creates_join_request?: boolean;        // Optional. True, if users joining the chat via the link need to be approved by chat administrators
}
```

## EditChatInviteLinkParams

Parameters for the editChatInviteLink method.

```typescript
interface EditChatInviteLinkParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target channel
  invite_link: string;                   // The invite link to edit
  name?: string;                         // Optional. Invite link name; 0-32 characters
  expire_date?: number;                  // Optional. Point in time (Unix timestamp) when the link will expire
  member_limit?: number;                 // Optional. Maximum number of users that can be members of the chat simultaneously
  creates_join_request?: boolean;        // Optional. True, if users joining the chat via the link need to be approved by chat administrators
}
```

## RevokeChatInviteLinkParams

Parameters for the revokeChatInviteLink method.

```typescript
interface RevokeChatInviteLinkParams {
  chat_id: number | string;              // Unique identifier of the target chat or username of the target channel
  invite_link: string;                   // The invite link to revoke
}
```

## ApproveChatJoinRequestParams

Parameters for the approveChatJoinRequest method.

```typescript
interface ApproveChatJoinRequestParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target channel
  user_id: number;                       // Unique identifier of the target user
}
```

## DeclineChatJoinRequestParams

Parameters for the declineChatJoinRequest method.

```typescript
interface DeclineChatJoinRequestParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target channel
  user_id: number;                       // Unique identifier of the target user
}
```

## SetChatPhotoParams

Parameters for the setChatPhoto method.

```typescript
interface SetChatPhotoParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target channel
  photo: string;                         // New chat photo, uploaded using multipart/form-data
}
```

## DeleteChatPhotoParams

Parameters for the deleteChatPhoto method.

```typescript
interface DeleteChatPhotoParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target channel
}
```

## SetChatTitleParams

Parameters for the setChatTitle method.

```typescript
interface SetChatTitleParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target channel
  title: string;                         // New chat title, 1-128 characters
}
```

## SetChatDescriptionParams

Parameters for the setChatDescription method.

```typescript
interface SetChatDescriptionParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target channel
  description?: string;                  // Optional. New chat description, 0-255 characters
}
```

## PinChatMessageParams

Parameters for the pinChatMessage method.

```typescript
interface PinChatMessageParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target channel
  message_id: number;                    // Identifier of a message to pin
  disable_notification?: boolean;        // Optional. Pass True if it is not necessary to send a notification to all chat members
}
```

## UnpinChatMessageParams

Parameters for the unpinChatMessage method.

```typescript
interface UnpinChatMessageParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target channel
  message_id?: number;                   // Optional. Identifier of a message to unpin
}
```

## UnpinAllChatMessagesParams

Parameters for the unpinAllChatMessages method.

```typescript
interface UnpinAllChatMessagesParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target channel
}
```

## LeaveChatParams

Parameters for the leaveChat method.

```typescript
interface LeaveChatParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target supergroup or channel
}
```

## GetChatParams

Parameters for the getChat method.

```typescript
interface GetChatParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target supergroup or channel
}
```

## GetChatAdministratorsParams

Parameters for the getChatAdministrators method.

```typescript
interface GetChatAdministratorsParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target supergroup or channel
}
```

## GetChatMemberCountParams

Parameters for the getChatMemberCount method.

```typescript
interface GetChatMemberCountParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target supergroup or channel
}
```

## GetChatMemberParams

Parameters for the getChatMember method.

```typescript
interface GetChatMemberParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target supergroup or channel
  user_id: number;                       // Unique identifier of the target user
}
```

## SetChatStickerSetParams

Parameters for the setChatStickerSet method.

```typescript
interface SetChatStickerSetParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target supergroup
  sticker_set_name: string;              // Name of the sticker set to be set as the group sticker set
}
```

## DeleteChatStickerSetParams

Parameters for the deleteChatStickerSet method.

```typescript
interface DeleteChatStickerSetParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target supergroup
}
```

## CreateForumTopicParams

Parameters for the createForumTopic method.

```typescript
interface CreateForumTopicParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target supergroup
  name: string;                          // Topic name, 1-128 characters
  icon_color?: number;                   // Optional. Color of the topic icon in RGB format
  icon_custom_emoji_id?: string;         // Optional. Unique identifier of the custom emoji shown as the topic icon
}
```

## EditForumTopicParams

Parameters for the editForumTopic method.

```typescript
interface EditForumTopicParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target supergroup
  message_thread_id: number;             // Unique identifier for the target message thread of the forum topic
  name?: string;                         // Optional. New topic name, 1-128 characters
  icon_custom_emoji_id?: string;         // Optional. New unique identifier of the custom emoji shown as the topic icon
}
```

## CloseForumTopicParams

Parameters for the closeForumTopic method.

```typescript
interface CloseForumTopicParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target supergroup
  message_thread_id: number;             // Unique identifier for the target message thread of the forum topic
}
```

## ReopenForumTopicParams

Parameters for the reopenForumTopic method.

```typescript
interface ReopenForumTopicParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target supergroup
  message_thread_id: number;             // Unique identifier for the target message thread of the forum topic
}
```

## DeleteForumTopicParams

Parameters for the deleteForumTopic method.

```typescript
interface DeleteForumTopicParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target supergroup
  message_thread_id: number;             // Unique identifier for the target message thread of the forum topic
}
```

## UnpinAllForumTopicMessagesParams

Parameters for the unpinAllForumTopicMessages method.

```typescript
interface UnpinAllForumTopicMessagesParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target supergroup
  message_thread_id: number;             // Unique identifier for the target message thread of the forum topic
}
```

## EditGeneralForumTopicParams

Parameters for the editGeneralForumTopic method.

```typescript
interface EditGeneralForumTopicParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target supergroup
  name: string;                          // New topic name, 1-128 characters
}
```

## CloseGeneralForumTopicParams

Parameters for the closeGeneralForumTopic method.

```typescript
interface CloseGeneralForumTopicParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target supergroup
}
```

## ReopenGeneralForumTopicParams

Parameters for the reopenGeneralForumTopic method.

```typescript
interface ReopenGeneralForumTopicParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target supergroup
}
```

## HideGeneralForumTopicParams

Parameters for the hideGeneralForumTopic method.

```typescript
interface HideGeneralForumTopicParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target supergroup
}
```

## UnhideGeneralForumTopicParams

Parameters for the unhideGeneralForumTopic method.

```typescript
interface UnhideGeneralForumTopicParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target supergroup
}
```

## AnswerCallbackQueryParams

Parameters for the answerCallbackQuery method.

```typescript
interface AnswerCallbackQueryParams {
  callback_query_id: string;             // Unique identifier for the query to be answered
  text?: string;                         // Optional. Text of the notification. If not specified, nothing will be shown to the user
  show_alert?: boolean;                  // Optional. If True, an alert will be shown by the client instead of a notification at the top of the chat screen
  url?: string;                          // Optional. URL that will be opened by the user's client
  cache_time?: number;                   // Optional. The maximum amount of time in seconds that the result of the callback query may be cached client-side
}
```

## SetMyCommandsParams

Parameters for the setMyCommands method.

```typescript
interface SetMyCommandsParams {
  commands: BotCommand[];                // A JSON-serialized list of bot commands
  scope?: BotCommandScope;               // Optional. A JSON-serialized object, describing scope of users for which the commands are relevant
  language_code?: string;                // Optional. A two-letter ISO 639-1 language code
}
```

## DeleteMyCommandsParams

Parameters for the deleteMyCommands method.

```typescript
interface DeleteMyCommandsParams {
  scope?: BotCommandScope;               // Optional. A JSON-serialized object, describing scope of users for which the commands are relevant
  language_code?: string;                // Optional. A two-letter ISO 639-1 language code
}
```

## GetMyCommandsParams

Parameters for the getMyCommands method.

```typescript
interface GetMyCommandsParams {
  scope?: BotCommandScope;               // Optional. A JSON-serialized object, describing scope of users for which the commands are relevant
  language_code?: string;                // Optional. A two-letter ISO 639-1 language code
}
```

## SetMyNameParams

Parameters for the setMyName method.

```typescript
interface SetMyNameParams {
  name?: string;                         // Optional. New bot name; 0-64 characters. Pass an empty string to remove the dedicated name for the given language
  language_code?: string;                // Optional. A two-letter ISO 639-1 language code
}
```

## GetMyNameParams

Parameters for the getMyName method.

```typescript
interface GetMyNameParams {
  language_code?: string;                // Optional. A two-letter ISO 639-1 language code
}
```

## SetMyDescriptionParams

Parameters for the setMyDescription method.

```typescript
interface SetMyDescriptionParams {
  description?: string;                  // Optional. New bot description; 0-512 characters. Pass an empty string to remove the dedicated description for the given language
  language_code?: string;                // Optional. A two-letter ISO 639-1 language code
}
```

## GetMyDescriptionParams

Parameters for the getMyDescription method.

```typescript
interface GetMyDescriptionParams {
  language_code?: string;                // Optional. A two-letter ISO 639-1 language code
}
```

## SetMyShortDescriptionParams

Parameters for the setMyShortDescription method.

```typescript
interface SetMyShortDescriptionParams {
  short_description?: string;            // Optional. New short description for the bot; 0-120 characters. Pass an empty string to remove the dedicated short description for the given language
  language_code?: string;                // Optional. A two-letter ISO 639-1 language code
}
```

## GetMyShortDescriptionParams

Parameters for the getMyShortDescription method.

```typescript
interface GetMyShortDescriptionParams {
  language_code?: string;                // Optional. A two-letter ISO 639-1 language code
}
```

## SetChatMenuButtonParams

Parameters for the setChatMenuButton method.

```typescript
interface SetChatMenuButtonParams {
  chat_id?: number;                      // Optional. Unique identifier for the target private chat
  menu_button?: MenuButton;              // Optional. A JSON-serialized object for the bot's new menu button
}
```

## GetChatMenuButtonParams

Parameters for the getChatMenuButton method.

```typescript
interface GetChatMenuButtonParams {
  chat_id?: number;                      // Optional. Unique identifier for the target private chat
}
```

## SetMyDefaultAdministratorRightsParams

Parameters for the setMyDefaultAdministratorRights method.

```typescript
interface SetMyDefaultAdministratorRightsParams {
  rights?: ChatAdministratorRights;      // Optional. A JSON-serialized object describing new default administrator rights
  for_channels?: boolean;                // Optional. Pass True to change the default administrator rights of the bot in channels
}
```

## GetMyDefaultAdministratorRightsParams

Parameters for the getMyDefaultAdministratorRights method.

```typescript
interface GetMyDefaultAdministratorRightsParams {
  for_channels?: boolean;                // Optional. Pass True to get the default administrator rights of the bot in channels
}
```

## EditMessageTextParams

Parameters for the editMessageText method.

```typescript
interface EditMessageTextParams {
  chat_id?: number | string;             // Optional. Required if inline_message_id is not specified
  message_id?: number;                   // Optional. Required if inline_message_id is not specified
  inline_message_id?: string;            // Optional. Required if chat_id and message_id are not specified
  text: string;                          // New text of the message, 1-4096 characters after entities parsing
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML'; // Optional. Mode for parsing entities in the message text
  entities?: MessageEntity[];            // Optional. A JSON-serialized list of special entities that appear in the message
  disable_web_page_preview?: boolean;    // Optional. Disables link previews for links in the message
  reply_markup?: InlineKeyboardMarkup;   // Optional. A JSON-serialized object for an inline keyboard
}
```

## EditMessageCaptionParams

Parameters for the editMessageCaption method.

```typescript
interface EditMessageCaptionParams {
  chat_id?: number | string;             // Optional. Required if inline_message_id is not specified
  message_id?: number;                   // Optional. Required if inline_message_id is not specified
  inline_message_id?: string;            // Optional. Required if chat_id and message_id are not specified
  caption?: string;                      // Optional. New caption of the message, 0-1024 characters after entities parsing
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML'; // Optional. Mode for parsing entities in the message caption
  caption_entities?: MessageEntity[];    // Optional. A JSON-serialized list of special entities that appear in the message caption
  reply_markup?: InlineKeyboardMarkup;   // Optional. A JSON-serialized object for an inline keyboard
}
```

## EditMessageMediaParams

Parameters for the editMessageMedia method.

```typescript
interface EditMessageMediaParams {
  chat_id?: number | string;             // Optional. Required if inline_message_id is not specified
  message_id?: number;                   // Optional. Required if inline_message_id is not specified
  inline_message_id?: string;            // Optional. Required if chat_id and message_id are not specified
  media: InputMedia;                     // A JSON-serialized object for a new media content of the message
  reply_markup?: InlineKeyboardMarkup;   // Optional. A JSON-serialized object for an inline keyboard
}
```

## EditMessageReplyMarkupParams

Parameters for the editMessageReplyMarkup method.

```typescript
interface EditMessageReplyMarkupParams {
  chat_id?: number | string;             // Optional. Required if inline_message_id is not specified
  message_id?: number;                   // Optional. Required if inline_message_id is not specified
  inline_message_id?: string;            // Optional. Required if chat_id and message_id are not specified
  reply_markup?: InlineKeyboardMarkup;   // Optional. A JSON-serialized object for an inline keyboard
}
```

## StopPollParams

Parameters for the stopPoll method.

```typescript
interface StopPollParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target channel
  message_id: number;                    // Identifier of the original message with the poll
  reply_markup?: InlineKeyboardMarkup;   // Optional. A JSON-serialized object for a new message inline keyboard
}
```

## DeleteMessageParams

Parameters for the deleteMessage method.

```typescript
interface DeleteMessageParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target channel
  message_id: number;                    // Identifier of the message to delete
}
```

## DeleteMessagesParams

Parameters for the deleteMessages method.

```typescript
interface DeleteMessagesParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target channel
  message_ids: number[];                 // A JSON-serialized list of 1-100 identifiers of messages to delete
}
```

## SendStickerParams

Parameters for the sendSticker method.

```typescript
interface SendStickerParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target channel
  message_thread_id?: number;            // Optional. Unique identifier for the target message thread (topic) of the forum
  sticker: string;                       // Sticker to send
  emoji?: string;                        // Optional. Emoji associated with the sticker
  disable_notification?: boolean;        // Optional. Sends the message silently
  protect_content?: boolean;             // Optional. Protects the contents of the sent message from forwarding and saving
  reply_to_message_id?: number;          // Optional. If the message is a reply, ID of the original message
  allow_sending_without_reply?: boolean; // Optional. Pass True if the message should be sent even if the specified replied-to message is not found
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply; // Optional. Additional interface options
}
```

## GetStickerSetParams

Parameters for the getStickerSet method.

```typescript
interface GetStickerSetParams {
  name: string;                          // Name of the sticker set
}
```

## GetCustomEmojiStickersParams

Parameters for the getCustomEmojiStickers method.

```typescript
interface GetCustomEmojiStickersParams {
  custom_emoji_ids: string[];            // A JSON-serialized list of custom emoji identifiers
}
```

## UploadStickerFileParams

Parameters for the uploadStickerFile method.

```typescript
interface UploadStickerFileParams {
  user_id: number;                       // User identifier of sticker file owner
  sticker: string;                       // Sticker file to upload
  sticker_format: 'static' | 'animated' | 'video'; // Format of the sticker
}
```

## CreateNewStickerSetParams

Parameters for the createNewStickerSet method.

```typescript
interface CreateNewStickerSetParams {
  user_id: number;                       // User identifier of created sticker set owner
  name: string;                          // Short name of sticker set, to be used in t.me/addstickers/ URLs
  title: string;                         // Sticker set title, 1-64 characters
  stickers: InputSticker[];              // A JSON-serialized list of 1-50 initial stickers to be added to the set
  sticker_type?: 'regular' | 'mask' | 'custom_emoji'; // Optional. Type of stickers in the set
  needs_repainting?: boolean;            // Optional. Pass True if stickers in the sticker set must be repainted to the color of text when used in messages
}
```

## AddStickerToSetParams

Parameters for the addStickerToSet method.

```typescript
interface AddStickerToSetParams {
  user_id: number;                       // User identifier of sticker set owner
  name: string;                          // Sticker set name
  sticker: InputSticker;                 // A JSON-serialized object with information about the added sticker
}
```

## SetStickerPositionInSetParams

Parameters for the setStickerPositionInSet method.

```typescript
interface SetStickerPositionInSetParams {
  sticker: string;                       // File identifier of the sticker
  position: number;                      // New sticker position in the set, zero-based
}
```

## DeleteStickerFromSetParams

Parameters for the deleteStickerFromSet method.

```typescript
interface DeleteStickerFromSetParams {
  sticker: string;                       // File identifier of the sticker
}
```

## SetStickerEmojiListParams

Parameters for the setStickerEmojiList method.

```typescript
interface SetStickerEmojiListParams {
  sticker: string;                       // File identifier of the sticker
  emoji_list: string[];                  // A JSON-serialized list of 1-20 emoji associated with the sticker
}
```

## SetStickerKeywordsParams

Parameters for the setStickerKeywords method.

```typescript
interface SetStickerKeywordsParams {
  sticker: string;                       // File identifier of the sticker
  keywords?: string[];                   // Optional. A JSON-serialized list of 0-20 search keywords for the sticker with total length of up to 64 characters
}
```

## SetStickerMaskPositionParams

Parameters for the setStickerMaskPosition method.

```typescript
interface SetStickerMaskPositionParams {
  sticker: string;                       // File identifier of the sticker
  mask_position?: MaskPosition;          // Optional. A JSON-serialized object with the position where the mask should be placed on faces
}
```

## SetStickerSetTitleParams

Parameters for the setStickerSetTitle method.

```typescript
interface SetStickerSetTitleParams {
  name: string;                          // Sticker set name
  title: string;                         // Sticker set title, 1-64 characters
}
```

## SetStickerSetThumbnailParams

Parameters for the setStickerSetThumbnail method.

```typescript
interface SetStickerSetThumbnailParams {
  name: string;                          // Sticker set name
  user_id: number;                       // User identifier of the sticker set owner
  thumbnail?: string;                    // Optional. A PNG image with the thumbnail, must be up to 128 kilobytes in size and have width and height exactly 100px, or a TGS animation with the thumbnail up to 32 kilobytes in size
}
```

## SetCustomEmojiStickerSetThumbnailParams

Parameters for the setCustomEmojiStickerSetThumbnail method.

```typescript
interface SetCustomEmojiStickerSetThumbnailParams {
  name: string;                          // Sticker set name
  custom_emoji_id?: string;              // Optional. Custom emoji identifier of a sticker from the sticker set
}
```

## DeleteStickerSetParams

Parameters for the deleteStickerSet method.

```typescript
interface DeleteStickerSetParams {
  name: string;                          // Sticker set name
}
```

## AnswerInlineQueryParams

Parameters for the answerInlineQuery method.

```typescript
interface AnswerInlineQueryParams {
  inline_query_id: string;               // Unique identifier for the answered query
  results: InlineQueryResult[];          // A JSON-serialized array of results for the inline query
  cache_time?: number;                   // Optional. The maximum amount of time in seconds that the result of the inline query may be cached on the server
  is_personal?: boolean;                 // Optional. Pass True if results may be cached on the server side only for the user that sent the query
  next_offset?: string;                  // Optional. Pass the offset that a client should send in the next query with the same text to receive more results
  button?: InlineQueryResultsButton;     // Optional. A JSON-serialized object describing a button to be shown above inline query results
}
```

## SendInvoiceParams

Parameters for the sendInvoice method.

```typescript
interface SendInvoiceParams {
  chat_id: number | string;              // Unique identifier for the target chat or username of the target channel
  message_thread_id?: number;            // Optional. Unique identifier for the target message thread (topic) of the forum
  title: string;                         // Product name, 1-32 characters
  description: string;                   // Product description, 1-255 characters
  payload: string;                       // Bot-defined invoice payload, 1-128 bytes
  provider_token: string;                // Payment provider token
  currency: string;                      // Three-letter ISO 4217 currency code
  prices: LabeledPrice[];                // Price breakdown, a JSON-serialized list of components
  max_tip_amount?: number;               // Optional. The maximum accepted amount for tips in the smallest units of the currency
  suggested_tip_amounts?: number[];      // Optional. A JSON-serialized array of suggested amounts of tips in the smallest units of the currency
  start_parameter?: string;              // Optional. Unique deep-linking parameter
  provider_data?: string;                // Optional. JSON-encoded data about the invoice
  photo_url?: string;                    // Optional. URL of the product photo for the invoice
  photo_size?: number;                   // Optional. Photo size in bytes
  photo_width?: number;                  // Optional. Photo width
  photo_height?: number;                 // Optional. Photo height
  need_name?: boolean;                   // Optional. Pass True if you require the user's full name to complete the order
  need_phone_number?: boolean;           // Optional. Pass True if you require the user's phone number to complete the order
  need_email?: boolean;                  // Optional. Pass True if you require the user's email address to complete the order
  need_shipping_address?: boolean;       // Optional. Pass True if you require the user's shipping address to complete the order
  send_phone_number_to_provider?: boolean; // Optional. Pass True if the user's phone number should be sent to the provider
  send_email_to_provider?: boolean;      // Optional. Pass True if the user's email address should be sent to the provider
  is_flexible?: boolean;                 // Optional. Pass True if the final price depends on the shipping method
  disable_notification?: boolean;        // Optional. Sends the message silently
  protect_content?: boolean;             // Optional. Protects the contents of the sent message from forwarding and saving
  reply_to_message_id?: number;          // Optional. If the message is a reply, ID of the original message
  allow_sending_without_reply?: boolean; // Optional. Pass True if the message should be sent even if the specified replied-to message is not found
  reply_markup?: InlineKeyboardMarkup;   // Optional. A JSON-serialized object for an inline keyboard
}
```

## CreateInvoiceLinkParams

Parameters for the createInvoiceLink method.

```typescript
interface CreateInvoiceLinkParams {
  title: string;                         // Product name, 1-32 characters
  description: string;                   // Product description, 1-255 characters
  payload: string;                       // Bot-defined invoice payload, 1-128 bytes
  provider_token: string;                // Payment provider token
  currency: string;                      // Three-letter ISO 4217 currency code
  prices: LabeledPrice[];                // Price breakdown, a JSON-serialized list of components
  max_tip_amount?: number;               // Optional. The maximum accepted amount for tips in the smallest units of the currency
  suggested_tip_amounts?: number[];      // Optional. A JSON-serialized array of suggested amounts of tips in the smallest units of the currency
  provider_data?: string;                // Optional. JSON-encoded data about the invoice
  photo_url?: string;                    // Optional. URL of the product photo for the invoice
  photo_size?: number;                   // Optional. Photo size in bytes
  photo_width?: number;                  // Optional. Photo width
  photo_height?: number;                 // Optional. Photo height
  need_name?: boolean;                   // Optional. Pass True if you require the user's full name to complete the order
  need_phone_number?: boolean;           // Optional. Pass True if you require the user's phone number to complete the order
  need_email?: boolean;                  // Optional. Pass True if you require the user's email address to complete the order
  need_shipping_address?: boolean;       // Optional. Pass True if you require the user's shipping address to complete the order
  send_phone_number_to_provider?: boolean; // Optional. Pass True if the user's phone number should be sent to the provider
  send_email_to_provider?: boolean;      // Optional. Pass True if the user's email address should be sent to the provider
  is_flexible?: boolean;                 // Optional. Pass True if the final price depends on the shipping method
}
```

## AnswerShippingQueryParams

Parameters for the answerShippingQuery method.

```typescript
interface AnswerShippingQueryParams {
  shipping_query_id: string;             // Unique identifier for the query to be answered
  ok: boolean;                           // Specify True if delivery to the specified address is possible and False if there are any problems
  shipping_options?: ShippingOption[];   // Optional. Required if ok is True. A JSON-serialized array of available shipping options
  error_message?: string;                // Optional. Required if ok is False. Error message in human readable form that explains why it is impossible to complete the order
}
```

## AnswerPreCheckoutQueryParams

Parameters for the answerPreCheckoutQuery method.

```typescript
interface AnswerPreCheckoutQueryParams {
  pre_checkout_query_id: string;         // Unique identifier for the query to be answered
  ok: boolean;                           // Specify True if everything is alright and the bot is ready to proceed with the order
  error_message?: string;                // Optional. Required if ok is False. Error message in human readable form that explains the reason for failure to proceed with the checkout
}
```

## SetPassportDataErrorsParams

Parameters for the setPassportDataErrors method.

```typescript
interface SetPassportDataErrorsParams {
  user_id: number;                       // User identifier
  errors: PassportElementError[];        // A JSON-serialized array describing the errors
}
```

## SendGameParams

Parameters for the sendGame method.

```typescript
interface SendGameParams {
  chat_id: number;                       // Unique identifier for the target chat
  message_thread_id?: number;            // Optional. Unique identifier for the target message thread (topic) of the forum
  game_short_name: string;               // Short name of the game, serves as the unique identifier for the game
  disable_notification?: boolean;        // Optional. Sends the message silently
  protect_content?: boolean;             // Optional. Protects the contents of the sent message from forwarding and saving
  reply_to_message_id?: number;          // Optional. If the message is a reply, ID of the original message
  allow_sending_without_reply?: boolean; // Optional. Pass True if the message should be sent even if the specified replied-to message is not found
  reply_markup?: InlineKeyboardMarkup;   // Optional. A JSON-serialized object for an inline keyboard
}
```

## SetGameScoreParams

Parameters for the setGameScore method.

```typescript
interface SetGameScoreParams {
  user_id: number;                       // User identifier
  score: number;                         // New score, must be non-negative
  force?: boolean;                       // Optional. Pass True if the high score is allowed to decrease
  disable_edit_message?: boolean;        // Optional. Pass True if the game message should not be automatically edited to include the current scoreboard
  chat_id?: number;                      // Optional. Required if inline_message_id is not specified. Unique identifier for the target chat
  message_id?: number;                   // Optional. Required if inline_message_id is not specified. Identifier of the sent message
  inline_message_id?: string;            // Optional. Required if chat_id and message_id are not specified. Identifier of the inline message
}
```

## GetGameHighScoresParams

Parameters for the getGameHighScores method.

```typescript
interface GetGameHighScoresParams {
  user_id: number;                       // Target user id
  chat_id?: number;                      // Optional. Required if inline_message_id is not specified. Unique identifier for the target chat
  message_id?: number;                   // Optional. Required if inline_message_id is not specified. Identifier of the sent message
  inline_message_id?: string;            // Optional. Required if chat_id and message_id are not specified. Identifier of the inline message
}
```

## SetWebhookParams

Parameters for the setWebhook method.

```typescript
interface SetWebhookParams {
  url: string;                           // HTTPS URL to send updates to
  certificate?: string;                  // Optional. Upload your public key certificate
  ip_address?: string;                   // Optional. The fixed IP address which will be used to send webhook requests
  max_connections?: number;              // Optional. Maximum allowed number of simultaneous HTTPS connections
  allowed_updates?: string[];            // Optional. A JSON-serialized list of the update types you want your bot to receive
  drop_pending_updates?: boolean;        // Optional. Pass True to drop all pending updates
  secret_token?: string;                 // Optional. A secret token to be sent in a header 'X-Telegram-Bot-Api-Secret-Token' in every webhook request
}
```

## DeleteWebhookParams

Parameters for the deleteWebhook method.

```typescript
interface DeleteWebhookParams {
  drop_pending_updates?: boolean;        // Optional. Pass True to drop all pending updates
}
```