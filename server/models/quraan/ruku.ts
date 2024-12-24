import mongoose from 'mongoose';

const rukuSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  ayats: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ayah',
  }],
});

const Ruku = mongoose.model("Ruku", rukuSchema);
export default Ruku;