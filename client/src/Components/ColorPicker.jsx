import { Check, PaletteIcon } from "lucide-react";
import React, { useState } from "react";

const ColorPicker = ({ selectedColor, onChange }) => {
  const colors = [
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
    { name: "Green", value: "#22C55E" },
    { name: "Cyan", value: "#0891b2" },
    { name: "Red", value: "#EF4444" },
    { name: "Rose", value: "#e11d48" },
    { name: "Grey", value: "#64748B" },
    { name: "Slate", value: "#475569" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-purple-700 
                   bg-white border border-purple-300 hover:bg-purple-50
                   transition-all px-3 py-2 rounded-lg shadow-sm"
      >
        <PaletteIcon size={15} />
        <span className="max-sm:hidden">Accent</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="grid grid-cols-4 gap-4 w-64 absolute top-full left-0 p-4 
                     mt-3 rounded-xl bg-white shadow-lg border border-gray-200 z-20"
        >
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
                className="w-9 h-9 rounded-full transition-all border border-gray-300 
                           hover:scale-110 hover:border-gray-500 shadow-sm"
                style={{ backgroundColor: color.value }}
              ></div>

              {/* Checkmark */}
              {selectedColor === color.value && (
                <div className="absolute top-0 left-0 right-0 flex justify-center -mt-1">
                  <div className="w-5 h-5 bg-white rounded-full shadow flex items-center justify-center border border-purple-400">
                    <Check className="w-3 h-3 text-purple-600" />
                  </div>
                </div>
              )}

              {/* Label */}
              <p className="text-xs text-gray-700 mt-1">{color.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
