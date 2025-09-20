const SizeSelector = ({ sizes, selectedSize, onSizeSelect }) => {
  return (
    <div>
      <h3 className="text-base sm:text-lg poppins-semibold text-[#80011f] mb-2">
        Size <span className="text-[#80011f]">*</span>
      </h3>
      <div className="flex flex-wrap  gap-2">
        {sizes.map((sizeObj) => (
          <button
            key={sizeObj.size}
            onClick={() => onSizeSelect(sizeObj)}
            className={`px-3 sm:px-4 py-2 border-2 cursor-pointer rounded-lg poppins-medium transition-all text-sm sm:text-base ${
              selectedSize?.size === sizeObj.size
                ? "border-[#80011f] bg-[#80011f] text-[#ffefcc]"
                : "border-[#80011f65] hover:border-[#80011f] text-[#80011f]"
            }`}
          >
            {sizeObj.size}
          </button>
        ))}
      </div>
    </div>
  );
};


export default SizeSelector;