# Handling Media

Learn how to work with photos, videos, documents, and other media in your Telegram bot.

## Overview

Telegram supports various types of media that users can send to your bot, and that your bot can send to users. This guide covers how to handle both incoming and outgoing media using the Telegram Bot API client.

## Receiving Media from Users

### Handling Photos

When a user sends a photo to your bot, the `message.photo` property contains an array of `PhotoSize` objects with different resolutions:

```typescript
import { TelegramClient, Message, PhotoSize } from '@bot-machine/telegram-client';

async function handlePhotoMessage(client: TelegramClient, message: Message) {
  if (!message.photo) {
    return;
  }
  
  // The photos array is sorted by size, with the smallest first
  const smallestPhoto = message.photo[0];
  const largestPhoto = message.photo[message.photo.length - 1]; // Largest is last
  
  console.log(`Photo received with ${message.photo.length} sizes`);
  console.log(`Smallest: ${smallestPhoto.width}x${smallestPhoto.height}, File ID: ${smallestPhoto.file_id}`);
  console.log(`Largest: ${largestPhoto.width}x${largestPhoto.height}, File ID: ${largestPhoto.file_id}`);
  
  // Get file info to download if needed
  const fileInfo = await client.getFile({
    file_id: largestPhoto.file_id
  });
  
  // Send a response
  await client.sendMessage({
    chat_id: message.chat.id,
    text: `Photo received! Size: ${largestPhoto.width}x${largestPhoto.height}. File path: ${fileInfo.file_path}`,
    reply_to_message_id: message.message_id
  });
}
```

### Handling Videos

Users can send videos to your bot, which are represented by the `message.video` property:

```typescript
async function handleVideoMessage(client: TelegramClient, message: Message) {
  if (!message.video) {
    return;
  }
  
  const video = message.video;
  
  await client.sendMessage({
    chat_id: message.chat.id,
    text: `Video received!\nDuration: ${video.duration} seconds\nSize: ${video.width}x${video.height}\nFile ID: ${video.file_id}`,
    reply_to_message_id: message.message_id
  });
}
```

### Handling Documents

Documents can be any type of file:

```typescript
async function handleDocumentMessage(client: TelegramClient, message: Message) {
  if (!message.document) {
    return;
  }
  
  const document = message.document;
  
  await client.sendMessage({
    chat_id: message.chat.id,
    text: `Document received: ${document.file_name}\nMIME type: ${document.mime_type}\nFile ID: ${document.file_id}`,
    reply_to_message_id: message.message_id
  });
}
```

### Handling Audio Files

Both music files and voice messages are handled differently:

```typescript
// For audio files (music, etc.)
async function handleAudioMessage(client: TelegramClient, message: Message) {
  if (!message.audio) {
    return;
  }
  
  const audio = message.audio;
  
  await client.sendMessage({
    chat_id: message.chat.id,
    text: `Audio received: ${audio.title || 'Unknown title'} by ${audio.performer || 'Unknown artist'}\nDuration: ${audio.duration} seconds`,
    reply_to_message_id: message.message_id
  });
}

// For voice messages
async function handleVoiceMessage(client: TelegramClient, message: Message) {
  if (!message.voice) {
    return;
  }
  
  const voice = message.voice;
  
  await client.sendMessage({
    chat_id: message.chat.id,
    text: `Voice message received. Duration: ${voice.duration} seconds`,
    reply_to_message_id: message.message_id
  });
}
```

### Handling Video Notes

Video notes are circular video messages:

```typescript
async function handleVideoNoteMessage(client: TelegramClient, message: Message) {
  if (!message.video_note) {
    return;
  }
  
  const videoNote = message.video_note;
  
  await client.sendMessage({
    chat_id: message.chat.id,
    text: `Video note received. Duration: ${videoNote.duration} seconds, Diameter: ${videoNote.length}px`,
    reply_to_message_id: message.message_id
  });
}
```

