import Joi from 'joi';

const teamMembersValidation = Joi.object({
  employee: Joi.string().messages({
    'string.empty': 'Team members must be a valid employee'
  }),
  role: Joi.string().valid('DEV', 'QA', 'TL', 'PM').messages({
    'string.empty': 'role required',
    'any.only': 'role can only be DEV, QA, TL or PM'
  }),
  rate: Joi.number().min(1).max(1000).messages({
    'string.empty': 'Rate required',
    'number.pattern.base': 'Rate should be numbers only',
    'number.min': 'Rate should have a minimum of 1',
    'number.max': 'Rate should have a maximum of 1000'
  })
});
export const formSchema = Joi.object({
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
  }),
  type: Joi.string().valid('Frontend', 'Backend', 'Testing').messages({
    'string.empty': 'Type is required',
    'any.only': 'Task type should be Frontend, Backend or Testing'
  }),
  date: Joi.date().iso().messages({
    'any.empty': 'Date is required',
    'date.base': 'Date have an invalid format',
    'date.format': 'Date is required'
  }),
  description: Joi.string().min(5).max(150).messages({
    'string.empty': 'Description is required',
    'string.min': 'Description should have a minimum length of 5 characters',
    'string.max': 'Description should have a maximum length of 150 characters'
  }),
  task: Joi.string().messages({
    'string.empty': 'Task is required'
  }),
  employee: Joi.string().messages({
    'string.empty': 'Employee is required'
  }),
  project: Joi.string().messages({
    'string.empty': 'Project is required'
  }),
  hours: Joi.number().min(1).max(12).messages({
    'hours.empty': 'Hours is required',
    'number.min': 'Minimum 1 hour',
    'number.max': 'Maximum 12 hours'
  }),
  name: Joi.string()
    .min(3)
    .max(30)
    .regex(/^[\w\s]+$/)
    .messages({
      'string.empty': 'Name required',
      'string.pattern.base': 'Name should be letters, numbers or spaces only',
      'string.min': 'Name should have a minimum length of 3 characters',
      'string.max': 'Name should have a maximum length of 30 characters'
    }),
  startDate: Joi.date().messages({
    'string.empty': 'StartDate required'
  }),
  endDate: Joi.date().messages({
    'date.pattern.base': 'EndDate must be a valid date'
  }),
  active: Joi.boolean().messages({
    'string.pattern.base': 'Active should be true or false'
  }),
  clientName: Joi.string().min(2).max(30).messages({
    'string.empty': 'clientName required',
    'string.min': 'clientName should have a minimum length of 2 characters',
    'string.max': 'clientName should have a maximum length of 30 characters'
  }),
  teamMembers: Joi.array().items(teamMembersValidation),
  firebaseUid: Joi.string()
});
