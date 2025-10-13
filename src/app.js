import express from 'express'
import cors from 'cors';
import { config } from 'dotenv';
import apiRoutes from './routes/index.routes.js';

config();
const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
    cors({
        origin: FRONTEND_URL,
        credentials: true,
    })
)

app.use(express.json());

app.use("/api", apiRoutes);
app.get("/", (req, res) => {
    res.send("Course project api is running");
});

// app.use(errorHandler);

export default app;
