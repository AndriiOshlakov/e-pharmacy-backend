import { Joi, Segments } from 'celebrate';

export const checkoutSchema = {
  [Segments.BODY]: Joi.object({
    userName: Joi.string().min(2).max(50).required().messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 2 characters',
    }),

    phone: Joi.string()
      .pattern(/^\+38\d{10}$/)
      .required()
      .messages({
        'string.pattern.base': 'Phone must match format +380XXXXXXXXX',
      }),

    email: Joi.string().email().required().messages({
      'string.email': 'Invalid email format',
    }),

    address: Joi.string().min(5).required().messages({
      'string.empty': 'Address is required',
    }),
  }),
};
