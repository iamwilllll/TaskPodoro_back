import { Request, Response } from 'express';
import { HttpError } from '../../errors/HttpError.js';
import UserModel from '../../models/user.model.js';

export async function verifyUserController(req: Request, res: Response) {
    try {
        const { email, code } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) throw new HttpError(409, "User doesn't exist");
        const expiration = user.verificationOTPCodeExpirationTime;

        if (!expiration) throw new HttpError(400, 'Expiration date missing');
        if (Date.now() > expiration.getTime()) throw new HttpError(401, 'Code expired');
        if (user.verificationOTPCode !== code) throw new HttpError(401, 'Code is invalid');

        user.isVerified = true;
        user.verificationOTPCode = '';
        user.save();

        res.json({ ok: true, message: 'User was verified successful' });
    } catch (err) {
        const error = err as HttpError;

        return res.status(error.statusCode || 500).json({
            ok: false,
            error: { message: error.message || 'Internal server error' },
        });
    }
}
