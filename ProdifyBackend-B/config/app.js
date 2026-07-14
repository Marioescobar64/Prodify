'use strict';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import swaggerUi from "swagger-ui-express";
import { corsOptions } from './cors-configuration.js';
import { dbConnection } from './db.js';
import productivityRoutes from '../src/productivity/productivity-routes.js';

const BASE_URL = '/api/v1';
const swaggerSpec = JSON.parse(fs.readFileSync(new URL('../swagger.json', import.meta.url)));

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false, limit: '10mb' }));
    app.use(express.json({ limit: '10mb' }));
    app.use(cors(corsOptions));
    app.use(morgan('dev'));
};

const routes = (app) => {

    app.get(`${BASE_URL}/health`, (req, res) => {
        res.status(200).json({
            status: 'ok',
            service: 'Prodify Productivity Service',
            version: '1.0.0'
        });
    });

    app.use(`${BASE_URL}`, productivityRoutes);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

const initServer = async () => {
    const app = express();
    const PORT = process.env.PORT || 3003;

    try {
        await dbConnection();

        middlewares(app);
        routes(app);

        app.listen(PORT, () => {
            console.log('=================================');
            console.log(`Servidor corriendo en puerto ${PORT}`);
            console.log(`Base URL: http://localhost:${PORT}${BASE_URL}`);
            console.log(`Swagger Docs: http://localhost:${PORT}/api-docs`);
            console.log('=================================');
        });

    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
};

export { initServer };