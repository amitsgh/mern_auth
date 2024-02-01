import 'dotenv/config';
import express from 'express';

import connectToDB from './db/index.db.js';
import configureMiddlewares from './middleware/index.middleware.js';
import setupRoutes from './routes/index.route.js';

const app = express();
const PORT = process.env.PORT;
const HOST = process.env.HOST;
const MONGODB_URI = process.env.MONGODB_URI;

configureMiddlewares(app);
setupRoutes(app);
connectToDB(MONGODB_URI);

app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT} \nHappy Coding!`);
});
