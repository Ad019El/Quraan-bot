export interface BotCommand {
  command: string;
  description: string;
}

export interface QuranMessage {
  chatId: number;
  messageId: number;
  text: string;
}

export interface QuranVerse {
  number: number;
  text: string;
  surah: string;
  translation: string;
  tafsir?: string;
}
