import { Request, Response } from 'express';
import { HttpError } from '@/errors/HttpError.js';
import UserModel from '@/models/user.model.js';

export async function verifyPassTokenController(req: Request, res: Response) {
    try {
        const { email, code } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) throw new HttpError(404, "User doesn't exist");

        if (user.resetPasswordOTPCode !== code) throw new HttpError(400, 'Code is invalid');
        if (new Date() > (user.resetPasswordOTPCodeExpirationTime as Date)) throw new HttpError(400, 'Code expired');

        res.cookie('resetPassInfo', { email }, { httpOnly: true, secure: true });
        res.json({ ok: true, message: 'The code is valid' });
    } catch (err) {
        const error = err as HttpError;
        res.status(error.statusCode).json({ ok: false, message: error.message || 'Internal server error' });
    }
}
