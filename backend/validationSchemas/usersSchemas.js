import Joi from "joi";

const getUserById = Joi.object({
  params: Joi.object({
    userId: Joi.string().required(),
  }),
  body: Joi.object(),
});

const updateUserById = Joi.object({
  params: Joi.object(),
  body: Joi.object({
    username: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    country: Joi.string().required(),
  }),
});

const login = Joi.object({
  params: Joi.object(),
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

const register = Joi.object({
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
  body: Joi.object({
    isLiked: Joi.boolean().required(),
  }),
});

export default { getUserById, login, register, likeBeerById, updateUserById };
