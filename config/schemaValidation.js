const Joi = require("joi");

const userValidationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  city: Joi.string().required(),
  age: Joi.number().integer().min(0).max(120).required(),
  zipCode: Joi.string()
    .pattern(/^\d{6}(-\d{4})?$/)
    .required(),
  deleted: Joi.boolean().default(false),
});


module.exports = {userValidationSchema};
