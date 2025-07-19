import express from "express";
const app = express();
import { config } from "dotenv";
config();
import morgan from "morgan";
import appRouter from "./routes/index.js";

// Middlewares
app.use(express.json());

// TODO : remove it in production
app.use(morgan("dev"));

// Routes
app.use("/api/v1", appRouter);

export default app;
