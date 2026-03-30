import { Check, TypeIcon } from "lucide-react";
import React, { useState } from "react";

const fonts = [
  {
    value: "inter",
    label: "Default",
    displayName: "Inter",
    fontFamily: '"Inter", "Segoe UI", sans-serif',
    googleImport: null,
  },
  {
    value: "georgia",
    label: "Georgia",
    displayName: "Noto Sans Georgian",
    fontFamily: '"Noto Sans Georgian", Georgia, serif',
    googleImport:
      "https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@400..900&display=swap",
  },
  {
    value: "poppins",
    label: "Poppins",
    displayName: "Poppins",
    fontFamily: '"Poppins", sans-serif',
    googleImport: "https://fonts.googleapis.com/css2?family=Poppins:wght@400..900&display=swap",
  },

];

export const FONT_MAP = fonts;

const FontPicker = ({ selectedFont, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full sm:w-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center justify-center gap-2
          text-xs sm:text-sm text-emerald-700
          bg-white border border-emerald-300
          hover:bg-emerald-50 transition-all
          px-3 sm:px-4 py-2 rounded-lg shadow-sm
          w-full sm:w-auto
        "
      >
        <TypeIcon size={16} />
        <span className="hidden sm:inline">Typography</span>
      </button>

      {isOpen && (
        <div
          className="
            absolute top-full left-0 mt-3
            w-full sm:w-64
            p-3 rounded-xl
            bg-white shadow-xl
            border border-gray-200
            z-50
          "
        >
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">
            Choose Font
          </p>

          <div className="space-y-1">
            {fonts.map((font) => (
              <div
                key={font.value}
                className={`
                  relative cursor-pointer
                  px-3 py-2.5 rounded-lg
                  border transition-all
                  ${selectedFont === font.value
                    ? "border-emerald-400 bg-emerald-50"
                    : "border-transparent hover:bg-gray-50 hover:border-gray-200"
                  }
                `}
                onClick={() => {
                  onChange(font.value);
                  setIsOpen(false);
                }}
              >
                {selectedFont === font.value && (
                  <div className="absolute top-2.5 right-2.5 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-white" />
                  </div>
                )}

                <p
                  className="text-sm font-medium text-gray-800"
                  style={{ fontFamily: font.fontFamily }}
                >
                  {font.label}
                </p>


              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FontPicker;