import Joi from "joi";

const getBeerById = Joi.object({
  params: Joi.object({
    beerId: Joi.string().required(),
  }),
  body: Joi.object(),
});

const updateBeerById = Joi.object({
  params: Joi.object({
    beerId: Joi.string().required(),
  }),
  body: Joi.object({
    name: Joi.string().required(),
    alcoholPercentage: Joi.number().required(),
    color: Joi.string().required(),
    averagePrice: Joi.number().required(),
    flavorDescription: Joi.string().required(),
    manufacturer: Joi.string().required(),
  }),
});

const rateBeerById = Joi.object({
  params: Joi.object({
    beerId: Joi.string().required(),
  }),
  body: Joi.object({
    rating: Joi.number().min(0).max(5).required(),
  }),
});

const createBeer = Joi.object({
  params: Joi.object({}),
  body: Joi.object({
    name: Joi.string().required(),
    alcoholPercentage: Joi.number().required(),
    color: Joi.string().required(),
    averagePrice: Joi.number().required(),
    flavorDescription: Joi.string().required(),
    manufacturer: Joi.string().required(),
  }),
});

const deleteBeerById = Joi.object({
  params: Joi.object({
    beerId: Joi.string().required(),
  }),
  body: Joi.object(),
});

export default {
  getBeerById,
  updateBeerById,
  createBeer,
  deleteBeerById,
  rateBeerById,
};
