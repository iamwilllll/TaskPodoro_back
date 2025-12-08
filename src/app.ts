import express from 'express';
import cookieParser from 'cookie-parser';
import Database from './config/db.js';
import Server from './config/server.js';
import appRouter from './routes/appRouter.js';
(async () => {
    await Database.connect();
    await main();
})();

async function main() {
    const server = Server.init();

    //* middlewares
    server.use(express.json());
    server.use(cookieParser());

    //* routes
    server.use(appRouter);
}
