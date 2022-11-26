import Joi from 'joi';

export const userValidation = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.required': 'Email is required',
      'string.email': 'Email must be a valid email format'
    }),
  password: Joi.string().alphanum().required().min(8).max(25).messages({
    'string.empty': 'Password is required',
    'string.required': 'Password is required',
    'string.min': 'Password must contain at least 8 characters',
    'string.max': 'Password must contain at most 25 characters'
  })
});
