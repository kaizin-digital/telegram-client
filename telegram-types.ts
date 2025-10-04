// telegram-types.ts - Complete Telegram Bot API types

/**
 * This file contains the complete type definitions for the Telegram Bot API
 * Based on the official documentation: https://core.telegram.org/bots/api
 */

// Base Response Types
export interface ApiResponse<T> {
  ok: boolean;
  result?: T;
  error_code?: number;
  description?: string;
}

// Core Telegram Types
/**
 * Represents a Telegram user or bot
 */
export interface User {
  /** Unique identifier for this user or bot */
  id: number;
  /** True, if this user is a bot */
  is_bot: boolean;
  /** User's or bot's first name */
  first_name: string;
  /** Optional. User's or bot's last name */
  last_name?: string;
  /** Optional. User's or bot's username */
  username?: string;
  /** Optional. IETF language tag of the user's language */
  language_code?: string;
  /** Optional. True, if this user is a Telegram Premium user */
  is_premium?: true;
  /** Optional. True, if this user added the bot to the attachment menu */
  added_to_attachment_menu?: true;
}

/**
 * Represents a chat
 */
export interface Chat {
  /** Unique identifier for this chat */
  id: number;
  /** Type of chat, can be either 'private', 'group', 'supergroup' or 'channel' */
  type: 'private' | 'group' | 'supergroup' | 'channel';
  /** Optional. Title, for supergroups, channels and group chats */
  title?: string;
  /** Optional. Username, for private chats, supergroups and channels if available */
  username?: string;
  /** Optional. First name of the other party in a private chat */
  first_name?: string;
  /** Optional. Last name of the other party in a private chat */
  last_name?: string;
  /** Optional. True, if the supergroup chat is a forum */
  is_forum?: true;
}

/**
 * Represents a message
 */
export interface Message {
  /** Unique message identifier inside this chat */
  message_id: number;
  /** Optional. Unique identifier of a message thread to which the message belongs; for supergroups only */
  message_thread_id?: number;
  /** Optional. Sender of the message; empty for messages sent to channels */
  from?: User;
  /** Optional. Sender of the message, sent on behalf of a chat */
  sender_chat?: Chat;
  /** Date the message was sent in Unix time */
  date: number;
  /** Chat the message belongs to */
  chat: Chat;
  /** Optional. For forwarded messages, sender of the original message */
  forward_from?: User;
  /** Optional. For messages forwarded from channels or from anonymous administrators */
  forward_from_chat?: Chat;
  /** Optional. For messages forwarded from channels, identifier of the original message in the channel */
  forward_from_message_id?: number;
  /** Optional. For messages forwarded from channels, signature of the post author if present */
  forward_signature?: string;
  /** Optional. Sender's name for messages forwarded from users who disallow adding a link to their account in forwarded messages */
  forward_sender_name?: string;
  /** Optional. For forwarded messages, date the original message was sent in Unix time */
  forward_date?: number;
  /** Optional. True, if the message is sent to a forum topic */
  is_topic_message?: true;
  /** Optional. True, if the message is a channel post that was automatically forwarded to the connected discussion group */
  is_automatic_forward?: true;
  /** Optional. For replies, the original message. Note that the Message object in this field will not contain further reply_to_message fields even if it itself is a reply */
  reply_to_message?: Message;
  /** Optional. Bot through which the message was sent */
  via_bot?: User;
  /** Optional. Date the message was last edited in Unix time */
  edit_date?: number;
  /** Optional. True, if the message can't be forwarded */
  has_protected_content?: true;
  /** Optional. The unique identifier of a media message group this message belongs to */
  media_group_id?: string;
  /** Optional. Signature of the post author for messages in channels, or the custom title of an administrator in group chats */
  author_signature?: string;
  /** Optional. For text messages, the actual UTF-8 text of the message */
  text?: string;
  /** Optional. For text messages, special entities like usernames, URLs, bot commands, etc. that appear in the text */
  entities?: MessageEntity[];
  /** Optional. Message is an animation, information about the animation */
  animation?: Animation;
  /** Optional. Message is an audio file, information about the file */
  audio?: Audio;
  /** Optional. Message is a general file, information about the file */
  document?: Document;
  /** Optional. Message is a photo, available sizes of the photo */
  photo?: PhotoSize[];
  /** Optional. Message is a sticker, information about the sticker */
  sticker?: Sticker;
  /** Optional. Message is a forwarded story */
  story?: Story;
  /** Optional. Message is a video, information about the video */
  video?: Video;
  /** Optional. Message is a video note, information about the video message */
  video_note?: VideoNote;
  /** Optional. Message is a voice message, information about the file */
  voice?: Voice;
  /** Optional. Caption for the animation, audio, document, photo, video or voice */
  caption?: string;
  /** Optional. For messages with a caption, special entities like usernames, URLs, bot commands, etc. that appear in the caption */
  caption_entities?: MessageEntity[];
  /** Optional. True, if the caption must be shown above the message media */
  has_media_spoiler?: true;
  /** Optional. Message is a shared contact, information about the contact */
  contact?: Contact;
  /** Optional. Message is a dice with random value */
  dice?: Dice;
  /** Optional. Message is a game, information about the game */
  game?: Game;
  /** Optional. Message is a native poll, information about the poll */
  poll?: Poll;
  /** Optional. Message is a venue, information about the venue */
  venue?: Venue;
  /** Optional. Message is a shared location, information about the location */
  location?: Location;
  /** Optional. New members that were added to the group or supergroup and information about them (the bot itself may be one of these members) */
  new_chat_members?: User[];
  /** Optional. A member was removed from the group, information about them (this member may be the bot itself) */
  left_chat_member?: User;
  /** Optional. A chat title was changed to this value */
  new_chat_title?: string;
  /** Optional. A chat photo was change to this value */
  new_chat_photo?: PhotoSize[];
  /** Optional. Service message: the chat photo was deleted */
  delete_chat_photo?: true;
  /** Optional. Service message: the group has been created */
  group_chat_created?: true;
  /** Optional. Service message: the supergroup has been created */
  supergroup_chat_created?: true;
  /** Optional. Service message: the channel has been created */
  channel_chat_created?: true;
  /** Optional. Service message: auto-delete timer settings changed in the chat */
  message_auto_delete_timer_changed?: MessageAutoDeleteTimerChanged;
  /** Optional. The group has been migrated to a supergroup with the specified identifier */
  migrate_to_chat_id?: number;
  /** Optional. The supergroup has been migrated from a group with the specified identifier */
  migrate_from_chat_id?: number;
  /** Optional. Specified message was pinned. Note that the Message object in this field will not contain further reply_to_message fields even if it is itself a reply */
  pinned_message?: Message;
  /** Optional. Message is an invoice for a payment, information about the invoice */
  invoice?: Invoice;
  /** Optional. Message is a service message about a successful payment, information about the payment */
  successful_payment?: SuccessfulPayment;
  /** Optional. Service message: a user was shared with the bot */
  user_shared?: UserShared;
  /** Optional. Service message: a chat was shared with the bot */
  chat_shared?: ChatShared;
  /** Optional. The domain name of the website on which the user has logged in */
  connected_website?: string;
  /** Optional. Service message: the user allowed the bot added to the attachment menu to write messages */
  write_access_allowed?: WriteAccessAllowed;
  /** Optional. Telegram Passport data */
  passport_data?: PassportData;
  /** Optional. Service message. A user in the chat triggered another user's proximity alert while sharing Live Location */
  proximity_alert_triggered?: ProximityAlertTriggered;
  /** Optional. Service message: forum topic created */
  forum_topic_created?: ForumTopicCreated;
  /** Optional. Service message: forum topic edited */
  forum_topic_edited?: ForumTopicEdited;
  /** Optional. Service message: forum topic closed */
  forum_topic_closed?: ForumTopicClosed;
  /** Optional. Service message: forum topic reopened */
  forum_topic_reopened?: ForumTopicReopened;
  /** Optional. Service message: the 'General' forum topic hidden */
  general_forum_topic_hidden?: GeneralForumTopicHidden;
  /** Optional. Service message: the 'General' forum topic unhidden */
  general_forum_topic_unhidden?: GeneralForumTopicUnhidden;
  /** Optional. Service message: a scheduled giveaway was created */
  giveaway_created?: Giveaway;
  /** Optional. The message is a scheduled giveaway message */
  giveaway?: Giveaway;
  /** Optional. A giveaway with public winners was completed */
  giveaway_winners?: GiveawayWinners;
  /** Optional. Service message: a giveaway without public winners was completed */
  giveaway_completed?: GiveawayCompleted;
  /** Optional. Service message: video chat scheduled */
  video_chat_scheduled?: VideoChatScheduled;
  /** Optional. Service message: video chat started */
  video_chat_started?: VideoChatStarted;
  /** Optional. Service message: video chat ended */
  video_chat_ended?: VideoChatEnded;
  /** Optional. Service message: new participants invited to the video chat */
  video_chat_participants_invited?: VideoChatParticipantsInvited;
  /** Optional. Service message: data sent by a Web App */
  web_app_data?: WebAppData;
  /** Optional. Inline keyboard attached to the message. login_url buttons are represented as ordinary url buttons */
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}

