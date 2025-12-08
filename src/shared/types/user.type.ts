import { Types } from 'mongoose';

export type RegisterUserDTO = {
    name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
    repeat_password: string;
};

export interface UserI extends Document {
    name: string;
    last_name: string;
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
