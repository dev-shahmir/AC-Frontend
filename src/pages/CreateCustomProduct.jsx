import { useState } from "react";
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

const frameColors = ["White", "Black", "Brown", "Golden"];
const categories = [
  "Posters",
  "Posters With Frames",
  "Polaroids",
  "Frames",
  "Stickers",
  "Nikkah-Nama",
];

export default function CreateCustomProduct() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    stock: "",
    description: "",
    category: "",
    subCategory: "",
    hasFrame: "",
    frameColors: [],
    sizes: [],
    fields: [],
    templateImages: [],
    isNew: true,
  });

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setFormData({
      ...formData,
      category,
      subCategory: "",
      hasFrame: category === "Posters" || category === "Nikkah-Nama",
      frameColors: category === "Frames" ? [] : [],
      sizes: [],
    });
  };

  // ---------- Size Handlers ----------
  const addSize = (e) => {
    e.preventDefault(); // Form submission prevent karna
    setFormData({
      ...formData,
      sizes: [
        ...formData.sizes,
        { size: "", actualPrice: "", discountedPrice: "" },
      ],
    });
  };

  const handleSizeChange = (index, field, value) => {
    const updated = [...formData.sizes];
    updated[index][field] = value;
    setFormData({ ...formData, sizes: updated });
  };

  const removeSize = (e, index) => {
    e.preventDefault(); // Form submission prevent karna
    const updated = [...formData.sizes];
    updated.splice(index, 1);
    setFormData({ ...formData, sizes: updated });
  };

  // ---------- Fields Handlers ----------
  const addField = (e) => {
    e.preventDefault(); // Form submission prevent karna
    setFormData({
      ...formData,
      fields: [
        ...formData.fields,
        { fieldName: "", fieldType: "text", options: [], required: false },
      ],
    });
  };

  const handleFieldChange = (index, field, value) => {
    const updated = [...formData.fields];
    updated[index][field] = value;
    if (field === "fieldType" && value !== "dropdown") {
      updated[index].options = [];
    }
    setFormData({ ...formData, fields: updated });
  };

  const removeField = (e, index) => {
    e.preventDefault(); // Form submission prevent karna
    const updated = [...formData.fields];
    updated.splice(index, 1);
    setFormData({ ...formData, fields: updated });
  };

  // ---------- Dropdown Options Handlers ----------
  const addOption = (e, fieldIndex) => {
    e.preventDefault(); // Form submission prevent karna
    const updated = [...formData.fields];
    updated[fieldIndex].options.push("");
    setFormData({ ...formData, fields: updated });
  };

  const handleOptionChange = (fieldIndex, optionIndex, value) => {
    const updated = [...formData.fields];
    updated[fieldIndex].options[optionIndex] = value;
    setFormData({ ...formData, fields: updated });
  };

  const removeOption = (e, fieldIndex, optionIndex) => {
    e.preventDefault(); // Form submission prevent karna
    const updated = [...formData.fields];
    updated[fieldIndex].options.splice(optionIndex, 1);
    setFormData({ ...formData, fields: updated });
  };

  // ---------- Image Upload ----------
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.templateImages.length > 2) {
      alert("You can upload maximum 2 images.");
      return;
    }
    const readers = files.map(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        })
    );
    Promise.all(readers).then((images) => {
      setFormData({
        ...formData,
        templateImages: [...formData.templateImages, ...images],
      });
    });
  };

  // ---------- Frame Color Selection ----------
  const toggleFrameColor = (color) => {
    let updated = [...formData.frameColors];
    if (updated.includes(color)) {
      updated = updated.filter((c) => c !== color);
    } else {
      updated.push(color);
    }
    setFormData({ ...formData, frameColors: updated });
  };

  // ---------- Submit ----------
  const handleSubmit = async (e) => {
    e.preventDefault(); // Form submission prevent karna
    setLoading(true);
    try {
      if (!formData.name || !formData.description || !formData.category) {
        setLoading(false);
        return alert("Please fill all required fields");
      }

      if (formData.category === "Frames" && formData.frameColors.length === 0) {
        setLoading(false);
        return alert("Please select at least one frame color");
      }

      if (
        (formData.category === "Posters" ||
          formData.category === "Nikkah-Nama" || formData.category === "Posters With Frames") &&
        formData.hasFrame &&
        formData.frameColors.length === 0
      ) {
        setLoading(false);
        return alert("Please select at least one frame color");
      }

      if (formData.templateImages.length === 0) {
        setLoading(false);
        return alert("Please upload at least 1 image");
      }

      // Dropdown validation
      for (let f of formData.fields) {
        if (f.fieldType === "dropdown" && f.options.length === 0) {
          setLoading(false);
          return alert(
            `Dropdown field "${f.fieldName || "Unnamed"}" must have options`
          );
        }
      }

      await instance.post(
        "/custom-products/create-custom-product-template",
        formData
      );
      toast.success("Custom product template created successfully!");
      setFormData({
        name: "",
        stock: "",
        description: "",
        category: "",
        subCategory: "",
        hasFrame: "",
        frameColors: [],
        sizes: [],
        fields: [],
        templateImages: [],
        isNew: false,
      });
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Error creating template");
      setLoading(false);
    }
  };

  return (
    <form
      className="w-full max-h-[94vh] bg-white p-3 md:p-5 rounded-lg shadow-md overflow-y-auto scrollbar-hide"
      onSubmit={handleSubmit} // Form submit handler add kiya
    >
      <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center">
        Create Template
      </h1>

      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-600 font-medium">
              Creating Custom Product...
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Responsive Grid for Main Inputs */}
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
          <div className="border-b-2 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b-2 pb-6">
              {/* Category */}
              <div>
                <label className="block text-gray-700 text-base md:text-lg font-medium mb-2">
                  Product-Type:
                </label>
                <select
                  value={formData.category}
                  name="category"
                  onChange={handleCategoryChange}
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
              {/* Sub-Category */}
              <div>
                <label className="block text-gray-700 text-base md:text-lg font-medium mb-2">
                  Product-Category:
                </label>
                {formData.category && subCategories[formData.category] && (
                  <select
                    value={formData.subCategory}
                    name="subCategory"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        subCategory: e.target.value,
                      })
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
            <h3 className="text-center mt-6 mb-4 text-base md:text-[20px] underline font-semibold">
              Select Frame Options
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-base md:text-lg font-medium mb-2">
              {/* Frame Options */}
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
                      />{" "}
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
                            onChange={() => toggleFrameColor(color)}
                          />{" "}
                          {color}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="border-b-2 pb-6">
            {/* Sizes */}
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
                    disabled={formData.category === "Polaroids" || formData.category === "Stickers"}
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
                    type="button" // Explicitly button type set kiya
                    onClick={(e) => removeSize(e, i)}
                    className="w-full btn-square md:w-full text-white font-medium text-sm md:text-lg bg-red-500 hover:bg-red-600 rounded-lg transition-all"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-center pt-2">
              <button
                type="button" // Explicitly button type set kiya
                onClick={addSize}
                className="w-full md:w-full btn-square px-6 py-3 text-white font-medium text-sm md:text-lg bg-green-500 hover:bg-green-600 rounded-lg transition-all"
              >
                + Add Size & Price
              </button>
            </div>
          </div>

          {/* textarea-descrption */}
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
              {/* Fields */}
          <div className="border-b-2 pb-6">
            <h3 className="text-center mt-6 mb-8 text-base md:text-[20px] underline font-semibold">
              Custom Fields
            </h3>
            {formData.fields.map((f, i) => (
              <div key={i} className="border p-3 mb-2">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                <label className="block text-gray-600 font-medium mb-2">Field Name</label>
                 <input
                  type="text"
                  placeholder="Field Name"
                  value={f.fieldName}
                  onChange={(e) =>
                    handleFieldChange(i, "fieldName", e.target.value)
                  }
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                />
               </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-2">
                    Field Type:
                  </label>
                  <select
                  value={f.fieldType}
                  onChange={(e) =>
                    handleFieldChange(i, "fieldType", e.target.value)
                  }
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option value="text">Text</option>
                  <option value="textarea">Textarea</option>
                  <option value="number">Number</option>
                  <option value="date">Date</option>
                  <option value="image">Image</option>
                  <option value="color">Color</option>
                  <option value="dropdown">Dropdown</option>
                </select>
                </div>
                <div className="flex items-end gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={f.required}
                      className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500"
                      onChange={(e) =>
                        handleFieldChange(i, "required", e.target.checked)
                      }
                    />{" "}
                    Required
                  </label>
                  <button
                    type="button" // Explicitly button type set kiya
                    onClick={(e) => removeField(e, i)}
                    className="bg-red-500 text-white px-2 rounded ml-2"
                  >
                    Remove
                  </button>
                </div>
               </div>

                {/* Dropdown Options */}
                {f.fieldType === "dropdown" && (
                  <div className="ml-6 mt-2">
                    <label className="block mb-1">Options:</label>
                    {f.options.map((opt, oi) => (
                      <div key={oi} className="flex gap-2 mb-1">
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) =>
                            handleOptionChange(i, oi, e.target.value)
                          }
                          className="border p-1"
                          placeholder={`Option ${oi + 1}`}
                        />
                        <button
                          type="button" // Explicitly button type set kiya
                          onClick={(e) => removeOption(e, i, oi)}
                          className="bg-red-400 px-2 rounded text-white"
                        >
                          ❌
                        </button>
                      </div>
                    ))}
                    <button
                      type="button" // Explicitly button type set kiya
                      onClick={(e) => addOption(e, i)}
                      className="w-full md:w-full btn-square px-6 py-3 text-white font-medium text-sm md:text-lg bg-green-500 hover:bg-green-600 rounded-lg transition-all"
                    >
                      + Add Option
                    </button>
                  </div>
                )}
              </div>
            ))}
            <button
              type="button" // Explicitly button type set kiya
              onClick={addField}
              className="w-full md:w-full btn-square px-6 py-3 text-white font-medium text-sm md:text-lg bg-green-500 hover:bg-green-600 rounded-lg transition-all"
            >
              + Add Field
            </button>
          </div>

          <div className="border-b-2 pb-6">
            {/* Images */}
            <h3 className="text-center mt-6 mb-8 text-base md:text-[20px] underline font-semibold">
              Product Images
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-base md:text-lg font-medium mb-2">
                  Upload Images (Max 2):
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="w-full p-2 text-sm md:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                />
              </div>
              <div className="flex items-center">
                <p className="text-sm text-gray-600">
                  Selected Images: {formData.templateImages.length}/2
                </p>
              </div>
            </div>
            {formData.templateImages.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                {formData.templateImages.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img}
                      alt={`Product ${index + 1}`}
                      className="mt-4 h-24 w-24 md:h-32 md:w-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...formData.templateImages];
                        updated.splice(index, 1);
                        setFormData({ ...formData, templateImages: updated });
                      }}
                      className="absolute top-2 right-[95px] bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* submit */}
          <div className="flex justify-center pt-2">
            <button
              type="submit" // Submit button ke liye correct type
              className="w-full md:w-full px-6 py-3 text-white font-medium text-sm md:text-lg bg-green-500 hover:bg-green-600 rounded-lg transition-all"
            >
              Create Template
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
