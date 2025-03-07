import User from "../user/user.model.js";
import Category from "../category/category.model.js";
import Product from "../product/product.model.js";

export const emailExists = async (email = "") => {
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({username})
    if(existe){
        throw new Error(`The username ${username} is already registered`)
    }
}

export const userExists = async (uid = " ") => {
    const existe = await User.findById(uid)
    console.log(existe)
    if(!existe){
        throw new Error("No existe el usuario con el ID proporcionado")
    }
}

export const categoryExists = async (name) => {
    const cateogry = await Category.findOne({ name })
    if (cateogry) {
        throw new Error(`La categoría con el nombre ${name} ya existe`);
    }
};

export const productExists = async (uid = " ") => {
    const product = await Product.findById(uid)
    console.log(product)
    if (!product) {
        throw new Error("Producto no encontrado");
    }
};