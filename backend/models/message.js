const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId: {
    type: String,
    
  },
  recepientId: {
    type: String,
  },
  messageType: {
    type: String,
    enum: ["text", "image"],
  },
  message: String,
  imageUrl: String,
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model('Message',messageSchema);

module.exports = Message;