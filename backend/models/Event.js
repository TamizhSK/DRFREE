const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  event_Name: {
    type: String,
    required: true,
  },
  event_Poster: {
    type: String, // Assuming you store the URL or path of the event poster
    required: true,
  },
  event_description: {
    type: String,
    required: true,
  },
  Org_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true,
  },
  reg_link: {
    type: String,
    required: true,
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
