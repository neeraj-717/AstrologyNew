import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const DashboardOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('https://astrologyb.onrender.com/api/admin/orders', {
        headers: getAuthHeaders()
      });
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      if (error.response?.status === 401) {
        alert('Please login as admin to view orders');
      } else {
        alert('Error fetching orders');
      }
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.patch(`https://astrologyb.onrender.com/api/admin/orders/${orderId}`, 
        { status }, 
        { headers: getAuthHeaders() }
      );
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, paymentStatus: status } : order
      ));
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Error updating order status');
    }
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Order Management</h1>
        
        {loading ? (
          <div className="text-center py-20">
            <p className="text-xl">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No orders found</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Order #{order._id.slice(-8)}
                    </h3>
                    <p className="text-gray-600">
                      Customer: {order.userId?.name || 'Unknown'} ({order.userId?.email || 'No email'})
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">
                      ₹{order.totalPrice}
                    </p>
                    <span className={`inline-block px-3 py-1 text-xs rounded-full ${
                      order.paymentStatus === 'Completed' 
                        ? 'bg-green-100 text-green-800'
                        : order.paymentStatus === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Items:</h4>
                  <div className="space-y-2">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <span className="text-gray-700">{item.name}</span>
                        <span className="text-gray-600">
                          {item.quantity} × ₹{item.price} = ₹{item.quantity * item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end mt-4 space-x-2">
                  <select
                    value={order.paymentStatus}
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                    className="px-3 py-1 border rounded text-sm"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardOrders;