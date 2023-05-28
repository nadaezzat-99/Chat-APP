const jwt = require('jsonwebtoken');
const AppError = require('../Lib/appError');
const Users = require('../models/users');

const verifyToken = async (token) => {
  // @ts-ignore
  const decoded = jwt.verify(token, process.env.TOKEN_KEY);
  const user = await Users.findById(decoded.id);
  if (!user) return new AppError('un-Authenticated', 401);
  return user;
};

const userAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) throw new AppError('Un-Authenticated', 401);
    const result = await verifyToken(token);
    req.user = result;
    return next();
  } catch (err) {
    next(err);
  }
};

module.exports = userAuth;
