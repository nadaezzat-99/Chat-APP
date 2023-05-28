const Joi = require('joi');

const accessChat = Joi.object().keys({
  body: Joi.object().required().keys({
    user: Joi.string().length(24),
  }),
});

module.exports = {
  accessChat,
};
