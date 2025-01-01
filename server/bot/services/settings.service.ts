import TelegramBot from "node-telegram-bot-api";
import Chat from "../../models/chat.model";
import { getChikhOrIdentifier } from "../utils/chikhIdentifier.utils";

export const handleNotificationToggle = async (
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
  msg: TelegramBot.Message
) => {
  try {
    const chatId = msg.chat.id;
    const chat = await Chat.findOne({ chatId: chatId });

    if (!chat) return;
    if (chat.preferences) {
      chat.preferences.chaikh = getChikhOrIdentifier(msg.text || "");
    }

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
