// @ts-nocheck
const express = require('express');
const { usersController } = require('../controllers');
const { userAuth } = require('../middlewares');
const { validate } = require('../middlewares');
const { usersValidator } = require('../validations');
const { asycnWrapper } = require('../Lib');
const AppError = require('../Lib/appError');

const router = express.Router();

router.post('/', validate(usersValidator.signUp), async (req, res, next) => {
  const {
    body: {
      userName, firstName, lastName, password, DOB, quote, role, phone,
    },
  } = req;
  const user = usersController.create({
    userName, firstName, lastName, password, DOB, quote, role, phone,
  });
  const [err, data] = await asycnWrapper(user);
  if (err) return next(err);
  res.status(201).json({ data });
});

router.post('/signin', validate(usersValidator.signIn), async (req, res, next) => {
  const { body: { userName, password } } = req;
  try {
    const { token, user } = await usersController.signIn(userName, password);
    res.cookie({ token }).status(201).json({ token, user });
  } catch (err) {
    next(err);
  }
});

router.patch('/', userAuth, validate(usersValidator.update), async (req, res, next) => {
  const {
    firstName, lastName, userName, DOB, password,
  } = req.body;
  const updatedUser = usersController.update(req.user._id, {
    firstName, lastName, userName, DOB, password,
  });
  const [err, data] = await asycnWrapper(updatedUser);
  if (err) return next(err);
  res.status(200).json({ data });
});

router.get('/', userAuth, validate(usersValidator.search), async (req, res, next) => {
  const { search } = req.query;
  const users = usersController.getallusers(search, req.user._id);
  const [err, data] = await asycnWrapper(users);
  if (err) return next(err);
  res.status(200).json({ data });
});
module.exports = router;
