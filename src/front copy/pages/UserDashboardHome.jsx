import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaClipboardList, FaUser, FaChartLine } from "react-icons/fa";
import axios from "axios";
import { useCart } from "../../context/CartContext";

const UserDashboardHome = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { cartItems } = useCart();
  const [stats, setStats] = useState({
    orders: 0,
    kundlis: 0,
    loading: true
  });

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      
      const [ordersRes, kundlisRes] = await Promise.all([
        axios.get('https://astrologyb.onrender.com/api/orders', { headers }),
        axios.get('https://astrologyb.onrender.com/api/kundli', { headers })
      ]);
      
      const ordersData = ordersRes.data?.orders || ordersRes.data || [];
      const kundlisData = kundlisRes.data?.data || kundlisRes.data || [];
      
      setStats({
        orders: Array.isArray(ordersData) ? ordersData.length : 0,
        kundlis: Array.isArray(kundlisData) ? kundlisData.length : 0,
        loading: false
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats({ orders: 0, kundlis: 0, loading: false });
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-white min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Welcome back, {user.name || "User"}!</h1>
        <p className="text-blue-600 mt-2">Manage your astrology journey from here</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Cart Items</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.loading ? "..." : cartItems.length}
              </p>
            </div>
            <FaShoppingCart className="text-blue-500 text-2xl" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.loading ? "..." : stats.orders}
              </p>
            </div>
            <FaClipboardList className="text-green-500 text-2xl" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">My Kundlis</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.loading ? "..." : stats.kundlis}
              </p>
            </div>
            <FaUser className="text-purple-500 text-2xl" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-sm font-medium">Consultations</p>
              <p className="text-2xl font-bold text-gray-900">0</p>
            </div>
            <FaChartLine className="text-orange-500 text-2xl" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/cart"
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 border border-gray-200"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaShoppingCart className="text-blue-600 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">My Cart</h3>
              <p className="text-gray-600 text-sm">View and manage cart items</p>
            </div>
          </div>
        </Link>

        <Link
          to="/orders"
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 border border-gray-200"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FaClipboardList className="text-green-600 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">My Orders</h3>
              <p className="text-gray-600 text-sm">Track your order status</p>
            </div>
          </div>
        </Link>

        <Link
          to="/my-kundlis"
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 border border-gray-200"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FaUser className="text-purple-600 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">My Kundlis</h3>
              <p className="text-gray-600 text-sm">View your birth charts</p>
            </div>
          </div>
        </Link>

        <Link
          to="/product"
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 border border-gray-200"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <FaShoppingCart className="text-yellow-600 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Browse Products</h3>
              <p className="text-gray-600 text-sm">Explore astrology products</p>
            </div>
          </div>
        </Link>

        <Link
          to="/kundli"
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 border border-gray-200"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <FaChartLine className="text-indigo-600 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Generate Kundli</h3>
              <p className="text-gray-600 text-sm">Create new birth chart</p>
            </div>
          </div>
        </Link>

        <Link
          to="/astrologyconsultation"
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 border border-gray-200"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <FaUser className="text-red-600 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Consultation</h3>
              <p className="text-gray-600 text-sm">Book astrology consultation</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserDashboardHome;