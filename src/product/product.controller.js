import Product from './product.model.js';

export const addProduct = async (req, res) => {
    try {
        const data = req.body;

        const product = await Product.create(data);
        return res.status(201).json({
            success: true,
            message: "Producto creado",
            data: product
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al crear productos",
            error: err.message
        })
    }
}

export const listProduct = async (req, res) => {
    try {
        const { limit = 5, from = 0 } = req.query;
        const query = { status: true };
        const [total, products] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .skip(Number(from))
                .limit(Number(limit))
                .populate("category", "name")
        ]);

        return res.status(200).json({
            success: true,
            message: "Lista de productos",
            total,
            products
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al listar productos",
            error: err.message
        });
    }
};

export const editProduct = async (req, res) => {
    try{
        const { uid } = req.params
        const { nameProduct, descriptionProduct, priceProduct, stock, category } = req.body;

        const productUpdate = await Product.findByIdAndUpdate(uid, { nameProduct, descriptionProduct, priceProduct, stock, category }, {new: true} )

        return res.status(200).json({
            message: "Producto actualizado",
            productUpdate
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error al actualizar producto",
            error: err.message
        });
    }
};

export const deleteProduct = async (req, res) => {
    try{
        const { uid } = req.params;

        const product = await Product.findByIdAndUpdate(uid, {status: false}, {new: true})

        return res.status(200).json({
            message: "Producto eliminado",
            product
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error al eliminar prodcuto",
            error: err.message
        });
    }
};

export const listOutProduct = async (res) => {
    try {
        const products = await Product.find({ stock: 0, status: true }).from(0).limit(10);
        return res.status(200).json({
            success: true,
            message: "Productos agotados",
            products
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener los productos agotados",
            error: err.message
        });
    }
};

export const listMoreSoldProduct = async (res) => {
    try {
        const products = await Product.find({ status: true }).sort({ sold: -1 }).from(0).limit(10);
        return res.status(200).json({
            success: true,
            message: "Productos más vendidos",
            products
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener los productos más vendidos",
            error: err.message
        });
    }
};

export const findProductByName = async (req, res) => {
    try {
        const { name } = req.params;
        const product = await Product.findOne({ nameProduct: name });
        return res.status(200).json({
            success: true,
            message: "Producto encontrado",
            product
        })
    }catch (err) {
        res.status(500).json({
            success: false,
            msg: "No se encontró el producto",
            err: err.message
        });
    }
};

export const findByIdProduct = async (req, res) => {
    try {
        const { uid } = req.params;
        const product = await Product.findOne({ _id: uid, status: true }).populate("category", "name");

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Producto obtenido",
            product
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al buscar el producto",
            error: err.message
        });
    }
};

export const increaseProduct = async (req, res) => {
    try {
        const { uid } = req.params;
        const { amount } = req.body;
        const product = await Product.findByIdAndUpdate(uid, { $inc: { stock: amount } }, { new: true });
        if (!product) {
            return res.status(404).json({
                message: "No se encuentra este producto"
            })
        }
        return res.status(200).json({
            message: "Producto agregado correctamente",
            product
        })
    } catch (err) {
        return res.status(500).json({
            message: "Error al incrementar el producto",
            error: err.message
        })
    }
}

export const decreaseProduct = async (req, res) => {
    try {
        const { uid } = req.params;
        const { amount } = req.body;
        const product = await Product.findByIdAndUpdate(uid, { $inc: { stock: -amount } }, { new: true });
        if (!product) {
            return res.status(404).json({
                message: "Este producto no se encuentra"
            })
        }
        return res.status(200).json({
            message: "Producto eliminado correctamente",
            product
        })
    } catch (err) {
        return res.status(500).json({
            message: "Error al eliminar el producto",
            error: err.message
        })
    }
}