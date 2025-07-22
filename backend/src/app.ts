import express from "express";
const app = express();
import { config } from "dotenv";
config();
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// Middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// TODO : remove it in production
app.use(morgan("dev"));

// Routes
app.use("/api/v1", appRouter);

export default app;
