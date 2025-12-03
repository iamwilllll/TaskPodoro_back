import mongoose, { Schema } from 'mongoose';
import { UserDocument } from '../types/user.type.js';

const UserSchema = new Schema<UserDocument>({
    name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true, unique: true },
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },

    isVerified: { type: Boolean, required: true },
    verificationOTPCode: { type: String, required: false, trim: true },
    VerificationOTPCodeExpirationTime: { type: Date, required: false },

    resetPasswordOTPCode: { type: String, required: false, trim: true },
    resetPasswordOTPCodeExpirationTime: { type: Date, required: false },
});

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
