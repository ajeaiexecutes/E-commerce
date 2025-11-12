import mongoose from "mongoose";

// const detailsSchema = new mongoose.Schema(
//   {
//         name: {
//             type: String
//         },
//         address: {
//             type: String,
//             required: true
//         },
//         city: {
//             type: String,
//             required: true
//         },

//     phone: { type: String },
//   },
//   { _id: false }
// );

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        ref: "products",
        required:true
      }
    },
  ],
  totalAmount: {
      type: Number,
      ref:"cart"
  },
//   status: {
//     type: String,
//     default: "pending",
//   },
  name: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
  },
  paymentMethod: {
    type: String,
    enum: ["Credit Card", "Cash on Delivery", "Debit Card","UPI","Net Banking"],
    default: "UPI",
  },
});

const Order = mongoose.model("orders", orderSchema);

export default Order;
