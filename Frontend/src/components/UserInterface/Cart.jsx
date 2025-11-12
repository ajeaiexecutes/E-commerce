import React, { useEffect, useState } from "react";
import api from "../../axios/axios"; // your axios instance
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Placeorder from "./Placeorder";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  
    const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

    // Fetch cart items from backend
    
    // useEffect(() => {
    //     setLoading(true)
    //     api.get("/cart")
    //         .then((res) =>
    //             setCartItems(res.data.data))
    //         .catch((error) => console.log(error))
    //         .finally(()=>setLoading(false))
    // },[])

useEffect(() => {
      const fetchCart = async () => {
          try {
        setLoading(true);
        const res = await api.get("/cart");
        console.log("result",res.data.items)
          setCartItems(res.data.items);
      } catch (error) {
        console.log("axios cart",error);
        toast.error(error.response?.data?.msg || "Failed to load cart items");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

    
    
  //  Recalculate total price whenever cart changes
  useEffect(() => {
    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.productId.price * item.quantity,
      0
    );
    setTotal(totalAmount);
  }, [cartItems]);
   
    
    

  //  Increase quantity
  const increaseQty = async (id) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  };

  //  Decrease quantity
  const decreaseQty = async (id) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
  };

  // Remove item
  const removeItem = async (id) => {
    try {
        const res = await api.delete(`/cart/${id}`);
        console.log("remove res-",res);
        
      setCartItems(cartItems.filter((item) => item._id !== id));
      toast.success("Item removed");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  if (loading) return <div className="text-center py-10">Loading Cart...</div>;

    
  
    
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-semibold mb-6 text-center">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-start border-b pb-6 gap-4 justify-between"
            >
              {/* Product Info */}
              <div className="flex gap-4 items-start">
                <img
                  src={`${API_URL}${item.productId.image}`}
                  alt={item.name}
                  className="w-24 h-28 object-cover rounded"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.productId.name}</h3>
                  <p className="text-gray-500 text-sm">{item.productId.category?.name}</p>
                  <p className="text-gray-900 font-medium mt-1">
                    Rs. {item.productId.price}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => decreaseQty(item._id)}
                      className="w-8 h-8 border border-gray-400 rounded flex items-center justify-center hover:bg-gray-100 transition"
                    >
                      −
                    </button>

                    <span className="text-lg font-medium">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(item._id)}
                      className="w-8 h-8 border border-gray-400 rounded flex items-center justify-center hover:bg-gray-100 transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Remove & Total */}
              <div className="flex flex-col items-end justify-between">
                <button
                          onClick={() => {
                              removeItem(item._id)
                              
                          }}
                  className="text-sm text-gray-500 hover:text-red-500"
                >
                  Remove
                </button>
                <p className="text-gray-900 font-semibold">
                  Rs. {item.productId.price * item.quantity}
                </p>
              </div>
            </div>
          ))}

          {/* Total Section */}
          <div className="flex justify-between items-center pt-6 border-t mt-10">
            <h3 className="text-xl font-semibold">Total:</h3>
            <p className="text-xl font-bold">Rs. {total}</p>
          </div>

          {/* Checkout Button */}
            <button onClick={() => {
                      
              
              
              navigate("/order", { state: { total } })
            }}
              className="mt-8 w-full bg-black text-white py-3 rounded-md font-medium tracking-wide hover:bg-gray-900 transition">
            Place Order
          </button>
        </div>
          )}
          
    </div>
  );
};

export default Cart;
