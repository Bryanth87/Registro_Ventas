import { body, param } from "express-validator";
import { handleErrors } from "./handle-errors.js";
import { validarCampos } from "./validate-fields.js";
import { hasRoles } from "./validate-roles.js";
import { validateJWT } from "./validate-jwt.js";
import { categoryExists } from "../helpers/db-validators.js";

export const addCategoryValidator = [    
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("description").notEmpty().withMessage("la descripción es requerida"),
    validarCampos,
    handleErrors
]

export const editCategoryValidator = [  
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid").custom(categoryExists),
    param("uid").isMongoId().withMessage("Id de categoría inválido"),
    validarCampos,
    handleErrors
]

export const deleteCategoryValidator = [                    
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid").custom(categoryExists),
    param("uid").isMongoId().withMessage("Id de categoría inválido"),
    validarCampos,
    handleErrors
]


