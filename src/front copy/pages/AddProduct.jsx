import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    oldprice: "",
    role: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('oldprice', formData.oldprice);
      formDataToSend.append('role', formData.role);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }
      
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login as admin to create product');
        return;
      }
      
      await axios.post('https://astrologyb.onrender.com/api/product', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      
      alert('✅ Product created successfully!');
      
      // Reset form
      setFormData({
        name: "",
        price: "",
        oldprice: "",
        role: "",
        image: null,
      });
      
      // Redirect to products page
      window.location.href = '/dashboard/products';
    } catch (error) {
      console.error('Error creating product:', error);
      alert('❌ Error creating product: ' + (error.response?.data?.msg || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-8">
          🛍️ Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Current Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter current price"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Old Price
              </label>
              <input
                type="number"
                name="oldprice"
                value={formData.oldprice}
                onChange={handleChange}
                placeholder="Enter old price"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>

          {/* Role/Category */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Category
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Enter product category"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Product Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition duration-300 disabled:opacity-50"
            >
              {loading ? 'Creating Product...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;