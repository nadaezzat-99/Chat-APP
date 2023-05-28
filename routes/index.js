const express = require('express');
const messagesRouter = require('./messages');
const usersRouter = require('./users');
const chatsRouter = require('./chat');

const router = express.Router();

router.use('/messages', messagesRouter);
router.use('/users', usersRouter);
router.use('/chats', chatsRouter);

module.exports = router;
