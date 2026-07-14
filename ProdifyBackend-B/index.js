

import dotenv from 'dotenv';
import { initServer } from "./config/app.js";

dotenv.config();

process.on('uncaughtException', (error) => {
    console.log(error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);

});

console.log('Iniciando servidor...');
initServer();

