import express from "express";
import { addUser, editProfileAdmin, editRoleAdmin, editProfile, editPassword, deleteUserAdmin, deleteProfile } from "../user/user.controller.js";
import { addUserValidator, editAdminUserValidator, editRoleAdminValidator, deleteProfileAdminValidator, editProfileValidator, editPasswordValidator, deleteProfileValidator } from "../middlewares/user-validators.js"; 

const router = express.Router();

/**
 * @swagger
 * /coperex/v1/users/adduser:
 *   post:
 *     summary: Añadir un nuevo usuario
 *     responses:
 *       200:
 *         description: Usuario añadido exitosamente
 */
router.post("/adduser", 
    addUserValidator, 
    addUser
);

/**
 * @swagger
 * /coperex/v1/users/edituser/{uid}:
 *   put:
 *     summary: Editar un usuario existente
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario editado exitosamente
 */
router.put("/edituser/:uid",
    editAdminUserValidator, 
    editProfileAdmin
);

/**
 * @swagger
 * /coperex/v1/users/editrole/{uid}:
 *   patch:
 *     summary: Editar el rol de un usuario
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rol del usuario editado exitosamente
 */
router.patch("/editrole/:uid", 
    editRoleAdminValidator, 
    editRoleAdmin
);

/**
 * @swagger
 * /coperex/v1/users/deleteuser/{uid}:
 *   delete:
 *     summary: Eliminar un usuario
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 */
router.delete("/deleteuser/:uid", 
    deleteProfileAdminValidator, 
    deleteUserAdmin
);

/**
 * @swagger
 * /coperex/v1/users/editprofile:
 *   put:
 *     summary: Editar el perfil del usuario
 *     responses:
 *       200:
 *         description: Perfil editado exitosamente
 */
router.put("/editprofile", 
    editProfileValidator, 
    editProfile
);

/**
 * @swagger
 * /coperex/v1/users/editpassword:
 *   patch:
 *     summary: Editar la contraseña del usuario
 *     responses:
 *       200:
 *         description: Contraseña editada exitosamente
 */
router.patch("/editpassword", 
    editPasswordValidator, 
    editPassword
);

/**
 * @swagger
 * /coperex/v1/users/deleteprofile:
 *   delete:
 *     summary: Eliminar el perfil del usuario
 *     responses:
 *       200:
 *         description: Perfil eliminado exitosamente
 */
router.delete("/deleteprofile", 
    deleteProfileValidator, 
    deleteProfile
);

export default router;