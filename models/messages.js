const mongoose = require('mongoose');

const messagesSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 265,
    trim: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat ',
  },

}, {
  timestamps: true,
});

const Messages = mongoose.model('Messages', messagesSchema);
module.exports = Messages;
