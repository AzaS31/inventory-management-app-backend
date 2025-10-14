// src/routes/auth.routes.js
import { Router } from 'express';
import * as authController from '../api/auth/auth.controller.js';
import { config } from 'dotenv';
// import passport from '../config/passport.js';
// import { isAuthenticated } from '../middlewares/isAuthenticated.js';

config();
const router = Router();

// ===== Local =====
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// ===== Current User =====
// router.get('/me', isAuthenticated, (req, res) => {
//     const { id, username, email, role } = req.user;
//     res.json({ user: { id, username, email, role }});
// });

// ===== Google =====
// router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     successRedirect: `${process.env.FRONTEND_URL}/dashboard`, 
//     failureRedirect: `${process.env.FRONTEND_URL}/login`,
//   })
// );

// ===== Facebook =====
// router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));

// router.get(
//   "/facebook/callback",
//   passport.authenticate("facebook", {
//     successRedirect: `${process.env.FRONTEND_URL}/dashboard`, 
//     failureRedirect: `${process.env.FRONTEND_URL}/login`,
//   })
// );

export default router;