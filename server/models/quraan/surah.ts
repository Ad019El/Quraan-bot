import mongoose from 'mongoose';

const surahSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  englishName: {
    type: String,
    required: true,
  },
  englishTranslation: {
    type: String,
    required: true,
  },
  revelationCity: {
    type: String,
    required: true,
  },
  numberOfAyats: {
    type: Number,
  },
});

const Surah = mongoose.model("Surah", surahSchema);
export default Surah;