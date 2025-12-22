import { body } from 'express-validator';
import { handleInputErrors } from '../handleInputErrors.js';

export const registerMiddlewares = [
    body('name').notEmpty().withMessage('Name is required'),
    body('username').notEmpty().withMessage('Username is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email is invalid'),
    body('password').notEmpty().withMessage('Password is required'),
    body('repeat_password')
        .notEmpty()
        .withMessage('Repeat password is required')
        .custom((value, { req }) => {
            if (value !== req.body.password) throw new Error('The passwords do not match');
            if (req.body.password < 8) throw new Error('The passwords is too short');
            return true;
        }),

    handleInputErrors,
];
