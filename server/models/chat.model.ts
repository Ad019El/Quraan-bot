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
  date: {
    type: String,
  },
});

const Chat = mongoose.model("Chat", chat);
export default Chat;
