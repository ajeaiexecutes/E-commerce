import User from "../Models/userSchema.js";
// import { hashpassword } from '../Middleware/adminAuth.js';
// import { verifypassword } from '../Middleware/adminAuth.js';
// import { hashedpassword } from '../Middleware/userAuth.js';
// import { verifypassword } from '../Middleware/userAuth.js';
import * as adminhelper from "../Middleware/adminAuth.js";
import * as userhelper from "../Middleware/userAuth.js";
import Cart from "../Models/cartSchema.js";
import Order from "../Models/orderSchema.js";
import Product from "../Models/productsSchema.js";
import Category from "../Models/categorySchema.js";

// export async function register(req, res) {
//     try {
//         const { name,email, password ,role} = req.body;
//         if (!name||!email || !password) {
//             return res.status(400).json({msg:'error'})
//         }

//         const hash = await adminhelper.hashpassword(password);
//         const user = new User({ name, email, password:hash, role });
//         console.log(user);

//         await user.save();

//         //create session

//         req.session.user = user._id;
//         req.session.role = user.role;

//         return res.status(201).json({
//             msg: 'registerd'
//         })
//     }
//     catch (error) {
//         console.log(error);

//     }

// }

// export async function login(req,res) {
//     try {
//         const { email, password } = req.body;
//         if (!email || !password) {
//             return res.status(401).json({msg:'missing error'})
//         }

//         //find for user in databaase with email
//         const user = await User.findOne({ email});

//         if (!user) {
//             return res.status(401).json({msg:' user invlaid'})
//         }
//         //   console.log(password,user.password);
//         const ok = await adminhelper.verifypassword(password,user.password);
//         if (!ok) {
//             return res.status(401).json({msg:'password invalid'})
//         }

//         //if login sucess create a session
//         req.session.user = user.email;
//         req.session.role = user.role;

//         console.log(req.session);

//         //after session creation respond
//         return res.send({msg:'logged in'})

//     } catch (error) {
//         return console.log(error);
//     }
// }

// export async function logout(req, res) {
//     req.session.destroy();
//     res.json({msg:'logout'})

// }

//admin dashboard
export async function adminDashboard(req, res) {
  return res.json({
    msg: "welcom admin",
  });
}
//cart
export async function addItemToCart(req, res) {
  try {
    const userId = req.session._id;
    if (!userId) {
      res.status(401).json({
        msg: "login first",
      });
    }
    const { productId } = req.body;

    const safeQuantity = 1;

    const product = await Product.findById(productId);

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId: userId,
        items: [{ productId: productId, price: product.price }],
      });
      await cart.save();
    } else {
      const itemIindex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );
      if (itemIindex > -1) {
        cart.items[itemIindex].quantity += safeQuantity;
      } else {
        cart.items.push({ productId, price: product.price });
      }
    }

    cart.total = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    await cart.save();
    res.status(200).json({ msg: "added to cart", cart });
  } catch (error) {
    console.log("error-=-", error);
    res.status(400).json({
      msg: error.message,
    });
  }
}

//user cart GET
export async function getUserCart(req, res) {
  try {
    console.log(req.session);
    const userId = req.session._id;

    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
      return res.status(404).json({ msg: "cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    return res.status(401).json({
      msg: error,
    });
  }
}

//update cart PUT
export async function updateCart(req, res) {
  try {
    const userId = req.session.user._id;
    const { productId, quantity } = req.params.id;

    const cart = await Cart.findOne({ userId });
    const item = cart.items.find((i) => i.productId.toString() === productId);

    if (item) {
      item.quantity = quantity;
      await cart.save();
      res.status(200).json({ msg: "updated" });
    } else {
      res.status(404).json({ msg: "not found" });
    }
  } catch (error) {
    console.log(error);
  }
}

//delete item Delete
export async function deleteCartItem(req, res) {
  try {
    const userId = req.session._id;
    const { productId } = req.params.id;

    let cart = await Cart.findOne({ userId });
    cart.items = cart.items.filter(
      (item) => item.productId.toString() != productId
    );
    await cart.save();
    res.status(200).json({ message: "Item removed", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createOrder(req, res) {
  try {
    const userId = req.session._id;

    if (!userId) {
      return res.status(401).json({
        message: "please login to place order",
      });
    }

    const { name, address, city, phone, paymentMethod } = req.body;

    const cartfound = await Cart.findOne({ userId });
    const total = cartfound.total;
    if (!cartfound || cartfound.length == 0) {
      res.status(404).json("user have no cart");
    }

    const neworder = await Order.create({
      user: userId,

      address: address,
      status: "order placed",
      name: name,
      city: city,
      phone: phone,
      totalAmount: total,
      // paymentMethod:paymentMethod
      items: cartfound.items,
    });

    await neworder.save();
    cartfound.items = [];
    cartfound.total = "";
    await cartfound.save();

    res.status(200).json({ msg: "odered", response: neworder });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: error.message,
    });
  }
}

//get all orders GET
export async function getUserOrders(req, res) {
  try {
      const userId = req.session._id;
      console.log("user id from session",req.session._id);
      
    if (!userId) {
      return res.status(401).json({
        msg: "not logged in",
      });
    }
      const orders = await Order.find({ user: userId } ).populate("items.productId");
      console.log("order", orders.items);
      return res.status(200).json({ msg: orders });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
        msg: error,
        msg:"errorrrr"
    });
  }
}

//delete order Deleete

export async function cancelOrder(req, res) {
  try {
    const { orderId } = req.params.id;
    const userid = req.session.user._id;
    const order = await Order.findOne({ _id: orderId, user: userid });
    if (!order) {
      res.status(404).json({ message: "order not found" });
    }

    res.status(200).json({ msg: "cancelled" });
  } catch (error) {
    console.log(error);
  }
}

//=================public routes========
export async function getAllProducts(req, res) {
  try {
    const p = await Product.find();
    return res.status(200).json({
      data: p,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getProductById(req, res) {
  try {
    const id = req.params.id;
    const p = await Product.findById({ _id: id });
    return res.status(200).json({
      data: p,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getAllCategories(req, res) {
  try {
    const c = await Category.find();
    return res.status(200).json({
      mess: "retrieved caategories",
      data: c,
    });
  } catch (error) {
    console.error(error);
  }
}
