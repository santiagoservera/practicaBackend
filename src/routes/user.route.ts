import { Router } from "express";
import * as userController from "../controllers/user.controller";

import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router().use(authMiddleware);


// OBTENER TODOS
router.get("/", userController.index);
// CREAR
router.post("/", userController.create);
// OBTENER UNO
router.get("/:id", userController.show);
// BORRAR
router.delete("/:id", userController.destroy);
// EDITAR 
router.put("/:id", userController.update);


export default router;