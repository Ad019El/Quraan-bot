import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  username: { type: String, required: false },
  messages: { type: Array, required: true },
  chatId: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;
