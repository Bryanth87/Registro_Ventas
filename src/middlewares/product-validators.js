import { body, param } from "express-validator";
import { handleErrors } from "./handle-errors.js";
import { validarCampos } from "./validate-fields.js";
import { hasRoles } from "./validate-roles.js";
import { validateJWT } from "./validate-jwt.js";
import { productExists, categoryExists } from "../helpers/db-validators.js";

export const addProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("nameProduct").notEmpty().withMessage("El nombre del producto es obligatorio")
        .isLength({ max: 30 }).withMessage("El nombre del producto no puede exceder de los 30 caracteres"),
    body("descriptionProduct").notEmpty().withMessage("La descripción del producto es obligatoria")
        .isLength({ max: 100 }).withMessage("La descripción no puede pasar de los 100 caracteres"),
    body("priceProduct").notEmpty().withMessage("El precio del producto es obligatorio")
        .isNumeric().withMessage("El precio del producto debe ser un número"),
    body("stock").notEmpty().withMessage("El stock del producto es obligatorio")
        .isNumeric().withMessage("El stock del producto debe ser un número"),
    body("category").notEmpty().withMessage("La categoría del producto es obligatoria")
        .isMongoId().withMessage("La categoría debe ser un ID válido de MongoDB")
        .custom(categoryExists),
    validarCampos,
    handleErrors
];

export const editProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid").custom(productExists),
    param("uid").isMongoId().withMessage("Id de producto inválido"),
    body("nameProduct").optional().isLength({ max: 30 }).withMessage("El nombre del producto no puede exceder de los 30 caracteres"),
    body("descriptionProduct").optional().isLength({ max: 100 }).withMessage("La descripción no puede pasar de los 100 caracteres"),
    body("priceProduct").optional().isNumeric().withMessage("El precio del producto debe ser un número"),
    body("stock").optional().isNumeric().withMessage("El stock del producto debe ser un número"),
    body("category").optional().isMongoId().withMessage("La categoría debe ser un ID válido de MongoDB")
        .custom(categoryExists),
    validarCampos,
    handleErrors
];

export const deleteProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid").custom(productExists),
    param("uid").isMongoId().withMessage("Id de producto inválido"),
    validarCampos,
    handleErrors
];

export const findProductByNameValidator = [
    validateJWT,
    hasRoles("CLIENT_ROLE", "ADMIN_ROLE"),
    param("name").notEmpty().withMessage("El nombre del producto es obligatorio"),
    validarCampos,
    handleErrors
];

export const findByIdProductValidator = [
    validateJWT,
    hasRoles("CLIENT_ROLE", "ADMIN_ROLE"),
    param("categoryId").notEmpty().withMessage("El ID de la categoría es obligatorio")
        .isMongoId().withMessage("El ID de la categoría debe ser un ID válido de MongoDB")
        .custom(categoryExists),
    validarCampos,
    handleErrors
];

export const increaseProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("amount").notEmpty().withMessage("La cantidad es requerida"),
    validarCampos,
    handleErrors
];

export const decreaseProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("amount").notEmpty().withMessage("La cantidad es requerida"),
    validarCampos,
    handleErrors
];