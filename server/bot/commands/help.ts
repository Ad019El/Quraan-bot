import TelegramBot from 'node-telegram-bot-api';

export const handleHelp = async (bot: TelegramBot, msg: TelegramBot.Message) => {
  const commands = [
    '/start - Start the bot',
    '/help - Show this help message',
    '/random - Get a random Quran ayah',
  ].join('\n');

  await bot.sendMessage(msg.chat.id, commands);
};