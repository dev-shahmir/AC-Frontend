import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdCheckCircle, MdWarning } from "react-icons/md";
import { CheckCircle, Ruler } from "lucide-react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import instance from "../utils/axios";
import LoadingSkeleton from "../components/LoadingSkeleton";
import SizeSelector from "../components/SizeSelector";
import SizeChartModal from "../components/SizeChartModel";
import ImageGallery from "../components/product/ImageGallery";
import RelatedProducts from "../components/product/RelatedProducts";
import ReviewsSection from "../components/product/ReviewsSection";
import Description from "../components/product/Description";
import ActionButtons from "../components/product/ActionButtons";
import QuantitySelector from "../components/product/QuantitySelector";
import DropdownSelector from "../components/product/DropdownSelector";
import InfoHeader from "../components/product/InfoHeader";
import { useCart } from "../context/CartContext"; // ✅ Import useCart

const ProductDetail = () => {
  // ✅ Remove addToCart prop
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart(); // ✅ Get addToCart from context

  // Product states
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingRelated, setLoadingRelated] = useState(true);

  // Selection states
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Related products
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Reviews states
  const [reviews, setReviews] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    rating: 5,
    comment: "",
  });
  const [submitingReview, setSubmitingReview] = useState(false);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  // Dropdown states
  const [frameDropdownOpen, setFrameDropdownOpen] = useState(false);

  // Size Chart Modal state
  const [showSizeChart, setShowSizeChart] = useState(false);

  const handleFrameSelect = (option) => {
    setSelectedFrame(option);
    setFrameDropdownOpen(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: template.name,
        text: `Check out this amazing product: ${template.name}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Product link copied to Clipboard!", {
        icon: <CheckCircle className="text-[#ffefcc]" />,
        hideProgressBar: true,
        closeButton: false,
        style: {
          background: "#80011f",
          color: "#ffefcc",
        },
      });
    }
  };

  const handleAddToCart = async () => {
    try {
      // ✅ Validation: Check if size is selected for products with sizes
      if (template.sizes && template.sizes.length > 0 && !selectedSize) {
        toast.error("Please select a size", {
          icon: <MdWarning className="text-[#ffefcc]" />,
          hideProgressBar: true,
          closeButton: false,
          autoClose: 2000,
          style: {
            background: "#80011f",
            color: "#ffefcc",
          },
        });
        return;
      }

      // ✅ Validation: Check if frame is selected for products with frames
      if (
        template.hasFrame &&
        template.frameColors &&
        template.frameColors.length > 0 &&
        !selectedFrame
      ) {
        toast.error("Please select a frame color", {
          icon: <MdWarning className="text-[#ffefcc]" />,
          hideProgressBar: true,
          closeButton: false,
          autoClose: 2000,
          style: {
            background: "#80011f",
            color: "#ffefcc",
          },
        });
        return;
      }

      // ✅ Create unique cart item with cartId
      const cartItem = {
        cartId: uuidv4(), // 👈 unique per cart entry
        id: template._id, // backend product id
        name: template.name,
        size: selectedSize?.size,
        frame: selectedFrame,
        quantity: quantity || 1,
        price:
          selectedSize?.discountedPrice ||
          selectedSize?.actualPrice ||
          template.price,
        image: template.productImages?.[0].url,
      };

      // ✅ Use context addToCart function
      addToCart(cartItem);

      toast.success("Product added to cart", {
        icon: <CheckCircle className="text-[#ffefcc]" />,
        hideProgressBar: true,
        closeButton: false,
        autoClose: 1000,
        style: {
          background: "#80011f",
          color: "#ffefcc",
        },
      });
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error(
        error.message || "Failed to add product to cart. Please try again.",
        {
          icon: <MdWarning className="text-[#ffefcc]" />,
          hideProgressBar: true,
          closeButton: false,
          autoClose: 2000,
          style: {
            background: "#80011f",
            color: "#ffefcc",
          },
        }
      );
    }
  };

  const handleBuyNow = () => {
    // ✅ Validation: Check if size is selected for products with sizes
    if (template.sizes && template.sizes.length > 0 && !selectedSize) {
      toast.error("Please select a size", {
        icon: <MdWarning className="text-[#ffefcc]" />,
        hideProgressBar: true,
        closeButton: false,
        autoClose: 2000,
        style: {
          background: "#80011f",
          color: "#ffefcc",
        },
      });
      return;
    }

    // ✅ Validation: Check if frame is selected for products with frames
    if (
      template.hasFrame &&
      template.frameColors &&
      template.frameColors.length > 0 &&
      !selectedFrame
    ) {
      toast.error("Please select a frame color", {
        icon: <MdWarning className="text-[#ffefcc]" />,
        hideProgressBar: true,
        closeButton: false,
        autoClose: 2000,
        style: {
          background: "#80011f",
          color: "#ffefcc",
        },
      });
      return;
    }

    const productData = {
      id: template._id, // Product ID from DB
      name: template.name, // Product name
      price:
        selectedSize?.discountedPrice ||
        selectedSize?.actualPrice ||
        template.price,
      quantity: quantity || 1, // Default 1
      cartId: uuidv4(), // ✅ Unique ID using uuid
      size: selectedSize?.size,
      frame: selectedFrame, // Optional
      image: template.productImages?.[0].url,
    };
    navigate("/checkout", { state: { items: [productData] } });
  };

  // API calls
  const fetchProductDetails = useCallback(async () => {
    try {
      const response = await instance.get(`/products/single-product/${id}`);
      setTemplate(response.data);

      if (response.data.sizes && response.data.sizes.length > 0) {
        setSelectedSize(response.data.sizes[0]);
      }
      if (
        response.data.hasFrame &&
        response.data.frameColors &&
        response.data.frameColors.length > 0
      ) {
        setSelectedFrame(response.data.frameColors[0]);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      toast.error("Failed to load product details", {
        icon: <MdWarning className="text-[#ffefcc]" />,
        hideProgressBar: true,
        closeButton: false,
        autoClose: 2000,
        style: {
          background: "#80011f",
          color: "#ffefcc",
        },
      });
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchRelatedProducts = useCallback(async () => {
    if (!template?.category) return;
    try {
      setLoadingRelated(true);
      const response = await instance.get(`/products/related-product/${id}`);

      const currentDate = new Date();
      const updatedProducts = response.data
        .filter((p) => p._id !== id)
        .map((p) => {
          const productDate = new Date(p.createdAt);
          p.isNew = (currentDate - productDate) / (1000 * 60 * 60 * 24) <= 30;
          return p;
        });

      setRelatedProducts(updatedProducts);
    } catch (error) {
      console.error("Error fetching related products:", error);
    } finally {
      setLoadingRelated(false);
    }
  }, [template?.category, id]);

  const fetchReviews = useCallback(async () => {
    try {
      setReviewsLoading(true);
      const response = await instance.get(
        `/products/single-product/${id}/reviews`
      );
      const allReviewsData = response.data || [];

      setAllReviews(allReviewsData);

      const shuffledReviews = [...allReviewsData].sort(
        () => Math.random() - 0.5
      );
      const randomFiveReviews = shuffledReviews.slice(0, 5);

      setReviews(randomFiveReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
      setAllReviews([]);
    } finally {
      setReviewsLoading(false);
    }
  }, [id]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewForm.name.trim() || !reviewForm.comment.trim()) {
      toast.error("Please fill in all required fields", {
        icon: <MdWarning className="text-[#ffefcc]" />,
        hideProgressBar: true,
        closeButton: false,
        autoClose: 2000,
        style: {
          background: "#80011f",
          color: "#ffefcc",
        },
      });
      return;
    }

    try {
      setSubmitingReview(true);

      const response = await instance.post(
        `/products/single-product/${id}/reviews`,
        {
          name: reviewForm.name,
          rating: reviewForm.rating,
          comment: reviewForm.comment,
        }
      );

      if (response.data) {
        const updatedAllReviews = [response.data, ...allReviews];
        setAllReviews(updatedAllReviews);

        const shuffledReviews = [...updatedAllReviews].sort(
          () => Math.random() - 0.5
        );
        setReviews(shuffledReviews.slice(0, 5));
      }

      setReviewForm({ name: "", rating: 5, comment: "" });
      setShowReviewModal(false);
      setShowSuccessModal(true);

      setTimeout(() => {
        fetchReviews();
        setShowSuccessModal(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Error submitting review. Please try again.", {
        icon: <MdWarning className="text-[#ffefcc]" />,
        hideProgressBar: true,
        closeButton: false,
        autoClose: 2000,
        style: {
          background: "#80011f",
          color: "#ffefcc",
        },
      });
    } finally {
      setSubmitingReview(false);
    }
  };

  // Close dropdowns when clicking outside
  const handleClickOutside = (event) => {
    if (!event.target.closest(".dropdown-container")) {
      setFrameDropdownOpen(false);
    }
  };

  // Effects
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  useEffect(() => {
    if (template) {
      fetchReviews();
      fetchRelatedProducts();
    }
  }, [fetchReviews, fetchRelatedProducts, template]);

  // Calculations
  const averageRating =
    allReviews.length > 0
      ? (
          allReviews.reduce((sum, review) => sum + review.rating, 0) /
          allReviews.length
        ).toFixed(1)
      : 0;

  // Loading state
  if (loading) return <LoadingSkeleton />;

  // Not found state
  if (!template) {
    return (
      <div className="min-h-[80vh] bg-[#ffefcc] flex items-center justify-center px-4">
        <div className="text-center p-4 sm:p-8">
          <div className="text-4xl sm:text-6xl mb-4">😔</div>
          <h2 className="text-xl sm:text-2xl poppins-bold text-[#80011f] mb-2">
            Product Not Found
          </h2>
          <p className="text-sm sm:text-base text-[#80011f] poppins-regular mb-6">
            The product you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <button
            onClick={() => navigate("/customize-products")}
            className="bg-[#ffefcc] border border-primary text-[#80011f] poppins-medium px-4 sm:px-6 py-2 sm:py-3 rounded-lg cursor-pointer hover:bg-[#80011f] hover:text-[#ffefcc] transition-colors"
          >
            Back to Product Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#ffefcc] min-h-screen">
      {/* Size Chart Modal */}
      <SizeChartModal
        isOpen={showSizeChart}
        onClose={() => setShowSizeChart(false)}
        category={template?.category}
      />

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-[#80011f] border border-[#ffdf9e] rounded-lg max-w-sm w-full p-6 text-center">
            <div className="mb-4">
              <MdCheckCircle className="text-[#ffefcc] text-6xl mx-auto" />
            </div>
            <h3 className="text-xl poppins-bold text-[#ffefcc] mb-2">
              Review Submitted!
            </h3>
            <p className="text-[#ffefcc] poppins-regular mb-4">
              Thank you for your feedback. Your review has been successfully
              submitted.
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="text-[#ffefcc] poppins-medium cursor-pointer px-6 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="bg-[#ffdf9e] py-2 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <nav className="flex text-xs sm:text-md text-[#991937] overflow-x-auto poppins-medium whitespace-nowrap">
            <button
              onClick={() => navigate("/")}
              className="hover:text-[#80011f] flex-shrink-0 cursor-pointer"
            >
              Home
            </button>
            <span className="mx-2 flex-shrink-0">/</span>
            <button
              onClick={() => navigate("/products")}
              className="hover:text-[#80011f] flex-shrink-0 cursor-pointer "
            >
              All-Products
            </button>
            <span className="mx-2 flex-shrink-0">/</span>
            <span className="text-[#991937] truncate">{template.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
          {/* Product Images */}
          <ImageGallery
            images={template.productImages.map((img) => img.url)} // ✅ map through objects
            productName={template.name}
          />

          {/* Product Info */}
          <div className="space-y-4 sm:space-y-6 pt-4 sm:pt-8 px-2 sm:px-0">
            <InfoHeader
              template={template}
              averageRating={averageRating}
              totalReviews={allReviews.length}
              selectedSize={selectedSize}
              onShare={handleShare}
            />

            {/* Size Selection with Size Chart Button */}
            {template.sizes &&
            template.sizes.length > 0 &&
            template.sizes.some((s) => s.size) ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg poppins-bold font-medium text-[#80011f] poppins-medium">
                    Select Size
                  </h3>
                  <button
                    onClick={() => setShowSizeChart(true)}
                    className="flex items-center cursor-pointer gap-1 text-xs poppins-regular text-[#80011f] hover:text-[#991937] transition-colors poppins-medium border border-[#80011f] px-2 py-1 rounded hover:bg-[#ffdf9e]"
                  >
                    <Ruler size={14} />
                    Size Chart
                  </button>
                </div>

                <SizeSelector
                  sizes={template.sizes}
                  selectedSize={selectedSize}
                  onSizeSelect={setSelectedSize}
                />
              </div>
            ) : (
              <div className="space-y-2">
                <h3 className="text-lg poppins-bold font-medium text-[#80011f] poppins-medium">
                  Size
                </h3>
                <span className="inline-block text-sm px-3 py-1 rounded-full border border-[#80011f] bg-[#ffdf9e] text-[#80011f] poppins-medium">
                  Standard Size
                </span>
              </div>
            )}

            {/* Frame Selection */}
            {template.hasFrame &&
              template.frameColors &&
              template.frameColors.length > 0 && (
                <DropdownSelector
                  label="Frame Color"
                  placeholder="Select Frame Color"
                  options={template.frameColors}
                  selectedValue={selectedFrame}
                  isOpen={frameDropdownOpen}
                  onToggle={() => setFrameDropdownOpen(!frameDropdownOpen)}
                  onSelect={handleFrameSelect}
                />
              )}

            {/* Quantity */}
            <QuantitySelector
              quantity={quantity}
              maxStock={template.stock}
              onQuantityChange={setQuantity}
            />

            {/* Action Buttons */}
            <ActionButtons
              stock={template.stock}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />
          </div>
        </div>

        {/* Product Description */}
        <Description description={template.description} />

        {/* Reviews Section */}
        <ReviewsSection
          reviews={reviews}
          allReviews={allReviews}
          averageRating={averageRating}
          reviewsLoading={reviewsLoading}
          showReviewModal={showReviewModal}
          reviewForm={reviewForm}
          submitingReview={submitingReview}
          onOpenReviewModal={() => setShowReviewModal(true)}
          onCloseReviewModal={() => {
            setShowReviewModal(false);
            setReviewForm({ name: "", rating: 5, comment: "" });
          }}
          onSubmitReview={handleSubmitReview}
          onReviewFormChange={(field, value) => {
            setReviewForm((prev) => ({
              ...prev,
              [field]: value,
            }));
          }}
        />

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} loading={loadingRelated} />
      </div>
    </div>
  );
};

export default ProductDetail;
