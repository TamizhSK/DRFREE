const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  licence: {
    type: String,
    required: true,
  },
  freindRequests: [
    {
      type: String,
    },
  ],
  friends: [
    {
      type: String,
    },
  ],
  sentFriendRequests: [
    {
      type: String
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const doc = mongoose.model('doc', userSchema);

module.exports = doc;
