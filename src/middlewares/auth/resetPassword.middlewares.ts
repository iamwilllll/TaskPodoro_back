import { body } from 'express-validator';
import { handleInputErrors } from '@/middlewares/handleInputErrors.js';

export const resetPasswordMiddlewares = [
    body('password').notEmpty().withMessage('Password is required'),
    body('repeat_password')
        .notEmpty()
        .withMessage('Repeat password is required')
        .custom((value, { req }) => {
            if (value !== req.body.password) throw new Error('The passwords do not match');
            return true;
        }),

    handleInputErrors,
];
