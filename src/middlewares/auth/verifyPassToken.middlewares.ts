import { body } from 'express-validator';
import { handleInputErrors } from '../handleInputErrors.js';

export const verifyPassTokenMiddlewares = [
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email is invalid '),
    body('code').notEmpty().withMessage('Reset code is required'),
    handleInputErrors,
];
