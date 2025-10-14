// import prisma from '../../config/database.js'; 

// export async function getAllInventories() {
//     return prisma.inventory.findMany({
//         include: { owner: { select: { id: true, username: true } } }
//     });
// }

// export async function getUserInventories(userId) {
//     return prisma.inventory.findMany({
//         where: { ownerId: userId },
//         include: { owner: true },
//     });
// }

// export async function createInventory(data, userId) {
//     return prisma.inventory.create({
//         data: {
//             ...data,
//             ownerId: userId,
//             version: 1
//         },
//     });
// }

// export async function updateInventory(id, updateData, clientVersion) {
//     const result = await prisma.inventory.updateMany({
//         where: { id, version: clientVersion },
//         data: {
//             ...updateData,
//             version: { increment: 1 },
//         },
//     });

//     if (result.count === 0) {
//         throw new Error("Conflict: Inventory was updated by another user.");
//     }

//     return prisma.inventory.findUnique({ where: { id } });
// }

// export async function deleteInventory(id) {
//     return prisma.inventory.delete({ where: { id } });
// }
