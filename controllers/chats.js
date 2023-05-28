const { AppError } = require('../Lib');
const { Chats, Users } = require('../models');

const accessChat = async (user, me, lastMessage) => {
  let isChat = await Chats.find({ isGroupChat: false, $and: [{ users: { $elemMatch: { $eq: user } } }, { users: { $elemMatch: { $eq: me } } }] })
    .populate('users', '-password')
    .populate('lastMessage');

  isChat = await Users.populate(isChat, {
    path: 'lastMessage.sender',
    select: 'userName pic phone',
  });

  if (isChat.length) return isChat[0];
  const chatData = {
    chatName: 'sender',
    isGroupChat: false,
    users: [me, user],
    lastMessage,
  };
  const newChat = await Chats.create(chatData);
  const FullChat = await Chats.findOne({ _id: newChat._id }).populate(
    'users',
    '-password',
  );
  return FullChat;
};

const getUserChats = async (user) => Chats.find({ users: { $elemMatch: { $eq: user } } })
  .populate('users', '-password')
  .populate('groupAdmin', '-password')
  .populate('lastMessage')
  .populate('lastMessage.sender', 'name pic phone')
  .sort({ updatedAt: -1 });

const createGroupChat = async ({ users, me, chatName }) => Chats.create({
  isGroupChat: true, users, chatName, groupAdmin: me,
});

const editGroupChat = async ({
  me, chatName, chatId, users,
}) => {
  try {
    const chat = await Chats.findOne({ _id: chatId, users: { $elemMatch: { $eq: me } } });
    if (chatName) chat.chatName = chatName;
    if (users) {
      users.forEach(async (el) => {
        const user = await Users.findById(el.id);
        if (!user) throw new AppError("user deosn't exist", 422);
        if (el.action === 'add') {
          if (!chat.users.includes(el.id)) chat.users.push(el.id);
          else throw new AppError('user already exists', 422);
        } else if (el.action === 'remove') {
          const userIndex = chat.users.indexOf(el.id);
          if (userIndex === -1) throw new AppError("user deosn't exist", 422);
          else chat.users.splice(userIndex, 1);
        }
      });
    }
    return chat.save();
  } catch (e) {
    throw e;
  }
};

module.exports = {
  accessChat,
  getUserChats,
  createGroupChat,
  editGroupChat,
};
