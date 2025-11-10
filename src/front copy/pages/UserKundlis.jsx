import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCalendar, FaMapMarkerAlt, FaClock, FaEye, FaDownload } from "react-icons/fa";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const UserKundlis = () => {
  const [kundlis, setKundlis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedKundli, setSelectedKundli] = useState(null);

  const fetchKundlis = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://astrologyb.onrender.com/api/kundli', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setKundlis(response.data?.data || []);
    } catch (error) {
      console.error('Error fetching kundlis:', error);
      setKundlis([]);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async (kundli) => {
    try {
      const element = document.createElement('div');
      element.innerHTML = `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
          <h1 style="color: #1f2937; text-align: center; margin-bottom: 30px;">Kundli Report - ${kundli.name}</h1>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
            <div style="background: #f9fafb; padding: 15px; border-radius: 8px;">
              <h3 style="color: #374151; margin-bottom: 15px;">Birth Details</h3>
              <p><strong>Date:</strong> ${kundli.date}</p>
              <p><strong>Time:</strong> ${kundli.time}</p>
              <p><strong>Place:</strong> ${kundli.city}</p>
              <p><strong>Coordinates:</strong> ${kundli.lat?.toFixed(2)}, ${kundli.lon?.toFixed(2)}</p>
            </div>
            
            <div style="background: #f9fafb; padding: 15px; border-radius: 8px;">
              <h3 style="color: #374151; margin-bottom: 15px;">Planetary Positions</h3>
              ${kundli.planets ? Object.entries(kundli.planets).map(([planet, data]) => 
                `<p><strong>${planet}:</strong> ${data.sign} (${data.degree?.toFixed(1)}°)</p>`
              ).join('') : ''}
            </div>
          </div>
          
          <div style="background: #f9fafb; padding: 15px; border-radius: 8px;">
            <h3 style="color: #374151; margin-bottom: 15px;">Detailed Prediction</h3>
            <div style="white-space: pre-wrap; line-height: 1.6;">${kundli.interpretation}</div>
          </div>
        </div>
      `;
      
      document.body.appendChild(element);
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      document.body.removeChild(element);
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`${kundli.name}_Kundli.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  useEffect(() => {
    fetchKundlis();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Kundlis</h1>
      
      {loading ? (
        <div className="text-center py-20">
          <div className="text-xl">Loading kundlis...</div>
        </div>
      ) : kundlis.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl text-gray-300 mb-4">🔮</div>
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">No kundlis generated yet</h2>
          <p className="text-gray-500 mb-6">Generate your first kundli to see it here!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kundlis.map((kundli) => (
            <div key={kundli._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{kundli.name}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaCalendar className="text-blue-500" />
                    <span>{kundli.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock className="text-green-500" />
                    <span>{kundli.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-red-500" />
                    <span>{kundli.city}</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-500">
                  Generated on {new Date(kundli.createdAt).toLocaleDateString()}
                </p>
              </div>

              <button
                onClick={() => setSelectedKundli(kundli)}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaEye />
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal for viewing kundli details */}
      {selectedKundli && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Kundli for {selectedKundli.name}
                </h2>
                <button
                  onClick={() => setSelectedKundli(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-3">Birth Details</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Date:</span> {selectedKundli.date}</p>
                    <p><span className="font-medium">Time:</span> {selectedKundli.time}</p>
                    <p><span className="font-medium">Place:</span> {selectedKundli.city}</p>
                    <p><span className="font-medium">Coordinates:</span> {selectedKundli.lat?.toFixed(2)}, {selectedKundli.lon?.toFixed(2)}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-700 mb-3">Planetary Positions</h3>
                  <div className="text-sm space-y-1 max-h-40 overflow-y-auto">
                    {selectedKundli.planets && Object.entries(selectedKundli.planets).map(([planet, data]) => (
                      <p key={planet} className="flex justify-between">
                        <span className="capitalize font-medium">{planet}:</span> 
                        <span>{data.sign} ({data.degree?.toFixed(1)}°)</span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-3">Detailed Prediction</h3>
                <div className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed max-h-60 overflow-y-auto">
                  {selectedKundli.interpretation}
                </div>
              </div>

              <div className="flex justify-end mt-6 gap-3">
                <button
                  onClick={() => downloadPDF(selectedKundli)}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
                >
                  <FaDownload /> Download PDF
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Print
                </button>
                <button
                  onClick={() => setSelectedKundli(null)}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserKundlis;