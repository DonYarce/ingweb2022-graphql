const Joi = require("joi");

const scheduleRegisterSchema = Joi.object({
  startTime: Joi.string().required(),
  endTime: Joi.string().required(),
});

const shceduleUpdateSchema = Joi.object({
  startTime: Joi.string().required(),
  endTime: Joi.string().required(),
});

export const schemas = {
  scheduleRegisterSchema,
  shceduleUpdateSchema
};
