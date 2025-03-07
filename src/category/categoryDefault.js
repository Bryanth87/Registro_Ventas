import Category from "../category/category.model.js"; 

export const createCategoryDefault = async () => {
    try {
        const defaultCategory = await Category.findOne({ name: "Default" });
        if (!defaultCategory) {
            const newDefaultCategory = new Category({
                name: "Default",
                description: "Default category",
            });
            await newDefaultCategory.save();
            console.log("Categoría por default creado");
        } else {
            console.log("Ya existe una categoría por default");
        }
    } catch (err) {
        console.error("Error al crear la categoría por default", err);
    }
};

export default createCategoryDefault; 