import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { MdWarning } from "react-icons/md";

// ✅ Helper function to render product details
const renderProductDetails = (item) => {
  const details = [];

  if (item.size) details.push({ label: "Size", value: item.size });
  if (item.frame) details.push({ label: "Frame", value: item.frame });

  // ✅ Handle custom fields - Fixed for both array and object formats
  if (item.customFields) {
    // Handle object format (field_name: value)
    if (!Array.isArray(item.customFields)) {
      Object.entries(item.customFields).forEach(([fieldName, value]) => {
        if (value && value !== "") {
          // Check if value is a URL (image)
          const isImageUrl =
            typeof value === "string" &&
            (value.startsWith("http") || value.startsWith("https")) &&
            (value.includes("cloudinary") ||
              value.match(/\.(jpg|jpeg|png|gif|webp)$/i));

          let displayValue;

          if (isImageUrl) {
            displayValue = (
              <img
                src={value}
                alt={fieldName}
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-cover rounded border"
              />
            );
          } else {
            displayValue = value;
          }

          details.push({
            label: fieldName.charAt(0).toUpperCase() + fieldName.slice(1),
            value: displayValue,
            isCustom: true,
          });
        }
      });
    }
    // Handle array format (for backward compatibility)
    else if (Array.isArray(item.customFields) && item.customFields.length > 0) {
      item.customFields.forEach((field) => {
        const label = field.fieldName || "Custom";
        let value = "";

        switch (field.fieldType) {
          case "color":
            value = (
              <span className="flex items-center gap-1 sm:gap-2">
                <span
                  className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-gray-400"
                  style={{ backgroundColor: field.value || "#000" }}
                />
                <span className="text-xs sm:text-sm">{field.value}</span>
              </span>
            );
            break;
          case "image":
            value = field.value ? (
              <img
                src={field.value}
                alt={label}
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-cover rounded border"
              />
            ) : (
              "No image"
            );
            break;
          default:
            value = field.value || "N/A";
        }

        details.push({ label, value, isCustom: true });
      });
    }
  }

  return details;
};

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const total = calculateTotal();

     if (total < 500) {
      toast.error("Minimum order amount is Rs. 500",  {
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

    // ✅ Navigate to checkout with cart data (don't clear cart here)
    navigate("/checkout", { state: { items: cart } });
  };

  const handleQuantityChange = (cartId, newQuantity) => {
    if (newQuantity < 1) return;

    // ✅ Use updateQuantity from context
    updateQuantity(cartId, newQuantity);
  };

  // Check if item has custom fields
  const hasCustomFields = (item) => {
    if (!item.customFields) return false;

    if (Array.isArray(item.customFields)) {
      return item.customFields.length > 0;
    }

    // For object format, check if any value exists
    return Object.values(item.customFields).some(
      (value) => value && value !== ""
    );
  };

  // ✅ Use removeFromCart from context
  const handleRemove = (cartId) => {
    // console.log("Removing item with id:", cartId);
    removeFromCart(cartId);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="bg-accent text-primary py-4 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-20 pt-6 sm:pt-8 md:pt-10 pb-6 sm:pb-8 md:pb-10 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header - Responsive */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3">
            <ShoppingBag size={24} className="sm:w-7 sm:h-7" />
            <h2 className="text-2xl sm:text-3xl poppins-bold">Shopping Cart</h2>
          </div>
          <span className="bg-secondary px-2 sm:px-3 py-1 poppins-medium rounded-full text-xs sm:text-sm ml-8 sm:ml-0">
            {cart.length} items
          </span>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-lg sm:text-xl text-primary poppins-regular mb-4">
              Your cart is empty.
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-transparent border border-primary text-[#80011f] cursor-pointer px-6 py-3 rounded-lg hover:bg-[#80011f] hover:text-[#ffefcc] transition-all duration-200 transform poppins-medium"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {/* Cart Items */}
            <div className="space-y-3 sm:space-y-4">
              {cart.map((item) => {
                const productDetails = renderProductDetails(item);

                return (
                  <div
                    key={item.cartId} // Now using unique cart ID
                    className="bg-secondary text-primary border-primary border rounded-lg p-3 sm:p-4 md:p-6"
                  >
                    {/* Mobile Layout (< sm) */}
                    <div className="block sm:hidden space-y-3">
                      {/* Product Image & Name */}
                      <div className="flex items-start gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base poppins-semibold mb-1 line-clamp-2">
                            {item.name}
                          </h3>
                          <p className="text-sm poppins-medium text-primary">
                            Rs. {item.price.toLocaleString()}
                          </p>
                        </div>
                        {/* Remove Button - Top Right */}
                        <button
                          onClick={() => handleRemove(item.cartId)}
                          className="p-1.5 text-primary cursor-pointer hover:bg-red-900/20 rounded-lg transition-colors flex-shrink-0"
                          title={`Remove ${item.name}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {/* Product Details - Mobile */}
                      {productDetails.length > 0 && (
                        <div className="space-y-1.5">
                          {productDetails.map((detail, index) => (
                            <div
                              key={index}
                              className={`flex items-start poppins-regular uppercase gap-2 text-xs ${
                                detail.isCustom ? "bg-accent p-2 rounded" : ""
                              }`}
                            >
                              <span className="poppins-medium min-w-[50px] flex-shrink-0">
                                {detail.label}:
                              </span>
                              <div className="flex-1 break-words">
                                {detail.value}
                              </div>
                            </div>
                          ))}

                          {productDetails.length === 0 && (
                            <p className="text-xs text-primary poppins-regular">
                              Standard product - no customizations
                            </p>
                          )}
                        </div>
                      )}

                      {/* Show custom fields count if any */}
                      {productDetails.filter((d) => d.isCustom).length > 0 && (
                        <div className="text-xs text-primary poppins-medium">
                          ✨ {productDetails.filter((d) => d.isCustom).length}{" "}
                          Custom Fields
                        </div>
                      )}

                      {/* Quantity & Total - Mobile */}
                      <div className="flex items-center justify-between pt-2 border-t border-primary/20">
                        <div className="flex items-center">
                          {hasCustomFields(item) ? (
                            <div className="flex flex-col items-start">
                              <div className="flex border border-primary items-center bg-accent rounded-lg text-primary opacity-50">
                                <button
                                  disabled
                                  className="p-1.5 rounded-l-lg cursor-not-allowed"
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="px-3 py-1.5 text-xs text-center poppins-medium">
                                  {item.quantity}
                                </span>
                                <button
                                  disabled
                                  className="p-1.5 rounded-r-lg cursor-not-allowed"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                              <span className="text-xs text-primary mt-1">
                                Custom product don't have quantity
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center bg-primary rounded-lg text-accent">
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.cartId,
                                    item.quantity - 1
                                  )
                                }
                                className="p-1.5 cursor-pointer rounded-l-lg transition-colors disabled:opacity-50"
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={12} />
                              </button>
                              <span className="px-3 py-1.5 text-xs text-center poppins-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.cartId,
                                    item.quantity + 1
                                  )
                                }
                                className="p-1.5 cursor-pointer rounded-r-lg transition-colors"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          )}
                        </div>

                        <div className="text-right">
                          <p className="text-base sm:text-lg poppins-bold text-primary">
                            Rs. {(item.price * item.quantity).toLocaleString()}
                          </p>
                          <p className="text-xs text-primary poppins-regular">
                            total
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Desktop/Tablet Layout (>= sm) */}
                    <div className="hidden sm:flex items-start gap-4 md:gap-6">
                      {/* Product Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg flex-shrink-0"
                      />

                      {/* Product Details */}
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-3 md:gap-4 items-start">
                        {/* Product Name & Details */}
                        <div className="md:col-span-2">
                          <h3 className="text-base sm:text-lg poppins-semibold mb-2 sm:mb-3">
                            {item.name}
                          </h3>

                          {/* Product specifications */}
                          <div className="space-y-1.5 sm:space-y-2">
                            {productDetails.map((detail, index) => (
                              <div
                                key={index}
                                className={`flex items-start poppins-regular uppercase gap-1.5 sm:gap-2 text-xs sm:text-sm ${
                                  detail.isCustom
                                    ? "bg-accent p-1.5 sm:p-2 rounded"
                                    : ""
                                }`}
                              >
                                <span className="poppins-medium min-w-[60px] sm:min-w-[70px] flex-shrink-0">
                                  {detail.label}:
                                </span>
                                <div className="flex-1">{detail.value}</div>
                              </div>
                            ))}

                            {productDetails.length === 0 && (
                              <p className="text-xs text-primary poppins-regular">
                                Standard product - no customizations
                              </p>
                            )}
                          </div>

                          {/* Show custom fields count if any */}
                          {productDetails.filter((d) => d.isCustom).length >
                            0 && (
                            <div className="mt-1.5 sm:mt-2 text-xs text-primary poppins-medium">
                              ✨{" "}
                              {productDetails.filter((d) => d.isCustom).length}{" "}
                              Custom Fields
                            </div>
                          )}
                        </div>

                        {/* Price */}
                        <div className="text-center">
                          <p className="text-base sm:text-lg poppins-semibold">
                            Rs. {item.price.toLocaleString()}
                          </p>
                          <p className="text-xs text-primary poppins-regular">
                            per item
                          </p>
                        </div>

                        {/* Quantity */}
                        <div className="flex items-center justify-center">
                          {hasCustomFields(item) ? (
                            // Disabled quantity for custom items
                            <div className="flex flex-col items-center">
                              <div className="flex border border-primary items-center bg-accent rounded-lg text-primary opacity-50">
                                <button
                                  disabled
                                  className="p-1.5 sm:p-2 rounded-l-lg cursor-not-allowed"
                                >
                                  <Minus size={14} className="sm:w-4 sm:h-4" />
                                </button>
                                <span className="px-3 sm:px-4 py-1.5 sm:py-2 min-w-[2.5rem] sm:min-w-[3rem] text-center poppins-medium text-sm">
                                  {item.quantity}
                                </span>
                                <button
                                  disabled
                                  className="p-1.5 sm:p-2 rounded-r-lg cursor-not-allowed"
                                >
                                  <Plus size={14} className="sm:w-4 sm:h-4" />
                                </button>
                              </div>
                              <span className="text-xs text-primary mt-1 text-center max-w-[120px]">
                                Custom product don't have quantity
                              </span>
                            </div>
                          ) : (
                            // Normal quantity controls
                            <div className="flex items-center bg-primary rounded-lg text-accent">
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.cartId,
                                    item.quantity - 1
                                  )
                                }
                                className="p-1.5 sm:p-2 cursor-pointer rounded-l-lg transition-colors disabled:opacity-50"
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={14} className="sm:w-4 sm:h-4" />
                              </button>
                              <span className="px-3 sm:px-4 py-1.5 sm:py-2 min-w-[2.5rem] sm:min-w-[3rem] text-center poppins-medium text-sm">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.cartId,
                                    item.quantity + 1
                                  )
                                }
                                className="p-1.5 sm:p-2 cursor-pointer rounded-r-lg transition-colors"
                              >
                                <Plus size={14} className="sm:w-4 sm:h-4" />
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Total Price */}
                        <div className="text-center">
                          <p className="text-lg sm:text-xl poppins-bold text-primary">
                            Rs. {(item.price * item.quantity).toLocaleString()}
                          </p>
                          <p className="text-xs text-primary poppins-regular">
                            total
                          </p>
                        </div>

                        {/* Remove Button */}
                        <div className="text-center">
                          <button
                            onClick={() => handleRemove(item.cartId)}
                            className="p-1.5 sm:p-2 text-primary cursor-pointer hover:bg-red-900/20 rounded-lg transition-colors"
                            title={`Remove ${item.name}`}
                          >
                            <Trash2 size={18} className="sm:w-5 sm:h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cart Summary - Responsive */}
            <div className="bg-secondary border border-primary text-primary rounded-lg p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                <span className="text-primary poppins-bold">Total:</span>
                <span className="text-primary poppins-bold">
                  Rs. {calculateTotal().toLocaleString()}
                </span>
              </div>

              <div className="text-sm text-primary poppins-medium mb-4">
                Total items:{" "}
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                
                  onClick={() => navigate("/")}
                  className="flex-1 bg-transparent border border-primary poppins-semibold hover:text-[#ffefcc] cursor-pointer hover:bg-[#80011f] py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors text-sm sm:text-base"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={handleCheckout}
                  // disabled={cart.length === 0}
                    disabled={cart.length === 0 }
                  className="flex-1 bg-transparent border border-primary poppins-semibold hover:text-[#ffefcc] cursor-pointer hover:bg-[#80011f] py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