export interface MessageEntity {
  type: 'mention' | 'hashtag' | 'cashtag' | 'bot_command' | 'url' | 'email' | 'phone_number' | 'bold' | 'italic' | 'underline' | 'strikethrough' | 'spoiler' | 'code' | 'pre' | 'text_link' | 'text_mention' | 'custom_emoji';
  offset: number;
  length: number;
  url?: string;
  user?: User;
  language?: string;
  custom_emoji_id?: string;
}

export interface PhotoSize {
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
  file_size?: number;
}

export interface Animation {
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
  duration: number;
  thumb?: PhotoSize;
  file_name?: string;
  mime_type?: string;
  file_size?: number;
}

export interface Audio {
  file_id: string;
  file_unique_id: string;
  duration: number;
  performer?: string;
  title?: string;
  file_name?: string;
  mime_type?: string;
  file_size?: number;
  thumb?: PhotoSize;
}

export interface Document {
  file_id: string;
  file_unique_id: string;
  thumb?: PhotoSize;
  file_name?: string;
  mime_type?: string;
  file_size?: number;
}

export interface Video {
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
  duration: number;
  thumb?: PhotoSize;
  file_name?: string;
  mime_type?: string;
  file_size?: number;
}

export interface VideoNote {
  file_id: string;
  file_unique_id: string;
  length: number;
  duration: number;
  thumb?: PhotoSize;
  file_size?: number;
}

export interface Voice {
  file_id: string;
  file_unique_id: string;
  duration: number;
  mime_type?: string;
  file_size?: number;
}

export interface Contact {
  phone_number: string;
  first_name: string;
  last_name?: string;
  user_id?: number;
  vcard?: string;
}

export interface Dice {
  emoji: string;
  value: number;
}

export interface PollOption {
  text: string;
  voter_count: number;
}

export interface PollAnswer {
  poll_id: string;
  user: User;
  option_ids: number[];
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  total_voter_count: number;
  is_closed: boolean;
  is_anonymous: boolean;
  type: 'regular' | 'quiz';
  allows_multiple_answers: boolean;
  correct_option_id?: number;
  explanation?: string;
  explanation_entities?: MessageEntity[];
  open_period?: number;
  close_date?: number;
}

export interface Location {
  longitude: number;
  latitude: number;
  horizontal_accuracy?: number;
  live_period?: number;
  heading?: number;
  proximity_alert_radius?: number;
}

export interface Venue {
  location: Location;
  title: string;
  address: string;
  foursquare_id?: string;
  foursquare_type?: string;
  google_place_id?: string;
  google_place_type?: string;
}

export interface WebAppData {
  data: string;
  button_text: string;
}

export interface ProximityAlertTriggered {
  traveler: User;
  watcher: User;
  distance: number;
}

export interface MessageAutoDeleteTimerChanged {
  message_auto_delete_time: number;
}

export interface ForumTopicCreated {
  name: string;
  icon_color: number;
  icon_custom_emoji_id?: string;
}

export interface ForumTopicClosed {}

export interface ForumTopicEdited {
  name?: string;
  icon_custom_emoji_id?: string;
}

export interface ForumTopicReopened {}

export interface GeneralForumTopicHidden {}

export interface GeneralForumTopicUnhidden {}

export interface UserShared {
  request_id: number;
  user_id: number;
}

export interface ChatShared {
  request_id: number;
  chat_id: number;
}

export interface WriteAccessAllowed {
  from_request?: true;
  web_app_name?: string;
  from_attachment_menu?: true;
}

export interface VideoChatScheduled {
  start_date: number;
}

export interface VideoChatStarted {}

export interface VideoChatEnded {
  duration: number;
}

export interface VideoChatParticipantsInvited {
  users: User[];
}

export interface UserProfilePhotos {
  total_count: number;
  photos: PhotoSize[][];
}

export interface File {
  file_id: string;
  file_unique_id: string;
  file_size?: number;
  file_path?: string;
}

export interface WebAppInfo {
  url: string;
}

export interface ReplyKeyboardMarkup {
  keyboard: KeyboardButton[][];
  is_persistent?: boolean;
  resize_keyboard?: boolean;
  one_time_keyboard?: boolean;
  input_field_placeholder?: string;
  selective?: boolean;
}

export interface KeyboardButton {
  text: string;
  request_user?: KeyboardButtonRequestUser;
  request_chat?: KeyboardButtonRequestChat;
  request_contact?: boolean;
  request_location?: boolean;
  request_poll?: KeyboardButtonPollType;
  web_app?: WebAppInfo;
}

export interface KeyboardButtonRequestUser {
  request_id: number;
  user_is_bot?: boolean;
  user_is_premium?: boolean;
}

export interface KeyboardButtonRequestChat {
  request_id: number;
  chat_is_channel: boolean;
  chat_is_forum?: boolean;
  chat_has_username?: boolean;
  chat_is_created?: boolean;
  user_administrator_rights?: ChatAdministratorRights;
  bot_administrator_rights?: ChatAdministratorRights;
  bot_is_member?: boolean;
}

export interface KeyboardButtonPollType {
  type?: 'quiz' | 'regular';
}

export interface ReplyKeyboardRemove {
  remove_keyboard: true;
  selective?: boolean;
}

export interface InlineKeyboardMarkup {
  inline_keyboard: InlineKeyboardButton[][];
}

export interface InlineKeyboardButton {
  text: string;
  url?: string;
  callback_data?: string;
  web_app?: WebAppInfo;
  login_url?: LoginUrl;
  switch_inline_query?: string;
  switch_inline_query_current_chat?: string;
  switch_inline_query_chosen_chat?: SwitchInlineQueryChosenChat;
  callback_game?: CallbackGame;
  pay?: boolean;
}

export interface LoginUrl {
  url: string;
  forward_text?: string;
  bot_username?: string;
  request_write_access?: boolean;
}

export interface SwitchInlineQueryChosenChat {
  query?: string;
  allow_user_chats?: boolean;
  allow_bot_chats?: boolean;
  allow_group_chats?: boolean;
  allow_channel_chats?: boolean;
}

export interface CallbackQuery {
  id: string;
  from: User;
  message?: Message;
  inline_message_id?: string;
  chat_instance: string;
  data?: string;
  game_short_name?: string;
}

export interface ForceReply {
  force_reply: true;
  input_field_placeholder?: string;
  selective?: boolean;
}

export interface ChatPhoto {
  small_file_id: string;
  small_file_unique_id: string;
  big_file_id: string;
  big_file_unique_id: string;
}

export interface ChatInviteLink {
  invite_link: string;
  creator: User;
  creates_join_request: boolean;
  is_primary: boolean;
  is_revoked: boolean;
  name?: string;
  expire_date?: number;
  member_limit?: number;
  pending_join_request_count?: number;
}

export interface ChatAdministratorRights {
  is_anonymous: boolean;
  can_manage_chat: boolean;
  can_delete_messages: boolean;
  can_manage_video_chats: boolean;
  can_restrict_members: boolean;
  can_promote_members: boolean;
  can_change_info: boolean;
  can_invite_users: boolean;
  can_post_messages?: boolean;
  can_edit_messages?: boolean;
  can_pin_messages?: boolean;
  can_post_stories?: boolean;
  can_edit_stories?: boolean;
  can_delete_stories?: boolean;
  can_manage_topics?: boolean;
}

export interface ChatMember {
  status: 'creator' | 'administrator' | 'member' | 'restricted' | 'left' | 'kicked';
  user: User;
}

export interface ChatMemberOwner extends ChatMember {
  status: 'creator';
  is_anonymous: boolean;
  custom_title?: string;
}

export interface ChatMemberAdministrator extends ChatMember {
  status: 'administrator';
  can_be_edited: boolean;
  is_anonymous: boolean;
  can_manage_chat: boolean;
  can_delete_messages: boolean;
  can_manage_video_chats: boolean;
  can_restrict_members: boolean;
  can_promote_members: boolean;
  can_change_info: boolean;
  can_invite_users: boolean;
  can_post_messages?: boolean;
  can_edit_messages?: boolean;
  can_pin_messages?: boolean;
  can_post_stories?: boolean;
  can_edit_stories?: boolean;
  can_delete_stories?: boolean;
  can_manage_topics?: boolean;
  custom_title?: string;
}

export interface ChatMemberMember extends ChatMember {
  status: 'member';
}

export interface ChatMemberRestricted extends ChatMember {
  status: 'restricted';
  is_member: boolean;
  can_send_messages: boolean;
  can_send_audios: boolean;
  can_send_documents: boolean;
  can_send_photos: boolean;
  can_send_videos: boolean;
  can_send_video_notes: boolean;
  can_send_voice_notes: boolean;
  can_send_polls: boolean;
  can_send_other_messages: boolean;
  can_add_web_page_previews: boolean;
  can_change_info: boolean;
  can_invite_users: boolean;
  can_pin_messages: boolean;
  can_manage_topics: boolean;
  until_date: number;
}

export interface ChatMemberLeft extends ChatMember {
  status: 'left';
}

export interface ChatMemberBanned extends ChatMember {
  status: 'kicked';
  until_date: number;
}

