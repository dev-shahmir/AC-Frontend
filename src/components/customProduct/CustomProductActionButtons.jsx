const CustomProductActionButtons = ({ 
  canProceed, 
  stock, 
  validationIsValid, 
  onAddToCart, 
  onBuyNow 
}) => {
  const getButtonText = () => {
    if (stock === 0) return "Out of Stock";
    if (!validationIsValid) return "Complete Required Fields";
    return { addToCart: "Add to Cart", buyNow: "Buy Now" };
  };

  const buttonText = getButtonText();
  const isString = typeof buttonText === "string";

  return (
    <div className="space-y-3 pt-4">
      <button
        disabled={!canProceed}
        onClick={onAddToCart}
        className={`w-full py-3 sm:py-4 cursor-pointer poppins-medium px-4 sm:px-6 text-base sm:text-lg font-semibold rounded-lg transition-colors ${
          !canProceed
            ? "bg-transparent border border-[#80011f] text-[#80011f] cursor-not-allowed"
            : "bg-[#ffefcc] border border-[#80011f] text-[#80011f] hover:bg-[#80011f] hover:text-[#ffefcc]"
        }`}
      >
        {isString ? buttonText : buttonText.addToCart}
      </button>

      <button
        disabled={!canProceed}
        onClick={onBuyNow}
        className={`w-full py-3 sm:py-4 px-4 cursor-pointer poppins-medium sm:px-6 text-base sm:text-lg font-semibold rounded-lg transition-colors ${
          !canProceed
            ? "bg-transparent border border-[#80011f] text-[#80011f] cursor-not-allowed"
            : "bg-[#ffefcc] border border-[#80011f] text-[#80011f] hover:bg-[#80011f] hover:text-[#ffefcc]"
        }`}
      >
        {isString ? buttonText : buttonText.buyNow}
      </button>
    </div>
  );
};

export default CustomProductActionButtons;
