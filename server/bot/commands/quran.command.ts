import TelegramBot, { ChatId } from "node-telegram-bot-api";
import { getRandomAyahWithTafsir } from "../services/quran.service";
import Chat from "../../models/chat.model";
import { messages } from "../utils/messages.utils";
import { getChikhOrIdentifier } from "../utils/chikhIdentifier.utils";

export const handleRandomVerse = async (
  bot: TelegramBot,
  msg?: TelegramBot.Message
) => {
  try {
    const quraan = await getRandomAyahWithTafsir();
    if (!quraan) return;
    // get chat by chatId
    const ayahNumber = quraan?.ayah?.number;
    const chat = await Chat.findOne({ chatId: msg?.chat?.id });
    const chikh = chat?.preferences?.chaikh;
    const message =
      messages.verseMessage(quraan) +
      "\n\u200F-----------------\n\n" +
      messages.tafsirMessage(quraan);

    await bot.sendMessage(msg?.chat?.id as number, message, {
      parse_mode: "Markdown",
    });
    console.log(`https://cdn.islamic.network/quran/audio/128/${chikh}/${ayahNumber}.mp3`)

    await bot.sendAudio(
      msg?.chat?.id as ChatId,
      `https://cdn.islamic.network/quran/audio/128/${chikh}/${ayahNumber}.mp3`
    );
  } catch (error) {
    console.error("Failed to fetch random verse:", error);
  }
};

export const broadcastVerse = async (bot: TelegramBot) => {
  try {
    const quraan = await getRandomAyahWithTafsir();
    // Get all chat IDs from MongoDB
    const chats = await Chat.find(
      { "preferences.notifications": true },
      "chatId"
    );
    const chatIds = chats.map((chat) => chat.chatId);
    if (!quraan) return;
    const message =
      messages.verseMessage(quraan) +
      "\n\u200F-----------------\n\n" +
      messages.tafsirMessage(quraan);

    console.log(
      `Sending broadcast message of ${new Date().toISOString()} to this chatIds:`
    );
    console.log(chatIds);

    // Send messages to each chat
    for (const chatId of chatIds) {
      try {
        const chat = await Chat.findOne({ chatId: chatId });
        const chikh = chat?.preferences?.chaikh;
        await bot.sendMessage(chatId, message, {
          parse_mode: "Markdown",
        });
        await bot.sendAudio(
          chatId as ChatId,
          `https://cdn.islamic.network/quran/audio/128/${chikh}/${quraan?.ayah?.number}.mp3`
        );
      } catch (error) {
        console.error(`Failed to send message to chat ${chatId}:`, error);
      }
    }
  } catch (error) {
    console.error("Failed to fetch chat IDs:", error);
  }
};