export interface ChatMemberUpdated {
  chat: Chat;
  from: User;
  date: number;
  old_chat_member: ChatMember;
  new_chat_member: ChatMember;
  invite_link?: ChatInviteLink;
  via_chat_folder_invite_link?: boolean;
}

export interface ChatJoinRequest {
  chat: Chat;
  from: User;
  user_chat_id: number;
  date: number;
  bio?: string;
  invite_link?: ChatInviteLink;
}

export interface ChatPermissions {
  can_send_messages?: boolean;
  can_send_audios?: boolean;
  can_send_documents?: boolean;
  can_send_photos?: boolean;
  can_send_videos?: boolean;
  can_send_video_notes?: boolean;
  can_send_voice_notes?: boolean;
  can_send_polls?: boolean;
  can_send_other_messages?: boolean;
  can_add_web_page_previews?: boolean;
  can_change_info?: boolean;
  can_invite_users?: boolean;
  can_pin_messages?: boolean;
  can_manage_topics?: boolean;
}

export interface ChatLocation {
  location: Location;
  address: string;
}

export interface ForumTopic {
  message_thread_id: number;
  name: string;
  icon_color: number;
  icon_custom_emoji_id?: string;
}

export interface BotCommand {
  command: string;
  description: string;
}

export interface BotCommandScope {
  type: string;
}

export interface BotCommandScopeDefault extends BotCommandScope {
  type: 'default';
}

export interface BotCommandScopeAllPrivateChats extends BotCommandScope {
  type: 'all_private_chats';
}

export interface BotCommandScopeAllGroupChats extends BotCommandScope {
  type: 'all_group_chats';
}

export interface BotCommandScopeAllChatAdministrators extends BotCommandScope {
  type: 'all_chat_administrators';
}

export interface BotCommandScopeChat extends BotCommandScope {
  type: 'chat';
  chat_id: number | string;
}

export interface BotCommandScopeChatAdministrators extends BotCommandScope {
  type: 'chat_administrators';
  chat_id: number | string;
}

export interface BotCommandScopeChatMember extends BotCommandScope {
  type: 'chat_member';
  chat_id: number | string;
  user_id: number;
}

export interface BotName {
  name: string;
}

export interface BotDescription {
  description: string;
}

export interface BotShortDescription {
  short_description: string;
}

export interface MenuButton {
  type: string;
}

export interface MenuButtonCommands extends MenuButton {
  type: 'commands';
}

export interface MenuButtonWebApp extends MenuButton {
  type: 'web_app';
  text: string;
  web_app: WebAppInfo;
}

export interface MenuButtonDefault extends MenuButton {
  type: 'default';
}

export interface ResponseParameters {
  migrate_to_chat_id?: number;
  retry_after?: number;
}

export interface InputMedia {
  type: string;
  media: string;
  caption?: string;
  parse_mode?: string;
  caption_entities?: MessageEntity[];
}

export interface InputMediaPhoto extends InputMedia {
  type: 'photo';
  has_spoiler?: boolean;
}

export interface InputMediaVideo extends InputMedia {
  type: 'video';
  thumb?: string;
  width?: number;
  height?: number;
  duration?: number;
  supports_streaming?: boolean;
  has_spoiler?: boolean;
}

export interface InputMediaAnimation extends InputMedia {
  type: 'animation';
  thumb?: string;
  width?: number;
  height?: number;
  duration?: number;
  has_spoiler?: boolean;
}

export interface InputMediaAudio extends InputMedia {
  type: 'audio';
  thumb?: string;
  duration?: number;
  performer?: string;
  title?: string;
}

export interface InputMediaDocument extends InputMedia {
  type: 'document';
  thumb?: string;
  disable_content_type_detection?: boolean;
}

export interface Sticker {
  file_id: string;
  file_unique_id: string;
  type: 'regular' | 'mask' | 'custom_emoji';
  width: number;
  height: number;
  is_animated: boolean;
  is_video: boolean;
  thumb?: PhotoSize;
  emoji?: string;
  set_name?: string;
  premium_animation?: File;
  mask_position?: MaskPosition;
  custom_emoji_id?: string;
  needs_repainting?: boolean;
  file_size?: number;
}

export interface StickerSet {
  name: string;
  title: string;
  sticker_type: 'regular' | 'mask' | 'custom_emoji';
  is_animated: boolean;
  is_video: boolean;
  stickers: Sticker[];
  thumb?: PhotoSize;
}

export interface MaskPosition {
  point: 'forehead' | 'eyes' | 'mouth' | 'chin';
  x_shift: number;
  y_shift: number;
  scale: number;
}

export interface InputSticker {
  sticker: string;
  emoji_list: string[];
  mask_position?: MaskPosition;
  keywords?: string[];
}

export interface Story {
  chat: Chat;
  id: number;
}

export interface Game {
  title: string;
  description: string;
  photo: PhotoSize[];
  text?: string;
  text_entities?: MessageEntity[];
  animation?: Animation;
}

export interface GameHighScore {
  position: number;
  user: User;
  score: number;
}

export interface Giveaway {
  chats: Chat[];
  winners_selection_date: number;
  winner_count: number;
  only_new_members?: true;
  has_public_winners?: true;
  prize_description?: string;
  country_codes?: string[];
  premium_subscription_month_count?: number;
}

export interface GiveawayWinners {
  chat: Chat;
  giveaway_message_id: number;
  winners_selection_date: number;
  winner_count: number;
  winners: User[];
  additional_chat_count?: number;
  premium_subscription_month_count?: number;
  unclaimed_prize_count?: number;
  only_new_members?: true;
  was_refunded?: true;
  prize_description?: string;
}

export interface GiveawayCompleted {
  winner_count: number;
  unclaimed_prize_count?: number;
  giveaway_message?: Message;
}

export interface Invoice {
  title: string;
  description: string;
  start_parameter: string;
  currency: string;
  total_amount: number;
}

export interface SuccessfulPayment {
  currency: string;
  total_amount: number;
  invoice_payload: string;
  shipping_option_id?: string;
  order_info?: OrderInfo;
  telegram_payment_charge_id: string;
  provider_payment_charge_id: string;
}

export interface ShippingAddress {
  country_code: string;
  state: string;
  city: string;
  street_line1: string;
  street_line2: string;
  post_code: string;
}

export interface OrderInfo {
  name?: string;
  phone_number?: string;
  email?: string;
  shipping_address?: ShippingAddress;
}

export interface ShippingOption {
  id: string;
  title: string;
  prices: LabeledPrice[];
}

export interface SuccessfulPayment {
  currency: string;
  total_amount: number;
  invoice_payload: string;
  shipping_option_id?: string;
  order_info?: OrderInfo;
  telegram_payment_charge_id: string;
  provider_payment_charge_id: string;
}

export interface PassportData {
  data: EncryptedPassportElement[];
  credentials: EncryptedCredentials;
}

export interface PassportFile {
  file_id: string;
  file_unique_id: string;
  file_size: number;
  file_date: number;
}

export interface EncryptedPassportElement {
  type: 'personal_details' | 'passport' | 'driver_license' | 'identity_card' | 'internal_passport' | 'address' | 'utility_bill' | 'bank_statement' | 'rental_agreement' | 'passport_registration' | 'temporary_registration' | 'phone_number' | 'email';
  data?: string;
  phone_number?: string;
  email?: string;
  files?: PassportFile[];
  front_side?: PassportFile;
  reverse_side?: PassportFile;
  selfie?: PassportFile;
  translation?: PassportFile[];
  hash: string;
}

export interface EncryptedCredentials {
  data: string;
  hash: string;
  secret: string;
}

export interface LabeledPrice {
  label: string;
  amount: number;
}

export interface ShippingQuery {
  id: string;
  from: User;
  invoice_payload: string;
  shipping_address: ShippingAddress;
}

export interface PreCheckoutQuery {
  id: string;
  from: User;
  currency: string;
  total_amount: number;
  invoice_payload: string;
  shipping_option_id?: string;
  order_info?: OrderInfo;
}

export interface PaidMediaInfo {
  star_count: number;
  paid_media: PaidMedia[];
}

export interface PaidMedia {
  type: string;
}

export interface PaidMediaPreview extends PaidMedia {
  type: 'preview';
  width?: number;
  height?: number;
  duration?: number;
}

export interface PaidMediaPhoto extends PaidMedia {
  type: 'photo';
  photo: PhotoSize[];
}

export interface PaidMediaVideo extends PaidMedia {
  type: 'video';
  video: Video;
}

export interface PurchasedPaidMedia {
  from: User;
  paid_media: PaidMediaInfo;
}

export interface StarTransactions {
  transactions: StarTransaction[];
}

export interface StarTransaction {
  id: string;
  amount: number;
  date: number;
  source?: TransactionPartner;
  receiver?: TransactionPartner;
}

export interface TransactionPartner {
  type: string;
}

export interface TransactionPartnerUser extends TransactionPartner {
  type: 'user';
  user: User;
  invoice_payload?: string;
}

export interface TransactionPartnerFragment extends TransactionPartner {
  type: 'fragment';
  withdrawal_state?: RevenueWithdrawalState;
}

