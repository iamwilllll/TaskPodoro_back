import { Request, Response } from 'express';
import UserModel from '../models/user.model.js';
import generateOTPCode from '../utils/generateOTPCode.js';

export async function registerController(req: Request, res: Response) {
    try {
        const user = new UserModel(req.body);
        const OTPCode = generateOTPCode();

        user.verificationOTPCode = OTPCode;
        user.VerificationOTPCodeExpirationTime = new Date(Date.now() + 10 * 60 * 1000);

        // ? send OTP code by mail
        console.log(OTPCode);

        // ? save user on database

        res.json(user);
    } catch (err) {
        return res.status(404).json({ message: err });
    }
}
