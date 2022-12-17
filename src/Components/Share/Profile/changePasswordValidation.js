import Joi from 'joi';

const changePasswordValidation = Joi.object({
  password: Joi.string().required().alphanum().messages({
    'string.empty': 'Password is required.',
    'any.required': 'Password is rquried',
    'string.base': 'Letters and numbers only.',
    'any.only': 'Passwords must be the same.'
  }),
  repeatPassword: Joi.ref('password')
});

export default changePasswordValidation;
