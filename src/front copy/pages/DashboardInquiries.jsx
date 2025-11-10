import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaTrashAlt, FaEye, FaEnvelope, FaPhone, FaUser } from "react-icons/fa";

const DashboardInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const inquiriesPerPage = 10;

  const fetchInquiries = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://astrologyb.onrender.com/api/contact', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const contactsData = response.data.contacts || response.data;
      setInquiries(Array.isArray(contactsData) ? contactsData : []);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      console.error('Response:', error.response?.data);
      setInquiries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const deleteInquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://astrologyb.onrender.com/api/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const updatedInquiries = safeInquiries.filter(inquiry => inquiry._id !== id);
      setInquiries(updatedInquiries);
      
      // Check if current page becomes empty and go to page 1
      const newTotalPages = Math.ceil(updatedInquiries.length / inquiriesPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(1);
      }
      
      alert('Inquiry deleted successfully!');
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      alert('Error deleting inquiry');
    }
  };

  const safeInquiries = Array.isArray(inquiries) ? inquiries : [];
  const totalPages = Math.ceil(safeInquiries.length / inquiriesPerPage);
  const indexOfLast = currentPage * inquiriesPerPage;
  const indexOfFirst = indexOfLast - inquiriesPerPage;
  const currentInquiries = safeInquiries.slice(indexOfFirst, indexOfLast);

  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <div className="w-[90%] mx-auto py-10 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Customer Inquiries</h1>
        <div className="text-sm text-gray-600">
          Total: {safeInquiries.length} inquiries
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <p className="text-xl">Loading inquiries...</p>
        </div>
      ) : currentInquiries.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentInquiries.map((inquiry) => (
                  <motion.tr
                    key={inquiry._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaUser className="text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {inquiry.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center mb-1">
                          <FaEnvelope className="text-gray-400 mr-2 text-xs" />
                          {inquiry.email}
                        </div>
                        {inquiry.phone && (
                          <div className="flex items-center">
                            <FaPhone className="text-gray-400 mr-2 text-xs" />
                            {inquiry.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs">
                        {inquiry.message.length > 100 
                          ? `${inquiry.message.substring(0, 100)}...` 
                          : inquiry.message
                        }
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedInquiry(inquiry)}
                          className="text-blue-600 hover:text-blue-900 p-2 rounded hover:bg-blue-100"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => deleteInquiry(inquiry._id)}
                          className="text-red-600 hover:text-red-900 p-2 rounded hover:bg-red-100"
                          title="Delete"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">No inquiries found</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-semibold ${
              currentPage === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
          >
            Previous
          </button>
          <span className="text-lg font-semibold text-gray-800 flex items-center">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-semibold ${
              currentPage === totalPages
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
          >
            Next
          </button>
        </div>
      )}

      {/* Modal for viewing inquiry details */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Inquiry Details</h2>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <p className="text-gray-900">{selectedInquiry.name}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="text-gray-900">{selectedInquiry.email}</p>
              </div>
              
              {selectedInquiry.phone && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <p className="text-gray-900">{selectedInquiry.phone}</p>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <p className="text-gray-900">{new Date(selectedInquiry.createdAt).toLocaleString()}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <p className="text-gray-900 whitespace-pre-wrap bg-gray-50 p-3 rounded">
                  {selectedInquiry.message}
                </p>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardInquiries;