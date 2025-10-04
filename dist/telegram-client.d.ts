import type { GetMeResponse, SendMessageParams, SendMessageResponse, GetUpdatesParams, GetUpdatesResponse, ForwardMessageParams, ForwardMessageResponse, CopyMessageParams, CopyMessageResponse, SendPhotoParams, SendPhotoResponse, SendAudioParams, SendAudioResponse, SendDocumentParams, SendDocumentResponse, SendVideoParams, SendVideoResponse, SendAnimationParams, SendAnimationResponse, SendVoiceParams, SendVoiceResponse, SendVideoNoteParams, SendVideoNoteResponse, SendMediaGroupParams, SendMediaGroupResponse, SendLocationParams, SendLocationResponse, EditMessageLiveLocationParams, EditMessageLiveLocationResponse, StopMessageLiveLocationParams, StopMessageLiveLocationResponse, SendVenueParams, SendVenueResponse, SendContactParams, SendContactResponse, SendPollParams, SendPollResponse, SendDiceParams, SendDiceResponse, SendChatActionParams, SendChatActionResponse, GetUserProfilePhotosParams, GetUserProfilePhotosResponse, GetFileParams, GetFileResponse, BanChatMemberParams, BanChatMemberResponse, UnbanChatMemberParams, UnbanChatMemberResponse, AnswerCallbackQueryParams, AnswerCallbackQueryResponse, EditMessageTextParams, EditMessageTextResponse, EditMessageReplyMarkupParams, EditMessageReplyMarkupResponse } from "./telegram-types";
export declare class TelegramClient {
    private readonly baseUrl;
    private readonly token;
    constructor(token: string);
    /**
     * Generic method to make HTTP requests to the Telegram Bot API
     */
    private request;
    /**
     * A simple method for testing your bot's authentication token.
     * Requires no parameters. Returns basic information about the bot.
     */
    getMe(): Promise<GetMeResponse>;
    /**
     * Send text messages
     */
    sendMessage(params: SendMessageParams): Promise<SendMessageResponse>;
    /**
     * Forward messages of any kind
     */
    forwardMessage(params: ForwardMessageParams): Promise<ForwardMessageResponse>;
    /**
     * Use this method to copy messages of any kind
     */
    copyMessage(params: CopyMessageParams): Promise<CopyMessageResponse>;
    /**
     * Send photos
     */
    sendPhoto(params: SendPhotoParams): Promise<SendPhotoResponse>;
    /**
     * Send audio files
     */
    sendAudio(params: SendAudioParams): Promise<SendAudioResponse>;
    /**
     * Send general files
     */
    sendDocument(params: SendDocumentParams): Promise<SendDocumentResponse>;
    /**
     * Send video files
     */
    sendVideo(params: SendVideoParams): Promise<SendVideoResponse>;
    /**
     * Send animation files (GIF or H.264/MPEG-4 AVC video without sound)
     */
    sendAnimation(params: SendAnimationParams): Promise<SendAnimationResponse>;
    /**
     * Send audio files as voice messages
     */
    sendVoice(params: SendVoiceParams): Promise<SendVoiceResponse>;
    /**
     * Send video note messages
     */
    sendVideoNote(params: SendVideoNoteParams): Promise<SendVideoNoteResponse>;
    /**
     * Send a group of photos, videos, documents or audios as an album
     */
    sendMediaGroup(params: SendMediaGroupParams): Promise<SendMediaGroupResponse>;
    /**
     * Send point on the map
     */
    sendLocation(params: SendLocationParams): Promise<SendLocationResponse>;
    /**
     * Edit live location messages
     */
    editMessageLiveLocation(params: EditMessageLiveLocationParams): Promise<EditMessageLiveLocationResponse>;
    /**
     * Stop updating a live location message
     */
    stopMessageLiveLocation(params: StopMessageLiveLocationParams): Promise<StopMessageLiveLocationResponse>;
    /**
     * Send information about a venue
     */
    sendVenue(params: SendVenueParams): Promise<SendVenueResponse>;
    /**
     * Send phone contacts
     */
    sendContact(params: SendContactParams): Promise<SendContactResponse>;
    /**
     * Send a native poll
     */
    sendPoll(params: SendPollParams): Promise<SendPollResponse>;
    /**
     * Send an animated emoji that will display a random value
     */
    sendDice(params: SendDiceParams): Promise<SendDiceResponse>;
    /**
     * Tell the user that something is happening on the bot's side
     */
    sendChatAction(params: SendChatActionParams): Promise<SendChatActionResponse>;
    /**
     * Get a list of profile pictures for a user
     */
    getUserProfilePhotos(params: GetUserProfilePhotosParams): Promise<GetUserProfilePhotosResponse>;
    /**
     * Get basic info about a file and prepare it for downloading
     */
    getFile(params: GetFileParams): Promise<GetFileResponse>;
    /**
     * Ban a user in a group, a supergroup or a channel
     */
    banChatMember(params: BanChatMemberParams): Promise<BanChatMemberResponse>;
    /**
     * Unban a previously banned user in a supergroup or channel
     */
    unbanChatMember(params: UnbanChatMemberParams): Promise<UnbanChatMemberResponse>;
    /**
     * Receive incoming updates using long polling
     */
    getUpdates(params?: GetUpdatesParams): Promise<GetUpdatesResponse>;
    /**
     * Send answer to a callback query initiated by an inline keyboard callback button
     */
    answerCallbackQuery(params: AnswerCallbackQueryParams): Promise<AnswerCallbackQueryResponse>;
    /**
     * Edit text and game messages
     */
    editMessageText(params: EditMessageTextParams): Promise<EditMessageTextResponse>;
    /**
     * Edit only the reply markup of messages
     */
    editMessageReplyMarkup(params: EditMessageReplyMarkupParams): Promise<EditMessageReplyMarkupResponse>;
    /**
     * Delete a message
     */
    deleteMessage(params: {
        chat_id: number | string;
        message_id: number;
    }): Promise<boolean>;
}
export declare class TelegramError extends Error {
    readonly code?: number | undefined;
    readonly parameters?: Record<string, any> | undefined;
    readonly method?: string | undefined;
    constructor(message: string, code?: number | undefined, parameters?: Record<string, any> | undefined, method?: string | undefined);
}
//# sourceMappingURL=telegram-client.d.ts.map