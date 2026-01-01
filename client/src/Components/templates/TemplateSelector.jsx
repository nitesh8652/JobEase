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
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 text-sm text-blue-600 bg-gradient-to-br from-blue-50 to-blue-200 ring-blue-400 hover:ring transition-all px-3 py-2 rounded-lg"
            >
                <Layout size={14} />
                <span className="max-sm:hidden">Template</span>
            </button>

            {isOpen && (
                <div className="absolute top-full w-xs p-3 mt-2 space-y-3 z-10 bg-white rounded-md border border-gray-200 shadow-sm">

                    {templates.map((template) => (
                        <div
                            key={template.id}
                            onClick={() => {
                                onChange(template.id);
                                setIsOpen(false);
                            }}
                            className={`relative p-3 border rounded-md cursor-pointer transition-all 
                                ${selectedTemplate === template.id
                                    ? "border-blue-500 bg-blue-100"
                                    : "border-gray-300 hover:border-gray-400 hover:bg-gray-100"}`}
                        >
                            {/* Selected Checkmark */}
                            {selectedTemplate === template.id && (
                                <div className="absolute top-2 right-2">
                                    <div className="size-5 bg-blue-500 rounded-full flex items-center justify-center">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                </div>
                            )}

                            {/* Template Content */}
                            <div className="space-y-1">
                                <h4 className="font-medium text-gray-700">{template.name}</h4>
                                <div className="mt-2 p-2 bg-blue-100 rounded text-xs text-gray-600 italic">
                                    {template.preview}
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
};

export default TemplateSelector;