## Getting File Information and Downloading

To download a file, you first need to get the file path using the `getFile` method:

```typescript
async function downloadFileExample(client: TelegramClient, fileId: string) {
  try {
    // Get file information
    const file = await client.getFile({
      file_id: fileId
    });
    
    console.log(`File path: ${file.file_path}`);
    console.log(`File size: ${file.file_size} bytes`);
    
    // Construct download URL
    const downloadUrl = `https://api.telegram.org/file/bot${client['token']}/${file.file_path}`;
    
    // Note: You can now download the file using any HTTP client
    // For example, with fetch:
    // const response = await fetch(downloadUrl);
    // const buffer = await response.buffer();
    // await fs.writeFile('downloaded_file', buffer);
    
    return downloadUrl;
  } catch (error) {
    console.error('Error getting file:', error);
    throw error;
  }
}
```

## Sending Media to Users

### Sending Photos

```typescript
// Send a photo by file ID (if you've previously sent or received it)
await client.sendPhoto({
  chat_id: 123456789,
  photo: 'PHOTO_FILE_ID',
  caption: 'This is a photo with a caption',
  parse_mode: 'HTML'  // Format caption with HTML
});

// Send a photo by URL
await client.sendPhoto({
  chat_id: 123456789,
  photo: 'https://example.com/photo.jpg',
  caption: 'This is a photo from a URL'
});

// Send a photo with reply markup
import { InlineKeyboardMarkup } from '@bot-machine/telegram-client';

const replyMarkup: InlineKeyboardMarkup = {
  inline_keyboard: [
    [
      { text: 'Like', callback_data: 'like' },
      { text: 'Share', callback_data: 'share' }
    ]
  ]
};

await client.sendPhoto({
  chat_id: 123456789,
  photo: 'PHOTO_FILE_ID',
  caption: 'What would you like to do with this photo?',
  reply_markup: replyMarkup
});
```

### Sending Videos

```typescript
// Send a video
await client.sendVideo({
  chat_id: 123456789,
  video: 'VIDEO_FILE_ID',
  caption: 'Check out this video!',
  duration: 120,  // Duration in seconds
  width: 1920,    // Width in pixels
  height: 1080,   // Height in pixels
  supports_streaming: true  // True if the video is optimized for streaming
});

// Send a video by URL
await client.sendVideo({
  chat_id: 123456789,
  video: 'https://example.com/video.mp4',
  caption: 'Video from a URL'
});
```

### Sending Documents

```typescript
// Send a document
await client.sendDocument({
  chat_id: 123456789,
  document: 'DOCUMENT_FILE_ID',
  caption: 'Important document attached',
  disable_content_type_detection: false  // Set to true to prevent Telegram from guessing MIME type
});

// Send a document by URL
await client.sendDocument({
  chat_id: 123456789,
  document: 'https://example.com/document.pdf',
  caption: 'PDF from URL'
});
```

### Sending Audio Files

```typescript
// Send an audio file (music)
await client.sendAudio({
  chat_id: 123456789,
  audio: 'AUDIO_FILE_ID',
  caption: 'Listen to this track',
  performer: 'Artist Name',
  title: 'Song Title',
  duration: 180  // Duration in seconds
});

// Send a voice message
await client.sendVoice({
  chat_id: 123456789,
  voice: 'VOICE_FILE_ID',
  caption: 'My voice message',
  duration: 60  // Duration in seconds
});
```

### Sending Animations (GIFs)

```typescript
// Send an animation (GIF)
await client.sendAnimation({
  chat_id: 123456789,
  animation: 'ANIMATION_FILE_ID',
  caption: 'Funny animation',
  duration: 5,  // Duration in seconds
  width: 320,
  height: 240
});
```

## Sending Media Groups

Send multiple media items as an album:

```typescript
import { InputMediaPhoto, InputMediaVideo } from '@bot-machine/telegram-client';

