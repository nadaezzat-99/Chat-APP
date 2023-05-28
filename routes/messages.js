const express = require('express');
const { messagesValidator } = require('../validations');
const { validate } = require('../middlewares');
const { userAuth } = require('../middlewares');
const { messagesController } = require('../controllers');
const { asycnWrapper } = require('../Lib');

const router = express.Router();

router.post('/', validate(messagesValidator.addMessage), async (req, res, next) => {
  const { content, sender, chat } = req.body;
  const message = messagesController.createMessages({ content, sender, chat });
  const [err, data] = await asycnWrapper(message);
  console.log(data);
  if (err) return next(err);
  res.status(201).json({ data });
});

router.get('/', async (req, res, next) => {
  const { last } = req.query;
  const messages = messagesController.getMessages(last);
  const [err, data] = await asycnWrapper(messages);
  if (err) return next(err);
  res.status(200).json({ messages: data });
});

module.exports = router;
