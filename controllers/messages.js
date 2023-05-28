const { date } = require('joi');
const { Messages } = require('../models');

const createMessages = async (data) => Messages.create({ content: data.content, sender: data.sender, chat: data.chat });

const createPrivateMessages = async (data, to) => {
  const result = await Messages.create({ content: data.newMessage, receiverrId: to });
  return result;
};

const getMessages = ({ last, chat }) => {
  if (!last) {
    return Messages.find({ chat }).populate('sender');
  }
  return Messages.find({ createdAt: { $gt: last } }).populate('sender');
};

const getMessagesLong = async (data, all, userId) => {
  if (!all) return Messages.create({ content: data.newMessage, userId });
  return Messages.find({});
};

module.exports = {
  createMessages,
  getMessages,
  getMessagesLong,
  createPrivateMessages,
};
