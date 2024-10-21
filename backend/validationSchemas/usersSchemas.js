import Joi from "joi";

const login = Joi.object({
  params: Joi.object(),
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

const likeBeerById = Joi.object({
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object(),
});

export default { login, likeBeerById };
