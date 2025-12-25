import express, { type Express } from 'express';
import config from '@/config/config.js';
import colors from 'colors';

export default class Server {
    static init(): Express {
        const app = express();

        app.listen(config.server.PORT, () => {
            console.log(colors.cyan.bold(`Server run on port ${config.server.PORT}`));
        });

        return app;
    }
}
