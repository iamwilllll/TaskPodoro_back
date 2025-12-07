import { HydratedDocument } from 'mongoose';
import { UserI, UserWithoutPassword } from '../types/user.type.js';

export default function getUserWithoutPass(user: HydratedDocument<UserI>): UserWithoutPassword {
    const userObj = user.toObject();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = userObj;

    return userWithoutPassword;
}
