import User from "./user.model.js";
<<<<<<< HEAD
=======
import { hash, verify } from "argon2";

export const addUser = async (req, res) => {
    try {
        const data = req.body;
        const encryptedPassword = await hash(data.password);
        data.password = encryptedPassword;
>>>>>>> e91822b (Controller usuarios creado)

        const user = await User.create(data);

        return res.status(201).json({
            message: "Perfil creado",
            name: user.name,
            email: user.email,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error al crear perfil",
            error: err.message,
        });
    }
};

export const editAdminUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const data = req.body;
        const { usuario } = req;

        if (usuario.role !== "ADMIN_ROLE") {
            return res.status(403).json({
                message: "No puedes editar perfiles",
            });
        }

        const user = await User.findByIdAndUpdate(uid, data, { new: true });

        return res.status(200).json({
            message: "Usuario actualizado",
            user,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error al actualizar usuario",
            error: err.message,
        });
    }
};

export const editProfile = async (req, res) => {
    try {
        const { usuario } = req;
        const data = req.body;

        delete data.password;
        delete data.role;
        delete data.status;

        const user = await User.findByIdAndUpdate(usuario._id, data, { new: true });

        return res.status(200).json({
            message: "Perfil actualizado",
            user,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error al actualizar perfil",
            error: err.message,
        });
    }
};

export const editRoleAdmin = async (req, res) => {
    try {
        const { uid } = req.params;
        const { role } = req.body;
        const { usuario } = req;

        if (usuario.role !== "ADMIN_ROLE") {
            return res.status(403).json({
                message: "No tienes permiso para modificar roles",
            });
        }

        const user = await User.findByIdAndUpdate(uid, { role }, { new: true });

        return res.status(200).json({
            message: "User role has been modified",
            user,
        });
    } catch (err) {
        return res.status(500).json({
            message: "User role modification failed",
            error: err.message,
        });
    }
};

export const deleteProfileAdmin = async (req, res) => {
    try {
        const { uid } = req.params;
        const { usuario } = req;

        if (usuario.role !== "ADMIN_ROLE") {
            return res.status(403).json({
                message: "No tienes permiso para eliminar usuarios",
            });
        }

        const user = await User.findByIdAndUpdate(uid, { status: false }, { new: true });

        return res.status(200).json({
            message: "User has been deleted",
            user,
        });
    } catch (err) {
        return res.status(500).json({
            message: "User deletion failed",
            error: err.message,
        });
    }
};

export const editPassword = async (req, res) => {
    try {
        const { usuario } = req;
        const { newPassword } = req.body;

        const user = await User.findById(usuario._id);

        const matchOldAndNewPassword = await verify(user.password, newPassword);

        if (matchOldAndNewPassword) {
            return res.status(400).json({
                success: false,
                message: "La contraseña ingreseda no puede ser igual a la anterior",
            });
        }

        const encryptedPassword = await hash(newPassword);

        await User.findByIdAndUpdate(usuario._id, { password: encryptedPassword }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada",
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error al actualizar contraseña",
            error: err.message,
        });
    }
};

<<<<<<< HEAD
export const updateSelf = async (req, res) => {
    try {
        const { uid } = req.params;
        const data = req.body;
        const updatedUser = await User.findByIdAndUpdate(uid, data, { new: true });
        
        if (req.user.id !== uid) {
            return res.status(403).json({
                success: false,
                msg: 'Acceso denegado. No puedes actualizar la información de otro usuario.'
            });
        }
        res.status(200).json({
            success: true,
            msg: 'Información actualizada',
            user: updatedUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar la información',
            error: err.message
        });
    }
};

export const updateUser = async (req, res) => {
    try {

        const { uid } = req.params;
        const data = req.body;
        const updatedUser = await User.findByIdAndUpdate(uid, data, { new: true });

        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({
                success: false,
                msg: 'Acceso denegado. Solo los administradores pueden actualizar usuarios.'
            });
        }
        res.status(200).json({
=======
export const deleteProfileClient = async (req, res) => {
    try {
        const { usuario } = req;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Coloca la contraseña",
            });
        }

        const matchPasswords = await verify(usuario.password, password);

        if (!matchPasswords) {
            return res.status(400).json({
                success: false,
                message: "Para confirmar ingresa la contraseña",
            });
        }

        await User.findByIdAndUpdate(usuario._id, { status: false }, { new: true });

        return res.status(200).json({
>>>>>>> e91822b (Controller usuarios creado)
            success: true,
            message: "Perfil Eliminado",
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Error al eliminar perfil",
            error: err.message,
        });
    }
};