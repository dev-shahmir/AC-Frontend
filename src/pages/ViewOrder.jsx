import { useEffect, useState } from "react";
import instance from "../utils/axios";
import { toast } from "react-toastify";
import { AiOutlineSearch } from "react-icons/ai";
import {
  FiDownload,
  FiPackage,
  FiUser,
  FiCreditCard,
  FiTrash2,
  FiCalendar,
  FiEye,
  FiX,
} from "react-icons/fi";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(null); // Track which order is being deleted

  const fetchOrders = async () => {
    try {
      const response = await instance.get("/orders/all-orders");
      setOrders(response.data.orders);
    } catch (err) {
      toast.error("Error fetching orders");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const deleteOrder = async (id, orderNumber) => {
    
    try {
      setDeleting(id); // Set deleting state
      await instance.delete(`/orders/delete/${id}`);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
      toast.success(`Order #${orderNumber} deleted successfully`);
      
      // Close modal if the deleted order was selected
      if (selectedOrder && selectedOrder._id === id) {
        closeModal();
      }
    } catch (err) {
      toast.error("Error deleting order");
      console.error(err);
    } finally {
      setDeleting(null); // Reset deleting state
    }
  };

  const viewOrder = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setShowModal(false);
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.orderNumber
        ?.toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      order.customer?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer?.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const downloadImage = async (imageUrl, filename = "custom-image") => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Image downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download image");
      console.error("Download error:", error);
    }
  };

  const isImageUrl = (value) => {
    if (typeof value !== "string") return false;
    const imageExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".bmp",
      ".webp",
      ".svg",
    ];
    const lowerValue = value.toLowerCase();
    return (
      imageExtensions.some((ext) => lowerValue.includes(ext)) ||
      (lowerValue.startsWith("http") &&
        (lowerValue.includes("image") || lowerValue.includes("upload")))
    );
  };

  const getImageFields = (customFields) => {
    if (!customFields || typeof customFields !== "object") return [];
    const imageFields = [];
    Object.entries(customFields).forEach(([key, value]) => {
      if (isImageUrl(value)) {
        imageFields.push({ key, value });
      }
    });
    return imageFields;
  };

  const getNonImageFields = (customFields) => {
    if (!customFields || typeof customFields !== "object") return [];
    const nonImageFields = [];
    Object.entries(customFields).forEach(([key, value]) => {
      if (!isImageUrl(value)) {
        nonImageFields.push({ key, value });
      }
    });
    return nonImageFields;
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiPackage className="text-blue-600 text-xl" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                  Order Management
                </h1>
                <p className="text-gray-600 text-sm sm:text-base mt-1">
                  {filteredOrders.length} orders found
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative w-full lg:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <AiOutlineSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by order number, name or email..."
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base"
              />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-gray-600 font-medium">Loading orders...</p>
            </div>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <FiPackage className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No orders found
                </h3>
                <p className="text-gray-500">
                  {searchQuery
                    ? "Try adjusting your search terms"
                    : "Orders will appear here once customers place them"}
                </p>
              </div>
            ) : (
              filteredOrders.map((order, orderIndex) => (
                <div
                  key={order?._id ?? `order-${orderIndex}`}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-4 sm:p-6"
                >
                  {/* Mobile Layout */}
                  <div className="flex flex-col sm:hidden gap-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-lg text-gray-900">
                        Order #{order.orderNumber || "N/A"}
                      </h3>
                      <span className="text-sm font-semibold text-blue-600">
                        Rs.{order.total || 0}
                      </span>
                    </div>

                    <div className="text-sm text-gray-600">
                      <p>
                        <span className="font-medium">Customer:</span>{" "}
                        {order.customer?.name || "N/A"}
                      </p>
                      <p>
                        <span className="font-medium">Items:</span>{" "}
                        {order.items?.length || 0}
                      </p>
                      {order.createdAt && (
                        <p className="flex items-center gap-1 mt-1">
                          <FiCalendar size={12} />
                          <span>{formatDate(order.createdAt)}</span>
                        </p>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => viewOrder(order)}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                      >
                        <FiEye size={16} />
                        View Details
                      </button>
                      <button
                        onClick={() =>
                          deleteOrder(order._id, order.orderNumber)
                        }
                        disabled={deleting === order._id}
                        className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1 ${
                          deleting === order._id
                            ? 'bg-gray-400 cursor-not-allowed text-white'
                            : 'bg-red-500 hover:bg-red-600 text-white'
                        }`}
                      >
                        {deleting === order._id ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <FiTrash2 size={16} />
                        )}
                        {deleting === order._id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>

                  {/* Desktop/Tablet Layout */}
                  <div className="hidden sm:flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FiPackage className="text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">
                          Order #{order.orderNumber || "N/A"}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span>
                            <span className="font-medium">Customer:</span>{" "}
                            {order.customer?.name || "N/A"}
                          </span>
                          <span>•</span>
                          <span>
                            <span className="font-medium">Items:</span>{" "}
                            {order.items?.length || 0}
                          </span>
                          <span>•</span>
                          <span className="font-semibold text-blue-600">
                            Rs.{order.total || 0}
                          </span>
                          {order.createdAt && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <FiCalendar size={12} />
                                {formatDate(order.createdAt)}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => viewOrder(order)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                      >
                        <FiEye size={16} />
                        View Details
                      </button>
                      <button
                        onClick={() =>
                          deleteOrder(order._id, order.orderNumber)
                        }
                        disabled={deleting === order._id}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                          deleting === order._id
                            ? 'bg-gray-400 cursor-not-allowed text-white'
                            : 'bg-red-500 hover:bg-red-600 text-white'
                        }`}
                      >
                        {deleting === order._id ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <FiTrash2 size={16} />
                        )}
                        {deleting === order._id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-xl w-full max-w-6xl max-h-[95vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b px-4 sm:px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FiPackage className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Order #{selectedOrder.orderNumber || "N/A"}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Total: Rs.{selectedOrder.total || 0} | Items:{" "}
                    {selectedOrder.items?.length || 0}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => deleteOrder(selectedOrder._id, selectedOrder.orderNumber)}
                  disabled={deleting === selectedOrder._id}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                    deleting === selectedOrder._id
                      ? 'bg-gray-400 cursor-not-allowed text-white'
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                >
                  {deleting === selectedOrder._id ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <FiTrash2 size={14} />
                  )}
                  {deleting === selectedOrder._id ? 'Deleting...' : 'Delete'}
                </button>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FiX className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {/* Customer & Payment Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Customer Details */}
                <div className="bg-gray-50 rounded-lg p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <FiUser className="text-blue-600" />
                    <h3 className="font-semibold text-lg text-gray-900">
                      Customer Details
                    </h3>
                  </div>
                  <div className="space-y-3 text-sm sm:text-base">
                    <div>
                      <span className="font-medium text-gray-700 block">
                        Name:
                      </span>
                      <span className="text-gray-600">
                        {selectedOrder.customer?.name || "N/A"}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 block">
                        Email:
                      </span>
                      <span className="text-gray-600 break-all">
                        {selectedOrder.customer?.email || "N/A"}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 block">
                        Phone:
                      </span>
                      <span className="text-gray-600">
                        {selectedOrder.customer?.phone || "N/A"}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 block">
                        Address:
                      </span>
                      <span className="text-gray-600">
                        {selectedOrder.customer?.address
                          ? `${selectedOrder.customer.address}, ${
                              selectedOrder.customer.city || ""
                            }, ${selectedOrder.customer.country || ""}`
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="bg-gray-50 rounded-lg p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <FiCreditCard className="text-green-600" />
                    <h3 className="font-semibold text-lg text-gray-900">
                      Payment Information
                    </h3>
                  </div>
                  <div className="space-y-3 text-sm sm:text-base">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Method:</span>
                      <span className="text-gray-600">
                        {selectedOrder.paymentMethod || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">
                        Subtotal:
                      </span>
                      <span className="text-gray-600">
                        Rs.{selectedOrder.subtotal || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">
                        Delivery:
                      </span>
                      <span className="text-gray-600">
                        Rs.{selectedOrder.deliveryCharge || 0}
                      </span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between">
                        <span className="font-bold text-gray-900">Total:</span>
                        <span className="font-bold text-gray-900">
                          Rs.{selectedOrder.total || 0}
                        </span>
                      </div>
                    </div>
                    {selectedOrder.createdAt && (
                      <div className="flex justify-between pt-3 border-t">
                        <span className="font-medium text-gray-700">
                          Order Date:
                        </span>
                        <span className="text-gray-600">
                          {formatDate(selectedOrder.createdAt)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold text-lg sm:text-xl text-gray-900 mb-4 flex items-center gap-2">
                  <FiPackage className="text-purple-600" />
                  Order Items ({selectedOrder.items?.length || 0})
                </h3>

                {!selectedOrder.items || selectedOrder.items.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                    No items found in this order
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {selectedOrder.items.map((item, itemIndex) => (
                      <div
                        key={item?.cartId || item?.id || `item-${itemIndex}`}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                      >
                        {/* Product Image */}
                        <div className="aspect-w-16 aspect-h-9">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name || "Product"}
                              className="w-full h-48 object-cover"
                            />
                          ) : (
                            <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                              <FiPackage className="text-gray-400 text-2xl" />
                            </div>
                          )}
                        </div>

                        <div className="p-4">
                          <div className="space-y-2 text-sm mb-4">
                            <div>
                              <span className="font-semibold text-gray-700">
                                Name:{" "}
                              </span>
                              <span className="text-gray-600">
                                {item.name || "N/A"}
                              </span>
                            </div>
                            {item.size && (
                              <div>
                                <span className="font-semibold text-gray-700">
                                  Size:{" "}
                                </span>
                                <span className="text-gray-600">
                                  {item.size}
                                </span>
                              </div>
                            )}
                            {item.frame && (
                              <div>
                                <span className="font-semibold text-gray-700">
                                  Frame:{" "}
                                </span>
                                <span className="text-gray-600">
                                  {item.frame}
                                </span>
                              </div>
                            )}
                            <div>
                              <span className="font-semibold text-gray-700">
                                Quantity:{" "}
                              </span>
                              <span className="text-gray-600">
                                {item.quantity || 0}
                              </span>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-700">
                                Price:{" "}
                              </span>
                              <span className="text-gray-600 font-medium">
                                Rs.{item.price || 0}
                              </span>
                            </div>
                          </div>

                          {/* Custom Fields */}
                          {item.customFields &&
                            Object.keys(item.customFields).length > 0 && (
                              <div className="border-t pt-4">
                                <h4 className="font-semibold text-sm text-blue-900 mb-3">
                                  Custom Details:
                                </h4>

                                {/* Non-Image Fields */}
                                {getNonImageFields(item.customFields).length >
                                  0 && (
                                  <div className="space-y-2 mb-4">
                                    {getNonImageFields(item.customFields).map(
                                      ({ key, value }) => (
                                        <div key={key} className="text-xs">
                                          <span className="font-medium text-gray-700 capitalize">
                                            {key}:{" "}
                                          </span>
                                          <span className="text-gray-600">
                                            {typeof value === "string"
                                              ? value
                                              : JSON.stringify(value)}
                                          </span>
                                        </div>
                                      )
                                    )}
                                  </div>
                                )}

                                {/* Custom Images */}
                                {getImageFields(item.customFields).map(
                                  ({ key, value }) => (
                                    <div key={key} className="mb-4">
                                      <h5 className="text-xs font-medium text-gray-700 mb-2 capitalize">
                                        {key}:
                                      </h5>
                                      <div className="relative group">
                                        <img
                                          src={value}
                                          alt={`Custom ${key}`}
                                          className="w-full h-32 object-cover rounded border cursor-pointer hover:opacity-90 transition-opacity"
                                          onClick={() =>
                                            window.open(value, "_blank")
                                          }
                                          onError={(e) => {
                                            e.target.style.display = "none";
                                            e.target.nextSibling.style.display =
                                              "flex";
                                          }}
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded flex items-center justify-center">
                                          <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                            Click to view
                                          </span>
                                        </div>
                                        <div className="hidden w-full h-32 bg-gray-200 rounded border items-center justify-center text-gray-500 text-xs">
                                          <div className="text-center">
                                            <FiPackage
                                              size={20}
                                              className="mx-auto mb-1"
                                            />
                                            Image failed to load
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex gap-2 mt-2">
                                        <button
                                          onClick={() =>
                                            window.open(value, "_blank")
                                          }
                                          className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded transition-colors"
                                        >
                                          <FiEye size={12} />
                                          View
                                        </button>
                                        <button
                                          onClick={() =>
                                            downloadImage(
                                              value,
                                              `${key}-order-${
                                                selectedOrder.orderNumber
                                              }-item-${itemIndex + 1}`
                                            )
                                          }
                                          className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
                                        >
                                          <FiDownload size={12} />
                                          Download
                                        </button>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewOrders;