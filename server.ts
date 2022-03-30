/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import * as path from 'path';
import router from './routes';

// Express app instance
const app: Application = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // bodyParsed
app.use(express.static(path.join('public')));
app.use(router); // Register of all routers
dotenv.config(); // parsing .env files [default: .env]

// Database connection
const mongoUri: string = process.env.MONGO_URI || ''; // only accepts string
mongoose
  .connect(mongoUri, {
    autoIndex: false,
  })
  .then(() => console.log(`\nDatabase is established!`))
  .catch((err) => console.log(err.message));

// Server instance
const port: number = Number(process.env.PORT) || 5000;
app.listen(port, () => {
  console.log(`\n⚡️Backend is up & running...\nhttp://localhost:${port}`);
});
