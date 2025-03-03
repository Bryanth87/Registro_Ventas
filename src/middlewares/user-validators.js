import { body, param } from "express-validator";
import { emailExists, usernameExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const registerValidator = [
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("username").notEmpty().withMessage("El nombre de usuario es requerido"),
    body("email").notEmpty().withMessage("El email es requerido"),
    body("email").isEmail().withMessage("Formato invalido"),
    body("email").custom(emailExists),
    body("username").custom(usernameExists),
    body("password")
        .isStrongPassword({
            minLength: 8
        }).withMessage("La contraseña no debe ser menor de 8 carácteres"),
    validarCampos,
    deleteFileOnError,
    handleErrors,
];

export const loginValidator = [
    body("email").optional().isEmail().withMessage("Correo invalido"),
    body("username").optional().isString().withMessage("Nombre de usuario invalido"),
    body("password").isLength({ min: 8 }).withMessage("La contraseña no debe de ser menor de 8 carácteres"),
    validarCampos,
    handleErrors,
];

export const addUserValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("Nombre requerido"),
    body("username").notEmpty().withMessage("Nombre de usuario requerido"),
    body("email").notEmpty().withMessage("Email es requerido"),
    body("email").isEmail().withMessage("Email invalido"),
    body("email").custom(emailExists),
    body("username").custom(usernameExists),
    body("password")
        .isStrongPassword({
            minLength: 8,
        }).withMessage("La contraseña no debe de ser menor de 8 caráacteres"),
    validarCampos,
    deleteFileOnError,
    handleErrors,
];

export const editAdminUserValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid").isMongoId().withMessage("ID invalido"),
    body("name").optional(),
    body("username").optional(),
    body("surname").optional(),
    body("email").optional().isEmail().withMessage("Email invalido"),
    validarCampos,
    handleErrors,
];

export const editProfileValidator = [
    validateJWT,
    hasRoles("CLIENT_ROLE", "ADMIN_ROLE"),
    body("email").optional().isEmail().withMessage("Email invalido"),
    validarCampos,
    handleErrors,
];

export const editRoleAdminValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid").isMongoId().withMessage("ID invalido"),
    body("role").isIn(["ADMIN_ROLE", "CLIENT_ROLE"]).withMessage("Role invalido"),
    validarCampos,
    handleErrors,
];

export const deleteProfileAdminValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid").isMongoId().withMessage("ID invalido"),
    validarCampos,
    handleErrors,
];

export const editPasswordValidator = [
    validateJWT,
    hasRoles("CLIENT_ROLE", "ADMIN_ROLE"),
    body("newPassword").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
    validarCampos,
    handleErrors,
];


