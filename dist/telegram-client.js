// telegram-client.ts - Main Telegram client implementation
export class TelegramClient {
    constructor(token) {
        if (!token) {
            throw new Error("Telegram Bot Token is required");
        }
        this.token = token;
        this.baseUrl = `https://api.telegram.org/bot${token}`;
    }
    /**
     * Generic method to make HTTP requests to the Telegram Bot API
     */
    async request(method, data) {
        const url = `${this.baseUrl}/${method}`;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        };
        if (data) {
            options.body = JSON.stringify(data);
        }
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            if (!result.ok) {
                throw new TelegramError(result.description || "Unknown error", result.error_code, data, method);
            }
            return result;
        }
        catch (error) {
            if (error instanceof TelegramError) {
                throw error;
            }
            throw new TelegramError(`Network error: ${error instanceof Error ? error.message : "Unknown error"}`, undefined, data, method);
        }
    }
    /**
     * A simple method for testing your bot's authentication token.
     * Requires no parameters. Returns basic information about the bot.
     */
    async getMe() {
        const response = await this.request("getMe");
        return response.result;
    }
    /**
     * Send text messages
     */
    async sendMessage(params) {
        const response = await this.request("sendMessage", params);
        return response.result;
    }
    /**
     * Forward messages of any kind
     */
    async forwardMessage(params) {
        const response = await this.request("forwardMessage", params);
        return response.result;
    }
    /**
     * Use this method to copy messages of any kind
     */
    async copyMessage(params) {
        const response = await this.request("copyMessage", params);
        return response.result;
    }
    /**
     * Send photos
     */
    async sendPhoto(params) {
        const response = await this.request("sendPhoto", params);
        return response.result;
    }
    /**
     * Send audio files
     */
    async sendAudio(params) {
        const response = await this.request("sendAudio", params);
        return response.result;
    }
    /**
     * Send general files
     */
    async sendDocument(params) {
        const response = await this.request("sendDocument", params);
        return response.result;
    }
    /**
     * Send video files
     */
    async sendVideo(params) {
        const response = await this.request("sendVideo", params);
        return response.result;
    }
    /**
     * Send animation files (GIF or H.264/MPEG-4 AVC video without sound)
     */
    async sendAnimation(params) {
        const response = await this.request("sendAnimation", params);
        return response.result;
    }
    /**
     * Send audio files as voice messages
     */
    async sendVoice(params) {
        const response = await this.request("sendVoice", params);
        return response.result;
    }
    /**
     * Send video note messages
     */
    async sendVideoNote(params) {
        const response = await this.request("sendVideoNote", params);
        return response.result;
    }
    /**
     * Send a group of photos, videos, documents or audios as an album
     */
    async sendMediaGroup(params) {
        const response = await this.request("sendMediaGroup", params);
        return response.result;
    }
    /**
     * Send point on the map
     */
    async sendLocation(params) {
        const response = await this.request("sendLocation", params);
        return response.result;
    }
    /**
     * Edit live location messages
     */
    async editMessageLiveLocation(params) {
        const response = await this.request("editMessageLiveLocation", params);
        return response.result;
    }
    /**
     * Stop updating a live location message
     */
    async stopMessageLiveLocation(params) {
        const response = await this.request("stopMessageLiveLocation", params);
        return response.result;
    }
    /**
     * Send information about a venue
     */
    async sendVenue(params) {
        const response = await this.request("sendVenue", params);
        return response.result;
    }
    /**
     * Send phone contacts
     */
    async sendContact(params) {
        const response = await this.request("sendContact", params);
        return response.result;
    }
    /**
     * Send a native poll
     */
    async sendPoll(params) {
        const response = await this.request("sendPoll", params);
        return response.result;
    }
    /**
     * Send an animated emoji that will display a random value
     */
    async sendDice(params) {
        const response = await this.request("sendDice", params);
        return response.result;
    }
    /**
     * Tell the user that something is happening on the bot's side
     */
    async sendChatAction(params) {
        const response = await this.request("sendChatAction", params);
        return response.result;
    }
    /**
     * Get a list of profile pictures for a user
     */
    async getUserProfilePhotos(params) {
        const response = await this.request("getUserProfilePhotos", params);
        return response.result;
    }
    /**
     * Get basic info about a file and prepare it for downloading
     */
    async getFile(params) {
        const response = await this.request("getFile", params);
        return response.result;
    }
    /**
     * Ban a user in a group, a supergroup or a channel
     */
    async banChatMember(params) {
        const response = await this.request("banChatMember", params);
        return response.result;
    }
    /**
     * Unban a previously banned user in a supergroup or channel
     */
    async unbanChatMember(params) {
        const response = await this.request("unbanChatMember", params);
        return response.result;
    }
    /**
     * Receive incoming updates using long polling
     */
    async getUpdates(params) {
        const response = await this.request("getUpdates", params);
        return response.result;
    }
    /**
     * Send answer to a callback query initiated by an inline keyboard callback button
     */
    async answerCallbackQuery(params) {
        const response = await this.request("answerCallbackQuery", params);
        return response.result;
    }
    /**
     * Edit text and game messages
     */
    async editMessageText(params) {
        const response = await this.request("editMessageText", params);
        return response.result;
    }
    /**
     * Edit only the reply markup of messages
     */
    async editMessageReplyMarkup(params) {
        const response = await this.request("editMessageReplyMarkup", params);
        return response.result;
    }
    /**
     * Delete a message
     */
    async deleteMessage(params) {
        const response = await this.request("deleteMessage", params);
        return response.result;
    }
    /**
     * Specify an HTTPS URL to receive incoming updates via webhook
     */
    async setWebhook(params) {
        const response = await this.request("setWebhook", params);
        return response.result;
    }
    /**
     * Remove webhook integration
     */
    async deleteWebhook(params) {
        const response = await this.request("deleteWebhook", params);
        return response.result;
    }
    /**
     * Get information about the current webhook
     */
    async getWebhookInfo() {
        const response = await this.request("getWebhookInfo");
        return response.result;
    }
    /**
     * Send invoices
     */
    async sendInvoice(params) {
        const response = await this.request("sendInvoice", params);
        return response.result;
    }
    /**
     * Create invoice link
     */
    async createInvoiceLink(params) {
        const response = await this.request("createInvoiceLink", params);
        return response.result;
    }
    /**
     * Reply to shipping queries
     */
    async answerShippingQuery(params) {
        const response = await this.request("answerShippingQuery", params);
        return response.result;
    }
    /**
     * Reply to pre-checkout queries
     */
    async answerPreCheckoutQuery(params) {
        const response = await this.request("answerPreCheckoutQuery", params);
        return response.result;
    }
}
export class TelegramError extends Error {
    constructor(message, code, parameters, method) {
        super(message);
        this.code = code;
        this.parameters = parameters;
        this.method = method;
        this.name = "TelegramError";
    }
}
//# sourceMappingURL=telegram-client.js.map