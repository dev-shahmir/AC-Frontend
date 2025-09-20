import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdCheckCircle, MdWarning } from "react-icons/md";
import { CheckCircle, FileWarning, Ruler, Upload } from "lucide-react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import instance from "../utils/axios";
import LoadingSkeleton from "../components/LoadingSkeleton";
import SizeSelector from "../components/SizeSelector";
import CustomFields from "../components/customProduct/CustomFields";
import SizeChartModal from "../components/SizeChartModel";
import CustomProductDescription from "../components/customProduct/CustomProductDescription";
import CustomProductReviewsSection from "../components/customProduct/CustomProductReviewsSection";
import CustomRelatedProducts from "../components/customProduct/CustomRelatedProducts";
import CustomProductActionButtons from "../components/customProduct/CustomProductActionButtons";
import CustomProductQuantitySelector from "../components/customProduct/CustomProductQuantitySelector";
import CustomProductDropdownSelector from "../components/customProduct/CustomProductDropdownSelector";
import CustomProductInfoHeader from "../components/customProduct/CustomProductInfoHeader";
import CustomProductImageGallery from "../components/customProduct/CustomProductImageGallery";
import { useCart } from "../context/CartContext";

const TemplateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Product states
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingRelated, setLoadingRelated] = useState(true);

  // Selection states
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [customFields, setCustomFields] = useState({});

  // Image upload states
  const [uploadProgress, setUploadProgress] = useState({});
  const [isUploading, setIsUploading] = useState({});

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
  const [customFieldDropdowns, setCustomFieldDropdowns] = useState({});

  // Size Chart Modal state
  const [showSizeChart, setShowSizeChart] = useState(false);

  // Cloudinary config
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const API_URL = import.meta.env.VITE_CLOUDINARY_API_URL;

  // Custom field validation
  const validateCustomFields = () => {
    if (!template?.fields || template.fields.length === 0) {
      return { isValid: true, missingFields: [] };
    }

    const missingFields = [];
    template.fields.forEach((field) => {
      if (field.required) {
        const fieldValue = customFields[field.fieldName];
        if (!fieldValue || fieldValue.toString().trim() === "") {
          missingFields.push(field.fieldName);
        }
      }
    });

    return {
      isValid: missingFields.length === 0,
      missingFields,
    };
  };

  // Enhanced image upload with progress tracking
  const uploadImageToCloudinary = async (file, fieldName) => {
    try {
      if (!file || !(file instanceof File)) {
        throw new toast.warning("Invalid file provided", {
          icon: <FileWarning className="text-[#ffefcc]" />,
          hideProgressBar: true,
          closeButton: false,
          autoClose: 1000,
          style: {
            background: "#80011f",
            color: "#ffefcc",
          },
        });
      }

      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new toast.warning("File size too large. Max 10MB allowed.", {
          icon: <FileWarning className="text-[#ffefcc]" />,
          hideProgressBar: true,
          closeButton: false,
          autoClose: 1000,
          style: {
            background: "#80011f",
            color: "#ffefcc",
          },
        });
      }

      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        throw new toast.warning(
          "Invalid file type. Only these (jpg, jpeg, png, gif, webp) images format are allowed.",
          {
            icon: <FileWarning className="text-[#ffefcc]" />,
            hideProgressBar: true,
            closeButton: false,
            autoClose: 1000,
            style: {
              background: "#80011f",
              color: "#ffefcc",
            },
          }
        );
      }

      // Set uploading state
      setIsUploading((prev) => ({ ...prev, [fieldName]: true }));
      setUploadProgress((prev) => ({ ...prev, [fieldName]: 0 }));

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("cloud_name", CLOUD_NAME);

      // Create XMLHttpRequest for progress tracking
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        // Track upload progress
        xhr.upload.addEventListener("progress", (e) => {
          if (e.lengthComputable) {
            const percentComplete = Math.round((e.loaded / e.total) * 100);
            setUploadProgress((prev) => ({
              ...prev,
              [fieldName]: percentComplete,
            }));
          }
        });

        xhr.addEventListener("load", () => {
          setIsUploading((prev) => ({ ...prev, [fieldName]: false }));

          if (xhr.status === 200) {
            try {
              const data = JSON.parse(xhr.responseText);
              if (data.error) {
                reject(new Error(data.error.message || "Upload failed"));
              } else {
                resolve(data.secure_url);
              }
            } catch (parseError) {
              reject(new Error(parseError, "Failed to parse response"));
            }
          } else {
            reject(new Error(`Upload failed: ${xhr.status} ${xhr.statusText}`));
          }
        });

        xhr.addEventListener("error", () => {
          setIsUploading((prev) => ({ ...prev, [fieldName]: false }));
          reject(new Error("Network error during upload"));
        });

        xhr.open("POST", API_URL);
        xhr.send(formData);
      });
    } catch (error) {
      setIsUploading((prev) => ({ ...prev, [fieldName]: false }));
      console.error("Cloudinary upload error:", error);
      throw error;
    }
  };

  // Enhanced field change handler with automatic image upload
  const handleCustomFieldChange = async (fieldName, value) => {
    // Find the field type from template fields
    const field = template?.fields?.find((f) => f.fieldName === fieldName);

    if (field && field.fieldType === "image" && value instanceof File) {
      try {
        // Show uploading toast
        const uploadingToast = toast.loading(
          "Please wait for all images to finish uploading",
          {
            icon: <Upload className="text-[#ffefcc]" />,
            hideProgressBar: true,
            closeButton: false,
            autoClose: 1000,
            style: {
              background: "#80011f",
              color: "#ffefcc",
            },
          }
        );

        // Upload to Cloudinary with progress tracking
        const imageUrl = await uploadImageToCloudinary(value, fieldName);

        // Update custom fields with the URL
        setCustomFields((prev) => ({
          ...prev,
          [fieldName]: imageUrl,
        }));

        // Dismiss loading toast and show success
        toast.dismiss(uploadingToast);
        toast.success("Image uploaded successfully!", {
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
        console.error("Upload error:", error);
        toast.error(`Failed to upload ${fieldName}: ${error.message}`);

        // Reset upload state on error
        setIsUploading((prev) => ({ ...prev, [fieldName]: false }));
        setUploadProgress((prev) => ({ ...prev, [fieldName]: 0 }));
      }
    } else {
      // For non-image fields, just update the value
      setCustomFields((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
    }
  };

  const handleFrameSelect = (option) => {
    setSelectedFrame(option);
    setFrameDropdownOpen(false);
  };

  const handleCustomFieldDropdownSelect = (fieldName, option) => {
    handleCustomFieldChange(fieldName, option);
    setCustomFieldDropdowns((prev) => ({ ...prev, [fieldName]: false }));
  };

  const toggleCustomFieldDropdown = (fieldName) => {
    setCustomFieldDropdowns((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
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
      const validation = validateCustomFields();

      if (!validation.isValid) {
        toast.warning(
          `Please fill in the following required fields: ${validation.missingFields.join(
            ", "
          )}`
        );
        return;
      }

      // Check if any images are still uploading
      const stillUploading = Object.values(isUploading).some(
        (uploading) => uploading
      );
      if (stillUploading) {
        toast.success("Please wait image is uploading", {
          icon: <MdWarning className="text-[#ffefcc]" />,
          hideProgressBar: true,
          closeButton: false,
          autoClose: 1000,
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
        price: selectedSize?.discountedPrice || selectedSize?.actualPrice,
        image: template.templateImages?.[0].url,
        customFields: customFields, // Already contains URLs
      };

      // console.log("customFields", customFields);
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
        error.message || "Failed to add product to cart. Please try again."
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
      cartId: uuidv4(), // 👈 unique per cart entry
      id: template._id, // backend product id
      name: template.name,
      size: selectedSize?.size,
      frame: selectedFrame,
      quantity: quantity || 1,
      price: selectedSize?.discountedPrice || selectedSize?.actualPrice,
      image: template.templateImages?.[0].url,
      customFields: customFields, // Already contains URLs
    };
    navigate("/checkout", { state: { items: [productData] } });
  };

  // API calls
  const fetchTemplateDetails = useCallback(async () => {
    try {
      const response = await instance.get(
        `/custom-products/single-product-template/${id}`
      );
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

      if (response.data.fields && response.data.fields.length > 0) {
        const initialFields = {};
        const initialDropdownStates = {};

        response.data.fields.forEach((field) => {
          initialDropdownStates[field.fieldName] = false;

          if (
            field.fieldType === "dropdown" &&
            field.options &&
            field.options.length > 0
          ) {
            initialFields[field.fieldName] = field.required
              ? ""
              : field.options[0];
          } else {
            initialFields[field.fieldName] = field.defaultValue || "";
          }
        });
        setCustomFields(initialFields);
        setCustomFieldDropdowns(initialDropdownStates);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchRelatedProducts = useCallback(async () => {
    if (!template?.category) return;
    try {
      setLoadingRelated(true);
      const response = await instance.get(
        `/custom-products/custom-related-product/${id}`
      );

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
        `/custom-products/single-product-template/${id}/reviews`
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
      alert("Please fill in all required fields");
      return;
    }

    try {
      setSubmitingReview(true);

      const response = await instance.post(
        `/custom-products/single-product-template/${id}/reviews`,
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
      alert("Error submitting review. Please try again.");
    } finally {
      setSubmitingReview(false);
    }
  };

  // Close dropdowns when clicking outside
  const handleClickOutside = (event) => {
    if (!event.target.closest(".dropdown-container")) {
      setFrameDropdownOpen(false);
      setCustomFieldDropdowns((prev) => {
        const newState = {};
        Object.keys(prev).forEach((key) => {
          newState[key] = false;
        });
        return newState;
      });
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
    fetchTemplateDetails();
  }, [fetchTemplateDetails]);

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

  const validation = validateCustomFields();
  const canProceed =
    validation.isValid &&
    template?.stock > 0 &&
    !Object.values(isUploading).some((uploading) => uploading);

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
            Back to Customize Products
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
              onClick={() => navigate("/customize-products")}
              className="hover:text-[#80011f] flex-shrink-0 cursor-pointer "
            >
              All-Customize-Products
            </button>
            <span className="mx-2 flex-shrink-0">/</span>
            <span className="text-[#991937] truncate">{template.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
          {/* Product Images */}
          <CustomProductImageGallery
            images={template.templateImages.map((img) => img.url)} // ✅ map through objects
            productName={template.name}
          />

          {/* Product Info */}
          <div className="space-y-4 sm:space-y-6 pt-4 sm:pt-8 px-2 sm:px-0">
            <CustomProductInfoHeader
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
            {template.hasFrame && (
              <CustomProductDropdownSelector
                label="Frame Color"
                placeholder="Select Frame Color"
                options={template.frameColors}
                selectedValue={selectedFrame}
                isOpen={frameDropdownOpen}
                onToggle={() => setFrameDropdownOpen(!frameDropdownOpen)}
                onSelect={handleFrameSelect}
              />
            )}

            {/* Custom Fields with Upload Progress */}
            <CustomFields
              fields={template.fields}
              customFields={customFields}
              customFieldDropdowns={customFieldDropdowns}
              onFieldChange={handleCustomFieldChange}
              onToggleDropdown={toggleCustomFieldDropdown}
              onDropdownSelect={handleCustomFieldDropdownSelect}
              validation={validation}
              uploadProgress={uploadProgress}
              isUploading={isUploading}
            />

            {/* Quantity */}
            <CustomProductQuantitySelector
              quantity={quantity}
              maxStock={template.stock}
              onQuantityChange={setQuantity}
            />

            {/* Action Buttons */}
            <CustomProductActionButtons
              canProceed={canProceed}
              stock={template.stock}
              validationIsValid={validation.isValid}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />
          </div>
        </div>

        {/* Product Description */}
        <CustomProductDescription description={template.description} />

        {/* Reviews Section */}
        <CustomProductReviewsSection
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
        <CustomRelatedProducts
          products={relatedProducts}
          loading={loadingRelated}
        />
      </div>
    </div>
  );
};

export default TemplateDetail;
