import { MdShare } from "react-icons/md";
import { StarRating } from "../StarRating";

const CustomProductInfoHeader = ({
  template,
  averageRating,
  totalReviews,
  selectedSize,
  onShare,
}) => {
  const originalPrice = selectedSize?.actualPrice;
  const discountedPrice = selectedSize?.discountedPrice;

  return (
    <div>
      {/* Category */}
      <div className="text-xs poppins-regular sm:text-sm text-[#80011f] font-semibold uppercase tracking-wide mb-2">
        {template.category}
        {template.subCategory && (
          <>
            <span className="mx-1">›</span>
            {template.subCategory}
          </>
        )}
      </div>

      <h1 className="text-2xl poppins-bold sm:text-3xl lg:text-4xl font-bold text-[#80011f] mb-2">
        {template.name}
      </h1>

      {/* Rating and Share */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3 sm:gap-0">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <StarRating rating={Math.round(averageRating)} />
          </div>
          <span className="text-xs sm:text-sm poppins-regular font-medium text-[#80011f]">
            {averageRating > 0 ? averageRating : "No rating"}
          </span>
          {totalReviews > 0 && (
            <span className="text-xs poppins-regular sm:text-sm text-[#80011f]">
              ({totalReviews} reviews)
            </span>
          )}
        </div>

        <button
          onClick={onShare}
          className="flex items-center gap-2 poppins-medium cursor-pointer px-3 sm:px-4 py-2 border border-[#80011f] bg-[#80011f] text-[#ffefcc] rounded-lg hover:bg-transparent hover:text-[#80011f] transition-colors"
        >
          <MdShare className="text-base sm:text-lg" />
          <span className="text-xs sm:text-sm poppins-medium">Share</span>
        </button>
      </div>

      {/* Price and Stock */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between my-4 gap-3 sm:gap-0">
        <div className="flex items-center gap-2 sm:gap-3">
          {discountedPrice ? (
            <>
              <span className="text-xl sm:text-2xl lg:text-3xl poppins-bold text-primary">
                Rs. {discountedPrice.toLocaleString()}
              </span>
              <span className="text-sm sm:text-lg text-[#80011f] poppins-regular line-through">
                Rs. {originalPrice?.toLocaleString()}
              </span>
              <span className="bg-[#80011f] text-[#ffefcc] text-xs sm:text-sm poppins-medium px-2 py-1 rounded">
                {Math.round(
                  ((originalPrice - discountedPrice) / originalPrice) * 100
                )}
                % OFF
              </span>
            </>
          ) : (
            <span className="text-xl sm:text-2xl lg:text-3xl poppins-bold text-[#80011f]">
              Rs. {originalPrice?.toLocaleString()}
            </span>
          )}
        </div>

        <div
          className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm poppins-medium ${
            template.stock > 10
              ? "bg-accent"
              : template.stock > 0
              ? "bg-accent"
              : "bg-accent"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full mr-2 ${
              template.stock > 10
                ? "bg-primary"
                : template.stock > 0
                ? "bg-primary"
                : "bg-primary"
            }`}
          />
          {template.stock > 10
            ? "In Stock"
            : template.stock > 0
            ? `Only ${template.stock} left`
            : "Out of Stock"}
        </div>
      </div>
    </div>
  );
};

export default CustomProductInfoHeader;
