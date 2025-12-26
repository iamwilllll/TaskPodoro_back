import { Request, Response } from 'express';
import { HttpError } from '@/errors/HttpError.js';
import UserModel from '@/models/user.model.js';
import { generateOTPCode } from '@/utils/index.js';
import sendEmail from '@/services/sendEmail.service.js';
import fs from 'node:fs';

export async function forgotPassword(req: Request, res: Response) {
    try {
        const { email } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) throw new HttpError(404, "User doesn't exist");

        const OTPCode = generateOTPCode();
        user.resetPasswordOTPCode = OTPCode;
        user.resetPasswordOTPCodeExpirationTime = new Date(Date.now() + 10 * 60 * 1000);

        const resetPasswordEmailTemplate = fs.readFileSync('./../../email_templates/ResetYourPassword.html', 'utf-8');
        const html = resetPasswordEmailTemplate.replace('*resetCode*', OTPCode);

        const { success, message } = await sendEmail({
            OTPCode,
            to: email,
            subject: 'Verification code to reset password',
            html,
        });

        if (!success) throw new HttpError(500, message as string);
        await user.save();

        res.json({ ok: true, message: 'Verification code was send, please check your email' });
    } catch (err) {
        const error = err as HttpError;

        res.status(error.statusCode).json({ ok: false, message: error.message || 'Internal server error' });
    }
}
