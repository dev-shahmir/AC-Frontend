import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../utils/axios";

// Custom Dropdown Component
const CustomDropdown = ({
  options = [],
  value,
  onChange,
  placeholder = "Select option...",
  className = "",
  optionClassName = "",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`
          w-full border border-primary cursor-pointer rounded-md px-3 py-2 text-sm text-left 
          focus:outline-none focus:ring-2 placeholder:text-[#80011f] focus:ring-[#80011f] bg-transparent
          flex items-center justify-between
          ${
            disabled
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:border-[#80011f]"
          }
          ${isOpen ? "ring-2 ring-[#80011f]" : ""}
        `}
      >
        <span className={selectedOption ? "text-[#80011f]" : "text-[#80011f] "}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-accent border border-primary rounded-md shadow-lg max-h-60 overflow-y-auto poppins-regular">
          {options.length === 0 ? (
            <div className="px-3 py-2 text-sm text-primary">
              No options available
            </div>
          ) : (
            options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`
                  w-full px-3 py-2 text-sm text-left hover:bg-[#ffefcc] 
                  ${
                    value === option.value
                      ? "poppins-medium font-medium"
                      : "text-[#80011f]"
                  }
                  ${optionClassName}
                `}
              >
                {option.label}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default function TemplatePage() {
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allProductsLoaded, setAllProductsLoaded] = useState(false);
  const productsPerPage = 9;
  const navigate = useNavigate();

  // Fetch all products for filtering (done once)
  const fetchAllProducts = async () => {
    if (allProductsLoaded) return;

    try {
      setLoading(true);
      const response = await instance.get(
        `/custom-products/custom-product-templates?limit=10000`
      );
      const updatedProducts = response.data.products.map((product) => ({
        ...product,
        isNew:
          new Date(product.createdAt) >=
          new Date(new Date().setMonth(new Date().getMonth() - 1)),
      }));

      setAllProducts(updatedProducts);
      setAllProductsLoaded(true);

      // Extract unique categories
      const uniqueCategories = [
        ...new Set(updatedProducts.map((p) => p.category)),
      ];
      setCategories(uniqueCategories);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching all products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update subcategories when category changes
  useEffect(() => {
    if (selectedCategory && allProducts.length > 0) {
      const categoryProducts = allProducts.filter(
        (p) => p.category === selectedCategory
      );
      const uniqueSubCategories = [
        ...new Set(categoryProducts.map((p) => p.subCategory).filter(Boolean)),
      ];
      setSubCategories(uniqueSubCategories);
      setSelectedSubCategory(""); // Reset subcategory when category changes
    } else {
      setSubCategories([]);
      setSelectedSubCategory("");
    }
  }, [selectedCategory, allProducts]);

  // States
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");

  // Debounced update for price range
  const handleMinChange = (e) => {
    const value = e.target.value;
    // allow only empty or digits
    if (value === "" || /^\d+$/.test(value)) {
      setMinPriceInput(value);
      setPriceRange([Number(value) || 0, priceRange[1]]);
    }
  };

  const handleMaxChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setMaxPriceInput(value);
      setPriceRange([priceRange[0], Number(value) || 0]);
    }
  };

  // Input handlers

  // Filter products based on all criteria
  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    const matchesSubCategory =
      !selectedSubCategory || product.subCategory === selectedSubCategory;

    // Price filtering based on first size
    const firstSize =
      product.sizes && product.sizes.length > 0 ? product.sizes[0] : null;
    const productPrice = firstSize
      ? firstSize.discountedPrice || firstSize.actualPrice
      : 0;
    const matchesPrice =
      productPrice >= priceRange[0] && productPrice <= priceRange[1];

    return (
      matchesSearch && matchesCategory && matchesSubCategory && matchesPrice
    );
  });

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, priceRange, selectedCategory, selectedSubCategory]);

  // Pagination Logic for filtered products
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedSubCategory("");
    setPriceRange([0, 100000]);
    setSearchTerm("");
    setCurrentPage(1);
  };

  // Create options arrays for custom dropdowns
  const categoryOptions = [
    { value: "", label: "Filter By Product Type" },
    ...categories.map((cat) => ({ value: cat, label: cat })),
  ];

  const subCategoryOptions = [
    { value: "", label: "Filter By Categories" },
    ...subCategories.map((subCat) => ({ value: subCat, label: subCat })),
  ];

  const FilterSection = () => (
    <div className="p-4 lg:p-6 bg-[#ffdf9e] h-full">
      <div className="flex items-center justify-between mb-6 poppins-medium">
        <h2 className="text-lg font-semibold text-[#80011f]">Filters</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-[#80011f] font-medium"
        >
          Clear All
        </button>
      </div>

      {/* Price Range Filter */}
      <div className="mb-8">
        <h3 className="text-md font-medium text-primary poppins-regular mb-4">
          Price Range
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Min"
              value={minPriceInput}
              onChange={handleMinChange}
              className="border bg-transparent border-primary rounded-md px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#80011f]"
            />

            <span className="text-primary">to</span>
            <input
              type="text"
              placeholder="Max"
              value={maxPriceInput}
              onChange={handleMaxChange}
              className="border bg-transparent border-primary rounded-md px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#80011f]"
            />
          </div>
          <div className="text-sm text-primary">
            Rs. {priceRange[0].toLocaleString()} - Rs.{" "}
            {priceRange[1].toLocaleString()}
          </div>
        </div>
      </div>

      {/* Category Filter - Custom Dropdown */}
      <div className="mb-8">
        <h3 className="text-md font-medium poppins-regular text-[#80011f] mb-4">
          Product Type
        </h3>
        <CustomDropdown
          options={categoryOptions}
          value={selectedCategory}
          onChange={setSelectedCategory}
          placeholder="Filter By Product Type"
          className="w-full"
        />
      </div>

      {/* SubCategory Filter - Custom Dropdown */}
      {selectedCategory && subCategories.length > 0 && (
        <div className="mb-8">
          <h3 className="text-md font-medium poppins-regular text-[#80011f] mb-4">
            Category
          </h3>
          <CustomDropdown
            options={subCategoryOptions}
            value={selectedSubCategory}
            onChange={setSelectedSubCategory}
            placeholder="Filter By Categories"
            className="w-full"
          />
        </div>
      )}

      {/* Filter Summary */}
      <div className="border-t border-primary pt-4">
        <div className="text-sm text-primary text-center poppins-regular">
          Showing {paginatedProducts.length} of {filteredProducts.length}{" "}
          products
          {filteredProducts.length !== allProducts.length &&
            ` (${allProducts.length} total)`}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#ffefcc] min-h-screen">
      {/* Header */}
      <div className="bg-[#ffdf9e]">
        <div className="px-4 md:px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 max-w-7xl mx-auto">
            <h1 className="text-2xl poppins-medium md:text-2xl font-bold text-[#80011f]">
              Explore Our Collection
            </h1>
            <div className="flex-1 max-w-md md:ml-8">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border bg-transparent border-[#80011f] placeholder:text-[#80011f] rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#80011f] focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden  border-b border-[#80011f] px-4 py-3">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center gap-2 text-[#80011f] font-medium"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
            />
          </svg>
          Filters(
          {Object.values({ selectedCategory, selectedSubCategory }).filter(
            Boolean
          ).length + (priceRange[0] > 0 || priceRange[1] < 100000 ? 1 : 0)}
          )
        </button>
      </div>

      {/* Mobile Filters Overlay */}
      {showMobileFilters && (
        <div className="lg:hidden fixed inset-0 bg-transparent bg-opacity-50 z-50">
          <div className="fixed right-0 top-0 bottom-0 w-80 max-w-[90vw] bg-accent shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="text-primary"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto h-full pb-20">
              <FilterSection />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-accent border-t">
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full bg-primary text-secondary border-primary border py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row">
        {/* Desktop Left Sidebar - Filters */}
        <div className="hidden lg:block w-80 bg-gray-100 shadow-lg border-r border-gray-200">
          <FilterSection />
        </div>

        {/* Right Side - Products Grid */}
        <div className="flex-1">
          <div className="p-2 md:p-4">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[...Array(9)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-[#80011f] h-48 sm:h-64 rounded-lg mb-3"></div>
                    <div className="bg-[#80011f] h-4 w-3/4 rounded mb-2"></div>
                    <div className="bg-[#80011f] h-4 w-1/2 rounded"></div>
                  </div>
                ))}
              </div>
            ) : paginatedProducts.length === 0 ? (
              <div className="text-center pt-36">
                <div className="text-[#80011f] text-lg">No products found</div>
                <p className="text-[#80011f] mt-2">
                  Try adjusting your filters or search terms
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
                {paginatedProducts.map((product, index) => {
                  const firstSize =
                    product.sizes && product.sizes.length > 0
                      ? product.sizes[0]
                      : null;
                  const hasDiscount = firstSize && firstSize.discountedPrice;

                  return (
                    <div
                      key={product._id}
                      className="group cursor-pointer"
                      onClick={() => navigate(`/customize-product/${product._id}`)}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="relative rounded-2xl overflow-hidden transition-all duration-500 transform hover:-translate-y-1 border border-[#ffefcc]">
                        {/* Image Container */}
                        <div className="relative aspect-square overflow-hidden">
                          <img
                            src={product.templateImages[0].url}
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
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg border cursor-pointer transition-all ${
                    currentPage === 1
                      ? "bg-[#80011f26] text-[#80011f] border-[#80011f] cursor-not-allowed"
                      : "bg-[#80011f] text-[#ffdf9e]"
                  }`}
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .slice(
                    Math.max(0, currentPage - 2),
                    Math.min(totalPages, currentPage + 2)
                  )
                  .map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-lg cursor-pointer border transition-all font-bold ${
                        currentPage === page
                          ? "bg-[#80011f] text-[#ffdf9e] "
                          : "bg-tranparent text-[#80011f] border-[#80011f]"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg cursor-pointer border transition-all ${
                    currentPage === totalPages
                      ? "bg-[#80011f26] text-[#80011f] border-[#80011f] cursor-not-allowed"
                      : "bg-[#80011f] text-[#ffdf9e]"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
