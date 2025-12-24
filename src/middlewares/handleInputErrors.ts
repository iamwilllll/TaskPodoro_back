import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export function handleInputErrors(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            ok: false,
            error: {
                message: 'Validation failed',
                code: 'VALIDATION_ERROR',
                details: errors.mapped(),
            },
        });
    }

    next();
}
