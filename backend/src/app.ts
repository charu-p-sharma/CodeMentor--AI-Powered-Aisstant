import express from "express";
const app = express();
import { config } from "dotenv";
config();

// Middlewares
app.use(express.json());

// Routes
export default app;
