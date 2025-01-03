import mongoose from "mongoose";

const ayahSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  numberInSurat: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  surah: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Surah",
    required: true,
  },
  edition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Edition",
    required: true,
  },
  juz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Juz",
    required: true,
  },
  manzil: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Manzil",
    required: true,
  },
  page: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Page",
    required: true,
  },
  hizbQuarter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HizbQuarter",
    required: true,
  },
  ruku: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ruku",
    required: true,
  },
  sajda: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
});

const tafsirSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  numberInSurat: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  surah: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Surah",
    required: true,
  },
  edition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Edition",
    required: true,
  },
});

const baghawiSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  numberInSurat: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  surah: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Surah",
    required: true,
  },
  edition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Edition",
    required: true,
  },
});

const jalalaynSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  numberInSurat: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  surah: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Surah",
    required: true,
  },
  edition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Edition",
    required: true,
  },
});

const qurtubiSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  numberInSurat: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  surah: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Surah",
    required: true,
  },
  edition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Edition",
    required: true,
  },
});

const waseetSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  numberInSurat: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  surah: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Surah",
    required: true,
  },
  edition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Edition",
    required: true,
  },
});

const Ayah = mongoose.model("Ayah", ayahSchema);
const Tafsir = mongoose.model("Tafsir", tafsirSchema);
const Baghawi = mongoose.model("Baghawi", baghawiSchema);
const Jalalayn = mongoose.model("Jalalayn", jalalaynSchema);
const Qurtubi = mongoose.model("Qurtubi", qurtubiSchema);
const Waseet = mongoose.model("Waseet", waseetSchema);

export { Ayah, Tafsir, Baghawi, Jalalayn, Qurtubi, Waseet };
