import TelegramBot from 'node-telegram-bot-api';
import { BotService } from './services/botService';

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  throw new Error('BOT_TOKEN must be provided!');
}

const bot = new TelegramBot(token, { polling: true });
new BotService(bot);

export default bot;