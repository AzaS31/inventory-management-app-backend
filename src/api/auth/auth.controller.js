import passport from 'passport';
import * as authService from './auth.service.js';
import prisma from "../../config/database.js";

export async function register(req, res, next) {
    try {
        const { email, password, username } = req.body;
        // Здесь должна быть валидация Joi/validator.js!

        const user = await authService.registerUser(email, password, username);

        // Автоматический вход после регистрации 
        req.login(user, (err) => {
            if (err) return next(err);
            return res.status(201).json({
                message: 'Registration successful and logged in.',
                user: { id: user.id, username: user.username }
            });
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export function login(req, res, next) {
    passport.authenticate('local', async (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.status(401).json({ message: info.message });
        }

        const fullUser = await prisma.user.findUnique({
            where: { id: user.id },
            include: { role: true },
        });

        req.logIn(fullUser, (err) => {
            if (err) return next(err);
            return res.status(200).json({
                message: 'Login successful.',
                user: {
                    id: fullUser.id,
                    username: fullUser.username,
                    email: fullUser.email,
                    roleId: fullUser.roleId,
                    role: fullUser.role, 
                },
            });
        });
    })(req, res, next);
}

export function logout(req, res, next) {
    req.logout((err) => {
        if (err) return next(err);
        req.session.destroy((err) => {
            if (err) return next(err);
            res.status(200).json({ message: 'Logout successful.' });
        });
    });
}