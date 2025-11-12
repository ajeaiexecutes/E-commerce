import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    name: 'string',
    title:"string",
    description:'string',
    price: 'number',
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
        required:true
    },
    image: {
        type:String
    }
})


const Product = mongoose.model('products', productsSchema);
export default Product;