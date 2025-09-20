import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../utils/axios";

export default function NewProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchNewProducts = async () => {
    try {
      const response = await instance.get(
        "/products/newly-added-products?limit=8"
      );
      setProducts(response.data.slice(0, 8));
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewProducts();
    const interval = setInterval(fetchNewProducts, 1 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#ffefcc]  py-4 md:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 md:mb-10">
          <div className="animate-fade-in">
            <h2 className="text-3xl orbitron md:text-5xl lg:text-6xl font-bold text-[#80011f] mb-2">
              Latest Products
            </h2>
            <p className="text-[#80011f] poppins-regular text-lg pt-2 max-w-2xl mx-auto">
              Fresh arrivals from our newest collections, crafted to bring
              style, elegance, and creativity into your space.
            </p>
          </div>
        </div>

        {/* Products Grid - Fixed responsive classes */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-[#80011f] aspect-square rounded-2xl mb-2 md:mb-4"></div>
                  <div className="space-y-1 md:space-y-2">
                    <div className="h-3 md:h-4 bg-[#80011f] rounded w-3/4"></div>
                    <div className="h-3 md:h-4 bg-[#80011f] rounded w-1/2"></div>
                    <div className="h-4 md:h-6 bg-[#80011f] rounded w-2/3"></div>
                  </div>
                </div>
              ))
            : products.map((product, index) => {
                const firstSize =
                  product.sizes && product.sizes.length > 0
                    ? product.sizes[0]
                    : null;
                const hasDiscount = firstSize && firstSize.discountedPrice;

                return (
                  <div
                    key={product._id}
                    className="group cursor-pointer"
                    onClick={() => navigate(`/product/${product._id}`)}
                    style={{ animationDelay: `${index * 1000}ms` }}
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
                        <div className="absolute  bottom-1 left-1 right-1 md:bottom-4 md:left-4 md:right-4 hidden md:block">
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
                              <span className="text-xs md:text-sm">
                                 View Product
                              </span>
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
                            {product.subCategory
                              ? `› ${product.subCategory}`
                              : ""}
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
                                        Rs.{" "}
                                        {firstSize.discountedPrice.toLocaleString()}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1 md:gap-2 flex-wrap">
                                      <span className="text-sm max-sm:text-xs text-[#88011f] line-through">
                                        Rs.{" "}
                                        {firstSize.actualPrice.toLocaleString()}
                                      </span>
                                      <span className="text-xs text-primary font-semibold border-[#80011f] border px-1 max-sm:hidden rounded">
                                        Save Rs.{" "}
                                        {(
                                          firstSize.actualPrice -
                                          firstSize.discountedPrice
                                        ).toLocaleString()}
                                      </span>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div>
                                      <span className="text-2xl font-bold max-sm:text-sm text-[#80011f] py-0.5">
                                        Rs.{" "}
                                        {firstSize.actualPrice.toLocaleString()}
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
              })}
        </div>

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div className="text-center py-12">
            <div className="text-[#80011f]/60 mb-4">
              <svg
                className="w-16 h-16 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 5l7 7-7 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#80011f] mb-2">
              No Products Available
            </h3>
            <p className="text-[#80011f]/70">
              Check back later for new arrivals!
            </p>
          </div>
        )}

        {/* Show More Button */}
        {!loading && products.length > 0 && (
          <div className="text-center mt-12 md:mt-16">
            <button
              onClick={() => navigate("/products")}
              className="btn-md btn items-center poppins-regular gap-2 bg-transparent border text-[#80011f] border-[#80011f] textprimary cursor-pointer rounded-xl font-semibold text-lg px-6 py-3 inline-flex transition-all duration-300 hover:bg-[#80011f] hover:text-[#ffefcc] hover:shadow-lg hover:scale-105"
            >
              View Products
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
