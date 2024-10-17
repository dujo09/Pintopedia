import Joi from "joi";

const getBeerById = Joi.object({
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object(),
});

const updateBeerById = Joi.object({
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object({
    name: Joi.string(),
    alcoholPercentage: Joi.number(),
    color: Joi.string(),
    averagePrice: Joi.string(),
    rating: Joi.number().min(1).max(5),
    flavorDescription: Joi.string(),
    manufacturer: Joi.string(),
  }),
});

const createBeer = Joi.object({
  params: Joi.object({}),
  body: Joi.object({
    name: Joi.string().required(),
    alcoholPercentage: Joi.number().required(),
    color: Joi.string().required(),
    averagePrice: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required(),
    flavorDescription: Joi.string().required(),
    manufacturer: Joi.string().required(),
  }),
});

const deleteBeerById = Joi.object({
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object(),
});

export default { getBeerById, updateBeerById, createBeer, deleteBeerById };
