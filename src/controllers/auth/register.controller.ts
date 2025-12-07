import { Request, Response } from 'express';
import UserModel from '../../models/user.model.js';
import generateOTPCode from '../../utils/generateOTPCode.js';
import sendEmail from '../../services/sendEmail.service.js';
import hashPassword from '../../utils/hashPassword.js';
import path from 'node:path';
import fs from 'node:fs';
import { HttpError } from '../../errors/HttpError.js';

export async function registerController(req: Request, res: Response) {
    try {
        const isExistUser = await UserModel.findOne({ email: req.body.email });
        if (isExistUser) throw new HttpError(409, 'User is already exist');

        const newUser = new UserModel({ ...req.body, password: await hashPassword({ password: req.body.password }) });
        const OTPCode = generateOTPCode();

        const __dirname = import.meta.dirname;
        const emailTemplatePath = path.join(__dirname, '../../email_templates/VerifyAccount.html');
        const verifyAccountEmailTemplate = fs.readFileSync(emailTemplatePath, 'utf-8');
        const html = verifyAccountEmailTemplate.replace('*verificationCode*', OTPCode);

        newUser.verificationOTPCode = OTPCode;
        newUser.verificationOTPCodeExpirationTime = new Date(Date.now() + 10 * 60 * 1000);

        const createdUser = await newUser.save();
        const { success, message } = await sendEmail({
            OTPCode,
            to: req.body.email,
            subject: 'Verify account code',
            html,
        });

        if (!success) throw new HttpError(500, message as string);
        res.json({ ok: true, message: 'User was created successful', data: createdUser });
    } catch (err) {
        const error = err as HttpError;

        return res.status(error.statusCode || 500).json({
            ok: false,
            error: { message: error.message || 'Internal server error' },
        });
    }
}
