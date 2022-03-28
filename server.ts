import express, { Application } from 'express';
import dotenv from 'dotenv';
import * as path from 'path';
import router from './routes';

// Express app instance
const app: Application = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());    // bodyParsed
app.use(express.static(path.join("public")));
app.use(router);            // Register of all routers
dotenv.config();            // parsing .env files

// Server instance
const port: number | any = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Backend is up & running...\nhttp://localhost:${port}`);
});