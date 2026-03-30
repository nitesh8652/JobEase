import { Globe2, Linkedin, LocationEdit, Mail, Phone, User, User2 } from 'lucide-react'
import React from 'react'

const PersonalInfoForm = ({ data, onChange, accentColor }) => {

    const handleChange = (field, value) => {
        const updated = { ...data, [field]: value }
        onChange(updated)

        // 🔐 Save image to localStorage ONLY if field is image
        if (field === "image" && typeof value === "string") {
            localStorage.setItem("resume_profile_image", value)
        }
    }

    //  Convert file → base64 (for localStorage)
    const handleImageUpload = (file) => {
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            handleChange("image", reader.result) // base64 string
        }
        reader.readAsDataURL(file)
    }

    const fields = [
        { key: "full_name", label: "Full Name", type: "text", required: true, icon: User },
        { key: "phone", label: "Phone Number", type: "tel", required: true, icon: Phone },
        { key: "email", label: "Email Address", type: "email", required: true, icon: Mail },
        { key: "location", label: "Location", type: "text", required: true, icon: LocationEdit },
        { key: "profession", label: "Profession", type: "text", required: true, icon: User2 },
        { key: "linkedin", label: "LinkedIn Profile", type: "url", required: false, icon: Linkedin },
        { key: "website", label: "Personal Website", type: "url", required: false, icon: Globe2 },
    ]

    return (
        <div>
            {/* HEADER + IMAGE */}
            <div className='flex items-center gap-6'>
                <label htmlFor='profileImage' className="cursor-pointer">
                    {data.image ? (
                        <div
                            className='w-16 h-16 rounded-full mt-6 ring ring-slate-300 hover:opacity-80 flex items-center justify-center overflow-hidden flex-shrink-0'
                            style={{ backgroundColor: accentColor }}
                        >
                            <img
                                src={data.image}
                                alt='Profile'
                                className='w-full h-full object-cover rounded-full'
                            />
                        </div>
                    ) : (
                        <div className='inline-flex items-center gap-2 mt-5 text-slate-500 hover:text-slate-700 flex-shrink-0 bg-blue-100 px-3 py-2 rounded-2xl'>
                            <User className='size-10 p-2.5 border rounded-full' />
                            <span className="text-sm">Upload User Image</span>
                        </div>
                    )}

                    <input
                        id="profileImage"
                        type='file'
                        accept='image/jpeg, image/png'
                        className='hidden'
                        onChange={(e) => handleImageUpload(e.target.files[0])}
                    />
                </label>

                <div className='flex flex-col gap-1 mt-6'>
                    <h3 className='text-lg font-semibold text-gray-900 leading-none'>
                        Personal Information
                    </h3>
                    <p className='text-sm text-gray-600'>
                        Get Started With Personal Information
                    </p>
                </div>
            </div>

            {/* INPUT FIELDS */}
            {fields.map((field) => {
                const Icon = field.icon
                return (
                    <div key={field.key} className='space-y-1 mt-5'>
                        <label className='flex items-center gap-2 text-sm font-medium text-gray-600'>
                            <Icon className='size-4' />
                            {field.label}
                            {field.required && <span className='text-red-500'>*</span>}
                        </label>
                        <input
                            type={field.type}
                            value={data[field.key] || ""}
                            onChange={(e) => handleChange(field.key, e.target.value)}
                            className='mt-1 w-full px-3 py-2 border border-gray-400 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm'
                            placeholder={`Enter your ${field.label.toLowerCase()}`}
                            required={field.required}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default PersonalInfoForm
