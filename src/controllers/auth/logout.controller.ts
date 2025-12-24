import { Request, Response } from 'express';
import { HttpError } from '../../errors/HttpError.js';

export async function logoutController(req: Request, res: Response) {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
        });

        res.json({ ok: true, message: 'User logout successful' });
    } catch (err) {
        const error = err as HttpError;

        res.status(error.statusCode).json({
            ok: false,
            error: { message: error.message || 'Internal server error' },
        });
    }
}
