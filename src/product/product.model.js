import { Schema, model } from "mongoose";

const productSchema = Schema({
    nameProduct: {
        type: String,
        required: true,
        maxLength: [30, "El nombre del producto no puede exceder de los 30"]
    },
    descriptionProduct: {
        type: String,
        required: true,
        maxLenght: [100, "La descripción no puede pasar de los 100 carácteres"]
    },
    priceProduct: {
        type: Number,
        required: true,
        default: 0
    },
    stock:{
        type: Number,
        required: true,
        default: 0
    },
    sold: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
})

productSchema.methods.toJSON = function(){
    const { _id, ...product } = this.toObject();
    product.uid = _id;
    return product;
}

export default model("Product", productSchema)