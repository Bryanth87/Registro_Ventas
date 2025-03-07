import express from "express";
import { addProduct, listProduct, editProduct, deleteProduct, listOutProduct, listMoreSoldProduct, findProductByName, findByIdProduct } from "./product.controller.js";
import { addProductValidator, editProductValidator, deleteProductValidator, findProductByNameValidator, findByIdProductValidator } from "../middlewares/product-validators.js";

const router = express.Router();

/**
 * @swagger
 * /coperex/v1/products/addproduct:
 *   post:
 *     summary: Añadir un nuevo producto
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nameProduct:
 *                 type: string
 *                 example: "Laptop"
 *               descriptionProduct:
 *                 type: string
 *                 example: "Laptop de alta gama"
 *               priceProduct:
 *                 type: number
 *                 example: 1500
 *               stock:
 *                 type: number
 *                 example: 10
 *               category:
 *                 type: string
 *                 example: "60c72b2f9b1d8b3a4c8e4d3b"
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Entrada inválida
 */
router.post("/addproduct", 
    addProductValidator, 
    addProduct
);

/**
 * @swagger
 * /coperex/v1/products/listproducts:
 *   get:
 *     summary: Listar todos los productos
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   uid:
 *                     type: string
 *                   nameProduct:
 *                     type: string
 *                   descriptionProduct:
 *                     type: string
 *                   priceProduct:
 *                     type: number
 *                   stock:
 *                     type: number
 *                   sold:
 *                     type: number
 *                   category:
 *                     type: string
 *                   status:
 *                     type: boolean
 *       500:
 *         description: Error del servidor
 */
router.get("/listproducts", 
    listProduct
);

/**
 * @swagger
 * /coperex/v1/products/findbyid/{uid}:
 *   get:
 *     summary: Buscar un producto por su ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get("/findbyid/:uid", 
    findByIdProduct
);

/**
 * @swagger
 * /coperex/v1/products/editproduct/{uid}:
 *   put:
 *     summary: Editar un producto existente
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nameProduct:
 *                 type: string
 *                 example: "Laptop"
 *               descriptionProduct:
 *                 type: string
 *                 example: "Laptop de alta gama"
 *               priceProduct:
 *                 type: number
 *                 example: 1500
 *               stock:
 *                 type: number
 *                 example: 10
 *               category:
 *                 type: string
 *                 example: "60c72b2f9b1d8b3a4c8e4d3b"
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       400:
 *         description: Entrada inválida
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put("/editproduct/:uid",
    editProductValidator, 
    editProduct
);

/**
 * @swagger
 * /coperex/v1/products/deleteproduct/{uid}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       400:
 *         description: Entrada inválida
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete("/deleteproduct/:uid", 
    deleteProductValidator, 
    deleteProduct
);

/**
 * @swagger
 * /coperex/v1/products/listoutproducts:
 *   get:
 *     summary: Listar productos agotados
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Lista de productos agotados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   uid:
 *                     type: string
 *                   nameProduct:
 *                     type: string
 *                   descriptionProduct:
 *                     type: string
 *                   priceProduct:
 *                     type: number
 *                   stock:
 *                     type: number
 *                   sold:
 *                     type: number
 *                   category:
 *                     type: string
 *                   status:
 *                     type: boolean
 *       500:
 *         description: Error del servidor
 */
router.get("/listoutproducts", 
    listOutProduct
);

/**
 * @swagger
 * /coperex/v1/products/listmoresoldproducts:
 *   get:
 *     summary: Listar productos más vendidos
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Lista de productos más vendidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   uid:
 *                     type: string
 *                   nameProduct:
 *                     type: string
 *                   descriptionProduct:
 *                     type: string
 *                   priceProduct:
 *                     type: number
 *                   stock:
 *                     type: number
 *                   sold:
 *                     type: number
 *                   category:
 *                     type: string
 *                   status:
 *                     type: boolean
 *       500:
 *         description: Error del servidor
 */
router.get("/listmoresoldproducts", 
    listMoreSoldProduct
);

/**
 * @swagger
 * /coperex/v1/products/findbyname/{name}:
 *   get:
 *     summary: Buscar un producto por su nombre
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: Nombre del producto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uid:
 *                   type: string
 *                 nameProduct:
 *                   type: string
 *                 descriptionProduct:
 *                   type: string
 *                 priceProduct:
 *                   type: number
 *                 stock:
 *                   type: number
 *                 sold:
 *                   type: number
 *                 category:
 *                   type: string
 *                 status:
 *                   type: boolean
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get("/findbyname/:name", 
    findProductByNameValidator, 
    findProductByName
);

/**
 * @swagger
 * /coperex/v1/products/findbycategory/{categoryId}:
 *   get:
 *     summary: Buscar productos por categoría
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: ID de la categoría
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de productos por categoría
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   uid:
 *                     type: string
 *                   nameProduct:
 *                     type: string
 *                   descriptionProduct:
 *                     type: string
 *                   priceProduct:
 *                     type: number
 *                   stock:
 *                     type: number
 *                   sold:
 *                     type: number
 *                   category:
 *                     type: string
 *                   status:
 *                     type: boolean
 *       404:
 *         description: No se encontraron productos para esta categoría
 *       500:
 *         description: Error del servidor
 */
router.get("/findbycategory/:categoryId", 
    findByIdProductValidator, 
    findByIdProduct
);

export default router;