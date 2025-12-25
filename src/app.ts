import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import Database from '@/config/db.js';
import Server from '@/config/server.js';
import appRouter from '@/routes/appRouter.js';
import { corsConfiguration } from '@/config/config.js';

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
    server.use(cors(corsConfiguration));

    //* routes
    server.use(appRouter);
}
