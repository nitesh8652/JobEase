import { Check, PaletteIcon } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const ColorPicker = ({ selectedColor, onChange }) => {
  const colors = [
    { name: "Slate", value: "#475569" },
    { name: "Blue", value: "#3B82F6" },
    { name: "Midnight", value: "#1e3a8a" },
    { name: "Indigo", value: "#6366F1" },
    { name: "Azure", value: "#0284c7" },
    { name: "Pink", value: "#EC4899" },
    { name: "Fuchsia", value: "#c026d3" },
    { name: "Violet", value: "#7c3aed" },
    { name: "Teal", value: "#0d9488" },
    { name: "Forest", value: "#14532d" },
    { name: "Olive", value: "#65a30d" },
    { name: "Cyan", value: "#0891b2" },
    { name: "Red", value: "#EF4444" },
    { name: "Rose", value: "#e11d48" },
    { name: "Grey", value: "#64748B" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative w-full sm:w-auto" ref={dropdownRef}>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center justify-center gap-2
          text-xs sm:text-sm text-purple-700
          bg-white border border-purple-300
          hover:bg-purple-50 transition-all
          px-3 sm:px-4 py-2 rounded-lg shadow-sm
          w-full sm:w-auto
        "
      >
        <PaletteIcon size={16} />
        <span className="hidden sm:inline">Accent</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="
            absolute top-full left-0 mt-3
            w-full sm:w-80
            max-h-[70vh] overflow-y-auto
            p-4 rounded-xl
            bg-white shadow-xl
            border border-gray-200
            z-50
          "
        >
          <div className="grid grid-cols-4 sm:grid-cols-4 gap-4">
            {colors.map((color) => (
              <div
                key={color.value}
                className="relative cursor-pointer flex flex-col items-center gap-1"
                onClick={() => {
                  onChange(color.value);
                  setIsOpen(false);
                }}
              >
                {/* Color Circle */}
                <div
                  className="
                    w-8 h-8 sm:w-9 sm:h-9
                    rounded-full transition-all
                    border border-gray-300
                    hover:scale-110 hover:border-gray-500
                    shadow-sm
                  "
                  style={{ backgroundColor: color.value }}
                />

                {/* Checkmark */}
                {selectedColor === color.value && (
                  <div className="absolute top-0 left-0 right-0 flex justify-center -mt-1">
                    <div className="w-5 h-5 bg-white rounded-full shadow flex items-center justify-center border border-purple-400">
                      <Check className="w-3 h-3 text-purple-600" />
                    </div>
                  </div>
                )}

                {/* Label */}
                <p className="text-[10px] sm:text-xs text-gray-700 mt-1 text-center">
                  {color.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
