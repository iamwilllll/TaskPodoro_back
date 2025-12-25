import { body } from 'express-validator';
import { handleInputErrors } from '@/middlewares/handleInputErrors.js';
import { NextFunction, Request, Response } from 'express';

const allowed = ['image/jpeg', 'image/png', 'image/webp'];
export const createGroupMiddleware = [
    body('name').notEmpty().withMessage('Name is required'),

    (req: Request, res: Response, next: NextFunction) => {
        if (!req.file) {
            return res.status(400).json({ error: 'Group photo is required' });
        }

        if (!allowed.includes(req.file.mimetype)) {
            return res.status(400).json({ error: 'Invalid file type' });
        }

        next();
    },

    handleInputErrors,
];
