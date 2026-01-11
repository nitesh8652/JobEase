import { Briefcase, PlusIcon, Sparkles, Trash2Icon, Calendar } from 'lucide-react'
import React from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // Don't forget this import!

const Experience = ({ data = [], onChange }) => {

    const addExperience = () => {
        const newExperience = {
            company: '',
            position: '',
            start_date: '',
            end_date: '',
            is_current: false,
            description: ''
        };
        onChange([...data, newExperience])
    }

    const removeExperience = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated)
    }

    const updateExperience = (index, field, value) => {
        const updated = [...data]
        updated[index] = { ...updated[index], [field]: value }
        onChange(updated)
    }

    // HELPER 1: Convert "YYYY-MM" string -> Date Object (For the Picker)
    const parseDate = (dateStr) => {
        if (!dateStr) return null;
        const [year, month] = dateStr.split('-');
        return new Date(parseInt(year), parseInt(month) - 1);
    }

    // HELPER 2: Convert Date Object -> "YYYY-MM" string (For the State)
    const formatDate = (date) => {
        if (!date) return "";
        // date.toISOString() can sometimes be off by a day due to timezones
        // It's safer to manually construct the YYYY-MM string
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        return `${year}-${month}`;
    }

    const today = new Date();

    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='text-lg font-bold text-gray-900'>Experience</h3>
                    <p className='text-sm text-gray-500'>Add experience for your resume.</p>
                </div>

                <button onClick={addExperience} className='flex items-center gap-1 text-sm text-blue-800 bg-blue-50 hover:bg-blue-100 transition-all px-2 py-1 rounded-lg shadow-sm'>
                    <PlusIcon className='size-4' />
                    Add Experience
                </button>
            </div>
            
            {data.length === 0 ? (
                <div className='text-center py-8 text-gray-500'>
                    <Briefcase className='w-12 h-12 mx-auto mb-3 text-gray-300' />
                    <p>No work experience added yet!</p>
                    <p className='text-sm '>Click 'Add Experience' to get started.</p>
                </div>
            ) : (
                <div className='space-y-4'>
                    {data.map((experience, index) => (
                        <div key={index} className='border border-gray-300 rounded-lg p-4 space-y-3 bg-white'>
                            <div className='flex justify-between items-start'>
                                <h4>Experience #{index + 1}</h4>
                                <button onClick={() => removeExperience(index)} className='text-red-500 hover:text-red-700 transition-colors'>
                                    <Trash2Icon className='size-4' />
                                </button>
                            </div>
                            
                            <div className='grid md:grid-cols-2 gap-3'>
                                <input 
                                    value={experience.company || ""} 
                                    onChange={(e) => updateExperience(index, "company", e.target.value)} 
                                    type="text" 
                                    placeholder="Company Name" 
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                />
                                <input 
                                    value={experience.position || ""} 
                                    onChange={(e) => updateExperience(index, "position", e.target.value)} 
                                    type="text" 
                                    placeholder="Job Title" 
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                />
                            </div>
                            
                            <div className='grid md:grid-cols-2 gap-3'>
                                {/* START DATE PICKER */}
                                <div className='relative w-full'>
                                    <DatePicker 
                                        selected={parseDate(experience.start_date)} 
                                        onChange={(date) => updateExperience(index, "start_date", formatDate(date))} 
                                        dateFormat="MMM yyyy"
                                        showMonthYearPicker
                                        placeholderText="Start Date"
                                        maxDate={today}
                                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-9"
                                    />
                                    {/* Icon overlay */}
                                    <Calendar className='absolute left-2.5 top-2.5 size-4 text-gray-400 pointer-events-none' />
                                </div>

                                {/* END DATE PICKER */}
                                <div className='relative w-full'>
                                    <DatePicker 
                                        selected={parseDate(experience.end_date)} 
                                        onChange={(date) => updateExperience(index, "end_date", formatDate(date))} 
                                        dateFormat="MMM yyyy"
                                        showMonthYearPicker
                                        placeholderText="End Date"
                                        disabled={experience.is_current}
                                        minDate={parseDate(experience.start_date)}
                                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-9"
                                    />
                                    <Calendar className='absolute left-2.5 top-2.5 size-4 text-gray-400 pointer-events-none' />
                                </div>
                            </div>

                            <label className='flex items-center gap-2 cursor-pointer w-fit'>
                                <input 
                                    type="checkbox" 
                                    checked={experience.is_current || false} 
                                    onChange={(e) => updateExperience(index, "is_current", e.target.checked)} 
                                    className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                                />
                                <span className='text-sm text-gray-700 select-none'>Currently Working here</span>
                            </label>

                            <div className='space-y-2'>
                                <div className='flex items-center justify-between'>
                                    <label className='text-sm font-medium text-gray-700'>Job Description</label>
                                    <button className='flex items-center gap-1 text-xs text-purple-600 hover:text-purple-800 transition-colors'>
                                        <Sparkles className='w-3 h-3' />
                                        Enhance with AI
                                    </button>
                                </div>
                                <textarea 
                                    value={experience.description || ''} 
                                    onChange={(e) => updateExperience(index, 'description', e.target.value)} 
                                    rows={4} 
                                    className='w-full text-sm px-3 py-2 rounded-lg resize-none border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500' 
                                    placeholder='Describe your responsibilities!'
                                /> 
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Experience