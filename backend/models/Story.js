const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  doctor_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
