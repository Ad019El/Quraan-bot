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

export interface AyahData {
  surah: string;
  surahEnglishName: string;
  ayah: string;
  number: number;
  numberInSurat: number;
  page?: number;
}

export interface TafsirData {
  surah: string;
  surahEnglishName: string;
  text: string;
  number: number;
  numberInSurat: number;
  edition: {
    identifier: string;
    language: string;
    name: string;
  };
}

export interface QuranResponse {
  ayah: AyahData;
  ayahTafsir: TafsirData;
}

export interface FeedbackState {
  isCollecting: boolean;
  messages: string[];
}
