import { Message } from "node-telegram-bot-api";
import { QuranResponse } from "../types/bot.types";
import { getChikhOrIdentifier } from "./chikhIdentifier.utils";
import { getTafsirIdentifier } from "./tafsirIdentifier.utils";

export const messages = {
  welcome: (msg: Message, chat: any) =>
    [
      `🕌 مرحبًا بك في بوت القرآن ${msg.chat.first_name}`,
      "",
      "⚙️ *إعداداتك الحالية:*",
      `${chat?.preferences?.notifications ? "✅" : "❌"} الإشعارات`,
      `🎙 القارئ: ${
        getChikhOrIdentifier(chat?.preferences?.chaikh).identifier ||
        "لم يتم الإختيار"
      }`,
      `📖 التفسير: ${
        getTafsirIdentifier(chat?.preferences?.tafsir) || "الميسر"
      }`,
      "",
      "📢 *تنبيه:*",
      "سيتم إرسال 3 آيات يومياً",
      "",
      "💡 يمكنك تغيير الإعدادات باستخدام /settings",
    ].join("\n"),
  welcomeBack: (msg: Message, chat: any) =>
    [
      `🕌 مرحبًا بعودتك ${msg.chat.first_name}`,
      "",
      "⚙️ *إعداداتك الحالية:*",
      `${chat?.preferences?.notifications ? "✅" : "❌"} الإشعارات`,
      `🎙 القارئ: ${
        getChikhOrIdentifier(chat?.preferences?.chaikh).identifier ||
        "لم يتم الإختيار"
      }`,
      `📖 التفسير: ${
        getTafsirIdentifier(chat?.preferences?.tafsir) || "الميسر"
      }`,
      "",
      "📢 *تنبيه:*",
      "سيتم إرسال 3 آيات يومياً",
      "",
      "💡 يمكنك تغيير الإعدادات باستخدام /settings",
    ].join("\n"),
  help: [
    "📚 *الأوامر المتاحة*",
    "/start - بدء تشغيل البوت",
    "/help - الحصول على مساعدة",
    "/random - إختيار عشوائي للآية من القرآن الكريم",
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
