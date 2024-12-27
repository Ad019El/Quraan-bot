import { Message } from "node-telegram-bot-api";
import { QuranResponse } from "../types/bot.types";

export const messages = {
  welcome: (msg: Message) =>
    [
      `🕌 مرحبًا بك في بوت القرآن ${msg.chat.username}`,
      "📚 *الأوامر المتاحة*",
      "/start - بدء تشغيل البوت",
      "/random - الحصول على آية عشوائية",
      "/help - الحصول على مساعدة",
    ].join("\n"),
  welcomeBack: (msg: Message) =>
    `/help مرحبًا بعودتك إلى بوت القرآن!لعرض الأوامر المتاحة استخدم ,${msg.chat.username}`,
  help: [
    "📚 *الأوامر المتاحة*",
    "/start - بدء تشغيل البوت",
    "/help - الحصول على مساعدة",
    "/random - الحصول على آية عشوائية",
  ].join("\n"),
  error: "عذراً، حدث خطأ. يرجى المحاولة مرة أخرى لاحقاً.",
  noTafsir: "لا يوجد تفسير متاح للآية الأخيرة.",
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
      "📚 *التفسير*",
      `${quraan?.ayahTafsir?.text.trim()}\n`,
      "❓ *المصدر:*",
      `📗 الطبعة: ${quraan?.ayahTafsir?.edition?.name}`,
      `🌍 اللغة: ${quraan?.ayahTafsir?.edition?.language}`,
      `🔍 المعرف: ${quraan?.ayahTafsir?.edition?.identifier}`,
    ].join("\n"),
};