// Send multiple photos as an album
await client.sendMediaGroup({
  chat_id: 123456789,
  media: [
    {
      type: 'photo',
      media: 'PHOTO_FILE_ID_1',
      caption: 'First photo in the album'
    } as InputMediaPhoto,
    {
      type: 'photo',
      media: 'PHOTO_FILE_ID_2',
      caption: 'Second photo in the album'
    } as InputMediaPhoto,
    {
      type: 'photo',
      media: 'PHOTO_FILE_ID_3'
    } as InputMediaPhoto
  ],
  // Options
  disable_notification: false,
  reply_to_message_id: 123  // Optional: reply to a specific message
});

// Send mixed media (photos and videos)
await client.sendMediaGroup({
  chat_id: 123456789,
  media: [
    {
      type: 'photo',
      media: 'PHOTO_FILE_ID',
      caption: 'A beautiful photo'
    } as InputMediaPhoto,
    {
      type: 'video',
      media: 'VIDEO_FILE_ID',
      caption: 'An accompanying video'
    } as InputMediaVideo
  ]
});
```

## Complete Media Handler Example

Here's a comprehensive example that handles various media types:

```typescript
import { TelegramClient, Message } from '@bot-machine/telegram-client';

class MediaHandler {
  constructor(private client: TelegramClient) {}
  
  async handleMediaMessage(message: Message) {
    // Handle photos
    if (message.photo) {
      await this.handlePhoto(message);
    }
    // Handle videos
    else if (message.video) {
      await this.handleVideo(message);
    }
    // Handle documents
    else if (message.document) {
      await this.handleDocument(message);
    }
    // Handle audio
    else if (message.audio) {
      await this.handleAudio(message);
    }
    // Handle voice messages
    else if (message.voice) {
      await this.handleVoice(message);
    }
    // Handle video notes
    else if (message.video_note) {
      await this.handleVideoNote(message);
    }
    // Handle animations (GIFs)
    else if (message.animation) {
      await this.handleAnimation(message);
    }
    // Handle stickers
    else if (message.sticker) {
      await this.handleSticker(message);
    }
    // Handle contacts
    else if (message.contact) {
      await this.handleContact(message);
    }
    // Handle locations
    else if (message.location) {
      await this.handleLocation(message);
    }
    // Handle venues
    else if (message.venue) {
      await this.handleVenue(message);
    }
  }
  
  private async handlePhoto(message: Message) {
    const largestPhoto = message.photo![message.photo!.length - 1];
    
    await this.client.sendMessage({
      chat_id: message.chat.id,
      text: `📸 Photo received! Size: ${largestPhoto.width}x${largestPhoto.height}\nFile ID: ${largestPhoto.file_id}`,
      reply_to_message_id: message.message_id
    });
  }
  
  private async handleVideo(message: Message) {
    const video = message.video!;
    
    await this.client.sendMessage({
      chat_id: message.chat.id,
      text: `🎬 Video received!\nDuration: ${video.duration}s\nSize: ${video.width}x${video.height}`,
      reply_to_message_id: message.message_id
    });
  }
  
  private async handleDocument(message: Message) {
    const document = message.document!;
    
    await this.client.sendMessage({
      chat_id: message.chat.id,
      text: `📄 Document received: ${document.file_name}\nMIME type: ${document.mime_type}`,
      reply_to_message_id: message.message_id
    });
  }
  
  private async handleAudio(message: Message) {
    const audio = message.audio!;
    
    await this.client.sendMessage({
      chat_id: message.chat.id,
      text: `🎵 Audio received: ${audio.title || 'Unknown'} by ${audio.performer || 'Unknown artist'}\nDuration: ${audio.duration}s`,
      reply_to_message_id: message.message_id
    });
  }
  
  private async handleVoice(message: Message) {
    const voice = message.voice!;
    
    await this.client.sendMessage({
      chat_id: message.chat.id,
      text: `🎤 Voice message received. Duration: ${voice.duration}s`,
      reply_to_message_id: message.message_id
    });
  }
  
