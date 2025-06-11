import express from 'express';
import { HTTP_SERVER_PORT } from '@repo/backend-utils/config';
import { logger } from "@repo/backend-utils/logger";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('./logs.txt'));

// Routes
import authenticationRouter from './routes/authenticationRouter';
import roomRouter from './routes/roomRouter';
app.use('/api/auth', authenticationRouter);
app.use('/api/room', roomRouter);

app.listen(HTTP_SERVER_PORT, (error) => {
    if(error) {
        console.error(`Error starting HTTP server -> ${error.message}`);
    }
    else {
        console.log(`HTTP server is running on port -> ${HTTP_SERVER_PORT}`);
        console.log(`\n\n http://localhost:${HTTP_SERVER_PORT} \n\n`);
    }
});