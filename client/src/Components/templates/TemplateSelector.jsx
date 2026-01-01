import React, { useState } from 'react';
import { Check, Layout } from 'lucide-react';

const TemplateSelector = ({ selectedTemplate, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const templates = [
        { id: 'Classic', name: 'Classic', preview: "A classic resume template with a clean and professional layout." },
        { id: 'modern', name: 'Modern', preview: "A modern resume template with a sleek and modern design." },
        { id: 'minimal-image', name: 'Minimal-Image', preview: "A minimal resume template that includes a profile image section." },
        { id: 'minimal', name: 'Minimal', preview: "A minimal resume template with a clean and minimalistic design." },
    ];

    return (
        <div className="relative">
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 text-sm text-blue-700 
                           bg-white border border-blue-300 hover:bg-blue-50
                           transition-all px-3 py-2 rounded-lg shadow-sm"
            >
                <Layout size={15} />
                <span className="max-sm:hidden">Template</span>
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div
                    className="absolute top-full left-0 mt-3 w-72 p-4 space-y-3 
                               bg-white rounded-xl shadow-lg border border-gray-200 z-20"
                >
                    {templates.map((template) => (
                        <div
                            key={template.id}
                            onClick={() => {
                                onChange(template.id);
                                setIsOpen(false);
                            }}
                            className={`relative p-4 rounded-xl cursor-pointer transition-all 
                                shadow-sm border 
                                ${selectedTemplate === template.id
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-300 hover:border-gray-400 hover:bg-gray-100"
                                }`}
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
                            <div className="space-y-1">
                                <h4 className="font-semibold text-gray-800">
                                    {template.name}
                                </h4>

                                <p className="text-xs mt-1 p-2 bg-blue-100 italic rounded text-gray-700 leading-relaxed">
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
