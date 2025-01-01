import TelegramBot from "node-telegram-bot-api";
import Chat from "../../models/chat.model";
import { getChikhOrIdentifier } from "../utils/chikhIdentifier.utils";

export const handleNotificationToggle = async (
  bot: TelegramBot,
  msg: TelegramBot.Message,
  enable: boolean
) => {
  try {
    // update chat in MongoDB
    const chatId = msg.chat.id;
    const chat = await Chat.findOne({ chatId: chatId });

    if (!chat) return;
    if (chat.preferences) {
      chat.preferences.notifications = enable;
    }

    if (enable) await bot.sendMessage(chatId, "تم تفعيل الإشعارات");
    else await bot.sendMessage(chatId, "تم إيقاف الإشعارات");

    await chat.save();
  } catch (error) {
    console.error(
      "Failed to toggle notifications for chat:",
      msg.chat.id,
      "\nwith error: ",
      error
    );
  }
};

export const handleChikhChange = async (
  bot: TelegramBot,
  msg: TelegramBot.Message
) => {
  try {
    const chatId = msg.chat.id;
    const chat = await Chat.findOne({ chatId: chatId });

    if (!chat) return;
    if (chat.preferences) {
      chat.preferences.chaikh = getChikhOrIdentifier(msg.text || "").identifier;
    }

    await bot.sendMessage(chatId, `تم تغيير القارئ إلى ${msg.text}`);

    await chat.save();
  } catch (error) {
    console.error(
      "Failed to change chikh for chat:",
      msg.chat.id,
      "\nwith error: ",
      error
    );
  }
};
