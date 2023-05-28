const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Users } = require('../models');
const AppError = require('../Lib/appError');
const Messages = require('../models/messages');

const createToken = (user) => {
  const token = jwt.sign({ id: user._id, userName: user.userName }, process.env.TOKEN_KEY, { expiresIn: '7d' });
  return { token, user };
};

const create = async (data) => Users.create(data);

const signIn = async (userName, pass) => {
  const user = await Users.findOne({ userName });
  if (!user) throw new AppError('Please register first', 401);
  const valid = user.verifyPassword(pass);
  if (!valid) throw new AppError('un-authenticated', 401);
  return createToken(user);
};

const update = (_id, updatedObj) => {
  if (updatedObj.password) updatedObj.password = bcrypt.hashSync(updatedObj.password, 10);
  return Users.updateOne({ _id }, updatedObj, { new: true });
};

const deleteUser = (id) => Users.findByIdAndDelete(id);

const getallusers = async (search, userId) => {
  const keyWord = search ? {
    $or: [
      { userName: { $regex: search, $options: 'i' } },
      { firstName: { $regex: search, $options: 'i' } },
      { lastName: { $regex: search, $options: 'i' } },
    ],
  } : {};

  return Users.find({ ...keyWord, _id: { $ne: userId } });
};

module.exports = {
  create,
  signIn,
  deleteUser,
  update,
  getallusers,
};
