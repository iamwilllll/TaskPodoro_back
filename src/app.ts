import express from 'express';
import Server from './config/server.js';

(async () => {
    await main();
})();

async function main() {
    const server = Server.init();

    //* middlewares
    server.use(express.json());

}
