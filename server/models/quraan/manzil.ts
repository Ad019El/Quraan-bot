import mongoose from 'mongoose';

const manzilSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  ayats: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ayah',
  }],
});

const Manzil = mongoose.model("Manzil", manzilSchema);
export default Manzil;