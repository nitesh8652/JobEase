import React, { useState, useRef, useEffect } from 'react';
import { Check, Layout } from 'lucide-react';

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const templates = [
    { id: 'classic', name: 'Classic', preview: "A classic resume template with a clean and professional layout. Suitable for every role." },
    { id: 'ats', name: 'Clean & Minimal', preview: "Single-column ATS-optimised layout specially for developers. Clean sections with bullet points ideal for passing automated resume screening." },
    { id: 'modern', name: 'Modern', preview: "A modern resume template with a sleek and modern design. Ideal for modern job roles er-index=0 reference-tracker>or professionals." },
    { id: 'minimal-image', name: 'Minimal-Image', preview: "A minimal resume template that includes a profile image section. good for creatives job roles." },
    { id: 'minimal', name: 'Simple', preview: "A minimal resume template with a clean and simple ui. ideal fro simple roles." },
  ];

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
        className="flex items-center justify-center gap-2 
                   text-xs sm:text-sm text-blue-700 
                   bg-white border border-blue-300 
                   hover:bg-blue-50 transition-all 
                   px-3 sm:px-4 py-2 rounded-lg shadow-sm 
                   w-full sm:w-auto"
      >
        <Layout size={16} />
        <span className="hidden sm:inline">Template</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="
            absolute top-full left-0 mt-3 
            w-full sm:w-80 
            max-h-[70vh] overflow-y-auto
            p-4 space-y-3 
            bg-white rounded-xl shadow-xl 
            border border-gray-200 z-50
          "
        >
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => {
                onChange(template.id);
                setIsOpen(false);
              }}
              className={`
                relative p-4 rounded-xl cursor-pointer transition-all 
                border text-sm
                ${selectedTemplate === template.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-100"
                }
              `}
            >
              {/* Checkmark */}
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2">
                  <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}

              {/* Template Info */}
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                    {template.name}
                  </h4>
                  {template.id === 'ats' && (
                    <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-[4px] tracking-wide">
                      Recommended!
                    </span>
                  )}
                </div>

                <p className="text-xs mt-2 p-2 bg-blue-100 italic rounded text-gray-700 leading-relaxed">
                  {template.preview}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
