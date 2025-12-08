import { Request, Response } from 'express';
import { HttpError } from '../../errors/HttpError.js';
import UserModel from '../../models/user.model.js';
import hashPassword from '../../utils/hashPassword.js';
import getUserWithoutPass from '../../utils/getUserWithoutPass.js';

export async function resetPassword(req: Request, res: Response) {
    try {
        const { email } = req.cookies.resetPassInfo;
        const { password } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) throw new HttpError(404, "User doesn't exist");

        user.password = await hashPassword({ password });
        const updatedUser = await user.save();

        res.clearCookie('resetPassInfo', {
            httpOnly: true,
            secure: true,
        });
        res.json({ ok: true, message: 'Password updated successful', data: getUserWithoutPass(updatedUser) });
    } catch (err) {
        const error = err as HttpError;
        res.status(error.statusCode).json({ ok: false, message: error.message || 'Internal server error' });
    }
}
