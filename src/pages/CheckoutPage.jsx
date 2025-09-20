import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import instance from "../utils/axios";
import { toast } from "react-toastify";
import { MdWarning } from "react-icons/md";
import { CheckCircle } from "lucide-react";
import { useCart } from "../context/CartContext"; // ✅ Import useCart

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart(); // ✅ Get clearCart from context
  const [items, setItems] = useState(location.state?.items || []);
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
  });

  const [paymentMethod] = useState("Cash on Delivery");
  const deliveryCharge = 250;

  if (!items || items.length === 0) {
    return (
      <div className="min-h-[80vh] bg-secondary flex items-center justify-center p-4">
        <div className="bg-accent p-8 rounded-2xl shadow-xl shadow-[#ffdf9e] text-center max-w-md w-full">
          <div className="text-6xl mb-6">🛒</div>
          <h2 className="text-2xl poppins-bold text-primary mb-3">
            No Items to Checkout
          </h2>
          <p className="text-primary poppins-regular mb-6">
            Your cart is empty. Start shopping to add items!
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-transparent border border-primary text-[#80011f] cursor-pointer px-8 py-3 rounded-lg hover:bg-[#80011f] hover:text-[#ffefcc] transition-all duration-200 transform poppins-medium"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const subtotal = items.reduce(
    (acc, item) =>
      acc + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0
  );
  const total = subtotal + deliveryCharge;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    const requiredFields = [
      "name",
      "email",
      "phone",
      "address",
      "city",
      "country",
    ];
    const emptyFields = requiredFields.filter(
      (field) => !customer[field]?.trim()
    );

    if (emptyFields.length > 0) {
      toast.error("Please Fill all required fields", {
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

    try {
      setLoading(true);
      // Prepare order data
      const orderData = {
        customer,
        items,
        subtotal,
        deliveryCharge,
        total,
        paymentMethod,
      };

      await instance.post("/orders/create-order", orderData);

      // ✅ Use context clearCart function
      clearCart();

      toast.success("Order placed successfully!", {
        icon: <CheckCircle className="text-[#ffefcc]" />,
        hideProgressBar: true,
        closeButton: false,
        autoClose: 1000,
        style: {
          background: "#80011f",
          color: "#ffefcc",
        },
      });

      // ✅ Reset input fields
      setCustomer({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        country: "",
      });

      // ✅ Clear items state
      setItems([]);
      navigate("/thank-you");
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order", {
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
      setLoading(false); // ✅ Stop loader
    }
  };

  return (
    <div className="min-h-screen bg-secondary py-4 sm:py-8 relative">
      {/* ✅ Loader overlay - Fixed positioning */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="flex items-center">
            <div className="w-16 h-16 border-4 border-[#ffdf9e] border-t-[#80011f] rounded-full animate-spin"></div>
            <span className="ml-4 text-[#ffdf9e] font-semibold text-lg">
              Placing your order...
            </span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary orbitron mb-2">
            Checkout
          </h1>
          <p className="text-primary poppins-regular text-sm sm:text-base">
            Complete your purchase securely
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Column - Customer Information & Items */}
          <div className="xl:col-span-2 space-y-4 sm:space-y-6">
            {/* Customer Information Section */}
            <div className="bg-accent rounded-xl shadow-lg shadow-[#ffdf9e] p-4 sm:p-6 border border-primary">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="bg-[#80011f62] rounded-full p-2 sm:p-3 mr-3">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-[#80011f]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl poppins-bold text-primary">
                    Customer Information
                  </h2>
                  <p className="text-xs sm:text-sm poppins-regular text-primary">
                    Fill in your details
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="sm:col-span-2">
                  <label className="block text-sm poppins-semibold text-primary mb-2">
                    Full Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={customer.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-primary poppins-regular text-primary rounded-xl focus:ring-2 focus:ring-[#80011f] focus:border-[#80011f] outline-none transition-all duration-200 text-sm sm:text-base"
                    placeholder="Enter your full name"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm poppins-semibold text-primary mb-2">
                    Email Address <span className="text-primary">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={customer.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-primary poppins-regular text-primary rounded-xl focus:ring-2 focus:ring-[#80011f] focus:border-[#80011f] outline-none transition-all duration-200 text-sm sm:text-base"
                    placeholder="your@email.com"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm poppins-semibold text-primary mb-2">
                    Phone Number <span className="text-primary">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={customer.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-primary poppins-regular text-primary rounded-xl focus:ring-2 focus:ring-[#80011f] focus:border-[#80011f] outline-none transition-all duration-200 text-sm sm:text-base"
                    placeholder="+92 300 1234567"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm poppins-semibold text-primary mb-2">
                    Complete Address <span className="text-primary">*</span>
                  </label>
                  <textarea
                    name="address"
                    value={customer.address}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-primary poppins-regular text-primary rounded-xl focus:ring-2 focus:ring-[#80011f] focus:border-[#80011f] outline-none transition-all duration-200 resize-none text-sm sm:text-base"
                    placeholder="House #, Street, Area, Landmark"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm poppins-semibold text-primary mb-2">
                    City <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={customer.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-primary poppins-regular text-primary rounded-xl focus:ring-2 focus:ring-[#80011f] focus:border-[#80011f] outline-none transition-all duration-200 text-sm sm:text-base"
                    placeholder="e.g., Lahore"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm poppins-semibold text-primary mb-2">
                    Country <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={customer.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-primary poppins-regular text-primary rounded-xl focus:ring-2 focus:ring-[#80011f] focus:border-[#80011f] outline-none transition-all duration-200 text-sm sm:text-base"
                    placeholder="Pakistan"
                    required
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Order Items Section */}
            <div className="bg-accent rounded-xl shadow-lg shadow-[#ffdf9e] p-4 sm:p-6 border border-primary">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2">
                <div className="flex items-center">
                  <div className="bg-[#80011f6d] rounded-full p-2 sm:p-3 mr-3">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl poppins-bold text-primary">
                      Order Items
                    </h2>
                    <p className="text-xs sm:text-sm poppins-regular text-primary">
                      Review your products
                    </p>
                  </div>
                </div>
                <span className="bg-secondary text-primary border border-primary text-xs sm:text-sm px-3 py-1.5 rounded-full poppins-medium">
                  {items.length} item{items.length > 1 ? "s" : ""}
                </span>
              </div>

              <div className="space-y-4">
                {items.map((item, index) => (
                  <div
                    key={item.cartId || index}
                    className="border border-primary rounded-xl p-4 sm:p-5 hover:shadow-md transition-all duration-200 bg-gray-50/30"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                      <div className="flex gap-3">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-primary flex-shrink-0"
                          />
                        )}
                        <div className="flex-1">
                          <h3 className="poppins-bold text-base sm:text-lg text-primary mb-1">
                            {item.name}
                          </h3>
                          <div className="flex flex-wrap poppins-regular gap-4 text-sm text-primary">
                            <span>
                              Qty:{" "}
                              <strong className="text-primary poppins-bold">
                                {Number(item.quantity) || 1}
                              </strong>
                            </span>
                            <span>
                              Unit Price:{" "}
                              <strong className="text-primary poppins-bold">
                                Rs. {Number(item.price || 0).toLocaleString()}
                              </strong>
                            </span>
                            {item.size && (
                              <span>
                                Size:{" "}
                                <strong className="text-primary poppins-bold">
                                  {item.size}
                                </strong>
                              </span>
                            )}
                            {item.frame && (
                              <span>
                                Frame:{" "}
                                <strong className="text-primary poppins-bold">
                                  {item.frame}
                                </strong>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl sm:text-2xl poppins-bold text-primary">
                          Rs.{" "}
                          {(
                            (Number(item.price) || 0) *
                            (Number(item.quantity) || 1)
                          ).toLocaleString()}
                        </p>
                        <p className="text-xs poppins-regular text-primary">
                          Total for this item
                        </p>
                      </div>
                    </div>

                    {/* Custom Fields Display */}
                    {item.customFields &&
                      Object.keys(item.customFields).length > 0 && (
                        <div className="mt-4 p-4 bg-accent rounded-xl border-l-4 border-primary">
                          <h4 className="poppins-semibold text-primary mb-3 flex items-center text-sm sm:text-base">
                            <svg
                              className="w-4 h-4 mr-2 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                              />
                            </svg>
                            Custom Options
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            {Object.entries(item.customFields).map(
                              ([key, value]) => {
                                const fieldName = key
                                  .replace(/([A-Z])/g, " $1")
                                  .trim();
                                const isImageField =
                                  key.toLowerCase().includes("image") ||
                                  key.toLowerCase().includes("photo") ||
                                  key.toLowerCase().includes("picture") ||
                                  (typeof value === "string" &&
                                    (value.match(
                                      /\.(jpg|jpeg|png|gif|webp|svg)$/i
                                    ) ||
                                      (value.startsWith("http") &&
                                        value.includes("image"))));

                                return (
                                  <div
                                    key={key}
                                    className="bg-secondary border border-primary rounded-lg p-3"
                                  >
                                    <span className="poppins-semibold text-primary capitalize block mb-2 text-sm">
                                      {fieldName}:
                                    </span>
                                    {isImageField ? (
                                      <div className="space-y-2">
                                        <img
                                          src={value}
                                          alt={fieldName}
                                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border-2 border-primary shadow-sm hover:scale-105 transition-transform cursor-pointer"
                                          onError={(e) => {
                                            e.target.style.display = "none";
                                            e.target.nextSibling.style.display =
                                              "block";
                                          }}
                                          onClick={() =>
                                            window.open(value, "_blank")
                                          }
                                        />
                                        <span className="text-primary poppins-regular uppercase text-xs hidden break-all bg-[#80011f31] p-2 rounded">
                                          {value}
                                        </span>
                                      </div>
                                    ) : (
                                      <span className="text-primary poppins-regular uppercase break-words text-sm bg-[#80011f31] px-2 py-1 rounded">
                                        {value}
                                      </span>
                                    )}
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary (Sticky) */}
          <div className="xl:col-span-1">
            <div className="bg-accent rounded-xl shadow-lg shadow-[#ffdf9e] p-4 sm:p-6 border border-primary sticky top-4 sm:top-6">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="bg-[#80011f78] rounded-full p-2 sm:p-3 mr-3">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl poppins-bold text-primary">
                    Order Summary
                  </h2>
                  <p className="text-xs sm:text-sm poppins-regular text-primary">
                    Review totals
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-primary">
                  <span className="text-primary poppins-regular text-sm sm:text-base">
                    Subtotal ({items.length} items)
                  </span>
                  <span className="poppins-semibold text-sm sm:text-base">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-primary">
                  <span className="text-primary poppins-regular text-sm sm:text-base">
                    Delivery Charges
                  </span>
                  <span className="poppins-semibold text-sm sm:text-base">
                    Rs. {deliveryCharge.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center py-4 bg-secondary px-4 rounded-xl border border-primary">
                  <span className="text-lg poppins-bold text-primary">
                    Total Amount
                  </span>
                  <span className="text-xl sm:text-2xl poppins-bold text-primary">
                    Rs. {total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mt-6 p-4 bg-secondary rounded-xl border border-primary">
                <div className="flex items-center">
                  <div className="bg-accent rounded-full p-2 mr-3 flex-shrink-0">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="poppins-semibold text-primary text-sm sm:text-base">
                      Payment Method
                    </h3>
                    <p className="text-sm poppins-regular text-primary">
                      {paymentMethod}
                    </p>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              {/* <button
                onClick={handlePlaceOrder}
                disabled={loading || total < 500}
                className="w-full mt-6 bg-primary text-accent py-3 sm:py-4 px-4 rounded-xl text-sm sm:text-base border border-primary  cursor-pointer transition-all duration-200 transform flex items-center justify-center shadow-lg shadow-[#ffdf9e] poppins-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#80011f]"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {loading ? "Processing..." : `Place Order - Rs. ${total.toLocaleString()}`}
              </button> */}
              <button
                onClick={() => {
                  if (total < 500) {
                    toast.error("Minimum order amount is Rs. 500", {
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
                  handlePlaceOrder();
                }}
                disabled={loading}
                className="w-full mt-6 bg-primary text-accent py-3 sm:py-4 px-4 rounded-xl text-sm sm:text-base border border-primary cursor-pointer transition-all duration-200 transform flex items-center justify-center shadow-lg shadow-[#ffdf9e] poppins-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#80011f]"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {loading
                  ? "Processing..."
                  : `Place Order - Rs. ${total.toLocaleString()}`}
              </button>

              <div className="mt-4 p-3 bg-primary text-accent rounded-lg">
                <p className="text-xs poppins-regular text-center leading-relaxed">
                  🔒 Secure checkout • By placing your order, you agree to our
                  terms and conditions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
