import TelegramBot from "node-telegram-bot-api";
import { handleStart } from "../commands/start.command";
import { handleHelp } from "../commands/help.command";
import { handleRandomVerse } from "../commands/quran.command";
import { commands } from "../utils/commands.utils";
import { keyboards } from "../utils/keyboards.utils";

const userMenuStates = new Map<number, string>();

export const initializeBot = (token: string) => {
  const bot = new TelegramBot(token, { polling: true });

  bot.setMyCommands(commands);

  // Setup command handlers
  bot.onText(/\/start/, (msg) => handleStart(bot, msg));
  bot.onText(/\/help/, (msg) => handleHelp(bot, msg));
  bot.onText(/\/random/, (msg) => handleRandomVerse(bot, msg));
  // bot.onText(/.*/, (msg) => console.log(msg.text));

  // Keyboard handlers
  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === "⬅️ رجوع للقائمة الرئيسية") {
      userMenuStates.set(chatId, "main");
      await bot.sendMessage(chatId, "القائمة الرئيسية:", {
        reply_markup: keyboards.main,
      });
      return;
    }

    switch (msg.text) {
      case "🎲 إختيار عشوائي للآية من القرآن الكريم":
        handleRandomVerse(bot, msg);
        break;
      case "❓ مساعدة":
        handleHelp(bot, msg);
        break;
      case "⚙️ الإعدادات":
        userMenuStates.set(chatId, "settings");
        await bot.sendMessage(chatId, "الإعدادات:", {
          reply_markup: keyboards.settings,
        });
        break;
    }
  });

  return bot;
};
