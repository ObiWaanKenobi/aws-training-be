import Joi from 'joi';

export const validationSchema = Joi.object({
  title: Joi.string().min(1).required(),
  description: Joi.string(),
  image_url: Joi.string(),
  price: Joi.number().positive(),
  count: Joi.number().positive().integer(),
});
