import { ChevronDown } from "lucide-react";

const DropdownSelector = ({ 
  label, 
  placeholder, 
  options, 
  selectedValue, 
  isOpen, 
  onToggle, 
  onSelect, 
  required = false 
}) => {
  return (
    <div className="relative dropdown-container">
      <h3 className="text-base sm:text-lg poppins-semibold text-[#80011f] mb-2">
        {label}
        {required && <span className="text-[#80011f]">*</span>}
      </h3>
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex cursor-pointer poppins-regular justify-between items-center border border-[#80011f] text-[#80011f] bg-transparent rounded-xl px-3 sm:px-4 py-2 sm:py-3 shadow-sm hover:shadow-md transition-all duration-300 text-sm sm:text-base"
      >
        {selectedValue || placeholder}
        <ChevronDown
          className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-full border border-[#80011f] shadow-lg z-30 rounded-lg overflow-hidden max-h-60 overflow-y-auto">
          {options.map((option, idx) => (
            <div
              key={idx}
              onClick={() => onSelect(option)}
              className="cursor-pointer px-3 poppins-regular sm:px-4 py-2 sm:py-3 text-[#80011f] bg-[#ffdf9e] hover:bg-[#80011f] hover:text-[#ffdf9e] transition-colors duration-200 text-sm sm:text-base"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownSelector;
