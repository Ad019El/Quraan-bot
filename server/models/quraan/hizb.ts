import mongoose from 'mongoose';

const hizbQuarterSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  ayats: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ayah',
  }],
});

const HizbQuarter = mongoose.model("HizbQuarter", hizbQuarterSchema);
export default HizbQuarter;