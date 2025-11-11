import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { photoService } from "../../services/photoService";

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 9;
  const totalPages = Math.ceil(photos.length / imagesPerPage);

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = photos.slice(indexOfFirstImage, indexOfLastImage);

  // Fetch photos from backend
  const fetchPhotos = async () => {
    try {
      const data = await photoService.getAllPhotos();
      setPhotos(data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleDelete = async (photoId) => {
    if (!window.confirm('Are you sure you want to delete this photo?')) return;
    
    try {
      await photoService.deletePhoto(photoId);
      setPhotos(photos.filter(photo => photo._id !== photoId));
      alert('Photo deleted successfully!');
    } catch (error) {
      console.error('Error deleting photo:', error);
      alert('Error deleting photo: ' + (error.response?.data?.msg || error.message));
    }
  };

  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <div className="w-[90%] mx-auto py-10 min-h-screen bg-linear-to-b from-white via-[#faf6ff] to-[#efe6ff] overflow-hidden">
      
      {/* 🔹 Top bar with Add button */}
      <div className="flex justify-between items-center mb-8 pr-6">
        <h1 className="text-3xl font-bold text-purple-800">Photo Gallery</h1>
        <Link 
          to="/dashboard/add-photo"
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all duration-300"
        >
          <FaPlus size={14} /> Add Photo
        </Link>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-purple-600">Loading photos...</div>
        </div>
      )}

      {/* Empty state */}
      {!loading && photos.length === 0 && (
        <div className="flex flex-col justify-center items-center h-64">
          <div className="text-xl text-gray-600 mb-4">No photos found</div>
          <Link 
            to="/dashboard/add-photo"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
          >
            Add First Photo
          </Link>
        </div>
      )}

      {/* 🔹 Gallery Grid */}
      {!loading && photos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
          {currentImages.map((photo, index) => (
            <motion.div
              key={photo._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-[320px] aspect-4/3 rounded-xl overflow-hidden shadow-lg bg-white"
            >
              <button
                onClick={() => handleDelete(photo._id)}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-md z-10 transition-all duration-300"
                title="Delete photo"
              >
                <FaTrashAlt size={14} />
              </button>

              <img
                src={photo.imageUrl}
                alt={`gallery-${index}`}
                className="w-full h-full object-cover rounded-xl transform duration-500 hover:scale-105"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/320x240?text=Image+Not+Found';
                }}
              />
              
              {/* Photo info overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white">
                <p className="text-sm font-medium truncate">
                  {new Date(photo.createdAt).toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* 🔹 Pagination */}
      {!loading && photos.length > imagesPerPage && (
        <div className="flex justify-center mt-10 gap-5 flex-wrap">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-semibold ${
              currentPage === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            } text-white transition-all duration-300`}
          >
            Previous
          </button>

          <span className="text-lg font-semibold text-gray-800">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-semibold ${
              currentPage === totalPages
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            } text-white transition-all duration-300`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
