import bcrypt from 'bcrypt';
import config from '../config/config.js';

type HashPasswordProps = {
    password: string;
};

export default async function hashPassword({ password }: HashPasswordProps): Promise<string> {
    const saltRounds = config.salt;
    const salt = await bcrypt.genSalt(+saltRounds);
    const hash = await bcrypt.hash(password, salt);

    return hash;
}
