import { Types } from 'mongoose';

export interface UserI extends Document {
    name: string;
    username: string;
    email: string;
    password: string;

    isVerified: boolean;
    verificationOTPCode?: string;
    verificationOTPCodeExpirationTime?: Date;

    resetPasswordOTPCode?: string;
    resetPasswordOTPCodeExpirationTime?: Date;

    groups: Types.ObjectId[];
}

export type UserWithoutPassword = Omit<UserI, 'password'>;