export interface TransactionPartnerTelegramAds extends TransactionPartner {
  type: 'telegram_ads';
}

export interface TransactionPartnerOther extends TransactionPartner {
  type: 'other';
}

export interface RevenueWithdrawalState {
  type: string;
}

export interface RevenueWithdrawalStatePending extends RevenueWithdrawalState {
  type: 'pending';
}

export interface RevenueWithdrawalStateSucceeded extends RevenueWithdrawalState {
  type: 'succeeded';
  date: number;
  url: string;
}

export interface RevenueWithdrawalStateFailed extends RevenueWithdrawalState {
  type: 'failed';
}

export interface StickerSet {
  name: string;
  title: string;
  sticker_type: 'regular' | 'mask' | 'custom_emoji';
  is_animated: boolean;
  is_video: boolean;
  stickers: Sticker[];
  thumb?: PhotoSize;
}

// Update Types
export interface Update {
  update_id: number;
  message?: Message;
  edited_message?: Message;
  channel_post?: Message;
  edited_channel_post?: Message;
  business_connection?: BusinessConnection;
  business_message?: Message;
  edited_business_message?: Message;
  deleted_business_messages?: BusinessMessagesDeleted;
  message_reaction?: MessageReactionUpdated;
  message_reaction_count?: MessageReactionCountUpdated;
  inline_query?: InlineQuery;
  chosen_inline_result?: ChosenInlineResult;
  callback_query?: CallbackQuery;
  shipping_query?: ShippingQuery;
  pre_checkout_query?: PreCheckoutQuery;
  purchased_paid_media?: PurchasedPaidMedia;
  poll?: Poll;
  poll_answer?: PollAnswer;
  my_chat_member?: ChatMemberUpdated;
  chat_member?: ChatMemberUpdated;
  chat_join_request?: ChatJoinRequest;
  chat_boost?: ChatBoostUpdated;
  removed_chat_boost?: ChatBoostRemoved;
}

export interface WebhookInfo {
  url: string;
  has_custom_certificate: boolean;
  pending_update_count: number;
  ip_address?: string;
  last_error_date?: number;
  last_error_message?: string;
  last_synchronization_error_date?: number;
  max_connections?: number;
  allowed_updates?: string[];
}

export interface BusinessConnection {
  id: string;
  user: User;
  user_chat_id: number;
  date: number;
  can_reply: boolean;
  is_enabled: boolean;
}

export interface BusinessMessagesDeleted {
  business_connection_id: string;
  chat: Chat;
  message_ids: number[];
}

export interface MessageReactionUpdated {
  chat: Chat;
  message_id: number;
  user?: User;
  actor_chat?: Chat;
  date: number;
  old_reaction: ReactionType[];
  new_reaction: ReactionType[];
}

export interface MessageReactionCountUpdated {
  chat: Chat;
  message_id: number;
  date: number;
  reactions: ReactionCount[];
}

export interface ReactionType {
  type: string;
}

export interface ReactionTypeEmoji extends ReactionType {
  type: 'emoji';
  emoji: string;
}

export interface ReactionTypeCustomEmoji extends ReactionType {
  type: 'custom_emoji';
  custom_emoji_id: string;
}

export interface ReactionCount {
  type: ReactionType;
  total_count: number;
}

export interface ChatBoost {
  boost_id: string;
  add_date: number;
  expiration_date: number;
  source: ChatBoostSource;
}

export interface ChatBoostSource {
  source: string;
}

export interface ChatBoostSourcePremium extends ChatBoostSource {
  source: 'premium';
  user: User;
}

export interface ChatBoostSourceGiftCode extends ChatBoostSource {
  source: 'gift_code';
  user: User;
}

export interface ChatBoostSourceGiveaway extends ChatBoostSource {
  source: 'giveaway';
  giveaway_message_id: number;
  user?: User;
  is_unclaimed?: true;
}

export interface ChatBoostUpdated {
  chat: Chat;
  boost: ChatBoost;
}

export interface ChatBoostRemoved {
  chat: Chat;
  boost_id: string;
  remove_date: number;
  source: ChatBoostSource;
}

export interface UserChatBoosts {
  boosts: ChatBoost[];
}

export interface InlineQuery {
  id: string;
  from: User;
  query: string;
  offset: string;
  chat_type?: 'sender' | 'private' | 'group' | 'supergroup' | 'channel';
  location?: Location;
}

export interface ChosenInlineResult {
  result_id: string;
  from: User;
  location?: Location;
  inline_message_id?: string;
  query: string;
}

export interface CallbackGame {}

export interface SentWebAppMessage {
  inline_message_id?: string;
}

// Method Parameters
/** Response to getMe method, returns User object */
export interface GetMeResponse extends User {}

/**
 * Parameters for the sendMessage method
 */
export interface SendMessageParams {
  /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
  chat_id: number | string;
  /** Optional. Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
  message_thread_id?: number;
  /** Text of the message to be sent, 1-4096 characters after entities parsing */
  text: string;
  /** Optional. Mode for parsing entities in the message text. See formatting options for more details. */
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML';
  /** Optional. A JSON-serialized list of special entities that appear in message text, which can be specified instead of parse_mode */
  entities?: MessageEntity[];
  /** Optional. Disables link previews for links in this message */
  disable_web_page_preview?: boolean;
  /** Optional. Sends the message silently. Users will receive a notification with no sound. */
  disable_notification?: boolean;
  /** Optional. Protects the contents of the sent message from forwarding and saving */
  protect_content?: boolean;
  /** Optional. If the message is a reply, ID of the original message */
  reply_to_message_id?: number;
  /** Optional. Pass True if the message should be sent even if the specified replied-to message is not found */
  allow_sending_without_reply?: boolean;
  /** Optional. Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user */
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}

/** Response to sendMessage method, returns Message object */
export interface SendMessageResponse extends Message {}

/**
 * Parameters for the forwardMessage method
 */
export interface ForwardMessageParams {
  /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
  chat_id: number | string;
  /** Optional. Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
  message_thread_id?: number;
  /** Unique identifier for the chat where the original message was sent (or channel username in the format @channelusername) */
  from_chat_id: number | string;
  /** Optional. Sends the message silently. Users will receive a notification with no sound. */
  disable_notification?: boolean;
  /** Optional. Protects the contents of the forwarded message from forwarding and saving */
  protect_content?: boolean;
  /** Message identifier in the chat specified in from_chat_id */
  message_id: number;
}

/** Response to forwardMessage method, returns Message object */
export interface ForwardMessageResponse extends Message {}

/**
 * Parameters for the copyMessage method
 */
export interface CopyMessageParams {
  /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
  chat_id: number | string;
  /** Optional. Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
  message_thread_id?: number;
  /** Unique identifier for the chat where the original message was sent (or channel username in the format @channelusername) */
  from_chat_id: number | string;
  /** Message identifier in the chat specified in from_chat_id */
  message_id: number;
  /** Optional. New caption for media, 0-1024 characters after entities parsing. If not specified, the original caption is kept */
  caption?: string;
  /** Optional. Mode for parsing entities in the new caption. See formatting options for more details. */
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML';
  /** Optional. A JSON-serialized list of special entities that appear in the new caption, which can be specified instead of parse_mode */
  caption_entities?: MessageEntity[];
  /** Optional. Sends the message silently. Users will receive a notification with no sound. */
  disable_notification?: boolean;
  /** Optional. Protects the contents of the sent message from forwarding and saving */
  protect_content?: boolean;
  /** Optional. If the message is a reply, ID of the original message */
  reply_to_message_id?: number;
  /** Optional. Pass True if the message should be sent even if the specified replied-to message is not found */
  allow_sending_without_reply?: boolean;
  /** Optional. Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user */
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}

/** Response to copyMessage method */
export interface CopyMessageResponse {
  /** New identifier of the message after copying */
  message_id: number;
}

/**
 * Parameters for the sendPhoto method
 */
export interface SendPhotoParams {
  /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
  chat_id: number | string;
  /** Optional. Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
  message_thread_id?: number;
  /** Photo to send. Pass a file_id as String to send a photo that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a photo from the Internet, or upload a new photo using multipart/form-data */
  photo: string;
  /** Optional. Photo caption (may also be used when resending photos by file_id), 0-1024 characters after entities parsing */
  caption?: string;
  /** Optional. Mode for parsing entities in the photo caption. See formatting options for more details. */
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML';
  /** Optional. A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode */
  caption_entities?: MessageEntity[];
  /** Optional. Pass True if the photo needs to be covered with a spoiler animation */
  has_spoiler?: boolean;
  /** Optional. Sends the message silently. Users will receive a notification with no sound. */
  disable_notification?: boolean;
  /** Optional. Protects the contents of the sent message from forwarding and saving */
  protect_content?: boolean;
  /** Optional. If the message is a reply, ID of the original message */
  reply_to_message_id?: number;
  /** Optional. Pass True if the message should be sent even if the specified replied-to message is not found */
  allow_sending_without_reply?: boolean;
  /** Optional. Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user */
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}

/** Response to sendPhoto method, returns Message object */
export interface SendPhotoResponse extends Message {}

/**
 * Parameters for the sendAudio method
 */
