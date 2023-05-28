const Joi = require('joi');

const addMessage = {
  body: Joi.object().required().keys({
    content: Joi.string().trim().min(1).max(256),
    sender: Joi.string().trim().length(24),
    chat: Joi.string().trim().length(24),
  }),
};

module.exports = {
  addMessage,
};
