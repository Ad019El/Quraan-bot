import TelegramBot from "node-telegram-bot-api";
import { handleStart } from "../commands/start.command";
import { handleHelp } from "../commands/help.command";
import { handleRandomVerse } from "../commands/quran.command";
import { commands } from "../utils/commands.utils";
import { keyboards } from "../utils/keyboards.utils";
import { handleKeyboardCommands } from "../commands/keboard.commands";

const userMenuStates = new Map<number, string>();

export const initializeBot = (token: string) => {
  const bot = new TelegramBot(token, { polling: true });

  bot.setMyCommands(commands);

  // Setup command handlers
  bot.onText(/\/start/, (msg) => handleStart(bot, msg));
  bot.onText(/\/help/, (msg) => handleHelp(bot, msg));
  bot.onText(/\/random/, (msg) => handleRandomVerse(bot, msg));
  bot.onText(/\/settings/, (msg) =>
    bot.sendMessage(msg?.chat?.id, "الإعدادات:", {
      reply_markup: keyboards.settings,
    })
  );

  // Keyboard handlers
  bot.on("message", (msg) => handleKeyboardCommands(bot, msg));

  return bot;
};
