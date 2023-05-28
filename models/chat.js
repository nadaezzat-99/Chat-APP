const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  chatName: {
    type: String,
    trim: true,
    unique: true,
    minLength: 1,
    maxLength: 30,
    default: 'sender',
  },
  isGroupChat: {
    type: Boolean,
    default: false,
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Messages',
  },

  groupAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

}, {
  timestamps: true,
});

const Chats = mongoose.model('Chat', chatSchema);
module.exports = Chats;
