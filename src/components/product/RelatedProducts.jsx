import { useNavigate } from "react-router-dom";
import { MdArrowForward } from "react-icons/md";

const RelatedProducts = ({ products, loading }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="mt-12 sm:mt-16 border-t pt-8 sm:pt-12 px-2 sm:px-0">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
            Related Products
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-[#80011f] h-48 sm:h-64 rounded-lg mb-3"></div>
              <div className="bg-[#80011f] h-4 w-3/4 rounded mb-2"></div>
              <div className="bg-[#80011f] h-4 w-1/2 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const ProductCard = ({ product, index }) => {
    const firstSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : null;
    const hasDiscount = firstSize && firstSize.discountedPrice;

    return (
      <div
        key={product._id}
        className="group cursor-pointer"
        onClick={() => navigate(`/product/${product._id}`)}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="relative rounded-xl md:rounded-2xl overflow-hidden transition-all duration-500 transform hover:-translate-y-1 border border-[#ffefcc]">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden">
            <img
              src={product.productImages[0].url}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              alt={product.name}
              loading="lazy"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Badges */}
            <div className="absolute top-1 right-1 md:top-4 md:right-4 flex flex-col gap-1 md:gap-2">
              <span className="bg-primary backdrop-blur-sm text-[#ffefcc] px-1 py-0.5 md:px-3 md:py-1.5 rounded-full text-[8px] md:text-xs font-bold shadow-lg">
                NEW
              </span>
            </div>

            {/* Quick View Button - Hidden on mobile for space */}
            <div className="absolute bottom-1 left-1 right-1 md:bottom-4 md:left-4 md:right-4 hidden md:block">
              <button className="quick-view-btn poppins-medium cursor-pointer w-full bg-transparent backdrop-blur-sm text-[#ffdf9e] py-2 md:py-3 px-2 md:px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border border-[#ffefcc]">
                <span className="flex items-center justify-center gap-1 md:gap-2">
                  <svg
                    className="w-3 h-3 md:w-4 md:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <span className="text-xs md:text-sm">View Product</span>
                </span>
              </button>
            </div>
          </div>

          {/* Content - Significantly reduced on mobile */}
          <div className="p-2 h-full md:p-5 bg-[#ffdf9e]">
            {/* Category & Title - More compact on mobile */}
            <div>
              <span className="text-[10px] md:text-sm poppins-semibold text-[#80011f] font-semibold uppercase tracking-wider mb-0.5 md:mb-2 block">
                {product.category}{" "}
                {product.subCategory ? `› ${product.subCategory}` : ""}
              </span>
              <h3 className="font-bold text-[#80011f] poppins-bold text-lg max-sm:text-xs leading-tight line-clamp-2 min-h-[48px]">
                {product.name}
              </h3>
            </div>

            {/* Price - Simplified on mobile */}
            <div className="flex items-end justify-between">
              <div className="flex-1">
                {firstSize ? (
                  <div className="min-h-[40px] flex flex-col justify-between space-y-0.5 md:space-y-1">
                    {hasDiscount ? (
                      <>
                        <div className="flex items-center gap-1">
                          <span className="text-2xl max-sm:text-xs font-bold text-[#80011f]">
                            Rs. {firstSize.discountedPrice.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 md:gap-2 flex-wrap">
                          <span className="text-sm max-sm:text-xs text-[#88011f] line-through">
                            Rs. {firstSize.actualPrice.toLocaleString()}
                          </span>
                          <span className="text-xs text-primary font-semibold border-[#80011f] border px-1 max-sm:hidden rounded">
                            Save Rs.{" "}
                            {(
                              firstSize.actualPrice - firstSize.discountedPrice
                            ).toLocaleString()}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <span className="text-2xl font-bold max-sm:text-sm text-[#80011f] py-0.5">
                            Rs. {firstSize.actualPrice.toLocaleString()}
                          </span>
                        </div>
                        {/* Empty placeholder so height stays same */}
                        <div className="h-4"></div>
                      </>
                    )}
                  </div>
                ) : (
                  <span className="text-lg text-[#80011f] font-medium">
                    Contact for price
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className=" sm:mt-16 border-t border-primary py-8 sm:pt-12 px-2 sm:px-0">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl poppins-bold text-primary">
          You May Also Like
        </h2>
        <button
          onClick={() => navigate("/products")}
          className="flex items-center cursor-pointer gap-2 text-[#80011f] hover:text-[#991937] transition-colors text-sm sm:text-base poppins-medium"
        >
          View All
          <MdArrowForward className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {products.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.slice(0, 8).map((product, index) => (
              <div
                key={product._id}
                style={{ animationDelay: `${index * 100}ms` }}
                className="px-0"
              >
                <ProductCard product={product} index={index} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-8 sm:py-12 bg-transparent rounded-lg">
          <div className="text-4xl sm:text-6xl mb-4">🔍</div>
          <h3 className="text-lg sm:text-xl poppins-semibold text-primary mb-2">
            No Related Products Found
          </h3>
          <p className="text-sm sm:text-base text-primary poppins-regular">
            Check out our other amazing products in the catalog.
          </p>
        </div>
      )}
    </div>
  );
};

export default RelatedProducts;