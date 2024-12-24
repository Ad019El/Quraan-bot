import { QuranResponse } from "../types/bot.types";

export const messages = {
  welcome: "Welcome to Quran Bot! 🕌\nUse /help to see available commands.",
  error: "Sorry, an error occurred. Please try again later.",
  noTafsir: "No tafsir available for the last verse.",
  verseTemplate: (verse: string, surah: string, number: number) =>
    `${verse}\n\nSurah: ${surah}, Ayah: ${number}`,
  verseMessage: (quraan: QuranResponse) =>
    [
      "🎯 *آية اليوم*\n",
      `﴿${quraan?.ayah?.ayah.trim()}﴾\n`,
      `📖 *السورة:* ${quraan?.ayah?.surah}`,
      `🔢 *رقم الآية:* ${quraan?.ayah?.numberInSurat}`,
      `📄 *الصفحة:* ${quraan?.ayah?.page}`,
    ].join("\n"),
  tafsirMessage: (quraan: QuranResponse) =>
    [
      "📚 *التفسير*\n",
      `${quraan?.ayahTafsir?.text.trim()}\n`,
      "ℹ️ *المصدر:*",
      `📗 الطبعة: ${quraan?.ayahTafsir?.edition?.name}`,
      `🌍 اللغة: ${quraan?.ayahTafsir?.edition?.language}`,
      `🔍 المعرف: ${quraan?.ayahTafsir?.edition?.identifier}`,
    ].join("\n"),
};