export interface SendAudioParams {
  /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
  chat_id: number | string;
  /** Optional. Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
  message_thread_id?: number;
  /** Audio file to send. Pass a file_id as String to send an audio file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an audio file from the Internet, or upload a new one using multipart/form-data */
  audio: string;
  /** Optional. Audio caption, 0-1024 characters after entities parsing */
  caption?: string;
  /** Optional. Mode for parsing entities in the audio caption. See formatting options for more details. */
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML';
  /** Optional. A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode */
  caption_entities?: MessageEntity[];
  /** Optional. Duration of the audio in seconds */
  duration?: number;
  /** Optional. Performer */
  performer?: string;
  /** Optional. Track name */
  title?: string;
  /** Optional. Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file */
  thumb?: string;
  /** Optional. Sends the message silently. Users will receive a notification with no sound. */
  disable_notification?: boolean;
  /** Optional. Protects the contents of the sent message from forwarding and saving */
  protect_content?: boolean;
  /** Optional. If the message is a reply, ID of the original message */
  reply_to_message_id?: number;
  /** Optional. Pass True if the message should be sent even if the specified replied-to message is not found */
  allow_sending_without_reply?: boolean;
  /** Optional. Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user */
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}

/** Response to sendAudio method, returns Message object */
export interface SendAudioResponse extends Message {}

/**
 * Parameters for the sendDocument method
 */
export interface SendDocumentParams {
  /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
  chat_id: number | string;
  /** Optional. Unique identifier for the target message thread (topic) of the forum; for forum supergroups only */
  message_thread_id?: number;
  /** File to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data */
  document: string;
  /** Optional. Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file */
  thumb?: string;
  /** Optional. Document caption (may also be used when resending documents by file_id), 0-1024 characters after entities parsing */
  caption?: string;
  /** Optional. Mode for parsing entities in the document caption. See formatting options for more details. */
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML';
  /** Optional. A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode */
  caption_entities?: MessageEntity[];
  /** Optional. Disables automatic server-side content type detection for files uploaded using multipart/form-data */
  disable_content_type_detection?: boolean;
  /** Optional. Sends the message silently. Users will receive a notification with no sound. */
  disable_notification?: boolean;
  /** Optional. Protects the contents of the sent message from forwarding and saving */
  protect_content?: boolean;
  /** Optional. If the message is a reply, ID of the original message */
  reply_to_message_id?: number;
  /** Optional. Pass True if the message should be sent even if the specified replied-to message is not found */
  allow_sending_without_reply?: boolean;
  /** Optional. Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove reply keyboard or to force a reply from the user */
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}

/** Response to sendDocument method, returns Message object */
export interface SendDocumentResponse extends Message {}

export interface SendVideoParams {
  chat_id: number | string;
  message_thread_id?: number;
  video: string;
  duration?: number;
  width?: number;
  height?: number;
  thumb?: string;
  caption?: string;
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML';
  caption_entities?: MessageEntity[];
  has_spoiler?: boolean;
  supports_streaming?: boolean;
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: number;
  allow_sending_without_reply?: boolean;
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}

export interface SendVideoResponse extends Message {}

export interface SendAnimationParams {
  chat_id: number | string;
  message_thread_id?: number;
  animation: string;
  duration?: number;
  width?: number;
  height?: number;
  thumb?: string;
  caption?: string;
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML';
  caption_entities?: MessageEntity[];
  has_spoiler?: boolean;
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: number;
  allow_sending_without_reply?: boolean;
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}

export interface SendAnimationResponse extends Message {}

export interface SendVoiceParams {
  chat_id: number | string;
  message_thread_id?: number;
  voice: string;
  caption?: string;
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML';
  caption_entities?: MessageEntity[];
  duration?: number;
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: number;
  allow_sending_without_reply?: boolean;
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}

export interface SendVoiceResponse extends Message {}

export interface SendVideoNoteParams {
  chat_id: number | string;
  message_thread_id?: number;
  video_note: string;
  duration?: number;
  length?: number;
  thumb?: string;
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: number;
  allow_sending_without_reply?: boolean;
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}

export interface SendVideoNoteResponse extends Message {}

export interface SendMediaGroupParams {
  chat_id: number | string;
  message_thread_id?: number;
  media: (InputMediaPhoto | InputMediaVideo)[];
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: number;
  allow_sending_without_reply?: boolean;
}

export interface SendMediaGroupResponse extends Array<Message> {}

export interface SendLocationParams {
  chat_id: number | string;
  message_thread_id?: number;
  latitude: number;
  longitude: number;
  horizontal_accuracy?: number;
  live_period?: number;
  heading?: number;
  proximity_alert_radius?: number;
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: number;
  allow_sending_without_reply?: boolean;
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}

export interface SendLocationResponse extends Message {}

export interface EditMessageLiveLocationParams {
  chat_id?: number | string;
  message_id?: number;
  inline_message_id?: string;
  latitude: number;
  longitude: number;
  live_period?: number;
  horizontal_accuracy?: number;
  heading?: number;
  proximity_alert_radius?: number;
  reply_markup?: InlineKeyboardMarkup;
}

export type EditMessageLiveLocationResponse = Message | boolean;

export interface StopMessageLiveLocationParams {
  chat_id?: number | string;
  message_id?: number;
  inline_message_id?: string;
  reply_markup?: InlineKeyboardMarkup;
}

export type StopMessageLiveLocationResponse = Message | boolean;

export interface SendVenueParams {
  chat_id: number | string;
  message_thread_id?: number;
  latitude: number;
  longitude: number;
  title: string;
  address: string;
  foursquare_id?: string;
  foursquare_type?: string;
  google_place_id?: string;
  google_place_type?: string;
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: number;
  allow_sending_without_reply?: boolean;
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}

export interface SendVenueResponse extends Message {}

export interface SendContactParams {
  chat_id: number | string;
  message_thread_id?: number;
  phone_number: string;
  first_name: string;
  last_name?: string;
  vcard?: string;
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: number;
  allow_sending_without_reply?: boolean;
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}

export interface SendContactResponse extends Message {}

export interface SendPollParams {
  chat_id: number | string;
  message_thread_id?: number;
  question: string;
  options: string[];
  is_anonymous?: boolean;
  type?: 'regular' | 'quiz';
  allows_multiple_answers?: boolean;
  correct_option_id?: number;
  explanation?: string;
  explanation_parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML';
  explanation_entities?: MessageEntity[];
  open_period?: number;
  close_date?: number;
  is_closed?: boolean;
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: number;
  allow_sending_without_reply?: boolean;
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}

export interface SendPollResponse extends Message {}

export interface SendDiceParams {
  chat_id: number | string;
  message_thread_id?: number;
  emoji?: '🎲' | '🎯' | '🏀' | '⚽' | '🎳' | '🎰';
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: number;
  allow_sending_without_reply?: boolean;
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}

export interface SendDiceResponse extends Message {}

export interface SendChatActionParams {
  chat_id: number | string;
  message_thread_id?: number;
  action: 'typing' | 'upload_photo' | 'record_video' | 'upload_video' | 'record_voice' | 'upload_voice' | 'upload_document' | 'find_location' | 'record_video_note' | 'upload_video_note';
}

export type SendChatActionResponse = boolean;

export interface GetUserProfilePhotosParams {
  user_id: number;
  offset?: number;
  limit?: number;
}

export interface GetUserProfilePhotosResponse extends UserProfilePhotos {}

export interface GetFileParams {
  file_id: string;
}

export interface GetFileResponse extends File {}

export interface BanChatMemberParams {
  chat_id: number | string;
  user_id: number;
  until_date?: number;
  revoke_messages?: boolean;
}

export type BanChatMemberResponse = boolean;

export interface UnbanChatMemberParams {
  chat_id: number | string;
  user_id: number;
  only_if_banned?: boolean;
}

export type UnbanChatMemberResponse = boolean;

export interface RestrictChatMemberParams {
  chat_id: number | string;
  user_id: number;
  permissions: ChatPermissions;
  use_independent_chat_permissions?: boolean;
  until_date?: number;
}

export type RestrictChatMemberResponse = boolean;

export interface PromoteChatMemberParams {
  chat_id: number | string;
  user_id: number;
  is_anonymous?: boolean;
  can_manage_chat?: boolean;
  can_post_messages?: boolean;
  can_edit_messages?: boolean;
  can_delete_messages?: boolean;
  can_manage_video_chats?: boolean;
  can_restrict_members?: boolean;
  can_promote_members?: boolean;
  can_change_info?: boolean;
  can_invite_users?: boolean;
  can_pin_messages?: boolean;
  can_post_stories?: boolean;
  can_edit_stories?: boolean;
  can_delete_stories?: boolean;
  can_manage_topics?: boolean;
}

export type PromoteChatMemberResponse = boolean;

export interface SetChatAdministratorCustomTitleParams {
  chat_id: number | string;
  user_id: number;
  custom_title: string;
}

export type SetChatAdministratorCustomTitleResponse = boolean;

export interface BanChatSenderChatParams {
  chat_id: number | string;
  sender_chat_id: number;
}

export type BanChatSenderChatResponse = boolean;

export interface UnbanChatSenderChatParams {
  chat_id: number | string;
  sender_chat_id: number;
}

