import { body } from 'express-validator';
import { handleInputErrors } from '@/middlewares/handleInputErrors.js';

export const forgotPasswordMiddlewares = [
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email is invalid '),

    handleInputErrors,
];
