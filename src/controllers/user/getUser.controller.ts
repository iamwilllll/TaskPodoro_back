import { Request, Response } from 'express';
import UserModel from '../../models/user.model.js';
import { HttpError } from '../../errors/HttpError.js';
import getUserWithoutPass from '../../utils/getUserWithoutPass.js';

export async function getUserController(req: Request, res: Response) {
    try {
        const foundUser = await UserModel.findOne({ _id: req.userId });
        if (!foundUser) throw new HttpError(409, 'User not fount');

        res.json({ ok: true, message: 'User found successful', data: getUserWithoutPass(foundUser) });
    } catch (err) {
        const error = err as HttpError;
        return res.status(error.statusCode).json({ ok: false, message: error.message || 'Internal server error' });
    }
}
