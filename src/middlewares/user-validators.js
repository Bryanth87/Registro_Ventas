import { body, param } from "express-validator";
import { emailExists, usernameExists, userExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const registerValidator = [
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("username").notEmpty().withMessage("El nombre de usuario es requerido"),
    body("email").notEmpty().withMessage("Email es requerido"),
    body("email").isEmail().withMessage("Email invalido"),
    body("email").custom(emailExists),
    body("username").custom(usernameExists),
    body("password")
        .isStrongPassword({
            minLength: 8
        }).withMessage("La contraseña debe de contener 8 carácteres"),
    validarCampos,
    handleErrors
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
    body("name").notEmpty().withMessage("Nonmbre es requerido"),
    body("username").notEmpty().withMessage("Nombre de usuario es requerido"),
    body("email").notEmpty().withMessage("Email es requerido"),
    body("email").isEmail().withMessage("Email invalido"),
    body("email").custom(emailExists),
    body("username").custom(usernameExists),
    body("password").isStrongPassword({
        minLength: 8,
    }).withMessage("La contrasaña debe de tener 8 carácteres"),
    validarCampos,
    handleErrors
];

export const editAdminUserValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(userExists),
    body("email").optional().isEmail().withMessage("Correo invalido"),
    validarCampos,
    handleErrors
];

export const editProfileValidator = [
    validateJWT,
    hasRoles("CLIENT_ROLE", "ADMIN_ROLE"),
    body("email").optional().isEmail().withMessage("Email invalido"),
    validarCampos,
    handleErrors
];

export const editRoleAdminValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(userExists),
    body("role").isString().withMessage("Elige el ron").isIn(["ADMIN_ROLE", "CLIENT_ROLE"]).withMessage("Rol no válido"),
    validarCampos,
    handleErrors
];

export const deleteProfileAdminValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(userExists),
    validarCampos,
    handleErrors
];

export const editPasswordValidator = [
    validateJWT,
    hasRoles("CLIENT_ROLE", "ADMIN_ROLE"),
    body("newPassword").isLength({ min: 8 }).withMessage("La contraseña debe de tener 8 carácteres"),
    validarCampos,
    handleErrors
]

export const deleteProfileValidator = [
    validateJWT,
    hasRoles("CLIENT_ROLE", "ADMIN_ROLE"),
    body("password").notEmpty().withMessage("La contraseña es requerida"),
    validarCampos,
    handleErrors
]
