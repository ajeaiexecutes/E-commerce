import User from "../Models/userSchema.js";
import * as adminhelper from "../Middleware/adminAuth.js";
import * as userhelper from "../Middleware/userAuth.js";
import Cart from "../Models/cartSchema.js";
import Order from "../Models/orderSchema.js";
import Product from "../Models/productsSchema.js";
import Category from "../Models/categorySchema.js";

//cart
export async function addItemToCart(req, res) {
	
  try {

    const userId = req.session._id;
    if (!userId) {
	return  res.status(401).json({
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
        items: [{ productId: productId, price: product.price,quantity:safeQuantity }],
      });
      await cart.save();
    } else {
      const itemIindex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );
      if (itemIindex > -1) {
        cart.items[itemIindex].quantity += safeQuantity;
      } else {
        cart.items.push({ productId, price: product.price,quantity:safeQuantity });
      }
    }

    cart.total = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    await cart.save();
	return res.status(200).json({ msg: "added to cart", cart });
  } catch (error) {
    console.log("error-=-", error);
   return  res.status(400).json({
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
    const id = req.params.id;

        let cart = await Cart.findOneAndUpdate({ userId:userId },{$pull:{items:{_id:id}}},{new:true});

    await cart.save();
    res.status(200).json({ message: "Item removed", cart });
  } catch (error) {
    res.status(400).json({ error: error });
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
