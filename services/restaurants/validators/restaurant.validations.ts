const Joi = require("joi"); 

const restaurantCreateSchema = Joi.object({
  name: Joi.string().required(),
  phoneNumber: Joi.string(),
  type: Joi.string().required(),
});

const restaurantUpdateSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string(),
  phoneNumber: Joi.string(),
  type: Joi.string(),
});


export const schemas = {
  restaurantCreateSchema,
  restaurantUpdateSchema,
};


 
