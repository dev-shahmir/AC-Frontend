import { useState } from "react";
import { StarRating } from "../StarRating";
import CustomProductReviewModal from "./CustomProductReviewModal";

const CustomProductReviewsSection = ({
  reviews,
  allReviews,
  averageRating,
  reviewsLoading,
  showReviewModal,
  reviewForm,
  submitingReview,
  onOpenReviewModal,
  onCloseReviewModal,
  onSubmitReview,
  onReviewFormChange,
}) => {
  const [expandedReviews, setExpandedReviews] = useState({});

  const generateAvatar = (name) => {
    if (!name || typeof name !== "string") {
      return (
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg">
          ?
        </div>
      );
    }

    const initial = name.charAt(0).toUpperCase();
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
    ];
    const colorIndex = name.charCodeAt(0) % colors.length;

    return (
      <div
        className={`w-10 h-10 sm:w-12 sm:h-12 ${colors[colorIndex]} orbitron rounded-full flex items-center justify-center text-secondary font-bold text-sm sm:text-lg`}
      >
        {initial}
      </div>
    );
  };

  return (
    <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 px-2 sm:px-0">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-0">
        <div className="w-full sm:w-auto min-w-0">
          <h2 className="text-xl sm:text-2xl lg:text-3xl poppins-bold text-primary mb-2">
            Customer Reviews
          </h2>
          {allReviews.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center">
                <StarRating rating={Math.round(averageRating)} />
              </div>
              <span className="text-sm sm:text-lg poppins-semibold text-primary">
                {averageRating}
              </span>
              <span className="text-xs sm:text-base text-primary poppins-regular break-words">
                ({allReviews.length} total review
                {allReviews.length !== 1 ? "s" : ""})
                {reviews.length !== allReviews.length && (
                  <span className="ml-1 block sm:inline">
                    - Showing {reviews.length} random reviews
                  </span>
                )}
              </span>
            </div>
          )}
        </div>
        <button
          onClick={onOpenReviewModal}
          className="bg-[#ffefcc] cursor-pointer border border-primary poppins-medium text-[#80011f] px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-[#80011f] hover:text-[#ffefcc] transition-colors text-sm sm:text-base w-full sm:w-auto whitespace-nowrap flex-shrink-0"
        >
          Add Review
        </button>
      </div>

      {reviewsLoading ? (
        <div className="space-y-4 sm:space-y-6">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-primary p-4 sm:p-6 rounded-lg"
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-3">
                <div className="bg-primary h-10 w-10 sm:h-12 sm:w-12 rounded-full flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <div className="bg-primary h-3 sm:h-4 w-20 sm:w-24 rounded mb-2"></div>
                  <div className="bg-primary h-3 sm:h-4 w-16 sm:w-20 rounded"></div>
                </div>
              </div>
              <div className="bg-primary h-3 sm:h-4 w-full rounded mb-2"></div>
              <div className="bg-primary h-3 sm:h-4 w-2/3 rounded"></div>
            </div>
          ))}
        </div>
      ) : reviews.length > 0 ? (
        <div className="space-y-4 sm:space-y-6">
          {reviews.map((review, index) => (
            <div
              key={review._id || `review-${index}`}
              className="bg-accent p-4 sm:p-6 rounded-lg overflow-hidden"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0">
                  {generateAvatar(review.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2 sm:gap-0">
                    <div className="min-w-0 flex-1">
                      <h4 className="poppins-semibold uppercase text-primary mb-1 text-sm sm:text-base truncate">
                        {review.name}
                      </h4>
                      <div className="flex items-center gap-2 flex-wrap">
                        <StarRating rating={review.rating} />
                        <span className="text-xs sm:text-sm poppins-regular text-primary whitespace-nowrap">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ✅ Comment with See more / Show less - Fixed overflow */}
                  <div className="break-words">
                    <p className="text-primary poppins-regular leading-relaxed text-sm sm:text-base break-words overflow-wrap-anywhere">
                      {review.comment && review.comment.length > 150 ? (
                        <>
                          <span className="break-words">
                            {expandedReviews[review._id]
                              ? review.comment
                              : `${review.comment.substring(0, 140)}...`}
                          </span>
                          <button
                            onClick={() =>
                              setExpandedReviews((prev) => ({
                                ...prev,
                                [review._id]: !prev[review._id],
                              }))
                            }
                            className="text-primary ml-1 cursor-pointer poppins-medium underline hover:no-underline whitespace-nowrap"
                          >
                            {expandedReviews[review._id]
                              ? "Show less"
                              : "See more"}
                          </button>
                        </>
                      ) : (
                        <span className="break-words">
                          {review.comment || "No comment"}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 sm:py-12 bg-secondary rounded-lg">
          <div className="text-4xl sm:text-6xl mb-4">💬</div>
          <h3 className="text-lg sm:text-xl poppins-semibold text-primary mb-2">
            No Reviews Yet
          </h3>
          <p className="text-sm sm:text-base poppins-regular text-primary mb-4 sm:mb-6 px-4">
            Be the first to share your thoughts about this product.
          </p>
          <button
            onClick={onOpenReviewModal}
            className="bg-[#ffefcc] cursor-pointer border border-primary poppins-medium text-[#80011f] px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-[#80011f] hover:text-[#ffefcc] transition-colors text-sm sm:text-base w-full sm:w-auto max-w-xs mx-auto whitespace-nowrap"
          >
            Write a Review
          </button>
        </div>
      )}

      {/* ✅ Review Modal */}
      <CustomProductReviewModal
        show={showReviewModal}
        reviewForm={reviewForm}
        submitingReview={submitingReview}
        onClose={onCloseReviewModal}
        onSubmit={onSubmitReview}
        onFormChange={onReviewFormChange}
      />
    </div>
  );
};

export default CustomProductReviewsSection;
