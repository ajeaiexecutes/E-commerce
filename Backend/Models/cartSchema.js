import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    },
    price:{
        type: Number,
        ref: "products",
        required: true,
        
    
    },
    
}); 

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    items: [cartItemSchema],
    total: {
        type: Number,
        default:0
    }
    
});

const Cart = mongoose.model("cart", cartSchema)
export default Cart;