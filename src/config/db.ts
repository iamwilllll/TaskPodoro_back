import mongoose from 'mongoose';
import colors from 'colors';
import config from '@/config/config.js';

const databaseUrl = config.database.URL;

export default class Database {
    static async connect() {
        try {
            if (!databaseUrl) throw new Error('Database url is not available');
            const { connection } = await mongoose.connect(databaseUrl);

            console.log(colors.cyan.bold(`Database was connected successful on ${connection.host}:${connection.port}`));
        } catch (err) {
            console.error(err);
            return err;
        }
    }

    static async disconnect() {
        try {
            await mongoose.disconnect();
            console.log(colors.cyan.bold(`Database was disconnected successful`));
        } catch (err) {
            console.error(err);
            return err;
        }
    }
}
