import { login, register } from "../auth/auth.controller.js";
import { Router } from "express";
import { loginValidator, registerValidator } from "../middlewares/user-validators.js";

const router = Router();

/**
 * @swagger
 * /coperex/v1/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente
 */
router.post(
    "/register",
    registerValidator,
    register
);

/**
 * @swagger
 * /coperex/v1/auth/login:
 *   post:
 *     summary: Iniciar sesión de un usuario
 *     responses:
 *       200:
 *         description: Usuario autenticado exitosamente
 */
router.post(
    "/login",
    loginValidator,
    login
);

export default router;