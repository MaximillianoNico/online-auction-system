import mongoose from 'mongoose';

// Define schema
const Schema = mongoose.Schema

const tbl_transactions = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tbl_product'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tbl_user'
  },
  bid: {
    type: Number,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Compile model from schema
const VideoStorage = mongoose.model("tbl_transactions", tbl_transactions);

export default VideoStorage;
