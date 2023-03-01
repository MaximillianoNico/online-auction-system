import mongoose, { Mongoose } from 'mongoose';

// Define schema
const Schema = mongoose.Schema

const tbl_product = new Schema({
  name: {
    type: String,
    default: 0
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tbl_user'
  },
  price: {
    type: Number
  },
  lastTimeAuction: {
    type: Date,
  },
  startAuction: {
    type: Date,
  },
  isActive: {
    type: Boolean
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  soldBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tbl_user'
  },
  latestBid: new mongoose.Schema({
    bidBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tbl_user'
    },
    bidPrice: {
      type: Number
    }
  })
});

// Compile model from schema
const VideoStorage = mongoose.model("tbl_product", tbl_product);

export default VideoStorage;
