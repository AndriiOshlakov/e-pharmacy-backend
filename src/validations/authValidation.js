import { Joi, Segments } from 'celebrate';

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).max(30).messages({
      'string.min': 'Ім’я користувача має містити щонайменше 3 символи',
      'string.max': 'Ім’я користувача має містити щонайбільше 30 символи',
    }),
    phone: Joi.string()
      .pattern(/^\+?\d{10,15}$/)
      .messages({
        'string.pattern.base':
          'Некоректний номер телефону. Приклад: +380971234567 або 0971234567',
      }),
    email: Joi.string().email().required().messages({
      'string.empty': 'Поле "Email" є обов’язковим',
      'any.required': 'Поле "Email" є обов’язковим',
    }),
    password: Joi.string().min(8).required().messages({
      'string.min': 'Пароль має містити щонайменше 8 символів',
      'string.empty': 'Поле "Пароль" є обов’язковим',
      'any.required': 'Поле "Пароль" є обов’язковим',
    }),
  }),
};
export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required().messages({
      'string.empty': 'Поле "Email" є обов’язковим',
      'any.required': 'Поле "Email" є обов’язковим',
    }),
    password: Joi.string().min(8).required().messages({
      'string.min': 'Пароль має містити щонайменше 8 символів',
      'string.empty': 'Поле "password" є обов’язковим',
      'any.required': 'Поле "password" є обов’язковим',
    }),
  }),
};
