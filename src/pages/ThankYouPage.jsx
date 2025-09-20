import { CheckCircle, ShoppingBag, Mail, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ThankYouPage = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffefcc] via-[#ffdf9e] to-[#ffefcc] px-3 sm:px-4 py-6 sm:py-8 flex items-center justify-center">

      <div className="relative bg-secondary shadow-2xl rounded-2xl sm:rounded-3xl p-2 sm:p-4 md:p-6 lg:p-8 xl:p-12 max-w-xs sm:max-w-lg md:max-w-2xl w-full text-center border-2 border-[#ffdf9e] backdrop-blur-sm">
        
        {/* Animated Success Icon */}
        <div className="flex justify-center mb-6 sm:mb-8 relative">
          <div className="relative">
            <CheckCircle className="text-[#80011f] w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 drop-shadow-lg animate-pulse" />
            <div className="absolute inset-0 bg-[#80011f]/20 rounded-full w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 animate-ping"></div>
          </div>
        </div>

        {/* Brand Header */}
        <div className="mb-5 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl orbitron font-black text-[#80011f] mb-2 tracking-tight">
            Order Confirmed!
          </h1>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-[#80011f] to-[#ffdf9e] mx-auto rounded-full"></div>
        </div>

        {/* Thank You Message */}
        <div className="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
          <p className="text-base sm:text-lg md:text-xl text-[#80011f] poppins-semibold leading-relaxed">
            Thank you for choosing <span className="font-black">Art Charm!</span>
          </p>
          <p className="text-sm sm:text-base md:text-lg text-primary poppins-regular leading-relaxed max-w-xs sm:max-w-md md:max-w-lg mx-auto px-2 sm:px-0">
            Your order has been placed successfully and is now being prepared with care. 
            We've sent you a detailed confirmation email.
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-[#ffefcc] rounded-lg sm:rounded-xl p-3 sm:p-4 border border-[#ffdf9e]">
            <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-[#80011f] mx-auto mb-2" />
            <h3 className="poppins-semibold text-[#80011f] text-xs sm:text-sm">Order Placed</h3>
            <p className="text-xs poppins-regular text-primary">Successfully received</p>
          </div>
          
          <div className="bg-[#ffdf9e] rounded-lg sm:rounded-xl p-3 sm:p-4 border border-[#80011f]/20">
            <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-[#80011f] mx-auto mb-2" />
            <h3 className="poppins-semibold text-[#80011f] text-xs sm:text-sm">Processing</h3>
            <p className="text-xs poppins-regular text-primary">1-2 business days</p>
          </div>
          
          <div className="bg-[#ffefcc] rounded-lg sm:rounded-xl p-3 sm:p-4 border border-[#ffdf9e]">
            <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-[#80011f] mx-auto mb-2" />
            <h3 className="poppins-semibold text-[#80011f] text-xs sm:text-sm">Email Sent</h3>
            <p className="text-xs poppins-regular text-primary">Check spam folder</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-[#80011f] text-[#ffefcc] font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg  transform transition-all duration-300 group w-full sm:w-auto text-sm sm:text-base"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Continue Shopping</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;