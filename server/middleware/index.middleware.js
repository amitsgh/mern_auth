import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import errorHandler from './error.middleware.js';

export default function configureMiddlewares(app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({ credentials: true }));
    app.use(compression());
    app.use(cookieParser());
    app.use(errorHandler);
}
