const Joi = require('joi');

const signUp = {
  body: Joi.object().keys({
    userName: Joi.string().required().min(8),
    firstName: Joi.string().required().min(3).max(15),
    lastName: Joi.string().required().min(3).max(15),
    password: Joi.string().required(),
    DOB: Joi.date(),
    phone: Joi.string().required().trim().length(11)
      .regex(/^[0-9]*$/),
  }),
};

const signIn = {
  body: Joi.object().required().keys({
    userName: Joi.string().min(8).max(15),
    password: Joi.string(),
  }),
};

const id = {
  params: Joi.object().required().keys({
    id: Joi.string().length(24).required(),
  }),
};

const update = {
  body: Joi.object().keys({
    userName: Joi.string().min(8),
    firstName: Joi.string().min(3).max(15),
    lastName: Joi.string().min(3).max(15),
    password: Joi.string().required(),
    DOB: Joi.date(),
  }).min(1),
};

const search = {
  body: Joi.object().keys({
    search: Joi.string().trim().min(3).max(10),
  }),
};

module.exports = {
  signUp,
  signIn,
  id,
  update,
  search,
};
