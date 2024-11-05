import Joi from "joi";

const getManufacturerById = Joi.object({
  params: Joi.object({
    manufacturerId: Joi.string().required(),
  }),
  body: Joi.object(),
});

const updateManufacturerById = Joi.object({
  params: Joi.object({
    manufacturerId: Joi.string().required(),
  }),
  body: Joi.object({
    name: Joi.string().required(),
    yearEstablished: Joi.number().required(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    description: Joi.string().required(),
    website: Joi.string().required(),
  }),
});

const createManufacturer = Joi.object({
  params: Joi.object(),
  body: Joi.object({
    name: Joi.string().required(),
    yearEstablished: Joi.number().required(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    description: Joi.string().required(),
    website: Joi.string().required(),
  }),
});

const deleteManufacturerById = Joi.object({
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object(),
});

export default {
  getManufacturerById,
  updateManufacturerById,
  deleteManufacturerById,
  createManufacturer,
};
