import { Router } from "express";
import * as usersController from "../api/users/users.controller.js";
// import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { requireRole } from "../middlewares/requireRole.js";

const router = Router();

// router.get("/", isAuthenticated, requireRole("ADMIN"), usersController.getUsers);
// router.put("/role", isAuthenticated, requireRole("ADMIN"), usersController.changeRole);
// router.put("/active", isAuthenticated, requireRole("ADMIN"), usersController.setActive);
// router.delete("/:userId", isAuthenticated, requireRole("ADMIN"), usersController.removeUser);

router.get("/", requireRole("ADMIN"), usersController.getUsers);
router.put("/role", requireRole("ADMIN"), usersController.changeRole);
router.put("/active", requireRole("ADMIN"), usersController.setActive);
router.delete("/:userId", requireRole("ADMIN"), usersController.removeUser);


export default router;