export type UnbanChatSenderChatResponse = boolean;

export interface SetChatPermissionsParams {
  chat_id: number | string;
  permissions: ChatPermissions;
  use_independent_chat_permissions?: boolean;
}

export type SetChatPermissionsResponse = boolean;

export interface ExportChatInviteLinkParams {
  chat_id: number | string;
}

export type ExportChatInviteLinkResponse = string;

export interface CreateChatInviteLinkParams {
  chat_id: number | string;
  name?: string;
  expire_date?: number;
  member_limit?: number;
  creates_join_request?: boolean;
}

export interface CreateChatInviteLinkResponse extends ChatInviteLink {}

export interface EditChatInviteLinkParams {
  chat_id: number | string;
  invite_link: string;
  name?: string;
  expire_date?: number;
  member_limit?: number;
  creates_join_request?: boolean;
}

export interface EditChatInviteLinkResponse extends ChatInviteLink {}

export interface RevokeChatInviteLinkParams {
  chat_id: number | string;
  invite_link: string;
}

export interface RevokeChatInviteLinkResponse extends ChatInviteLink {}

export interface ApproveChatJoinRequestParams {
  chat_id: number | string;
  user_id: number;
}

export type ApproveChatJoinRequestResponse = boolean;

export interface DeclineChatJoinRequestParams {
  chat_id: number | string;
  user_id: number;
}

export type DeclineChatJoinRequestResponse = boolean;

export interface SetChatPhotoParams {
  chat_id: number | string;
  photo: string;
}

export type SetChatPhotoResponse = boolean;

export interface DeleteChatPhotoParams {
  chat_id: number | string;
}

export type DeleteChatPhotoResponse = boolean;

export interface SetChatTitleParams {
  chat_id: number | string;
  title: string;
}

export type SetChatTitleResponse = boolean;

export interface SetChatDescriptionParams {
  chat_id: number | string;
  description?: string;
}

export type SetChatDescriptionResponse = boolean;

export interface PinChatMessageParams {
  chat_id: number | string;
  message_id: number;
  disable_notification?: boolean;
}

export type PinChatMessageResponse = boolean;

export interface UnpinChatMessageParams {
  chat_id: number | string;
  message_id?: number;
}

export type UnpinChatMessageResponse = boolean;

export interface UnpinAllChatMessagesParams {
  chat_id: number | string;
}

export type UnpinAllChatMessagesResponse = boolean;

export interface LeaveChatParams {
  chat_id: number | string;
}

export type LeaveChatResponse = boolean;

export interface GetChatParams {
  chat_id: number | string;
}

export interface GetChatResponse extends Chat {}

export interface GetChatAdministratorsParams {
  chat_id: number | string;
}

export interface GetChatAdministratorsResponse extends Array<ChatMember> {}

export interface GetChatMemberCountParams {
  chat_id: number | string;
}

export type GetChatMemberCountResponse = number;

export interface GetChatMemberParams {
  chat_id: number | string;
  user_id: number;
}

export interface GetChatMemberResponse extends ChatMember {}

export interface SetChatStickerSetParams {
  chat_id: number | string;
  sticker_set_name: string;
}

export type SetChatStickerSetResponse = boolean;

export interface DeleteChatStickerSetParams {
  chat_id: number | string;
}

export type DeleteChatStickerSetResponse = boolean;

export interface GetForumTopicIconStickersResponse extends Array<Sticker> {}

export interface CreateForumTopicParams {
  chat_id: number | string;
  name: string;
  icon_color?: number;
  icon_custom_emoji_id?: string;
}

export interface CreateForumTopicResponse extends ForumTopic {}

export interface EditForumTopicParams {
  chat_id: number | string;
  message_thread_id: number;
  name?: string;
  icon_custom_emoji_id?: string;
}

export type EditForumTopicResponse = boolean;

export interface CloseForumTopicParams {
  chat_id: number | string;
  message_thread_id: number;
}

export type CloseForumTopicResponse = boolean;

export interface ReopenForumTopicParams {
  chat_id: number | string;
  message_thread_id: number;
}

export type ReopenForumTopicResponse = boolean;

export interface DeleteForumTopicParams {
  chat_id: number | string;
  message_thread_id: number;
}

export type DeleteForumTopicResponse = boolean;

export interface UnpinAllForumTopicMessagesParams {
  chat_id: number | string;
  message_thread_id: number;
}

export type UnpinAllForumTopicMessagesResponse = boolean;

export interface EditGeneralForumTopicParams {
  chat_id: number | string;
  name: string;
}

export type EditGeneralForumTopicResponse = boolean;

export interface CloseGeneralForumTopicParams {
  chat_id: number | string;
}

export type CloseGeneralForumTopicResponse = boolean;

export interface ReopenGeneralForumTopicParams {
  chat_id: number | string;
}

export type ReopenGeneralForumTopicResponse = boolean;

export interface HideGeneralForumTopicParams {
  chat_id: number | string;
}

export type HideGeneralForumTopicResponse = boolean;

export interface UnhideGeneralForumTopicParams {
  chat_id: number | string;
}

export type UnhideGeneralForumTopicResponse = boolean;

export interface AnswerCallbackQueryParams {
  callback_query_id: string;
  text?: string;
  show_alert?: boolean;
  url?: string;
  cache_time?: number;
}

export type AnswerCallbackQueryResponse = boolean;

export interface SetMyCommandsParams {
  commands: BotCommand[];
  scope?: BotCommandScope;
  language_code?: string;
}

export type SetMyCommandsResponse = boolean;

export interface DeleteMyCommandsParams {
  scope?: BotCommandScope;
  language_code?: string;
}

export type DeleteMyCommandsResponse = boolean;

export interface GetMyCommandsParams {
  scope?: BotCommandScope;
  language_code?: string;
}

export interface GetMyCommandsResponse extends Array<BotCommand> {}

export interface SetMyNameParams {
  name?: string;
  language_code?: string;
}

export type SetMyNameResponse = boolean;

export interface GetMyNameParams {
  language_code?: string;
}

export interface GetMyNameResponse extends BotName {}

export interface SetMyDescriptionParams {
  description?: string;
  language_code?: string;
}

export type SetMyDescriptionResponse = boolean;

export interface GetMyDescriptionParams {
  language_code?: string;
}

export interface GetMyDescriptionResponse extends BotDescription {}

export interface SetMyShortDescriptionParams {
  short_description?: string;
  language_code?: string;
}

export type SetMyShortDescriptionResponse = boolean;

export interface GetMyShortDescriptionParams {
  language_code?: string;
}

export interface GetMyShortDescriptionResponse extends BotShortDescription {}

export interface SetChatMenuButtonParams {
  chat_id?: number;
  menu_button?: MenuButton;
}

export type SetChatMenuButtonResponse = boolean;

export interface GetChatMenuButtonParams {
  chat_id?: number;
}

export interface GetChatMenuButtonResponse extends MenuButton {}

export interface SetMyDefaultAdministratorRightsParams {
  rights?: ChatAdministratorRights;
  for_channels?: boolean;
}

export type SetMyDefaultAdministratorRightsResponse = boolean;

export interface GetMyDefaultAdministratorRightsParams {
  for_channels?: boolean;
}

export interface GetMyDefaultAdministratorRightsResponse extends ChatAdministratorRights {}

export interface EditMessageTextParams {
  chat_id?: number | string;
  message_id?: number;
  inline_message_id?: string;
  text: string;
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML';
  entities?: MessageEntity[];
  disable_web_page_preview?: boolean;
  reply_markup?: InlineKeyboardMarkup;
}

export type EditMessageTextResponse = Message | boolean;

export interface EditMessageCaptionParams {
  chat_id?: number | string;
  message_id?: number;
  inline_message_id?: string;
  caption?: string;
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML';
  caption_entities?: MessageEntity[];
  reply_markup?: InlineKeyboardMarkup;
}

export type EditMessageCaptionResponse = Message | boolean;

export interface EditMessageMediaParams {
  chat_id?: number | string;
  message_id?: number;
  inline_message_id?: string;
  media: InputMedia;
  reply_markup?: InlineKeyboardMarkup;
}

export type EditMessageMediaResponse = Message | boolean;

export interface EditMessageReplyMarkupParams {
  chat_id?: number | string;
  message_id?: number;
  inline_message_id?: string;
  reply_markup?: InlineKeyboardMarkup;
}

export type EditMessageReplyMarkupResponse = Message | boolean;

export interface StopPollParams {
  chat_id: number | string;
  message_id: number;
  reply_markup?: InlineKeyboardMarkup;
}

export interface StopPollResponse extends Poll {}

export interface DeleteMessageParams {
  chat_id: number | string;
  message_id: number;
}

export type DeleteMessageResponse = boolean;

export interface DeleteMessagesParams {
  chat_id: number | string;
  message_ids: number[];
}

export type DeleteMessagesResponse = boolean;

export interface SendStickerParams {
  chat_id: number | string;
  message_thread_id?: number;
  sticker: string;
  emoji?: string;
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: number;
  allow_sending_without_reply?: boolean;
  reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}

export interface SendStickerResponse extends Message {}

