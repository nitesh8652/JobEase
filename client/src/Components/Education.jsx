import { Plus, GraduationCapIcon, Trash2Icon, Sparkles, Calendar } from 'lucide-react'
import React from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function Education({ data, onChange, template }) {

    const addEducation = () => {
        const newEducation = {
            institute: '',
            degree: '',
            start_date: '',
            end_date: '',
            cgpa: '',
            is_current: false,
            has_backlogs: false,
            description: ''
        };
        onChange([...data, newEducation])
    }

    const removeEducation = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated)
    }

    const updateEducation = (index, field, value) => {
        const updated = [...data]
        updated[index] = { ...updated[index], [field]: value }
        onChange(updated)
    }

    // FIX: Special handler for "Currently Studying" to handle both logic steps at once
    const handleCurrentStudyChange = (index, isChecked) => {
        const updated = [...data];
        updated[index] = {
            ...updated[index],
            is_current: isChecked,
            // If checked, clear the end date immediately in the same update
            end_date: isChecked ? '' : updated[index].end_date
        };
        onChange(updated);
    }

    // FIX: Special handler for "Backlogs" to handle both logic steps at once
    const handleBacklogChange = (index, isChecked) => {
        const updated = [...data];
        updated[index] = {
            ...updated[index],
            has_backlogs: isChecked,
            // If checked, clear the CGPA immediately in the same update
            cgpa: isChecked ? '' : updated[index].cgpa
        };
        onChange(updated);
    }

    const parseDate = (dateStr) => {
        if (!dateStr) return null;
        const [year, month] = dateStr.split('-');
        return new Date(parseInt(year), parseInt(month) - 1);
    }

    const formatDate = (date) => {
        if (!date) return "";
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        return `${year}-${month}`;
    }

    const today = new Date();

    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='text-lg font-bold text-gray-900'>Education</h3>
                    <p className='text-sm text-gray-500'>Add your educational background.</p>
                </div>

                <button onClick={addEducation} className='flex items-center gap-1 text-sm text-blue-800 bg-blue-50 hover:bg-blue-100 transition-all px-2 py-2 rounded-md shadow-sm'>
                    <Plus className='size-4' />
                    Add Education
                </button>
            </div>

            {data.length === 0 ? (
                <div className='text-center py-8 text-gray-500'>
                    <GraduationCapIcon className='w-12 h-12 mx-auto mb-3 text-gray-300' />
                    <p>No education has been added yet!</p>
                    <p className='text-sm '>Click 'Add Education' to get started.</p>
                </div>
            ) : (
                <div className='space-y-4'>
                    {data.map((education, index) => (
                        <div key={index} className='border border-gray-300 rounded-lg p-4 space-y-3 bg-white'>
                            <div className='flex justify-between items-start'>
                                <h4>Degree #{index + 1}</h4>
                                <button onClick={() => removeEducation(index)} className='text-red-500 hover:text-red-700 transition-colors'>
                                    <Trash2Icon className='size-4' />
                                </button>
                            </div>

                            {/* ROW 1: Institute & Degree */}
                            <div className='grid md:grid-cols-2 gap-3'>
                                <input
                                    value={education.institute || ""}
                                    onChange={(e) => updateEducation(index, "institute", e.target.value)}
                                    type="text"
                                    placeholder="College/University Name"
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                />
                                <input
                                    value={education.degree || ""}
                                    onChange={(e) => updateEducation(index, "degree", e.target.value)}
                                    type="text"
                                    placeholder="Degree/Field"
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                />
                            </div>

                            {/* ROW 2: Dates & CGPA */}
                            <div className='grid md:grid-cols-2 gap-3'>
                                <div className='grid grid-cols-2 gap-3'>
                                    {/* Start Date */}
                                    <div className='relative w-full'>
                                        <DatePicker
                                            selected={parseDate(education.start_date)}
                                            onChange={(date) => updateEducation(index, "start_date", formatDate(date))}
                                            dateFormat="MMM yyyy"
                                            showMonthYearPicker
                                            placeholderText="Start"
                                            maxDate={today}
                                            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-9"
                                        />
                                        <Calendar className='absolute left-2.5 top-2.5 size-4 text-gray-400 pointer-events-none' />
                                    </div>

                                    {/* End Date */}
                                    <div className='relative w-full'>
                                        <DatePicker
                                            selected={parseDate(education.end_date)}
                                            onChange={(date) => updateEducation(index, "end_date", formatDate(date))}
                                            dateFormat="MMM yyyy"
                                            showMonthYearPicker
                                            placeholderText="End"
                                            disabled={education.is_current}
                                            minDate={parseDate(education.start_date)}
                                            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 pl-9"
                                        />
                                        <Calendar className='absolute left-2.5 top-2.5 size-4 text-gray-400 pointer-events-none' />
                                    </div>
                                </div>

                                {/* CGPA Input */}
                                <input
                                    value={education.cgpa || ""}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        if (val === '' || /^[0-9]*\.?[0-9]*$/.test(val)) {
                                            updateEducation(index, "cgpa", val);
                                        }
                                    }}
                                    type="text"
                                    placeholder="CGPA / Percentage"
                                    disabled={education.has_backlogs}
                                    className={`px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full ${education.has_backlogs ? 'bg-gray-100 cursor-not-allowed text-gray-400' : ''}`}
                                />
                            </div>

                            {/* ROW 3: Checkboxes */}
                            <div className='flex gap-4'>
                                <label className='flex items-center gap-2 cursor-pointer w-fit'>
                                    <input
                                        type="checkbox"
                                        checked={education.is_current || false}
                                        // FIX: Use the new single-update handler
                                        onChange={(e) => handleCurrentStudyChange(index, e.target.checked)}
                                        className='rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer'
                                    />
                                    <span className='text-sm text-gray-700 select-none'>Currently Studying here</span>
                                </label>

                                <label className='flex items-center gap-2 cursor-pointer w-fit'>
                                    <input
                                        type="checkbox"
                                        checked={education.has_backlogs || false}
                                        // FIX: Use the new single-update handler
                                        onChange={(e) => handleBacklogChange(index, e.target.checked)}
                                        className='rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer'
                                    />
                                    <span className='text-sm text-gray-700 select-none'>Backlogs/Fail</span>
                                </label>
                            </div>

                            {/* ROW 4: Description */}

                            {template !== "minimal-image" && (
                                <div className='space-y-2'>
                                    <div className='flex items-center justify-between'>
                                        <label className='text-sm font-medium text-gray-700'>Description</label>
                                        <button className='flex items-center gap-1 text-xs text-purple-800 hover:bg-[#052355] rounded-md py-2 px-3 bg-purple-100 transition-colors shadow-sm hover:text-white'>
                                            <Sparkles className='w-3 h-3 ' />
                                            Enhance with AI
                                        </button>
                                    </div>
                                    <textarea
                                        value={education.description || ''}
                                        onChange={(e) => updateEducation(index, 'description', e.target.value)}
                                        rows={3}
                                        className='w-full text-sm px-3 py-2 rounded-lg resize-none border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        placeholder='Briefly describe your major subjects or achievements...'
                                    />
                                </div>
                            )}


                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Education;
