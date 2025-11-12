import React, { useEffect, useState } from "react";
import api from "../../axios/axios";
import { toast } from "react-toastify";


const OrderHistory = () => {
    
    const [orders, setOrders] = useState([]);

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchOrders=async () => {
            try {
                const res = await api.get("/orders")
                console.log("respone",res.data);
                setOrders(res.data.msg)
            } catch (error) {
                console.log("error", error);;
                toast.error(error.response.data.msg||"cart problem")
                
            }
        }

        fetchOrders()
    },[])

    return (
        <div className="max-w-4xl mx-auto px-6 py-10">
            
                
            
            <h2 className="text-3xl font-semibold text-center mb-8">Your Orders</h2>
            

      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-500">
                  Order ID: <span className="font-medium">{order._id}</span>
                </p>
                {/* <p className="text-sm text-gray-500">
                  Date: <span className="font-medium">{order.date}</span>
                </p> */}
              </div>
              <div className="text-right">
                {/* <p className="text-sm text-gray-500">
                  Status:{" "}
                  <span
                    className={`font-medium ${
                      order.status === "Delivered"
                        ? "text-green-600"
                        : order.status === "Pending"
                        ? "text-yellow-600"
                        : "text-gray-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </p> */}
                <p className="text-lg font-semibold text-gray-900">
                  Rs. {order.totalAmount || 0}
                </p>
              </div>
            </div>

            <hr className="mb-4" />

            {/* Items */}
            <div className="space-y-4">
              {order.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3"
                >
                  <div className="flex items-center gap-4">
                    <img
                    src={`${API_URL}${item.productId.image}`}
                      alt={item.productId.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {item.productId.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <p className="font-semibold text-gray-900">
                    Rs. {item.productId.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-4 text-right">
              <button className="text-sm text-gray-600 hover:text-black underline">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