export interface GetStickerSetParams {
  name: string;
}

export interface GetStickerSetResponse extends StickerSet {}

export interface GetCustomEmojiStickersParams {
  custom_emoji_ids: string[];
}

export interface GetCustomEmojiStickersResponse extends Array<Sticker> {}

export interface UploadStickerFileParams {
  user_id: number;
  sticker: string;
  sticker_format: 'static' | 'animated' | 'video';
}

export interface UploadStickerFileResponse extends File {}

export interface CreateNewStickerSetParams {
  user_id: number;
  name: string;
  title: string;
  stickers: InputSticker[];
  sticker_type?: 'regular' | 'mask' | 'custom_emoji';
  needs_repainting?: boolean;
}

export type CreateNewStickerSetResponse = boolean;

export interface AddStickerToSetParams {
  user_id: number;
  name: string;
  sticker: InputSticker;
}

export type AddStickerToSetResponse = boolean;

export interface SetStickerPositionInSetParams {
  sticker: string;
  position: number;
}

export type SetStickerPositionInSetResponse = boolean;

export interface DeleteStickerFromSetParams {
  sticker: string;
}

export type DeleteStickerFromSetResponse = boolean;

export interface SetStickerEmojiListParams {
  sticker: string;
  emoji_list: string[];
}

export type SetStickerEmojiListResponse = boolean;

export interface SetStickerKeywordsParams {
  sticker: string;
  keywords?: string[];
}

export type SetStickerKeywordsResponse = boolean;

export interface SetStickerMaskPositionParams {
  sticker: string;
  mask_position?: MaskPosition;
}

export type SetStickerMaskPositionResponse = boolean;

export interface SetStickerSetTitleParams {
  name: string;
  title: string;
}

export type SetStickerSetTitleResponse = boolean;

export interface SetStickerSetThumbnailParams {
  name: string;
  user_id: number;
  thumbnail?: string;
}

export type SetStickerSetThumbnailResponse = boolean;

export interface SetCustomEmojiStickerSetThumbnailParams {
  name: string;
  custom_emoji_id?: string;
}

export type SetCustomEmojiStickerSetThumbnailResponse = boolean;

export interface DeleteStickerSetParams {
  name: string;
}

export type DeleteStickerSetResponse = boolean;

export interface AnswerInlineQueryParams {
  inline_query_id: string;
  results: InlineQueryResult[];
  cache_time?: number;
  is_personal?: boolean;
  next_offset?: string;
  button?: InlineQueryResultsButton;
}

export type AnswerInlineQueryResponse = boolean;

export interface InlineQueryResult {
  type: string;
  id: string;
}

export interface InlineQueryResultArticle extends InlineQueryResult {
  type: 'article';
  title: string;
  input_message_content: InputMessageContent;
  reply_markup?: InlineKeyboardMarkup;
  url?: string;
  hide_url?: boolean;
  description?: string;
  thumb_url?: string;
  thumb_width?: number;
  thumb_height?: number;
}

export interface InlineQueryResultPhoto extends InlineQueryResult {
  type: 'photo';
  photo_url: string;
  thumb_url: string;
  photo_width?: number;
  photo_height?: number;
  title?: string;
  description?: string;
  caption?: string;
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML';
  caption_entities?: MessageEntity[];
  reply_markup?: InlineKeyboardMarkup;
  input_message_content?: InputMessageContent;
}

export interface InlineQueryResultGif extends InlineQueryResult {
  type: 'gif';
  gif_url: string;
  gif_width?: number;
  gif_height?: number;
  gif_duration?: number;
  thumb_url: string;
  title?: string;
  caption?: string;
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML';
  caption_entities?: MessageEntity[];
  reply_markup?: InlineKeyboardMarkup;
  input_message_content?: InputMessageContent;
}

export interface InlineQueryResultMpeg4Gif extends InlineQueryResult {
  type: 'mpeg4_gif';
  mpeg4_url: string;
  mpeg4_width?: number;
  mpeg4_height?: number;
  mpeg4_duration?: number;
  thumb_url: string;
  title?: string;
  caption?: string;
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML';
  caption_entities?: MessageEntity[];
  reply_markup?: InlineKeyboardMarkup;
  input_message_content?: InputMessageContent;
}

export interface InlineQueryResultVideo extends InlineQueryResult {
  type: 'video';
  video_url: string;
  mime_type: 'text/html' | 'video/mp4';
  thumb_url: string;
  title: string;
  caption?: string;
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML';
  caption_entities?: MessageEntity[];
  video_width?: number;
  video_height?: number;
  video_duration?: number;
  description?: string;
  reply_markup?: InlineKeyboardMarkup;
  input_message_content?: InputMessageContent;
}

export interface InlineQueryResultAudio extends InlineQueryResult {
  type: 'audio';
  audio_url: string;
  title: string;
  caption?: string;
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML';
  caption_entities?: MessageEntity[];
  performer?: string;
  audio_duration?: number;
  reply_markup?: InlineKeyboardMarkup;
  input_message_content?: InputMessageContent;
}

export interface InlineQueryResultVoice extends InlineQueryResult {
  type: 'voice';
  voice_url: string;
  title: string;
  caption?: string;
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML';
  caption_entities?: MessageEntity[];
  voice_duration?: number;
  reply_markup?: InlineKeyboardMarkup;
  input_message_content?: InputMessageContent;
}

export interface InlineQueryResultDocument extends InlineQueryResult {
  type: 'document';
  title: string;
  caption?: string;
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML';
  caption_entities?: MessageEntity[];
  document_url: string;
  mime_type: 'application/pdf' | 'application/zip';
  description?: string;
  reply_markup?: InlineKeyboardMarkup;
  input_message_content?: InputMessageContent;
  thumb_url?: string;
  thumb_width?: number;
  thumb_height?: number;
}

export interface InlineQueryResultLocation extends InlineQueryResult {
  type: 'location';
  latitude: number;
  longitude: number;
  title: string;
  horizontal_accuracy?: number;
  live_period?: number;
  heading?: number;
  proximity_alert_radius?: number;
  reply_markup?: InlineKeyboardMarkup;
  input_message_content?: InputMessageContent;
  thumb_url?: string;
  thumb_width?: number;
  thumb_height?: number;
}

export interface InlineQueryResultVenue extends InlineQueryResult {
  type: 'venue';
  latitude: number;
  longitude: number;
  title: string;
  address: string;
  foursquare_id?: string;
  foursquare_type?: string;
  google_place_id?: string;
  google_place_type?: string;
  reply_markup?: InlineKeyboardMarkup;
  input_message_content?: InputMessageContent;
  thumb_url?: string;
  thumb_width?: number;
  thumb_height?: number;
}

export interface InlineQueryResultContact extends InlineQueryResult {
  type: 'contact';
  phone_number: string;
  first_name: string;
  last_name?: string;
  vcard?: string;
  reply_markup?: InlineKeyboardMarkup;
  input_message_content?: InputMessageContent;
  thumb_url?: string;
  thumb_width?: number;
  thumb_height?: number;
}

export interface InlineQueryResultGame extends InlineQueryResult {
  type: 'game';
  game_short_name: string;
  reply_markup?: InlineKeyboardMarkup;
}

export interface InlineQueryResultCachedPhoto extends InlineQueryResult {
  type: 'photo';
  photo_file_id: string;
  title?: string;
  description?: string;
  caption?: string;
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML';
  caption_entities?: MessageEntity[];
  reply_markup?: InlineKeyboardMarkup;
  input_message_content?: InputMessageContent;
}

export interface InlineQueryResultCachedGif extends InlineQueryResult {
  type: 'gif';
  gif_file_id: string;
  title?: string;
  caption?: string;
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML';
  caption_entities?: MessageEntity[];
  reply_markup?: InlineKeyboardMarkup;
  input_message_content?: InputMessageContent;
}

export interface InlineQueryResultCachedMpeg4Gif extends InlineQueryResult {
  type: 'mpeg4_gif';
  mpeg4_file_id: string;
  title?: string;
  caption?: string;
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML';
  caption_entities?: MessageEntity[];
  reply_markup?: InlineKeyboardMarkup;
  input_message_content?: InputMessageContent;
}

export interface InlineQueryResultCachedSticker extends InlineQueryResult {
  type: 'sticker';
  sticker_file_id: string;
  reply_markup?: InlineKeyboardMarkup;
  input_message_content?: InputMessageContent;
}

export interface InlineQueryResultCachedDocument extends InlineQueryResult {
  type: 'document';
  title: string;
  document_file_id: string;
  description?: string;
  caption?: string;
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML';
  caption_entities?: MessageEntity[];
  reply_markup?: InlineKeyboardMarkup;
  input_message_content?: InputMessageContent;
}

export interface InlineQueryResultCachedVideo extends InlineQueryResult {
  type: 'video';
  video_file_id: string;
  title: string;
  description?: string;
  caption?: string;
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML';
  caption_entities?: MessageEntity[];
  reply_markup?: InlineKeyboardMarkup;
  input_message_content?: InputMessageContent;
}

