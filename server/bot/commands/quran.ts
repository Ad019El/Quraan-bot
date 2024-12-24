import TelegramBot from "node-telegram-bot-api";
import { QuranService } from "../services/quranService";

export class QuranCommands {
  constructor(private bot: TelegramBot, private quranService: QuranService) {}

  async handleRandomVerse(msg: TelegramBot.Message) {
    const quraan = await this.quranService.getRandomAyahWithTafsir();

    const verseMessage = [
      `🎯 *آية اليوم*\n`,
      `﴿${quraan.ayah.ayah.trim()}﴾\n`,
      `📖 *السورة:* ${quraan.ayah.surah}`,
      `🔢 *رقم الآية:* ${quraan.ayah.numberInSurat}`,
      `📄 *الصفحة:* ${quraan.ayah.page}`,
    ].join("\n");

    // Second message - Tafsir
    const tafsirMessage = [
      `📚 *التفسير*\n`,
      `${quraan.ayahTafsir.text}\n`,
      `ℹ️ *المصدر:*`,
      `📗 الطبعة: ${quraan.ayahTafsir.edition.name}`,
      `🌍 اللغة: ${quraan.ayahTafsir.edition.language}`,
      `🔍 المعرف: ${quraan.ayahTafsir.edition.identifier}`,
    ].join("\n");

    // Send messages
    await this.bot.sendMessage(msg.chat.id, verseMessage, {
      parse_mode: "Markdown",
    });

    await this.bot.sendMessage(msg.chat.id, tafsirMessage, {
      parse_mode: "Markdown",
    });
  }
}
