import { Request, Response } from 'express';
import UserModel from '@/models/user.model.js';
import { generateOTPCode, hashPassword, getUserWithoutPass } from '@/utils/index.js';
import sendEmail from '@/services/sendEmail.service.js';
import { HttpError } from '@/errors/HttpError.js';
import fs from 'node:fs';

export async function registerController(req: Request, res: Response) {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (user) throw new HttpError(409, 'User is already exist');

        const newUser = new UserModel({ ...req.body, password: await hashPassword({ password: req.body.password }) });
        const OTPCode = generateOTPCode();

        const verifyAccountEmailTemplate = fs.readFileSync('../../email_templatesVerifyAccount.html/', 'utf-8');
        const html = verifyAccountEmailTemplate.replace('*verificationCode*', OTPCode);

        newUser.verificationOTPCode = OTPCode;
        newUser.verificationOTPCodeExpirationTime = new Date(Date.now() + 10 * 60 * 1000);

        const { success, message } = await sendEmail({
            OTPCode,
            to: req.body.email,
            subject: 'Verify account code',
            html,
        });

        if (!success) throw new HttpError(500, message as string);
        const createdUser = await newUser.save();
        res.json({
            ok: true,
            message: 'User was created successful',
            data: getUserWithoutPass(createdUser),
        });
    } catch (err) {
        const error = err as HttpError;

        return res.status(error.statusCode || 500).json({
            ok: false,
            error: { message: error.message || 'Internal server error' },
        });
    }
}
