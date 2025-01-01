import TelegramBot from "node-telegram-bot-api";
import { keyboards } from "../utils/keyboards.utils";
import { handleRandomVerse } from "./quran.command";
import { handleHelp } from "./help.command";
import {
  handleChikhChange,
  handleNotificationToggle,
} from "../services/settings.service";
import { chikhs } from "../utils/chikhIdentifier.utils";
import { surahList } from "../../utils/constant";
// import { getSurahByName } from "../services/quran.service";

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
    handleChikhChange(bot, msg);
    return;
  }

//   if (surahList.includes(text as string)) {
//     const surah = await getSurahByName(msg.text as string);
//     if (!surah) return;
//     const message = `${text}:\n\n${surah}`;
//     await bot.sendMessage(chatId, message, {
//       parse_mode: "Markdown",
//     });
//     return;
//   }

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
      await handleNotificationToggle(bot, msg, true);
      break;
    case "🔕 إيقاف الإشعارات":
      await handleNotificationToggle(bot, msg, false);
      break;
    case "🎙 تغيير القارئ":
      await bot.sendMessage(chatId, "تغيير القارئ:", {
        reply_markup: keyboards.settings_chikh_list,
      });
      break;
    case "📖 اسماء سور القرآن الكريم":
      await bot.sendMessage(chatId, "اسماء سور القرآن الكريم:", {
        reply_markup: keyboards.surahs,
      });
      break;
  }
};
