import { Sparkle, Sparkles } from 'lucide-react'
import React from 'react'

const Summary = ({ data, onChange, setResumeData }) => {
    return (
        <div className='space-y-4'>

            <div className='flex items-center justify-between'>

                <div>
                    <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Summary</h3>
                    <p className='text-sm text-gray-500'>Add summary for resume</p>
                </div>
                <button className='flex items-center'>
                    <Sparkles className='size-4' />
                    AI Enhance
                </button>
            </div>

            <div className='mt-6'>
                <textarea value={data || ""} onChange={(e)=>{onChange(e.target.value)}} rows={7} className='w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none' placeholder='write a summary that highlights the career objectives!'/>
                    <p className='text-xs text-grey-500 max-w-4/5 mx-auto text-center'>Tip: keep it Concise!</p>
            </div>

        </div>
    )
}

export default Summary