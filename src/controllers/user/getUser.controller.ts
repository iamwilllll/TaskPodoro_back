import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../../config/config.js';
import UserModel from '../../models/user.model.js';
import { HttpError } from '../../errors/HttpError.js';
import getUserWithoutPass from '../../utils/getUserWithoutPass.js';

interface TokenPayload extends jwt.JwtPayload {
    id: string;
}

export async function getUserController(req: Request, res: Response) {
    try {
        const token = req.cookies.token;
        if (!token) throw new HttpError(401, 'unauthorized');
        const publicKey = config.jwt.KEY;

        const decoded = jwt.verify(token, publicKey) as TokenPayload;
        if (!decoded.id) throw new HttpError(400, 'Invalid token payload');

        const foundUser = await UserModel.findOne({ _id: decoded.id });
        if (!foundUser) throw new HttpError(409, 'User not fount');

        res.json({ ok: true, message: 'User found successful', data: getUserWithoutPass(foundUser) });
    } catch (err) {
        const error = err as HttpError;
        return res.status(error.statusCode).json({ ok: false, message: error.message || 'Internal server error' });
    }
}
