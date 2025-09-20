import { Palette, Star, WandSparkles } from "lucide-react";

const Banner = () => {
  return (
    <div className="bg-secondary p-4 sm:p-6 lg:p-8">
      <section className="relative bg-gradient-to-br from-[#80011f] to-[#80011f] p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl text-center overflow-hidden shadow-xl sm:shadow-2xl max-w-7xl mx-auto">
        <div className="relative z-10">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl poppins-bold mb-3 sm:mb-4 text-[#ffdf9e] px-2 leading-tight">
            Our Product Quality Assurance
          </h2>
          <p className="text-sm poppins-regular sm:text-base md:text-lg text-[#ffefcc] mb-8 sm:mb-10 lg:mb-12 px-4 max-w-3xl mx-auto leading-relaxed">
            Experience the difference with our premium, personalized products designed just for you.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Made Just For U */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-center bg-[#ffefcc] bg-opacity-10 backdrop-blur-sm p-4 sm:p-5 lg:p-6 rounded-xl lg:rounded-2xl border border-[#ffefcc] border-opacity-20 hover:bg-opacity-20 transition-all duration-300 hover:scale-105 text-left lg:text-center group">
              <div className="w-12 h-12 sm:w-13 sm:h-13 lg:w-16 lg:h-16 bg-gradient-to-br from-[#ffdf9e] to-[#ffefcc] rounded-lg lg:rounded-xl flex items-center justify-center mb-3 sm:mr-4 sm:mb-0 lg:mr-0 lg:mb-4 shadow-lg flex-shrink-0 group-hover:shadow-xl transition-shadow duration-300">
                <WandSparkles className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#80011f]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="poppins-bold text-primary mb-2 sm:mb-3 text-base sm:text-lg lg:text-xl leading-tight">
                  Made Just For U
                </h3>
                <p className="text-primary poppins-regular text-sm sm:text-base leading-relaxed">
                  Your Vibe, Your Art. Customize posters, Polaroids, Frames & stickers. Seriously, make it yours.
                </p>
              </div>
            </div>
            
            {/* Top Tier Quality */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-center bg-[#ffefcc] bg-opacity-10 backdrop-blur-sm p-4 sm:p-5 lg:p-6 rounded-xl lg:rounded-2xl border border-[#ffefcc] border-opacity-20 hover:bg-opacity-20 transition-all duration-300 hover:scale-105 text-left lg:text-center group">
              <div className="w-12 h-12 sm:w-13 sm:h-13 lg:w-16 lg:h-16 bg-gradient-to-br from-[#ffdf9e] to-[#ffefcc] rounded-lg lg:rounded-xl flex items-center justify-center mb-3 sm:mr-4 sm:mb-0 lg:mr-0 lg:mb-4 shadow-lg flex-shrink-0 group-hover:shadow-xl transition-shadow duration-300">
                <Star className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#80011f]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="poppins-bold text-primary mb-2 sm:mb-3 text-base sm:text-lg lg:text-xl leading-tight">
                  Top Tier Quality
                </h3>
                <p className="text-primary poppins-regular text-sm sm:text-base leading-relaxed">
                  Only the best. Durable Water proof prints, aesthetic frames, and stickers that actually stick. We use high quality Photo paper.
                </p>
              </div>
            </div>
            
            {/* Custom Designs */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-center bg-[#ffefcc] bg-opacity-10 backdrop-blur-sm p-4 sm:p-5 lg:p-6 rounded-xl lg:rounded-2xl border border-[#ffefcc] border-opacity-20 hover:bg-opacity-20 transition-all duration-300 hover:scale-105 text-left lg:text-center group md:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 sm:w-13 sm:h-13 lg:w-16 lg:h-16 bg-gradient-to-br from-[#ffdf9e] to-[#ffefcc] rounded-lg lg:rounded-xl flex items-center justify-center mb-3 sm:mr-4 sm:mb-0 lg:mr-0 lg:mb-4 shadow-lg flex-shrink-0 group-hover:shadow-xl transition-shadow duration-300">
                <Palette className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#80011f]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="poppins-bold text-primary mb-2 sm:mb-3 text-base sm:text-lg lg:text-xl leading-tight">
                  Custom Designs
                </h3>
                <p className="text-primary poppins-regular text-sm sm:text-base leading-relaxed">
                  From concept to creation. We bring your unique ideas to life, exactly how you imagine.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        {/* <div className="absolute top-4 right-4 w-20 h-20 bg-[#ffdf9e] bg-opacity-10 rounded-full blur-xl"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-[#ffefcc] bg-opacity-10 rounded-full blur-lg"></div> */}
      </section>
    </div>
  );
};

export default Banner;