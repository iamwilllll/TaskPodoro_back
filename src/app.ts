import express from 'express';
import Server from './config/server.js';
import appRouter from './routes/appRouter.js';
import Database from './config/db.js';

(async () => {
    await Database.connect();
    await main();
})();

async function main() {
    const server = Server.init();

    //* middlewares
    server.use(express.json());

    //* routes
    server.use(appRouter);
}
