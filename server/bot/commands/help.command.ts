import TelegramBot from 'node-telegram-bot-api';
import { messages } from '../utils/messages.utils';

export const handleHelp = async (bot: TelegramBot, msg: TelegramBot.Message) => {

  await bot.sendMessage(msg.chat.id, messages.help);
};