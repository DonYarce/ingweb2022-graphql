const Joi = require("joi");

const tableCreateSchema = Joi.object({
  number: Joi.number().required(),
  capacity: Joi.string().max(2).required(),
});

export const schemas = {
  tableCreateSchema,
};