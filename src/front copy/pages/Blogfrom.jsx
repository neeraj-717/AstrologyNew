import React, { useState } from "react";
import axios from "axios";

const Blogfrom = () => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    category: "",
    img: null,
    description: "",
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
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      if (formData.img) {
        formDataToSend.append('image', formData.img);
      }
      
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login as admin to create blog');
        return;
      }
      
      await axios.post('https://astrologyb.onrender.com/api/blog', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      
      alert('✅ Blog created successfully!');
      
      // Reset form
      setFormData({
        name: "",
        title: "",
        category: "",
        img: null,
        description: "",
      });
      
      // Redirect to blogs page
      window.location.href = '/dashboard/blogs';
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('❌ Error creating blog: ' + (error.response?.data?.msg || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-8">
          ✍ Add New Blog
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Enter blog category"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Blog Image
            </label>
            <input
              type="file"
              name="img"
              accept="image/*"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              placeholder="Write blog description..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition duration-300 disabled:opacity-50"
            >
              {loading ? 'Creating Blog...' : 'Submit Blog'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Blogfrom;
