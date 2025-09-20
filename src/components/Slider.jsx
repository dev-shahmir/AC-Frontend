import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

// Desktop images for all screen sizes
const images = [
  '/images/main desktop.jpg',
  '/images/Posters.jpg',
  '/images/Frames.jpg',
  '/images/Nikah nama.jpg',
  '/images/Polaroids.jpg',
  '/images/Stickers.jpg',
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-[30vh] md:h-[86vh] overflow-hidden group">
      {/* Background slides with simple fade */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              className="w-full h-full object-fit object-center"
              alt={`Slide ${index + 1}`}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 backdrop-blur-md border border-[#80011f] rounded-full flex items-center justify-center text-[#80011f]  bg-secondary cursor-pointer hover:scale-110 transition-all duration-300 z-20 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-hover:translate-x-0 md:-translate-x-4"
      >
        <ChevronLeft size={20} className="md:w-6 md:h-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 backdrop-blur-md border border-[#80011f] rounded-full flex items-center justify-center text-[#80011f]  bg-secondary cursor-pointer hover:scale-110 transition-all duration-300 z-20 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-hover:translate-x-0 md:translate-x-4"
      >
        <ChevronRight size={20} className="md:w-6 md:h-6" />
      </button>

      {/* Play/Pause button */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-10 h-10 md:w-12 md:h-12 backdrop-blur-md border border-[#80011f] text-[#80011f]  bg-secondary rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 z-20"
      >
        {isPlaying ? <Pause size={16} className="md:w-5 md:h-5" /> : <Play size={16} className="md:w-5 md:h-5" />}
      </button>

      {/* Fixed pagination dots */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative cursor-pointer w-3 h-3 rounded-full transition-all duration-500 hover:scale-125 ${
              index === currentSlide 
                ? 'bg-[#ffdf9e] shadow-lg shadow-[#ffdf9e]/50' 
                : 'bg-[#ffefcc6c] hover:bg-[#ffdf9e]'
            }`}
          >
            {index === currentSlide && (
              <div className="absolute inset-0 rounded-full bg-[#ffdf9e] animate-ping opacity-40" />
            )}
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-[#80011f]/30 z-20">
        <div 
          key={currentSlide}
          className={`h-full bg-gradient-to-r from-[#ffefcc] via-[#ffdf9e] to-[#80011f] transition-all duration-300 ${
            isPlaying ? 'animate-[progressBar_4s_linear]' : 'w-0'
          }`}
        />
      </div>

      {/* Simple CSS animations */}
      <style>{`
        @keyframes progressBar {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Slider;