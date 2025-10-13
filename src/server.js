import app from './app.js';
import { PrismaClient } from '@prisma/client'; 

const prisma = new PrismaClient(); 
const PORT = process.env.PORT || 3000;

async function main() {
    try {
        await prisma.$connect();
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database connection failed", error);
        process.exit(1);
    }

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

main();