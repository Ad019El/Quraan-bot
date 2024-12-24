import TelegramBot from 'node-telegram-bot-api';

export const handleStart = async (bot: TelegramBot, msg: TelegramBot.Message) => {
  const chatId = msg.chat.id;
  await bot.sendMessage(
    chatId,
    'Welcome to Quran Bot! Use /help to see available commands.'
  );
};