// import React from 'react';
import { X } from 'lucide-react';

const SizeChartModal = ({ isOpen, onClose, category }) => {
  if (!isOpen) return null;

  const getSizeChartImage = () => {
    switch (category?.toLowerCase()) {
      case 'posters':
        return {
          title: 'Poster Size Chart',
          image: '/images/poster-size.png' // Replace with your actual poster size chart image path
        };
      
      case 'frames':
        return {
          title: 'Frame Size Chart',
          image: '/images/frame-size.png' // Replace with your actual frame size chart image path
        };
      
      case 'nikkah-nama':
      case 'nikkahnama':
      case 'nikah-nama':
        case 'Nikkah-Nama':
        return {
          title: 'Nikkah Nama Size Chart',
          image: '/images/nikkah-nama-size.png' // Replace with your actual nikkah-nama size chart image path
        };
      
      default:
        return {
          title: 'This Product Does Not Have Size Chart',
          // image: '/images/poster-size.png' // Default to poster size chart
        };
    }
  };

  const chartData = getSizeChartImage();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-[#ffefcc] border-2 border-[#80011f] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#80011f]">
          <h2 className="text-xl font-bold text-[#80011f] poppins-bold">
            {chartData.title}
          </h2>
          
          <button
            onClick={onClose}
            className="text-[#80011f] cursor-pointer hover:text-[#991937] transition-colors p-1"
          >
            <X size={24} />
          </button>
        </div>

        {/* Size Chart Image */}
        <div className="p-4">
          <div className="flex justify-center">
            <img 
              src={chartData.image} 
              alt={chartData.title}
              className="max-w-full h-auto rounded-lg shadow-lg"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x600/80011f/ffefcc?text=' + encodeURIComponent(chartData.title);
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#80011f] text-center">
          <button
            onClick={onClose}
            className="bg-[#80011f] cursor-pointer text-[#ffefcc] px-6 py-2 rounded-lg hover:bg-[#991937] transition-colors poppins-medium"
          >
            Close Size Chart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SizeChartModal;