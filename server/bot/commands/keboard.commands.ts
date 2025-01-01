import TelegramBot from "node-telegram-bot-api";
import { keyboards } from "../utils/keyboards.utils";
import { handleRandomVerse } from "./quran.command";
import { handleHelp } from "./help.command";
import { handleNotificationToggle } from "../services/settings.service";

export const handleKeyboardCommands = async (
  bot: TelegramBot,
  msg: TelegramBot.Message
) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "⬅️ رجوع للقائمة الرئيسية") {
    await bot.sendMessage(chatId, "القائمة الرئيسية:", {
      reply_markup: keyboards.main,
    });
    return;
  }

  switch (text) {
    case "🎲 إختيار عشوائي للآية من القرآن الكريم":
      await handleRandomVerse(bot, msg);
      break;
    case "❓ مساعدة":
      await handleHelp(bot, msg);
      break;
    case "⚙️ الإعدادات":
      await bot.sendMessage(chatId, "الإعدادات:", {
        reply_markup: keyboards.settings,
      });
      break;
    case "🔔 تفعيل الإشعارات":
      await handleNotificationToggle(msg, true);
      bot.sendMessage(chatId, "تم تفعيل الإشعارات");
      break;
    case "🔕 إيقاف الإشعارات":
      await handleNotificationToggle(msg, false);
      bot.sendMessage(chatId, "تم إيقاف الإشعارات");
      break;
  }
};
