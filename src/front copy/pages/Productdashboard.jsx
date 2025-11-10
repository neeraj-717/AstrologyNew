import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaShoppingCart, FaRegStar, FaStar, FaEye } from "react-icons/fa";
import { BiHeart } from "react-icons/bi";
import { IoIosShuffle } from "react-icons/io";
import axios from "axios";

import ringImg from "../../Front/assest/imgs/prod1.jpg";
import ringImg2 from "../../Front/assest/imgs/prod2.jpg";
import ringImg3 from "../../Front/assest/imgs/prod3.jpg";
import ringImg4 from "../../Front/assest/imgs/prod4.jpg";
import ringImg5 from "../../Front/assest/imgs/prod5.jpg";
import ringImg6 from "../../Front/assest/imgs/prod6.jpg";
import ringImg7 from "../../Front/assest/imgs/prod7.jpg";
import ringImg8 from "../../Front/assest/imgs/prod8.jpg";

const Productdashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    


    const [currentPage, setCurrentPage] = useState(1);
    
    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('https://astrologyb.onrender.com/api/product');
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchProducts();
    }, []);

    const productsPerPage = 6;
    const totalPages = Math.ceil(products.length / productsPerPage);

    const indexOfLast = currentPage * productsPerPage;
    const indexOfFirst = indexOfLast - productsPerPage;
    const currentProducts = products.slice(indexOfFirst, indexOfLast);

    const addProduct = () => {
        window.location.href = '/dashboard/add-product';
    };

    const deleteProduct = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please login as admin to delete product');
                return;
            }
            
            await axios.delete(`https://astrologyb.onrender.com/api/product/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setProducts(products.filter((item) => item._id !== id));
            alert('✅ Product deleted successfully!');
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('❌ Error deleting product: ' + (error.response?.data?.msg || error.message));
        }
    };

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const cardVariant = {
        hidden: { opacity: 0, y: 50 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.5 },
        }),
    };

    return (
        <div className="md:w-[80%] bg-gray-50 min-h-screen px-8 py-10">
            {/* Top Add Button */}
            <div className="flex justify-end mb-6">
                <button
                    onClick={addProduct}
                    className="px-6 py-2 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 duration-300"
                >
                    + Add Product
                </button>
            </div>

            {/* Product Grid */}
            <div className="flex flex-wrap justify-between">
                {loading ? (
                    <div className="w-full text-center py-20">
                        <p className="text-xl">Loading products...</p>
                    </div>
                ) : currentProducts.length > 0 ? (
                    currentProducts.map((item, i) => (
                        <motion.div
                            key={item._id}
                            className="group relative mt-10 bg-white shadow-md rounded-2xl overflow-hidden w-full sm:w-[48%] md:w-[30%] p-4 transition-all duration-500 hover:shadow-xl"
                            variants={cardVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={i}
                            whileHover={{ scale: 1.05 }}
                        >
                            <span className="absolute top-3 left-3 bg-orange-400 text-white text-xs font-semibold px-2 py-1 rounded">
                                New
                            </span>

                            {/* Image container */}
                            <div className="relative flex justify-center items-center">
                                <motion.img
                                    src={item.imageUrl || ringImg}
                                    alt={item.name}
                                    className="w-[150px] h-[150px] object-contain"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                />

                                {/* Hover overlay */}
                                {/* <motion.div className="absolute top-0 left-0 w-full h-full bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center gap-3 transition-opacity duration-500">
                                   
                                    <div className="flex gap-3 text-white text-lg">
                                        <button className="hover:text-orange-300 transition">
                                            <FaEye />
                                        </button>
                                        <button className="hover:text-orange-300 transition">
                                            <BiHeart />
                                        </button>
                                        <button className="hover:text-orange-300 transition">
                                            <IoIosShuffle />
                                        </button>
                                    </div>
                                </motion.div> */}
                            </div>

                            {/* Product Info */}
                            <div className="text-center my-5 relative z-10">
                                <div className="flex justify-center mb-1">
                                    {[...Array(5)].map((_, i) =>
                                        i < 4 ? (
                                            <FaStar key={i} className="text-yellow-400" />
                                        ) : (
                                            <FaRegStar key={i} className="text-yellow-400" />
                                        )
                                    )}
                                </div>
                                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                <div className="mt-1">
                                    <span className="text-lg font-bold text-black">
                                        ₹{parseFloat(item.price || 0).toFixed(2)}
                                    </span>
                                    {item.oldprice && (
                                        <span className="text-gray-400 line-through ml-2">
                                            ₹{parseFloat(item.oldprice).toFixed(2)}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Delete Button */}
                            <div className="flex justify-end">
                                <button
                                    onClick={() => deleteProduct(item._id)}
                                    className="px-4 py-2 bg-red-500 text-white rounded-full text-sm font-medium hover:bg-red-600 duration-300"
                                >
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="w-full text-center py-20">
                        <p className="text-xl text-gray-500 mb-4">No products found</p>
                        <button
                            onClick={addProduct}
                            className="px-6 py-2 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 duration-300"
                        >
                            + Add First Product
                        </button>
                    </div>
                )}
            </div>

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

export default Productdashboard;
