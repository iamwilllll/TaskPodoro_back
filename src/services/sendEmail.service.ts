import nodemailer from 'nodemailer';
import config from '../config/config.js';

type SendEmailProps = {
    OTPCode: string;
    to: string;
    subject: string;
    html: string;
};

const transporter = nodemailer.createTransport({
    host: config.smtp.HOST,
    port: +config.smtp.PORT,
    secure: config.environment === 'production',
    auth: {
        user: config.smtp.USER,
        pass: config.smtp.PASS,
    },
});

export default async function sendEmail({ OTPCode, to, subject, html }: SendEmailProps) {
    try {
        await transporter.sendMail({
            from: `"TaskPodoro" <${config.smtp.USER}>`,
            to,
            subject,
            text: OTPCode,
            html,
        });

        return { success: true };
    } catch (err) {
        console.log(err);
        return { success: false, message: 'Oops... there was an error, please try again later' };
    }
}
