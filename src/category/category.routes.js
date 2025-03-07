import express from "express";
import { addCategory, listCategories, editCategory, deleteCategory } from "../category/category.controller.js"; 
import { addCategoryValidator, editCategoryValidator, deleteCategoryValidator } from "../middlewares/category-validators.js"; 
import { swaggerDocs, swaggerUi } from "../../configs/swagger.js";

const router = express.Router();

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /coperex/v1/categories/addcategory:
 *   post:
 *     summary: Añadir una nueva categoría
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Electronics"
 *     responses:
 *       200:
 *         description: Categoría añadida exitosamente
 *       400:
 *         description: Entrada inválida
 */
router.post("/addcategory", 
    addCategoryValidator, 
    addCategory
);

/**
 * @swagger
 * /coperex/v1/categories/listcategories:
 *   get:
 *     summary: Listar todas las categorías
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Lista de categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *       500:
 *         description: Error del servidor
 */
router.get("/listcategories", 
    listCategories
);

/**
 * @swagger
 * /coperex/v1/categories/editcategory/{uid}:
 *   put:
 *     summary: Editar una categoría
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID de la categoría
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Electronics"
 *     responses:
 *       200:
 *         description: Categoría editada exitosamente
 *       400:
 *         description: Entrada inválida
 *       404:
 *         description: Categoría no encontrada
 */
router.put("/editcategory/:uid", 
    editCategoryValidator, 
    editCategory
);

/**
 * @swagger
 * /coperex/v1/categories/deletecategory/{uid}:
 *   delete:
 *     summary: Eliminar una categoría
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID de la categoría
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoría eliminada exitosamente
 *       400:
 *         description: Entrada inválida
 *       404:
 *         description: Categoría no encontrada
 */
router.delete("/deletecategory/:uid", 
    deleteCategoryValidator, 
    deleteCategory
);

export default router;