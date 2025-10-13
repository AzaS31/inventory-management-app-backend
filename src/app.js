import express from 'express'
import cors from 'cors';
import { config } from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import './config/passport.js';
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

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'none', // для кросс-домена
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", apiRoutes);
app.get("/", (req, res) => {
    res.send("Course project api is running");
});

// app.use(errorHandler);

export default app;
