import { Briefcase, PlusIcon, Sparkles, Trash2Icon } from 'lucide-react'
import React from 'react'

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
                    {/* FIX 1: Changed curly braces {} to parentheses () for implicit return */}
                    {data.map((experience, index) => (
                        <div key={index} className='border border-gray-300 rounded-lg p-4 space-y-3'>
                            <div className='flex justify-between items-start'>
                                <h4>Experience #{index + 1}</h4>
                                <button onClick={() => removeExperience(index)} className='text-red-500 hover:text-red-700 transition-colors'>
                                    <Trash2Icon className='size-4' />
                                </button>
                            </div>
                            
                            {/* FIX 2: Changed <iput> to <input> and added border classes so you can see them */}
                            <div className='grid md:grid-cols-2 gap-3'>
                                <input 
                                    value={experience.company || ""} 
                                    onChange={(e) => updateExperience(index, "company", e.target.value)} 
                                    type="text" 
                                    placeholder="Company Name" 
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input 
                                    value={experience.position || ""} 
                                    onChange={(e) => updateExperience(index, "position", e.target.value)} 
                                    type="text" 
                                    placeholder="Job Title" 
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            
                            <div className='grid md:grid-cols-2 gap-3'>
                                <input 
                                    value={experience.start_date || ""} 
                                    onChange={(e) => updateExperience(index, "start_date", e.target.value)} 
                                    type="month" 
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input 
                                    value={experience.end_date || ""} 
                                    onChange={(e) => updateExperience(index, "end_date", e.target.value)} 
                                    type="month" 
                                    disabled={experience.is_current} 
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <label className='flex items-center gap-2 cursor-pointer'>
                                <input 
                                    type="checkbox" 
                                    checked={experience.is_current || false} 
                                    onChange={(e) => updateExperience(index, "is_current", e.target.checked)} 
                                    className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                                />
                                <span className='text-sm text-gray-700'>Currently Working here</span>
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