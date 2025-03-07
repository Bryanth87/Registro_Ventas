'use strict'
import Category from "./category.model.js";
import Product from "../product/product.model.js";

export const addCategory = async (req, res) => {
    try {
        const data = req.body;
        const category = await Category.create(data);
        return res.status(200).json({
            message: "Categoría creada correctamente",
            name: category.name,
            description: category.description,
        })
    } catch (err) {
        return res.status(500).json({
            message: "Error al crear categoría",
            error: err.message
        })
    }
}

export const listCategories = async (req, res) => {
    try {
        const { limit = 5, from = 0 } = req.query;
        const query = { status: true };

        const [total, categories] = await Promise.all([
            Category.countDocuments(query),
            Category.find(query)
                .skip(Number(from))
                .limit(Number(limit))
        ]);

        return res.status(200).json({      
            success: true,   
            message: "Categorías obtenidas correctamente",   
            total,
            categories
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener las categorias",
            error: err.message
        });
    }
}

export const editCategory = async (req, res) => {
    try{
        const { uid } = req.params;
        const data = req.body;
        const category = await Category.findByIdAndUpdate(uid, data, { new: true });
        return res.status(200).json({
            message: "Categoría actualizada",
            name: category.name,
            description: category.description,
        })
    }catch(err){
        return res.status(500).json({
            message: "Error al editar categoría",
            error: err.message
        })
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { uid } = req.params;

        const category = await Category.findById(uid);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Categoría no encontrada",
            });
        }

        let defaultCategory = await Category.findOne({ name: "Default" });

        if (!defaultCategory) {
            defaultCategory = new Category({
                name: "Default",
                description: "Default category",
            });
            await defaultCategory.save();
            console.log("Categoría por defecto creada automáticamente");
        }

        await Product.updateMany(
            { category: uid },
            { category: defaultCategory._id } 
        );

        category.status = false;
        await category.save();

        return res.status(200).json({
            success: true,
            message: "Categoría eliminada exitosamente y productos movidos a la categoría por defecto",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Error al eliminar la categoría",
            error: err.message,
        });
    }
};
