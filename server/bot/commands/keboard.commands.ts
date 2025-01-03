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
import {
    addFeedbackMessage,
  endFeedbackSession,
  saveFeedback,
  startFeedbackSession,
  userStates,
} from "../services/feedback.service";
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
    case "🌟 شارك اقتراحاتك":
      await bot.sendMessage(
        chatId,
        "يرجى كتابة رأيك (يمكنك إرسال عدة رسائل)\nعند الانتهاء اضغط على 'إنهاء'",
        {
          reply_markup: {
            keyboard: [[{ text: "✅ إنهاء" }], [{ text: "❌ إلغاء" }]],
            resize_keyboard: true,
          },
        }
      );
      startFeedbackSession(chatId);
      break;
    case "✅ إنهاء":
      const feedback = endFeedbackSession(chatId);
      
      if (feedback.length > 0) {
        // Save feedback to database
        await saveFeedback(msg, feedback);
        await bot.sendMessage(chatId, "بارك الله فيك, شكراً على رأيك", {
          reply_markup: keyboards.main,
        });
      }
      break;

    case "❌ إلغاء":
      endFeedbackSession(chatId);
      await bot.sendMessage(chatId, "تم إلغاء العملية", {
        reply_markup: keyboards.main,
      });
      break;
    default:
      // If user is in feedback session, collect messages
      if (userStates.get(chatId)?.isCollecting) {
        addFeedbackMessage(chatId, text as string);
      }
      break;
  }
};
