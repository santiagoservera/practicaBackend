import { Router } from "express";
import * as productController from "../controllers/products.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { productsValidators } from "../middlewares/validators/productValidators";
import { handleValidationErrors } from "../middlewares/validation.middleware";

const router = Router();

// OBTENER TODOS
router.get(
    "/", 
    productController.index
);
// CREAR
router.post(
    "/", 
    ...productsValidators,
    handleValidationErrors,
    authMiddleware, 
    productController.create
);
// OBTENER UNO
router.get("/:id", productController.show);
// BORRAR
router.delete("/:id", authMiddleware, productController.destroy)
//EDITAR
router.put("/:id",authMiddleware, productController.update);
export default router;