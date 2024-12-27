import { initializeBot } from "./services/bot.service";

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  throw new Error('BOT_TOKEN must be provided!');
}

const bot = initializeBot(token);
export default bot;