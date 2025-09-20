import { useEffect, useState } from "react";
import instance from "../utils/axios";
import {
  AiOutlineSearch,
  AiOutlineDelete,
  AiOutlineEye,
} from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";

const ViewCustomProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  //   const navigate = useNavigate();

  // Function to fetch custom products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await instance.get(
        "/custom-products/custom-admin-product-templates"
      );
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Error fetching custom products:", error);
      toast.error("Failed to fetch custom products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products
  useEffect(() => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery]);

  const deleteProduct = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      instance
        .delete(
          `/custom-products/custom-product-template/${productToDelete._id}`
        )
        .then(() => {
          const updatedProducts = products.filter(
            (product) => product._id !== productToDelete._id
          );
          setProducts(updatedProducts);
          toast.success("Custom product successfully deleted.");
          setShowDeleteConfirm(false);
          setProductToDelete(null);
        })
        .catch((error) => {
          console.error("Delete error:", error);
          toast.error("Failed to delete custom product");
          setShowDeleteConfirm(false);
          setProductToDelete(null);
        });
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setProductToDelete(null);
  };


  const openModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setShowModal(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 font-medium">
            Loading custom products...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Custom Product List
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                {filteredProducts.length} of {products.length} products
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-auto">
              <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search custom products..."
                className="pl-10 pr-4 py-2 w-full sm:w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 max-h-[76vh] overflow-y-auto scrollbar-hide ">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 sm:py-20">
            <div className="text-gray-400 text-4xl sm:text-6xl mb-4">📦</div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
              No custom products found
            </h3>
            <p className="text-gray-500 text-sm sm:text-base">
              Try adjusting your search
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow"
              >
                {/* Mobile Layout */}
                <div className="block sm:hidden">
                  <div className="flex gap-4 mb-4">
                    {/* Product Image */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      {product.templateImages?.[0] ? (
                        <img
                          src={product.templateImages[0].url}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          📦
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-base mb-2 leading-tight">
                        {product.name}
                      </h3>
                      <div className="space-y-1 text-xs text-gray-600">
                        <div>
                          <strong>Product Type:</strong> {product.category}
                        </div>
                        <div>
                          <strong>Product Category:</strong>{" "}
                          {product.subCategory || "None"}
                        </div>
                        <div
                          className={`font-medium ${
                            product.stock > 10
                              ? "text-green-600"
                              : product.stock > 0
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          <strong>Stock:</strong> {product.stock}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => openModal(product)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1"
                    >
                      <AiOutlineEye className="w-3 h-3" />
                      View
                    </button>
                    <button
                      onClick={() => deleteProduct(product)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1"
                    >
                      <AiOutlineDelete className="w-3 h-3" />
                      Delete
                    </button>
                  </div>
                </div>

                {/* Desktop/Tablet Layout */}
                <div className="hidden sm:flex items-center gap-6">
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {product.templateImages?.[0] ? (
                      <img
                        src={
                          typeof product.templateImages[0] === "string"
                            ? product.templateImages[0]
                            : product.templateImages[0].url
                        }
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        📦
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0 pr-4">
                        <h3 className="font-semibold text-gray-900 text-lg truncate">
                          {product.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 lg:gap-4 mt-1 text-sm text-gray-600">
                          <span>
                            <strong>Product Type:</strong> {product.category}
                          </span>
                          <span className="hidden md:inline">•</span>
                          <span>
                            <strong>Product Category:</strong>{" "}
                            {product.subCategory || "None"}
                          </span>
                          <span className="hidden md:inline">•</span>
                          {product.stock ? (
                            <span
                              className={`font-medium ${
                                product.stock > 10
                                  ? "text-green-600"
                                  : product.stock > 0
                                  ? "text-yellow-600"
                                  : "text-red-600"
                              }`}
                            >
                              <strong>Stock:</strong> {product.stock}
                            </span>
                          ) : (
                            "Out of Stock"
                          )}
                        </div>
                      </div>

                      {/* Desktop Actions */}
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => openModal(product)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                        >
                          <AiOutlineEye className="w-4 h-4" />
                          <span className="hidden lg:inline">View</span>
                        </button>
                        <button
                          onClick={() => deleteProduct(product)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                        >
                          <AiOutlineDelete className="w-4 h-4" />
                          <span className="hidden lg:inline">Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && productToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
                <AiOutlineDelete className="w-6 h-6 text-red-600" />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                Delete Custom Product
              </h3>

              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to delete{" "}
                <strong>{productToDelete.name}</strong>? This action cannot be
                undone.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={cancelDelete}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b px-4 sm:px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900 truncate pr-4">
                {selectedProduct.name}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              >
                <MdClose className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6">
              {/* Template Images */}
              {selectedProduct.templateImages?.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-base sm:text-lg font-semibold mb-3">
                    Template Images
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
                   {selectedProduct.templateImages.map((img, idx) => (
                      <img
                        key={idx}
                        src={typeof img === "string" ? img : img.url}
                        alt={`${selectedProduct.name} ${idx + 1}`}
                        className="w-full aspect-square object-cover rounded-lg border"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Product Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-3">
                    Product Information
                  </h3>
                  <div className="space-y-2 text-sm sm:text-base">
                    <div>
                      <span className="font-medium">Product Type:</span>{" "}
                      {selectedProduct.category}
                    </div>
                    <div>
                      <span className="font-medium">Product Category:</span>{" "}
                      {selectedProduct.subCategory || "None"}
                    </div>
                    <div>
                      <span className="font-medium">Stock:</span>{" "}
                      {selectedProduct.stock
                        ? selectedProduct.stock
                        : "Out of Stock"}
                    </div>
                    <div>
                      <span className="font-medium">Frame Option:</span>
                      <span
                        className={`ml-2 font-medium ${
                          selectedProduct.hasFrame
                            ? "text-green-600"
                            : "text-gray-600"
                        }`}
                      >
                        {selectedProduct.hasFrame ? "With Frame" : "None"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Frame Colors */}
                {selectedProduct.frameColors?.length > 0 && (
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold mb-3">
                      Frame Colors
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.frameColors.map((color, idx) => (
                        <span
                          key={idx}
                          className="px-2 sm:px-3 py-1 bg-gray-100 rounded-full text-xs sm:text-sm"
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Product Description */}
              <div className="mb-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3">
                  Description:
                </h3>
                <p className="text-gray-700 text-sm sm:text-base">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Sizes & Pricing */}
              {selectedProduct.sizes?.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-base sm:text-lg font-semibold mb-3">
                    Sizes & Pricing:
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 text-xs sm:text-sm">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">
                            Size
                          </th>
                          <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">
                            Original Price
                          </th>
                          <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">
                            Discounted Price
                          </th>
                          <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">
                            Discount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedProduct.sizes.map((size, idx) => (
                          <tr key={idx}>
                            <td className="border border-gray-300 px-2 sm:px-4 py-2 font-medium">
                              {size.size ? size.size : "N/A"}
                            </td>
                            <td className="border border-gray-300 px-2 sm:px-4 py-2 text-red-600">
                              Rs. {size.actualPrice}
                            </td>
                            <td className="border border-gray-300 px-2 sm:px-4 py-2 text-green-600">
                              {size.discountedPrice
                                ? `Rs. ${size.discountedPrice}`
                                : "N/A"}
                            </td>
                            <td className="border border-gray-300 px-2 sm:px-4 py-2">
                              {size.actualPrice && size.discountedPrice && (
                                <span className="text-blue-600 font-medium">
                                  {Math.round(
                                    ((size.actualPrice - size.discountedPrice) /
                                      size.actualPrice) *
                                      100
                                  )}
                                  % OFF
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Custom Fields */}
              {selectedProduct.fields?.length > 0 && (
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-3">
                    Customization Fields:
                  </h3>
                  <div className="space-y-3">
                    {selectedProduct.fields.map((field, idx) => (
                      <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-xl sm:text-base uppercase">
                            {field.fieldName}
                          </span>
                          <div className="flex gap-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 uppercase text-base rounded">
                              {field.fieldType}
                            </span>
                          </div>
                        </div>
                          {field.options && field.options.length > 0 && (
                          <div className="text-base uppercase text-gray-600 mt-1">
                            <div className="font-semibold mb-1">Options:</div>
                            <div className="flex flex-wrap gap-1">
                              {field.options.map((option, optionIdx) => (
                                <span
                                  key={optionIdx}
                                  className="inline-block px-2 bg-blue-100 text-blue-800 text-sm mt-2"
                                >
                                  {option}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCustomProducts;
