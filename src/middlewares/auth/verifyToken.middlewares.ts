/* eslint-disable @typescript-eslint/no-namespace */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '@/config/config.js';
import { HttpError } from '@/errors/HttpError.js';
interface TokenPayload extends jwt.JwtPayload {
    id: string;
}

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies.token;
        if (!token) throw new HttpError(401, 'No token provided');

        const decoded = jwt.verify(token, config.jwt.KEY) as TokenPayload;
        if (!decoded.id) throw new HttpError(401, 'Invalid token payload');

        req.userId = decoded.id;

        next();
    } catch (err) {
        if (err instanceof HttpError) {
            return res.status(err.statusCode).json({ ok: false, message: err.message || 'Internal server error' });
        }
        return res.status(401).json({ ok: false, message: 'Invalid or expired token' });
    }
}
