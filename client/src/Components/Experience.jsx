import { Briefcase, Sparkles, Trash2Icon, Calendar } from 'lucide-react'
import { GoogleGenerativeAI } from '@google/generative-ai';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import Experiencebtt from './Buttons/Experiencebtt';
import AIexp from './Buttons/AIexp';
import AIOverlay from './AILoader.jsx';
import { useState } from "react";


const Experience = ({ data = [], onChange }) => {

    const [loadingIndex, setLoadingIndex] = useState(null);


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

    const genAI = new GoogleGenerativeAI(
        import.meta.env.VITE_GEMINI_API_KEY
    )

    const enhanceAi = async (index) => {
        const exp = data[index]

        if (!exp.company || !exp.position) {
            toast.error("Please fill in the Company and Position fields for AI enhancement!");
            return;
        }

        if (!exp.description || exp.description.trim().length < 10) {
            toast.error("Description cannot be empty for AI enhancement!");
            return;
        }

        try {

            setLoadingIndex(index);

            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })
            const prompt = `
            Act as a Senior Technical Recruiter and ATS Optimization Expert. 
            Your task is to rewrite the following "Work Experience" description.

            Goal: Maximum ATS score with High Readability.

            Strict Rules:
            1. Format the output strictly as 3 to 4 concise achievement statements (new lines only).
            2. Start EVERY line with a strong, high-impact ACTION VERB.
            3. **Vocabulary Rule:** Use clear, direct, and powerful verbs (e.g., "Led", "Developed", "Engineered", "Optimized") instead of overly complex or flowery ones (e.g., avoid "Orchestrated", "Synergized", "Galvanized") UNLESS the complex word is a specific industry standard term.
            4. **ATS Priority:** Ensure all technical skills, tools, and metrics from the input are preserved and highlighted.
            5. Remove all personal pronouns (I, me, my, we).
            6. Transform basic duties into "Action + Context + Result" statements.
            7. Eliminate fluff and buzzwords. Keep it direct.
            8. Do NOT provide introductory or concluding remarks.
            9. CRITICAL: Do NOT use bullet points, asterisks (*), or dashes (-) at the start. Just plain text lines.
            10. use easy words as far as possible, but do not dumb down the content. The goal is to be ATS-friendly while still impactful for human readers.
            11. include numbers and metrics (e.g., “increased sales by 30%”)
            
            Role:${exp.position || "Job Role"}
            Company:${exp.company || "Company"}

            Description:
            "${exp.description}"
            `;

            const result = await model.generateContent(prompt)
            const enhancedtxt = result.response.text();
            updateExperience(index, "description", enhancedtxt)
 toast.success("Job description enhanced with AI!");
        } catch (error) {
            console.error(error)
            toast.error("AI enhancement failed. Please try again.")
        } finally {
            setLoadingIndex(null);
        }

    }

    // HELPER Convert "YYYY-MM" string -> Date Object (For the Picker)
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

        <>
            {loadingIndex !== null && <AIOverlay />}
            <div className='space-y-6'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h3 className='text-lg font-bold text-gray-900'>Experience</h3>
                        <p className='text-sm text-gray-500'>Add experience for your resume.</p>
                    </div>


                    <Experiencebtt onClick={addExperience} />

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
                                    
                                    <textarea
                                        value={experience.description || ''}
                                        onChange={(e) => updateExperience(index, 'description', e.target.value)}
                                        rows={4}
                                        className='w-full text-sm px-3 py-2 rounded-lg resize-none border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        placeholder='Describe your responsibilities!'
                                    />
                                </div>
                                <AIexp onClick={() => enhanceAi(index)} />
                            </div>

                        ))}
                    </div>
                )}

            </div>
        </>
    )
}

export default Experience