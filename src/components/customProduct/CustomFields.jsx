import DropdownSelector from "./CustomProductDropdownSelector";

const CustomFields = ({
  fields,
  customFields,
  customFieldDropdowns,
  onFieldChange,
  onToggleDropdown,
  onDropdownSelect,
  validation,
}) => {
  if (!fields || fields.length === 0) return null;

  const renderField = (field) => {
    switch (field.fieldType) {
      case "text":
        return (
          <input
            type="text"
            value={customFields[field.fieldName] || ""}
            onChange={(e) => onFieldChange(field.fieldName, e.target.value)}
            className="w-full border poppins-regular bg-transparent placeholder:poopins-regular placeholder:text-[#80011f] placeholder:capitalize border-[#80011f] rounded-lg p-2 text-sm sm:text-base focus:ring-2 focus:ring-[#80011f] focus:outline-none"
            placeholder={field.fieldName}
            required={field.required}
          />
        );

      case "image":
        return (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                onFieldChange(field.fieldName, file);
              }
            }}
            className="w-full border text-[#80011f] poppins-regular bg-transparent placeholder:text-[#80011f] placeholder:capitalize border-[#80011f] rounded-lg p-2 text-sm sm:text-base focus:ring-2 focus:ring-[#80011f] focus:outline-none  file:bg-[#80011f] file:text-[#ffefcc] file:poppins-regular file:rounded-md file:border-0 file:px-4 file:py-2 file:cursor-pointer"
            required={field.required}
          />
        );

      case "dropdown":
        return (
          <DropdownSelector
            label=""
            placeholder={`Select ${field.fieldName}`}
            options={field.options || []}
            selectedValue={customFields[field.fieldName]}
            isOpen={customFieldDropdowns[field.fieldName]}
            onToggle={() => onToggleDropdown(field.fieldName)}
            onSelect={(option) => onDropdownSelect(field.fieldName, option)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-base poppins-semibold text-center border-t-2 border-[#80011f] pt-4 sm:text-lg font-semibold text-[#80011f] mb-3">
        Customize Your Product
      </h3>

      {fields.map((field, index) => (
        <div key={index} className="space-y-2 capitalize">
          {/* Label */}
          <label className="block  text-sm sm:text-base poppins-medium text-[#80011f]">
            {field.fieldName}
            {field.required ? (
              <span className="text-primary ml-1">*</span>
            ) : (
              <span className="text-primary poopins-regular ml-1 text-xs">
                (Optional)
              </span>
            )}
          </label>

          {/* Field Renderer */}
          {renderField(field, index)}
        </div>
      ))}

      {/* Validation Message */}
      {!validation.isValid && (
        <div className="bg-[#80011f] border border-[#ffdf9e] rounded-lg p-3">
          <p className="text-sm text-[#ffefcc]">
            <span className="poppins-semibold">Required fields missing:</span>{" "}
            Please fill in {validation.missingFields.join(" | ")} to proceed.
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomFields;
