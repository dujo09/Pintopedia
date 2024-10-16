import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";

import logMiddleware from "./middlewares/logMiddleware.js";
import beerRouter from "./routes/beerRoutes.js";
import manufacturerRouter from "./routes/manufacturerRoutes.js";

const PORT = process.env.SERVER_PORT || 5000;
const BASE_URL = process.env.BASE_URL;
const DATABASE_NAME = process.env.DATABASE_NAME;
const MONGO_URL = process.env.MONGO_URL;

const app = express();
app.use(cors());
app.use(express.json());

app.use(logMiddleware);
app.use(`${BASE_URL}beers`, beerRouter);
app.use(`${BASE_URL}manufacturers`, manufacturerRouter);

const server = http.createServer(app);

const startServer = async () => {
  try {
    server.listen(PORT, () => {
      console.log(`Backend server is running on port: ${PORT}`);
      console.log(`Connecting to ${DATABASE_NAME} using mongoose...`);
      mongoose
        .connect(MONGO_URL, { dbName: DATABASE_NAME })
        .then(() => {
          console.log(`Successfully connected to ${DATABASE_NAME}`);
        })
        .catch((error) => {
          console.log("Error occured while connecting to database: " + error);
        });

      mongoose.connection.on("error", (error) => {
        console.log("Error occured with database connection: " + error);
      });
      mongoose.connection.on("disconnected", (msg) => {
        console.log("Database connection broken: " + msg);
      });
    });
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
};

startServer();

export {};
