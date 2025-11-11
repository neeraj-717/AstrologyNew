import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import blog4 from "../../Front/assest/imgs/blog4.webp";
import blog5 from "../../Front/assest/imgs/blog5.webp";
import blog6 from "../../Front/assest/imgs/blog6.webp";
import { useNavigate } from "react-router-dom";

const Dashbooardblog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);



    const [currentPage, setCurrentPage] = useState(1);
    const navigate=useNavigate()

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get('https://astrologyb.onrender.com/api/blog');
            setBlogs(data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
            setBlogs([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const blogsPerPage = 6;
    const totalPages = Math.ceil(blogs.length / blogsPerPage);

    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const deleteBlog = async (id) => {
        if (!window.confirm('Are you sure you want to delete this blog?')) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please login as admin to delete blog');
                return;
            }
            
            await axios.delete(`https://astrologyb.onrender.com/api/blog/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setBlogs(blogs.filter((blog) => blog._id !== id));
            alert('✅ Blog deleted successfully!');
        } catch (error) {
            console.error('Error deleting blog:', error);
            alert('❌ Error deleting blog: ' + (error.response?.data?.msg || error.message));
        }
    };

    const addBlog = () => {
        // Redirect to add blog form or open modal
        navigate('/dashboard/add-blog');
    };

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="w-[90%] mx-auto overflow-hidden bg-gray-50 min-h-screen py-10">
            {/* Add Button */}
            <div className="flex justify-end mb-6 pr-5">
                <button
                    onClick={addBlog}
                    className="px-6 py-2 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 duration-300"
                >
                    + Add Blog
                </button>
            </div>

            {loading ? (
                <div className="text-center py-20">
                    <p className="text-xl">Loading blogs...</p>
                </div>
            ) : currentBlogs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-5">
                    {currentBlogs.map((blog) => (
                        <motion.div
                            key={blog._id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 duration-300"
                        >
                            <div className="relative">
                                <img
                                    src={blog.imageUrl || blog4}
                                    alt={blog.title}
                                    className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <span className="absolute bottom-3 right-3 bg-orange-500 text-white text-sm font-medium px-4 py-1.5 rounded-full">
                                    {new Date(blog.createdAt).toLocaleDateString()}
                                </span>
                            </div>

                            <div className="p-5 text-left">
                                <h1 className="text-lg font-semibold text-gray-800 duration-300 group-hover:text-orange-500">
                                    {blog.title}
                                </h1>
                                <p className="text-gray-600 mt-3 text-sm md:text-base">
                                    {blog.description}
                                </p>
                                <p className="mt-2 text-xs text-gray-400">
                                    Category: {blog.category}
                                </p>

                                <div className="mt-5 flex justify-end">
                                    <button
                                        onClick={() => deleteBlog(blog._id)}
                                        className="px-5 py-2 bg-red-500 text-white rounded-full font-medium hover:bg-red-600 duration-300"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-xl text-gray-500 mb-4">No blogs found</p>
                    <button
                        onClick={addBlog}
                        className="px-6 py-2 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 duration-300"
                    >
                        + Add First Blog
                    </button>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center mt-10 gap-5 flex-wrap"
                >
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-lg font-semibold ${currentPage === 1
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-orange-500 hover:bg-orange-600"
                            } text-white`}
                    >
                        Previous
                    </button>
                    <span className="text-lg font-semibold text-gray-800">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-lg font-semibold ${currentPage === totalPages
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-orange-500 hover:bg-orange-600"
                            } text-white`}
                    >
                        Next
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default Dashbooardblog;
