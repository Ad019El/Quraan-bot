import TelegramBot from "node-telegram-bot-api";
import { getRandomAyahWithTafsir } from "../services/quranService";
import Chat from "../../models/chat";
import { messages } from "../utils/messages";

export const handleRandomVerse = async (
  bot: TelegramBot,
  msg?: TelegramBot.Message
) => {
  try {
    const quraan = await getRandomAyahWithTafsir();

    if (!quraan) return;
    await bot.sendMessage(
      msg?.chat?.id as number,
      messages.verseMessage(quraan),
      {
        parse_mode: "Markdown",
      }
    );
    await bot.sendMessage(
      msg?.chat?.id as number,
      messages.tafsirMessage(quraan),
      {
        parse_mode: "Markdown",
      }
    );
  } catch (error) {
    console.error("Failed to fetch random verse:", error);
  }
};

export const broadcastVerse = async (bot: TelegramBot) => {
  try {
    const quraan = await getRandomAyahWithTafsir();
    // Get all chat IDs from MongoDB
    const chats = await Chat.find({}, "chatId");
    const chatIds = chats.map((chat) => chat.chatId);

    console.log(chatIds);

    // here show houre after that show the date
    console.log(`Sending broadcast message of ${new Date().toISOString()} `);

    // Send messages to each chat
    if (!quraan) return;
    for (const chatId of chatIds) {
      try {
        await bot.sendMessage(chatId, messages.verseMessage(quraan), {
          parse_mode: "Markdown",
        });
        await bot.sendMessage(chatId, messages.tafsirMessage(quraan), {
          parse_mode: "Markdown",
        });
      } catch (error) {
        console.error(`Failed to send message to chat ${chatId}:`, error);
      }
    }
  } catch (error) {
    console.error("Failed to fetch chat IDs:", error);
  }
};
