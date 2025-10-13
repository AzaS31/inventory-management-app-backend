import { Router } from 'express';
import prisma from '../config/database.js'; 
import authRoutes from './auth.routes.js';

const router = Router();

// Тестовый маршрут для проверки статуса сервера и БД
router.get('/status', async (req, res) => {
    try {
        // Запрос к БД для проверки соединения
        await prisma.$queryRaw`SELECT 1`;
        
        res.status(200).json({
            status: 'ok',
            database: 'connected',
            message: 'API is healthy and ready.',
        });
    } catch (error) {
        console.error("Health check failed:", error);
        res.status(500).json({
            status: 'error',
            database: 'disconnected',
            message: 'Database connection failed.',
        });
    }
});

router.use('/auth', authRoutes); 

export default router;