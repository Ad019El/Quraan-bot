import mongoose from 'mongoose';

const pageSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  ayats: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ayah',
  }],
});

const Page = mongoose.model("Page", pageSchema);
export default Page;