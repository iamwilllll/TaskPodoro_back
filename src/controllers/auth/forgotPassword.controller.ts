import { Request, Response } from 'express';
import { HttpError } from '../../errors/HttpError.js';
import UserModel from '../../models/user.model.js';
import generateOTPCode from '../../utils/generateOTPCode.js';
import sendEmail from '../../services/sendEmail.service.js';
import fs from 'node:fs';
import path from 'node:path';

export async function forgotPassword(req: Request, res: Response) {
    try {
        const { email } = req.body;
        const __dirname = import.meta.dirname;

        const user = await UserModel.findOne({ email });
        if (!user) throw new HttpError(404, "User doesn't exist");

        const OTPCode = generateOTPCode();
        user.resetPasswordOTPCode = OTPCode;
        user.resetPasswordOTPCodeExpirationTime = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();

        const emailTemplatePath = path.join(__dirname, '../../email_templates/ResetYourPassword.html');
        const resetPasswordEmailTemplate = fs.readFileSync(emailTemplatePath, 'utf-8');
        const html = resetPasswordEmailTemplate.replace('*resetCode*', OTPCode);

        const { success, message } = await sendEmail({
            OTPCode,
            to: email,
            subject: 'Verification code to reset password',
            html,
        });

        if (!success) throw new HttpError(500, message as string);

        res.json({ ok: true, message: 'Verification code was send, please check your email' });
    } catch (err) {
        const error = err as HttpError;

        res.status(error.statusCode).json({ ok: false, message: error.message || 'Internal server error' });
    }
}
