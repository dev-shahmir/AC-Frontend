import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import instance from "../utils/axios";
import { toast } from "react-toastify";

const subCategories = {
  Posters: [
    "ABSTRACT ART",
    "ARCHITECTURE",
    "GYM FITNESS",
    "ISLAMIC",
    "MOTIVATIONAL",
    "SPACE",
    "VINTAGE",
    "CLASSIC",
    "DIGITAL PAINTING",
    "FLORAL",
    "MUSICAL",
    "BTS",
    "EDUCTAION",
    "CRICKET",
    "GUNS",
    "FORMULA 1",
    "MOTO GP",
    "SUFISM",
    "NBA",
    "CARS",
    "BIKES",
    "ANIME",
    "CARTOON",
    "FOOTBALL",
    "CELEBRITIES",
    "ARMY",
    "COMICS",
    "MOVIE",
    "TV SERIES",
  ],
  "Nikkah-Nama": ["Urdu", "English"],
  Frames: [
    "ABSTRACT ART",
    "ARCHITECTURE",
    "GYM FITNESS",
    "ISLAMIC",
    "MOTIVATIONAL",
    "SPACE",
    "VINTAGE",
    "CLASSIC",
    "DIGITAL PAINTING",
    "FLORAL",
    "MUSICAL",
    "BTS",
    "EDUCTAION",
    "CRICKET",
    "GUNS",
    "FORMULA 1",
    "MOTO GP",
    "SUFISM",
    "NBA",
    "CARS",
    "BIKES",
    "ANIME",
    "CARTOON",
    "FOOTBALL",
    "CELEBRITIES",
    "ARMY",
    "COMICS",
    "MOVIE",
    "TV SERIES",
  ],
  "Posters With Frames": [
    "ABSTRACT ART",
    "ARCHITECTURE",
    "GYM FITNESS",
    "ISLAMIC",
    "MOTIVATIONAL",
    "SPACE",
    "VINTAGE",
    "CLASSIC",
    "DIGITAL PAINTING",
    "FLORAL",
    "MUSICAL",
    "BTS",
    "EDUCTAION",
    "CRICKET",
    "GUNS",
    "FORMULA 1",
    "MOTO GP",
    "SUFISM",
    "NBA",
    "CARS",
    "BIKES",
    "ANIME",
    "CARTOON",
    "FOOTBALL",
    "CELEBRITIES",
    "ARMY",
    "COMICS",
    "MOVIE",
    "TV SERIES",
  ],
};

const categories = [
  "Posters",
  "Posters With Frames",
  "Polaroids",
  "Frames",
  // "Pvc-Sheets",
  "Stickers",
  "Nikkah-Nama",
];

const frameColors = ["White", "Black", "Brown", "Golden"];

const UpdateProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { product } = location.state;
  const [imagesToDelete, setImagesToDelete] = useState([]);

  const [formData, setFormData] = useState({
    name: product.name || "",
    description: product.description || "",
    stock: product.stock || 0,
    category: product.category || "",
    subCategory: product.subCategory || "",
    sizes: product.sizes || [
      { size: "", actualPrice: "", discountedPrice: "" },
    ],
    hasFrame: product.hasFrame || false,
    frameColors: product.frameColors || [],
    productImages: product.productImages || [],
  });

  // ✅ Handle change for simple fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ✅ Handle sizes
  const handleSizeChange = (index, field, value) => {
    const updatedSizes = [...formData.sizes];
    updatedSizes[index][field] = value;
    setFormData({ ...formData, sizes: updatedSizes });
  };

  const addSizeField = () => {
    setFormData({
      ...formData,
      sizes: [
        ...formData.sizes,
        { size: "", actualPrice: "", discountedPrice: "" },
      ],
    });
  };

  const removeSizeField = (e, index) => {
    e.preventDefault();
    const updated = [...formData.sizes];
    updated.splice(index, 1);
    setFormData({ ...formData, sizes: updated });
  };

  // ✅ Handle frame colors
  const handleFrameColorChange = (color) => {
    const updatedColors = formData.frameColors.includes(color)
      ? formData.frameColors.filter((c) => c !== color)
      : [...formData.frameColors, color];
    setFormData({ ...formData, frameColors: updatedColors });
  };

  // ✅ Handle image upload
  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedImages = [...formData.productImages];
      updatedImages[index] = reader.result; // base64 string
      setFormData({ ...formData, productImages: updatedImages });
    };
    reader.readAsDataURL(file);
  };

 
  // Remove image
  const handleRemoveImage = (index) => {
    const removedImage = formData.productImages[index];

    // Old image with public_id, backend ko delete bhejna
    if (removedImage?.public_id) {
      setImagesToDelete([...imagesToDelete, removedImage.public_id]);
    }

    // UI se remove
    const updatedImages = [...formData.productImages];
    updatedImages.splice(index, 1);
    setFormData({ ...formData, productImages: updatedImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        productImages: formData.productImages.map((img) =>
          typeof img === "string"
            ? img
            : { url: img.url, public_id: img.public_id }
        ),
        imagesToDelete,
      };

      await instance.put(`/products/update-product/${product._id}`, payload);
      toast.success("Product updated successfully");
      navigate("/all-products", { state: { refresh: true } });
    } catch (error) {
      console.error(error);
      toast.error("Error updating product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="w-full max-h-[94vh] bg-white p-3 md:p-5 rounded-lg shadow-md overflow-y-auto scrollbar-hide"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center">
        Update Product
      </h1>

      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600 font-medium">Updating Product...</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b-2 pb-6">
            <div>
              <label className="block text-gray-700 text-base md:text-lg font-medium mb-2">
                Product Name:
              </label>
              <input
                type="text"
                placeholder="Product Name"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-2 text-sm md:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-base md:text-lg font-medium mb-2">
                Stock:
              </label>
              <input
                type="number"
                name="stock"
                placeholder="Product Quantity"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                className="w-full p-2 text-sm md:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all"
              />
            </div>
          </div>

          {/* Category / SubCategory */}
          <div className="border-b-2 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b-2 pb-6">
              <div>
                <label className="block text-gray-700 text-base md:text-lg font-medium mb-2">
                  Product-Type:
                </label>
                <select
                  value={formData.category}
                  name="category"
                  onChange={handleChange}
                  className="select w-full p-2 text-sm md:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all"
                >
                  <option value="">Select Product Type</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-base md:text-lg font-medium mb-2">
                  Product-Category:
                </label>
                {formData.category && subCategories[formData.category] && (
                  <select
                    value={formData.subCategory}
                    name="subCategory"
                    onChange={(e) =>
                      setFormData({ ...formData, subCategory: e.target.value })
                    }
                    className="select w-full p-2 text-sm md:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all"
                  >
                    <option value="">Select Product Category</option>
                    {subCategories[formData.category].map((sub, idx) => (
                      <option key={idx} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            {/* Frame Options */}
            <h3 className="text-center mt-6 mb-4 text-base md:text-[20px] underline font-semibold">
              Select Frame Options
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-base md:text-lg font-medium mb-2">
              <div>
                {(formData.category === "Posters" ||
                  formData.category === "Nikkah-Nama" ||
                  formData.category === "Frames" ||
                  formData.category === "Posters With Frames") && (
                  <div className="mt-3">
                    <label className="flex items-center gap-[6px]">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        checked={formData.hasFrame}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hasFrame: e.target.checked,
                          })
                        }
                      />
                      With Frame?
                    </label>
                  </div>
                )}
              </div>

              <div>
                {(formData.category === "Frames" || formData.hasFrame) && (
                  <div className="mt-3">
                    <label className="block font-medium mb-4 text-base md:text-lg">
                      Select Frame Colors:
                    </label>
                    <div className="flex flex-wrap">
                      {frameColors.map((color) => (
                        <div
                          key={color}
                          className="flex flex-row items-center gap-[6px]"
                        >
                          <label className="mr-4 items-center"></label>
                          <input
                            type="checkbox"
                            className="checkbox checkbox-sm"
                            checked={formData.frameColors.includes(color)}
                            onChange={() => handleFrameColorChange(color)}
                          />
                          {color}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sizes */}
          <div className="border-b-2 pb-6">
            <h3 className="text-center mt-6 mb-8 text-base md:text-[20px] underline font-semibold">
              Sizes & Prices
            </h3>
            {formData.sizes.map((s, i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2"
              >
                <div>
                  <label className="block text-gray-700 text-base md:text-lg font-medium mb-3">
                    Add Size:
                  </label>
                  <input
                    type="text"
                    placeholder="Size"
                    value={s.size}
                    onChange={(e) =>
                      handleSizeChange(i, "size", e.target.value)
                    }
                    disabled={formData.category === "Stickers" || formData.category === "Polaroids"}
                    className="w-full p-2 text-sm md:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-base md:text-lg font-medium mb-3">
                    Actual Price:
                  </label>
                  <input
                    type="number"
                    placeholder="Actual Price"
                    value={s.actualPrice}
                    onChange={(e) =>
                      handleSizeChange(i, "actualPrice", e.target.value)
                    }
                    className="w-full p-2 text-sm md:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-base md:text-lg font-medium mb-3">
                    Discounted Price:
                  </label>
                  <input
                    type="number"
                    placeholder="Discounted Price"
                    value={s.discountedPrice}
                    onChange={(e) =>
                      handleSizeChange(i, "discountedPrice", e.target.value)
                    }
                    className="w-full p-2 text-sm md:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all"
                  />
                </div>

                <div className="flex justify-center items-end">
                  <button
                    type="button"
                    onClick={(e) => removeSizeField(e, i)}
                    className="w-full btn-square md:w-full text-white font-medium text-sm md:text-lg bg-red-500 hover:bg-red-600 rounded-lg transition-all"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={addSizeField}
                className="w-full md:w-full btn-square px-6 py-3 text-white font-medium text-sm md:text-lg bg-green-500 hover:bg-green-600 rounded-lg transition-all"
              >
                + Add Size & Price
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 text-base md:text-lg font-medium mb-2">
              Description:
            </label>
            <textarea
              name="description"
              placeholder="Write Product Details..."
              rows={6}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full p-2 text-sm md:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all"
            ></textarea>
          </div>

          {/* Images */}
          <h3 className="text-center mt-6 mb-8 text-base md:text-[20px] underline font-semibold">
            Product Images
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[0, 1].map((index) => (
              <div key={index} className="space-y-4">
                <label className="block text-gray-700 text-base md:text-lg font-medium">
                  Image Slot {index + 1}:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full p-2 text-sm md:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                  onChange={(e) => handleImageChange(index, e)}
                />
                {formData.productImages[index] && (
                  <div className="relative">
                    <img
                      src={
                        formData.productImages[index]?.url ||
                        formData.productImages[index]
                      }
                      alt={`Preview Slot ${index + 1}`}
                      className="mt-4 h-24 w-24 md:h-32 md:w-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Submit */}
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              className="w-full md:w-full px-6 py-3 text-white font-medium text-sm md:text-lg bg-yellow-500 hover:bg-yellow-600 rounded-lg transition-all"
            >
              Update Product
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default UpdateProduct;
