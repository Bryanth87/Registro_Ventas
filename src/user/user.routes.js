import User from "./user.model.js"
import { hash, verify } from "argon2"

export const addUser = async (req, res) => {
    try {
        const data = req.body;
        const encryptedPassword = await hash(data.password)
        data.password = encryptedPassword;

        const user = await User.create(data);

        return res.status(201).json({
            message: "Usuario creado",
            name: user.name,
            email: user.email
        });
        
        
    } catch (err) {
        return res.status(500).json({
            message: "Error al crear usuario",
            error: err.message
        });
    }
}

export const editProfileAdmin = async (req, res) => {
    try {
        const { uid } = req.params;
        const data = req.body;

        const user = await User.findByIdAndUpdate(uid, data,{ new: true });

        return res.status(200).json({
            message: "Usuario actualizado",
            user
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error al actualizar el usuario",
            error: err.message
        });
    }
}

export const editRoleAdmin = async (req, res) => {
    try {
        const { uid } = req.params;
        const { role } = req.body;

        const user = await User.findByIdAndUpdate(uid, { role }, { new: true });

        return res.status(200).json({
            message: "El usuario se convirtió en Admin",
            user
        });
        
    } catch (err) {
        return res.status(500).json({
            message: "Error al actualizar el rol del usuario",
            error: err.message
        });
    }
}

export const editProfile = async (req, res) => {
    try {
        const { usuario } = req;
        const data = req.body;
        delete data.password;
        delete data.role;
        delete data.status;
        
        const user = await User.findByIdAndUpdate(usuario._id,  data, { new: true });

        return res.status(200).json({
            message: "Perfil actualizado",
            user
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error al actualizar perfil",
            error: err.message
        });
    }
}


export const editPassword = async (req, res) => {
    try {
        const { usuario } = req;
        const { newPassword } = req.body;

        const user = await User.findById(usuario._id);

        const matchOldAndNewPassword = await verify(user.password, newPassword);

        if (matchOldAndNewPassword) {
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            });
        }

        const encryptedPassword = await hash(newPassword);

        await User.findByIdAndUpdate(usuario._id, { password: encryptedPassword }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada",
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            
            success: false,
            message: "Error al actualizar la contraseña",
            error: err.message
        });
    }
};

export const deleteUserAdmin = async (req, res) => {
    try {
        const { uid } = req.params;

        const user = await User.findByIdAndUpdate(uid, { status: false }, { new: true });

        return res.status(200).json({
            message: "Usuario eliminado",
            user
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error al eliminar el usuario",
            error: err.message
        });
    }
}


export const deleteProfile = async (req, res) => {
    try{
        const { usuario } = req;
        const { password } = req.body;

        if(!password){
            return res.status(400).json({
                success: false,
                message: "La contraseña es requerida para eliminar tu perfil"
            });
        }

        const matchPasswords = await verify(usuario.password, password);

        if (!matchPasswords) {
            return res.status(400).json({
                success: false,
                message: "Contraseña incorrecta"
            });
        }
       
        await User.findByIdAndUpdate(usuario._id, { status: false }, { new: true });


        return res.status(200).json({
            succes: true,
            message: "Perfil eliminado",
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Error al eliminar perfil",
            error: err.message
        });
    }
}
