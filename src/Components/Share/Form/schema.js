import Joi from 'joi';
//Faltan agregar validaciones para las entidades que no son del tipo de 'usuario' ...
//pero se pisan las validaciones con las demás entidades y tira error por los required()...
//Creo que hay que hacer varias validaciones distintas y hacer un useForm con cada validacion para
//pasar los errores a los inputs... O preguntarle al Monkey o Alfonso :\
export const schema = Joi.object({
  firstName: Joi.string()
    .regex(/^[\w\s]+$/)
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.empty': 'First name required',
      'string.pattern.base': 'First name should be letters and spaces only',
      'string.min': 'First name should have betwen 3 and 30 characters only',
      'string.max': 'First name should have betwen 3 and 30 characters only',
      'any.required': 'First name required'
    }),
  lastName: Joi.string()
    .regex(/^[\w\s]+$/)
    .min(2)
    .max(30)
    .required()
    .messages({
      'string.empty': 'Last name required',
      'string.pattern.base': 'Last name should be letters and spaces only',
      'string.min': 'Last name should have betwen 2 and 30 characters only',
      'string.max': 'Last name should have betwen 2 and 30 characters only',
      'any.required': 'Last name required'
    }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.base': 'Invalid email format',
    'any.required': 'Email is required'
  }),
  password: Joi.string().alphanum().min(8).max(50).required().messages({
    'string.empty': 'Password is required',
    'string.alphanum': 'Password must be letters and numbers only',
    'string.min': 'Password should have betwen 8 and 50 characters',
    'string.max': 'Password should have betwen 8 and 50 characters',
    'any.required': 'Password is required'
  }),
  dni: Joi.string().regex(/^\d+$/).min(7).max(11).required().messages({
    'string.empty': 'D.N.I. is required',
    'string.pattern.base': 'D.N.I. is a numeric field',
    'string.min': 'D.N.I. should have betwen 7 and 11 characters',
    'string.max': 'D.N.I. should have betwen 7 and 11 characters',
    'any.required': 'D.N.I. is required'
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
