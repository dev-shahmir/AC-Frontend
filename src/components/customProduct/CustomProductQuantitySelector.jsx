const CustomProductQuantitySelector = ({ quantity, maxStock, onQuantityChange }) => {
  return (
    <div>
      <h3 className="text-base  sm:text-lg poppins-semibold text-[#80011f] mb-3">
        Quantity
      </h3>
      <div className="flex items-center border-2 border-[#80011f] rounded-lg w-fit">
        <button
          onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
          className="px-3 sm:px-4 py-2 poppins-regular text-[#80011f6f] hover:text-[#80011f] cursor-pointer disabled:opacity-50"
          disabled={quantity <= 1}
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 12H4"
            />
          </svg>
        </button>
        <span className="px-3 sm:px-4 py-2 poppins-regular text-base sm:text-lg font-semibold min-w-[2.5rem] sm:min-w-[3rem] text-center text-[#80011f]">
          {quantity}
        </span>
        <button
          onClick={() => onQuantityChange(Math.min(maxStock, quantity + 1))}
          className="px-3 sm:px-4 py-2 poppins-regular text-[#80011f6f] hover:text-[#80011f] disabled:opacity-50"
          disabled={quantity >= maxStock}
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CustomProductQuantitySelector;
