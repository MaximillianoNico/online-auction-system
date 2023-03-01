import mongoose from 'mongoose';

// Define schema
const Schema = mongoose.Schema

const tbl_user = new Schema({
  deposit: {
    type: Number,
    default: 0
  },
  email: {
    type: String,
    default: false
  },
  password: {
    type: String,
    default: false
  },
  salt: {
    type: String,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Compile model from schema
const VideoStorage = mongoose.model("tbl_user", tbl_user);

export default VideoStorage;
