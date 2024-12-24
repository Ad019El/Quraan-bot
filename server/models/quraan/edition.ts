import mongoose from 'mongoose';

const editionSchema = new mongoose.Schema({
  identifier: {
    type: String,
    required: true,
    unique: true,
  },
  language: {
    type: String,
    required: true,
  },
  englishName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  format: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  }
});

const Edition = mongoose.model("Edition", editionSchema);
export default Edition;