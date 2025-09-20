export default function PageLoader({ visible }) {
  return (
        <div  className={`fixed inset-0 z-50 flex items-center justify-center bg-primary text-secondary transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0 invisible"
      }`}>
      <div className="text-center">
        {/* Elegant Spinner */}
        
        {/* Brand Name with Gold Gradient */}
        <h1 className="text-7xl font-extrabold orbitron tracking-wider bg-gradient-to-r from-[#ffdf9e] via-[#ffefcc] to-[#ffdf9e] text-transparent bg-clip-text animate-glow">
          Art Charm
        </h1>

        {/* Tagline */}
        <p className="mt-3 text-[#ffefcc] text-lg poppins-regular tracking-widest animate-fade-in">
          Where your memories meet unmatched quality.
        </p>
        {/* <div className="w-16 h-16 border-4 border-white border-t-gray-700 rounded-full animate-spin mx-auto mb-8"></div> */}
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-in-out forwards;
      `}</style>
   
    </div>

);
}

    
  



