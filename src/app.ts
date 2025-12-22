import express from 'express';
import cookieParser from 'cookie-parser';
import Database from './config/db.js';
import Server from './config/server.js';
import appRouter from './routes/appRouter.js';
import cors, { CorsOptions } from 'cors';
import config from './config/config.js';

const whitelist: string[] = [config.baseUrl];
const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

(async () => {
    await Database.connect();
    await main();
})();

async function main() {
    const server = Server.init();

    //* middlewares
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use(cookieParser());
    server.use(cors(corsOptions));

    //* routes
    server.use(appRouter);
}
