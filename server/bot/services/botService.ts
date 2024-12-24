import TelegramBot from 'node-telegram-bot-api';
import { handleStart } from '../commands/start';
import { handleHelp } from '../commands/help';
import { QuranCommands } from '../commands/quran';
import { QuranService } from './quranService';

export class BotService {
  private quranCommands: QuranCommands;

  constructor(private bot: TelegramBot) {
    const quranService = new QuranService();
    this.quranCommands = new QuranCommands(bot, quranService);
    this.initializeCommands();
  }

  private initializeCommands() {
    this.bot.onText(/\/start/, (msg) => handleStart(this.bot, msg));
    this.bot.onText(/\/help/, (msg) => handleHelp(this.bot, msg));
    this.bot.onText(/\/random/, (msg) => this.quranCommands.handleRandomVerse(msg));
    // log all messages
    this.bot.onText(/.*/, (msg) => console.log(msg.text));
  }
}