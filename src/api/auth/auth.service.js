import prisma from '../../config/database.js';
import bcrypt from 'bcryptjs';

export async function registerUser(email, password, username) {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new Error('User with this email already exists.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            username,
        },
        select: { id: true, email: true, username: true }, 
    });

    return newUser;
}