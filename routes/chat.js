// @ts-nocheck
const express = require('express');
const { chatsValidator } = require('../validations');
const { userAuth } = require('../middlewares');
const { validate } = require('../middlewares');
const { chatsController } = require('../controllers');
const { asycnWrapper } = require('../Lib');

const router = express.Router();
router.post('/', userAuth, validate(chatsValidator.accessChat), async (req, res, next) => {
  const { user, lastMessage } = req.body;
  try {
    const data = await chatsController.accessChat(user, req.user._id, lastMessage);
    res.status(201).json({ data });
  } catch (error) {
    return next(error);
  }
});

router.post('/group', userAuth, async (req, res, next) => {
  const { users, chatName } = req.body;
  console.log(users);
  const chat = chatsController.createGroupChat({ users, me: req.user._id, chatName });
  const [err, data] = await asycnWrapper(chat);
  if (err) return next(err);
  res.status(201).json({ data });
});

router.get('/', userAuth, async (req, res, next) => {
  const chats = chatsController.getUserChats(req.user._id);
  const [err, data] = await asycnWrapper(chats);
  if (err) return next(err);
  res.status(200).json({ chats: data });
});

router.patch('/', userAuth, async (req, res, next) => {
  const { chatName, users, chatId } = req.body;
  try {
    const chat = await chatsController.editGroupChat({
      chatName, me: req.user._id, users, chatId,
    });
    res.status(200).json({ chat });
  } catch (error) {
    return next(error);
  }
});


module.exports = router;
