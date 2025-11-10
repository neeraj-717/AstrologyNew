import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBox, FaCalendar, FaRupeeSign } from "react-icons/fa";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://astrologyb.onrender.com/api/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const ordersData = response.data?.orders || response.data || [];
      setOrders(Array.isArray(ordersData) ? ordersData : []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Orders</h1>
      
      {loading ? (
        <div className="text-center py-20">
          <div className="text-xl">Loading orders...</div>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl text-gray-300 mb-4">📦</div>
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">No orders yet</h2>
          <p className="text-gray-500 mb-6">Start shopping to see your orders here!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Array.isArray(orders) && orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Order #{order._id?.slice(-8)}
                  </h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <FaCalendar />
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <FaRupeeSign />
                      {order.totalPrice?.toFixed(2)}
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.paymentStatus)}`}>
                  {order.paymentStatus || 'Pending'}
                </span>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-700 mb-3">Items ({order.items?.length || 0})</h4>
                <div className="space-y-3">
                  {order.items?.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <img
                        src={item.imageUrl || "https://via.placeholder.com/60"}
                        alt={item.name}
                        className="w-15 h-15 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity} × ₹{item.price} = ₹{(item.quantity * item.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {order.shippingAddress && (
                <div className="border-t pt-4 mt-4">
                  <h4 className="font-medium text-gray-700 mb-2">Shipping Address</h4>
                  <p className="text-sm text-gray-600">
                    {order.shippingAddress.fullName}<br />
                    {order.shippingAddress.address}<br />
                    {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}<br />
                    {order.shippingAddress.phone}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;