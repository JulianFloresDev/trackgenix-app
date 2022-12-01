import Joi from 'joi';

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Invalid email format',
      'string.base': 'Invalid email format'
    }),
  password: Joi.string().alphanum().min(8).max(50).messages({
    'string.empty': 'Password is required',
    'string.alphanum': 'Password must be letters and numbers only',
    'string.min': 'Password should have betwen 8 and 50 characters',
    'string.max': 'Password should have betwen 8 and 50 characters'
  })
});
