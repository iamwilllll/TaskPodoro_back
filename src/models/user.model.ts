import mongoose, { Schema, Types } from 'mongoose';
import { UserI } from '../shared/types/user.type.js';

const UserSchema = new Schema<UserI>(
    {
        name: { type: String, required: true, trim: true },
        last_name: { type: String, required: true, trim: true },
        username: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, unique: true },
        password: { type: String, required: true, trim: true },

        isVerified: { type: Boolean, required: true, default: false },
        verificationOTPCode: { type: String, required: false, trim: true },
        verificationOTPCodeExpirationTime: { type: Date, required: false },

        resetPasswordOTPCode: { type: String, required: false, trim: true },
        resetPasswordOTPCodeExpirationTime: { type: Date, required: false },

        groups: [{ type: Types.ObjectId, ref: 'Groups' }],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
