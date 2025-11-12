import React, { useEffect, useState } from "react";
import api from "../../axios/axios"; // your axios instance

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch all orders
  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      setLoading(true);
      const res = await api.get("/admin/orders", { withCredentials: true });
      setOrders(res.data.view);
      console.log(res.data.view);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(orderId, newStatus) {
      try {
        console.log(newStatus);
        
          
      const res = await api.put(
        `/admin/orders/${orderId}`,
        { newStatus },
        { withCredentials: true }
      );

      // update state instantly
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );

      alert("Order status updated successfully ✅");
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update order");
    }
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Manage Orders
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading orders...</p>
      ) : (
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-2 px-4 text-left">Order ID</th>
              <th className="py-2 px-4 text-left">Customer</th>
              <th className="py-2 px-4 text-left">Amount</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="py-2 px-4">{order._id}</td>
                <td className="py-2 px-4">{order.user?.email || "N/A"}</td>
                <td className="py-2 px-4">₹{order.totalAmount}</td>
                <td className="py-2 px-4 capitalize">{order.status}</td>
                <td className="py-2 px-4">
                  <select
                    className="border p-2 rounded mr-2"
                    value={order.status}
                            onChange={(e) => {
                                updateStatus(order._id, e.target.value)
                                console.log("2nd",e.target.value);
                                
                            }
                            }
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
