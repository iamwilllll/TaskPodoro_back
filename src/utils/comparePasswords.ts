import bcrypt from 'bcrypt';

type comparePasswordsProps = {
    plainTextPassword: string;
    hashPassword: string;
};

export async function comparePasswords({ plainTextPassword, hashPassword }: comparePasswordsProps): Promise<boolean> {
    const result = await bcrypt.compare(plainTextPassword, hashPassword);

    return result;
}