  private async handleVideoNote(message: Message) {
    const videoNote = message.video_note!;
    
    await this.client.sendMessage({
      chat_id: message.chat.id,
      text: `🔴 Video note received. Duration: ${videoNote.duration}s, Diameter: ${videoNote.length}px`,
      reply_to_message_id: message.message_id
    });
  }
  
  private async handleAnimation(message: Message) {
    const animation = message.animation!;
    
    await this.client.sendMessage({
      chat_id: message.chat.id,
      text: `🎭 Animation (GIF) received. Duration: ${animation.duration}s\nSize: ${animation.width}x${animation.height}`,
      reply_to_message_id: message.message_id
    });
  }
  
  private async handleSticker(message: Message) {
    const sticker = message.sticker!;
    
    await this.client.sendMessage({
      chat_id: message.chat.id,
      text: `🤪 Sticker received! It's a ${sticker.emoji} sticker from the set "${sticker.set_name || 'no set'}"`,
      reply_to_message_id: message.message_id
    });
  }
  
  private async handleContact(message: Message) {
    const contact = message.contact!;
    
    await this.client.sendMessage({
      chat_id: message.chat.id,
      text: `👥 Contact received: ${contact.first_name} ${contact.last_name || ''}\nPhone: ${contact.phone_number}`,
      reply_to_message_id: message.message_id
    });
  }
  
  private async handleLocation(message: Message) {
    const location = message.location!;
    
    await this.client.sendMessage({
      chat_id: message.chat.id,
      text: `📍 Location received: ${location.latitude}, ${location.longitude}`,
      reply_to_message_id: message.message_id
    });
  }
  
  private async handleVenue(message: Message) {
    const venue = message.venue!;
    
    await this.client.sendMessage({
      chat_id: message.chat.id,
      text: `🏛️ Venue received: ${venue.title}\n${venue.address}\nLocation: ${venue.location.latitude}, ${venue.location.longitude}`,
      reply_to_message_id: message.message_id
    });
  }
}

// Usage example
const client = new TelegramClient('YOUR_BOT_TOKEN');
const mediaHandler = new MediaHandler(client);

// In your message handling logic:
// if (message.photo || message.video || message.document || message.audio || 
//     message.voice || message.video_note || message.animation || message.sticker ||
//     message.contact || message.location || message.venue) {
//   await mediaHandler.handleMediaMessage(message);
// }
```

## Working with File Paths

When sending media by file path (multipart upload), you need to handle file uploads differently. The current client implementation works with file IDs or URLs, but if you need to upload files directly, you might need to use a different approach with multipart/form-data.

For file uploads, the implementation would typically look like:

```typescript
// This is a conceptual example - actual implementation may vary
// depending on the client library's support for multipart uploads
async function uploadNewPhoto(chatId: number, imagePath: string) {
  // This would require the client to support multipart uploads
  // For now, you need to upload the file to a public URL first
  // or handle the upload within your application
}
```

## Media Best Practices

1. **Use appropriate file sizes**: Compress images and videos when possible to save bandwidth and processing time.

2. **Validate media types**: Check MIME types if you only want to accept specific file types.

3. **Provide feedback**: Always acknowledge receipt of media from users.

4. **Handle file size limits**: Telegram has size limits for different media types (document: 50MB, photo: 10MB, video: 50MB for mp4).

5. **Store file IDs for reuse**: If you plan to use the same media multiple times, store the file ID to avoid re-upload.

6. **Implement timeouts for large files**: When downloading large files, implement appropriate timeout handling.

## Next Steps

Now that you know how to handle media, learn about:

- [Creating interactive keyboards](../guides/inline-keyboards.md) for better user interaction
- [Error handling best practices](../guides/error-handling.md) for production bots
- [Working with AI agents](../guides/ai-agents.md) using this library