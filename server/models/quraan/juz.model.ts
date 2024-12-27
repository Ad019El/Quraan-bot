import mongoose from 'mongoose';

const juzSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  ayats: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ayah',
  }],
});

const Juz = mongoose.model("Juz", juzSchema);
export default Juz;