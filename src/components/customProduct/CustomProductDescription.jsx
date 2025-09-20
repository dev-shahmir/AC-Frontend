import { useState } from "react";
// import PropTypes from "prop-types";

const CustomProductDescription = ({ description }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const truncateText = (text, maxLength = 200) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength).trim() + "...";
  };

  return (
    <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 px-2 sm:px-0">
      <h2 className="text-xl sm:text-2xl lg:text-3xl poppins-bold text-primary mb-4 sm:mb-6">
        Product Description
      </h2>
      <div className="prose max-w-none">
        <p className="text-sm sm:text-base poppins-regular lg:text-lg text-primary leading-relaxed">
          {description && description.length > 200
            ? showFullDescription
              ? description
              : truncateText(description, 200)
            : description}
        </p>

        {description && description.length > 200 && (
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="mt-4 text-primary  poppins-medium transition-colors focus:outline-none text-sm sm:text-base"
          >
            {showFullDescription ? (
              <span className="flex items-center text-primary gap-1">
                Show Less
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </span>
            ) : (
              <span className="flex text-primary items-center gap-1">
                Read More
                <svg
                  className="w-4 h-4"
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
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomProductDescription;
