const Joi = require("joi");

const userRegisterSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  name: Joi.string().required(),
  password: Joi.string().min(5).required(),
  confirmPassword: Joi.string().required(),
  phoneNumber: Joi.string(),
});

const userLoginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(5).required(),
});

export const schemas = {
  userRegisterSchema,
  userLoginSchema,
};
