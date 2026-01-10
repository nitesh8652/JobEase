import { Sparkles } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const Summary = ({ data, onChange }) => {

    const tips = [
        'Tip: Keep it concise!',
        'Tip: Highlight your career objectives!',
        'Avoid "I" or "Me"; start sentences with strong verbs.',
        'Quantify achievements with numbers where possible!',
        'Include key certifications (like AWS, PMP) if you have them.',
        'Mention your top technical strengths immediately!',
        'Check again! typos ruin the first impression.',
        'Avoid complex words, keep it readable for HR.'
    ]

    const [currentTipIndex, setCurrentTipIndex] = useState(0)
    const [fade, setFade] = useState(true)

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false) // fade out

            setTimeout(() => {
                setCurrentTipIndex((prev) => (prev + 5) % tips.length)
                setFade(true) // fade in
            }, 300)

        }, 3000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className='space-y-4'>

            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='text-lg font-semibold text-gray-900'>Summary</h3>
                    <p className='text-sm text-gray-500'>Add summary for your resume.</p>
                </div>

                <button className='flex items-center gap-1 text-sm text-blue-800
                    bg-blue-50 hover:bg-blue-100 transition-all px-2 py-1 rounded-lg shadow-sm'>
                    <Sparkles className='size-4' />
                    AI Enhance
                </button>
            </div>

            <div className='mt-6'>
                <textarea
                    value={data || ""}
                    onChange={(e) => onChange(e.target.value)}
                    rows={7}
                    className='w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg
                        focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none resize-none'
                    placeholder='Write a summary that highlights your career objectives!'
                />

                <p
                    className={`text-xs text-gray-500 mt-2 text-center transition-opacity duration-300 ${
                        fade ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    {tips[currentTipIndex]}
                </p>
            </div>

        </div>
    )
}

export default Summary
