import Joi from 'joi';

const nameMessage = {
  'string.base': 'Name must be a string',
  'string.min': 'Name must be at list {#limit}',
  'string.max': 'Name must be at most {#limit}',
};

const phoneNumberMessage = {
  'number.base': 'PhoneNumber must be a number',
  'number.min': 'PhoneNumber must be at list {#limit}',
  'number.max': 'PhoneNumber must be at most {#limit}',
};

export const createContactSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .required()
    .messages({
      'any.required': 'Name must exist',
      ...nameMessage,
    }),
  phoneNumber: Joi.number()
    .required()
    .messages({
      'any.required': 'PhoneNumber must exist',
      ...phoneNumberMessage,
    }),
  email: Joi.string().email().required(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal').required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages(nameMessage),
  phoneNumber: Joi.number().messages(phoneNumberMessage),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
});
