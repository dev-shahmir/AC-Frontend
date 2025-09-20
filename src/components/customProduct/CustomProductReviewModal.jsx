import { MdClose } from "react-icons/md";


const CustomProductReviewModal = ({
  show,
  reviewForm,
  submitingReview,
  onClose,
  onSubmit,
  onFormChange,
}) => {

  if (!show) return null;

  const handleFormChange = (field, value) => {
    onFormChange(field, value); // ← Fixed: Direct call instead of object spread
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('Form submit:', reviewForm); // Debug
    onSubmit(e);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-secondary rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl poppins-bold text-primary">
              Add Review
            </h3>
            <button 
              onClick={() => {
                onClose();
              }} 
            >
              <MdClose className="w-5 cursor-pointer text-primary h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm poppins-medium text-primary mb-2">
                Name <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                value={reviewForm.name}
                onChange={(e) => handleFormChange("name", e.target.value)}
                className="w-full p-2 sm:p-3 border border-primary poppins-regular rounded-lg focus:ring-2 focus:ring-[#80011f] focus:outline-none text-sm sm:text-base"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="block text-sm poppins-medium text-primary mb-2">
                Rating <span className="text-primary">*</span>
              </label>
              <div className="flex items-center gap-2">
                {/* Manual star rating since StarRating might not have interactive prop */}
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleFormChange("rating", star)}
                      className="focus:outline-none"
                    >
                      <svg
                        className={`w-6 h-6 sm:w-8 cursor-pointer sm:h-8 transition-colors ${
                          star <= reviewForm.rating
                            ? "text-primary"
                            : "text-accent"
                        } hover:text-[#80011f]`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                </div>
                <span className="ml-2 text-sm text-primary poppins-regular">
                  {reviewForm.rating} star{reviewForm.rating !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm poppins-medium text-primary mb-2">
                Comment <span className="text-primary">*</span>
              </label>
              <textarea
                value={reviewForm.comment}
                onChange={(e) => handleFormChange("comment", e.target.value)}
                rows={4}
                className="w-full p-2 sm:p-3 border border-primary text-primary poppins-regular rounded-lg  resize-none text-sm sm:text-base focus:ring-2 focus:ring-[#80011f] focus:outline-none"
                placeholder="Share your experience with this product..."
                required
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
               className="flex-1 py-2 sm:py-3 px-3 sm:px-4 bg-[#ffefcc] text-[#80011f] border border-[#80011f] rounded-lg hover:bg-[#80011f] hover:text-[#ffefcc] poppins-medium cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitingReview}
                className="flex-1 py-2 sm:py-3 px-3 sm:px-4 bg-[#ffefcc] text-[#80011f] border border-[#80011f] rounded-lg hover:bg-[#80011f] hover:text-[#ffefcc] poppins-medium cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {submitingReview ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export default CustomProductReviewModal;