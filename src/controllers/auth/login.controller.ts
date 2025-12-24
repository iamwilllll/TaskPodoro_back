import { Request, Response } from 'express';
import { HttpError } from '../../errors/HttpError.js';
import UserModel from '../../models/user.model.js';
import { getUserWithoutPass, comparePasswords } from '../../utils/index.js';
import jwt from 'jsonwebtoken';
import config from '../../config/config.js';

export async function loginController(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) throw new HttpError(409, 'Incorrect credentials');
        if (!user.isVerified) throw new HttpError(403, "The user doesn't verified, please check your email");

        const areTheSame = await comparePasswords({ plainTextPassword: password, hashPassword: user.password });
        if (!areTheSame) throw new HttpError(401, 'Incorrect credentials');

        const userWithoutPass = getUserWithoutPass(user);
        const publicKey = config.jwt.KEY;

        if (!publicKey) throw new HttpError(500, 'Private key is not available');
        const token = jwt.sign({ id: user._id }, publicKey, { expiresIn: '1d' });

        res.cookie('token', token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: config.environment === 'production',
            sameSite: config.environment === 'production' ? 'none' : 'lax',
        });

        res.json({
            ok: true,
            message: 'User was verified successful',
            data: userWithoutPass,
        });
    } catch (err) {
        const error = err as HttpError;

        return res.status(error.statusCode || 500).json({
            ok: false,
            error: { message: error.message || 'Internal server error' },
        });
    }
}
