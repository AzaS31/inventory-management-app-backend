// src/routes/auth.routes.js
import { Router } from 'express';
import * as authController from '../api/auth/auth.controller.js';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

export default router;