import Joi from 'joi';

export const signupSchema = Joi.object({
  firstName: Joi.string()
    .regex(/^[\w\s]+$/)
    .min(3)
    .max(30)
    .messages({
      'string.empty': 'First name required',
      'string.pattern.base': 'First name should be letters and spaces only',
      'string.min': 'First name should have betwen 3 and 30 characters only',
      'string.max': 'First name should have betwen 3 and 30 characters only'
    }),
  lastName: Joi.string()
    .regex(/^[\w\s]+$/)
    .min(2)
    .max(30)
    .messages({
      'string.empty': 'Last name required',
      'string.pattern.base': 'Last name should be letters and spaces only',
      'string.min': 'Last name should have betwen 2 and 30 characters only',
      'string.max': 'Last name should have betwen 2 and 30 characters only'
    }),
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
  }),
  dni: Joi.string().regex(/^\d+$/).min(7).max(11).messages({
    'string.empty': 'D.N.I. is required',
    'string.pattern.base': 'D.N.I. is a numeric field',
    'string.min': 'D.N.I. should have betwen 7 and 11 characters',
    'string.max': 'D.N.I. should have betwen 7 and 11 characters'
  }),
  phone: Joi.string().regex(/^\d+$/).min(8).max(15).messages({
    'string.pattern.base': 'Phone must be numbers only',
    'string.min': 'Phone should have betwen 8 and 15 characters',
    'string.max': 'Phone should have betwen 8 and 15 characters'
  }),
  location: Joi.string().min(3).max(50).messages({
    'string.min': 'Address should have betwen 3 and 50 characters',
    'string.max': 'Address should have betwen 3 and 50 characters'
  })
});
