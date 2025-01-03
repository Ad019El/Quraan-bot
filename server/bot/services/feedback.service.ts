import TelegramBot from "node-telegram-bot-api";
import { FeedbackState } from "../types/bot.types";
import Feedback from "../../models/feedback.model";

export const userStates = new Map<number, FeedbackState>();

export const startFeedbackSession = (chatId: number) => {
  userStates.set(chatId, { isCollecting: true, messages: [] });
};

export const addFeedbackMessage = (chatId: number, message: string) => {
  const state = userStates.get(chatId);
  if (state?.isCollecting) {
    state.messages.push(message);
  }
};

export const endFeedbackSession = (chatId: number): string[] => {
  const state = userStates.get(chatId);
  userStates.delete(chatId);
  return state?.messages || [];
};

export const saveFeedback = async (
  msg: TelegramBot.Message,
  messages: string[]
) => {
  const feedbackMessages = {
    chatId: msg.chat.id,
    firstName: msg.chat.first_name,
    username: msg.chat.username,
    messages,
  };
  const feedback = new Feedback(feedbackMessages);
  await feedback.save();
};
