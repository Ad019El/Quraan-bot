import TelegramBot from 'node-telegram-bot-api';
import Chat from '../../models/chat.model';
import { messages } from '../utils/messages.utils';
import { keyboards } from '../utils/keyboards.utils';

export const handleStart = async (bot: TelegramBot, msg: TelegramBot.Message) => {
  const chatId = msg.chat.id;
  // store chat information in mongodb 
  // check if the chat already exists
  const existingChat = await Chat.findOne({ chatId: chatId });
  if (existingChat) {
    await bot.sendMessage(
      chatId,
      messages.welcomeBack(msg),
      { reply_markup: keyboards.main }
    );
    return;
  }

  const chat = new Chat({
    chatId: msg.chat.id,
    messageId: msg.message_id,
    isBot: msg.from?.is_bot,
    chatType: msg.chat.type,
    chatUsername: msg.chat.username,
    chatFirstName: msg.chat.first_name,
    date: new Date().toISOString(),
  })
  
  await chat.save();
  
  await bot.sendMessage(
    chatId,
    messages.welcome(msg),
    { reply_markup: keyboards.main }
  );
};