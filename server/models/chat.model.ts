import mongoose, { Schema } from "mongoose";

const chat = new Schema({
  chatId: {
    type: Number,
    required: true,
  },
  messageId: {
    type: Number,
    required: true,
  },
  isBot: {
    type: Boolean,
    required: true,
  },
  chatType: {
    type: String,
    required: true,
  },
  chatUsername: {
    type: String,
  },
  chatFirstName: {
    type: String,
  },
  preferences: {
    notifications: {
      type: Boolean,
      default: true,
    },
    tafsir: {
      type: String,
      default: "ar.muyassar",
    },
    chaikh: {
      type: String,
      default: "ar.husarymujawwad",
    },
  },
  date: {
    type: String,
  },
});

const Chat = mongoose.model("Chat", chat);
export default Chat;
