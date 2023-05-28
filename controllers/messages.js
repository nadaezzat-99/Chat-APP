const { date } = require('joi');
const { Messages } = require('../models');

// @ts-ignore
const createMessages = async (data) => Messages.create({ content: data.content, sender: data.sender, chat: data.chat });

const createPrivateMessages = async (data, to) => {
  const result = await Messages.create({ content: data.newMessage, receiverrId: to });
  return result;
};

// @ts-ignore
const getMessages = ({ last, chat }) => {
  console.log(last);
  console.log(typeof last);
  if (!last) {
    return Messages.find({ chat }).populate('sender');
  }
  console.log('hi', (last));
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
