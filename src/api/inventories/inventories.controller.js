// import * as inventoryService from "./inventories.service.js";

// export async function getAll(req, res) {
//     const inventories = await inventoryService.getAllInventories();
//     res.json(inventories);
// }

// export async function getMine(req, res) {
//     const inventories = await inventoryService.getUserInventories(req.user.id);
//     res.json(inventories);
// }

// export async function create(req, res) {
//     const inventory = await inventoryService.createInventory(req.body, req.user.id);
//     res.status(201).json(inventory);
// }

// export async function update(req, res) {
//     const { id } = req.params;
//     const { version, ...data } = req.body;

//     try {
//         const updated = await inventoryService.updateInventory(id, data, version);
//         res.json(updated);
//     } catch (err) {
//         res.status(409).json({ message: err.message });
//     }
// }

// export async function remove(req, res) {
//     await inventoryService.deleteInventory(req.params.id);
//     res.json({ message: "Inventory deleted" });
// }
