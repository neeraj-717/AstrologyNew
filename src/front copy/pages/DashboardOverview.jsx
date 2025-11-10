import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaUsers, FaShoppingBag, FaClipboardList, FaRegNewspaper } from 'react-icons/fa';

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    blogs: 0
  });
  const [loading, setLoading] = useState(true);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchStats = async () => {
    try {
      const { data } = await axios.get('https://astrologyb.onrender.com/api/admin/stats', {
        headers: getAuthHeaders()
      });
      setStats(data.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Fallback to basic API calls
      try {
        const [productsRes, blogsRes] = await Promise.all([
          axios.get('https://astrologyb.onrender.com/api/product'),
          axios.get('https://astrologyb.onrender.com/api/blog')
        ]);
        setStats({
          users: 0,
          products: productsRes.data.length,
          orders: 0,
          blogs: blogsRes.data.length
        });
      } catch (fallbackError) {
        setStats({ users: 0, products: 0, orders: 0, blogs: 0 });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Users', value: stats.users, icon: <FaUsers />, color: 'bg-blue-500' },
    { title: 'Products', value: stats.products, icon: <FaShoppingBag />, color: 'bg-green-500' },
    { title: 'Orders', value: stats.orders, icon: <FaClipboardList />, color: 'bg-yellow-500' },
    { title: 'Blogs', value: stats.blogs, icon: <FaRegNewspaper />, color: 'bg-purple-500' }
  ];

  return (
    <div className="w-full bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>
        
        {loading ? (
          <div className="text-center py-20">
            <p className="text-xl">Loading dashboard...</p>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">{card.title}</p>
                      <p className="text-3xl font-bold text-gray-800">{card.value}</p>
                    </div>
                    <div className={`${card.color} text-white p-3 rounded-full text-2xl`}>
                      {card.icon}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => window.location.href = '/dashboard/add-product'}
                  className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-medium transition"
                >
                  Add New Product
                </button>
                <button
                  onClick={() => window.location.href = '/dashboard/add-blog'}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition"
                >
                  Create New Blog
                </button>
                <button
                  onClick={() => window.location.href = '/dashboard/add-photo'}
                  className="bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-lg font-medium transition"
                >
                  Add New Photo
                </button>
                <button
                  onClick={() => window.location.href = '/dashboard/orders'}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg font-medium transition"
                >
                  View Orders
                </button>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-lg shadow-md p-6 mt-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600">New user registered</span>
                  <span className="text-sm text-gray-400">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600">Product "Gold Crown" added</span>
                  <span className="text-sm text-gray-400">5 hours ago</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-gray-600">New order received</span>
                  <span className="text-sm text-gray-400">1 day ago</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">Blog post published</span>
                  <span className="text-sm text-gray-400">2 days ago</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;