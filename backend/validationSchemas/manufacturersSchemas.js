import Joi from "joi";

const getManufacturerById = Joi.object({
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object(),
});

const updateManufacturerById = Joi.object({
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object({
    name: Joi.string(),
    yearEstablished: Joi.number(),
    country: Joi.string(),
    city: Joi.string(),
    description: Joi.string(),
    website: Joi.string(),
  }),
});

const deleteManufacturerById = Joi.object({
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object(),
});

export default { getManufacturerById, updateManufacturerById, deleteManufacturerById };
