import { useState } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageGallery = ({ images, productName }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
    afterChange: (index) => setActiveImageIndex(index),
    customPaging: (i) => (
      <div
        className={`w-2 h-2 sm:w-3 sm:h-3 mx-1 rounded-full transition-all duration-300 ${
          i === activeImageIndex ? "bg-[#80011f]" : "bg-[#ffdf9e]"
        }`}
      />
    ),
  };

  return (
    <div className="space-y-1 sm:space-y-3">
      <div className="relative overflow-hidden rounded-lg p-8 sm:p-6">
        <Slider {...sliderSettings}>
          {images.map((image, index) => (
            <div key={index} className="outline-none">
              <img
                src={image}
                alt={productName}
                className="w-full h-full p-[3px] md:h-[600px] sm:h-96 lg:h-[500px] object-fill rounded-xl"
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className="flex gap-1 sm:gap-2 px-2 sm:px-8 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveImageIndex(index)}
            className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-all ${
              index === activeImageIndex
                ? "border-[#80011f] shadow-md"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
