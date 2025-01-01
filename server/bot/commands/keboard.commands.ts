import TelegramBot from "node-telegram-bot-api";
import { keyboards } from "../utils/keyboards.utils";
import { handleRandomVerse } from "./quran.command";
import { handleHelp } from "./help.command";
import {
  handleChikhChange,
  handleNotificationToggle,
} from "../services/settings.service";
import { chikhs } from "../utils/chikhIdentifier.utils";

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

  if (chikhs[text as keyof typeof chikhs]) {
    handleChikhChange(msg);
    await bot.sendMessage(chatId, `تم تغيير القارئ إلى ${text}`);
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
    case "🎙 تغيير القارئ":
      await bot.sendMessage(chatId, "تغيير القارئ:", {
        reply_markup: keyboards.settings_chikh_list,
      });
      break;
  }
};