export interface InlineQueryResultCachedVoice extends InlineQueryResult {
  type: 'voice';
  voice_file_id: string;
  title: string;
  caption?: string;
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML';
  caption_entities?: MessageEntity[];
  reply_markup?: InlineKeyboardMarkup;
  input_message_content?: InputMessageContent;
}

export interface InlineQueryResultCachedAudio extends InlineQueryResult {
  type: 'audio';
  audio_file_id: string;
  caption?: string;
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML';
  caption_entities?: MessageEntity[];
  reply_markup?: InlineKeyboardMarkup;
  input_message_content?: InputMessageContent;
}

export interface InputMessageContent {
  message_text: string;
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML';
  entities?: MessageEntity[];
  disable_web_page_preview?: boolean;
}

export interface InputTextMessageContent extends InputMessageContent {
  message_text: string;
  parse_mode?: 'Markdown' | 'MarkdownV2' | 'HTML';
  entities?: MessageEntity[];
  disable_web_page_preview?: boolean;
}

export interface InputLocationMessageContent {
  latitude: number;
  longitude: number;
  horizontal_accuracy?: number;
  live_period?: number;
  heading?: number;
  proximity_alert_radius?: number;
}

export interface InputVenueMessageContent {
  latitude: number;
  longitude: number;
  title: string;
  address: string;
  foursquare_id?: string;
  foursquare_type?: string;
  google_place_id?: string;
  google_place_type?: string;
}

export interface InputContactMessageContent {
  phone_number: string;
  first_name: string;
  last_name?: string;
  vcard?: string;
}

export interface InputInvoiceMessageContent {
  title: string;
  description: string;
  payload: string;
  provider_token: string;
  currency: string;
  prices: LabeledPrice[];
  max_tip_amount?: number;
  suggested_tip_amounts?: number[];
  provider_data?: string;
  photo_url?: string;
  photo_size?: number;
  photo_width?: number;
  photo_height?: number;
  need_name?: boolean;
  need_phone_number?: boolean;
  need_email?: boolean;
  need_shipping_address?: boolean;
  send_phone_number_to_provider?: boolean;
  send_email_to_provider?: boolean;
  is_flexible?: boolean;
}

export interface ChosenInlineResult {
  result_id: string;
  from: User;
  location?: Location;
  inline_message_id?: string;
  query: string;
}

export interface SendInvoiceParams {
  chat_id: number | string;
  message_thread_id?: number;
  title: string;
  description: string;
  payload: string;
  provider_token: string;
  currency: string;
  prices: LabeledPrice[];
  max_tip_amount?: number;
  suggested_tip_amounts?: number[];
  start_parameter?: string;
  provider_data?: string;
  photo_url?: string;
  photo_size?: number;
  photo_width?: number;
  photo_height?: number;
  need_name?: boolean;
  need_phone_number?: boolean;
  need_email?: boolean;
  need_shipping_address?: boolean;
  send_phone_number_to_provider?: boolean;
  send_email_to_provider?: boolean;
  is_flexible?: boolean;
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: number;
  allow_sending_without_reply?: boolean;
  reply_markup?: InlineKeyboardMarkup;
}

export interface SendInvoiceResponse extends Message {}

export interface CreateInvoiceLinkParams {
  title: string;
  description: string;
  payload: string;
  provider_token: string;
  currency: string;
  prices: LabeledPrice[];
  max_tip_amount?: number;
  suggested_tip_amounts?: number[];
  provider_data?: string;
  photo_url?: string;
  photo_size?: number;
  photo_width?: number;
  photo_height?: number;
  need_name?: boolean;
  need_phone_number?: boolean;
  need_email?: boolean;
  need_shipping_address?: boolean;
  send_phone_number_to_provider?: boolean;
  send_email_to_provider?: boolean;
  is_flexible?: boolean;
}

export type CreateInvoiceLinkResponse = string;

export interface AnswerShippingQueryParams {
  shipping_query_id: string;
  ok: boolean;
  shipping_options?: ShippingOption[];
  error_message?: string;
}

export type AnswerShippingQueryResponse = boolean;

export interface AnswerPreCheckoutQueryParams {
  pre_checkout_query_id: string;
  ok: boolean;
  error_message?: string;
}

export type AnswerPreCheckoutQueryResponse = boolean;

export interface SetPassportDataErrorsParams {
  user_id: number;
  errors: PassportElementError[];
}

export type SetPassportDataErrorsResponse = boolean;

export interface PassportElementError {
  source: string;
  type: string;
  message: string;
}

export interface PassportElementErrorDataField extends PassportElementError {
  source: 'data';
  type: 'personal_details' | 'passport' | 'driver_license' | 'identity_card' | 'internal_passport' | 'address';
  field_name: string;
  data_hash: string;
}

export interface PassportElementErrorFrontSide extends PassportElementError {
  source: 'front_side';
  type: 'passport' | 'driver_license' | 'identity_card' | 'internal_passport';
  file_hash: string;
}

export interface PassportElementErrorReverseSide extends PassportElementError {
  source: 'reverse_side';
  type: 'driver_license' | 'identity_card';
  file_hash: string;
}

export interface PassportElementErrorSelfie extends PassportElementError {
  source: 'selfie';
  type: 'passport' | 'driver_license' | 'identity_card' | 'internal_passport';
  file_hash: string;
}

export interface PassportElementErrorFile extends PassportElementError {
  source: 'file';
  type: 'utility_bill' | 'bank_statement' | 'rental_agreement' | 'passport_registration' | 'temporary_registration';
  file_hash: string;
}

export interface PassportElementErrorFiles extends PassportElementError {
  source: 'files';
  type: 'utility_bill' | 'bank_statement' | 'rental_agreement' | 'passport_registration' | 'temporary_registration';
  file_hashes: string[];
}

export interface PassportElementErrorTranslationFile extends PassportElementError {
  source: 'translation_file';
  type: 'passport' | 'driver_license' | 'identity_card' | 'internal_passport' | 'utility_bill' | 'bank_statement' | 'rental_agreement' | 'passport_registration' | 'temporary_registration';
  file_hash: string;
}

export interface PassportElementErrorTranslationFiles extends PassportElementError {
  source: 'translation_files';
  type: 'passport' | 'driver_license' | 'identity_card' | 'internal_passport' | 'utility_bill' | 'bank_statement' | 'rental_agreement' | 'passport_registration' | 'temporary_registration';
  file_hashes: string[];
}

export interface PassportElementErrorUnspecified extends PassportElementError {
  source: 'unspecified';
  type: 'data' | 'front_side' | 'reverse_side' | 'selfie' | 'file' | 'files' | 'translation_file' | 'translation_files';
  element_hash: string;
}

export interface SendGameParams {
  chat_id: number;
  message_thread_id?: number;
  game_short_name: string;
  disable_notification?: boolean;
  protect_content?: boolean;
  reply_to_message_id?: number;
  allow_sending_without_reply?: boolean;
  reply_markup?: InlineKeyboardMarkup;
}

export interface SendGameResponse extends Message {}

export interface SetGameScoreParams {
  user_id: number;
  score: number;
  force?: boolean;
  disable_edit_message?: boolean;
  chat_id?: number;
  message_id?: number;
  inline_message_id?: string;
}

export type SetGameScoreResponse = Message | boolean;

export interface GetGameHighScoresParams {
  user_id: number;
  chat_id?: number;
  message_id?: number;
  inline_message_id?: string;
}

export interface GetGameHighScoresResponse extends Array<GameHighScore> {}

/**
 * Parameters for the getUpdates method
 * Use this method to receive incoming updates using long polling
 */
export interface GetUpdatesParams {
  /** Optional. Identifier of the first update to be returned. Must be greater by one than the highest among the identifiers of previously received updates. By default, updates starting with the earliest unconfirmed update are returned. An update is considered confirmed as soon as getUpdates is called with an offset higher than its update_id. The negative offset can be specified to retrieve updates starting from -offset update from the end of the updates queue. All previous updates will be forgotten. */
  offset?: number;
  /** Optional. Limits the number of updates to be retrieved. Values between 1-100 are accepted. Defaults to 100. */
  limit?: number;
  /** Optional. Timeout in seconds for long polling. Defaults to 0, i.e. usual short polling. Should be positive, short polling should be used for testing purposes only. */
  timeout?: number;
  /** Optional. A JSON-serialized list of the update types you want your bot to receive. For example, specify ["message", "edited_channel_post", "callback_query"] to only receive updates of these types. See Update for a complete list of available update types. Specify an empty list to receive all update types except chat_member (default). If not specified, the previous setting will be used. */
  allowed_updates?: string[];
}

export interface GetUpdatesResponse extends Array<Update> {}

export interface SetWebhookParams {
  url: string;
  certificate?: string;
  ip_address?: string;
  max_connections?: number;
  allowed_updates?: string[];
  drop_pending_updates?: boolean;
  secret_token?: string;
}

export type SetWebhookResponse = boolean;

export interface DeleteWebhookParams {
  drop_pending_updates?: boolean;
}

export type DeleteWebhookResponse = boolean;

export interface GetWebhookInfoResponse extends WebhookInfo {}

export interface InlineQueryResultsButton {
  text: string;
  web_app?: WebAppInfo;
  start_parameter?: string;
}