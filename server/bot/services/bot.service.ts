import TelegramBot from "node-telegram-bot-api";
import { handleStart } from "../commands/start.command";
import { handleHelp } from "../commands/help.command";
import { handleRandomVerse } from "../commands/quran.command";

export const initializeBot = (token: string) => {
    const bot = new TelegramBot(token, { polling: true });

    // Setup command handlers
    bot.onText(/\/start/, (msg) => handleStart(bot, msg));
    bot.onText(/\/help/, (msg) => handleHelp(bot, msg));
    bot.onText(/\/random/, (msg) => handleRandomVerse(bot, msg));
    bot.onText(/.*/, (msg) => console.log(msg.text));
  
    return bot;
  };