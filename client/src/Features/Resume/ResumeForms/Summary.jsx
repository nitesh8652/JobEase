import { Sparkles } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai"
import { toast } from 'react-toastify';
import AIOverlay from '../../Components/AILoader.jsx';
import AIsummry from '../../Components/Buttons/AIsummry.jsx';


const Summary = ({ data, onChange }) => {

   const [loading, setLoading] = useState(false);


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

    const genAI = new GoogleGenerativeAI(
        import.meta.env.VITE_GEMINI_API_KEY
    );

    const enhanceWithAI = async () => {
        if (!data || data.trim().length < 10) {
            toast.error("Please write some summary first");
            return;
        }

        try {
            setLoading(true);
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

            const prompt = `
            Act as a Senior Resume Writer and ATS Optimization Expert. 
            Your task is to rewrite the following resume in a way to be high-impact, professional, and ATS-friendly.

            Strict Rules:
            1. Use strong ACTION VERBS (e.g., Developed, Spearheaded, Optimized, Managed).
            2. Remove all personal pronouns (I, me, my, we).
            3. Eliminate fluff, buzzwords, and redundant phrases.
            4. Focus on measurable results and specific skills if implied in the text.
            5. Correct all grammar and punctuation errors.
            6. Do NOT use emojis, special characters, or bullet points  .
            7. Do NOT provide introductory or concluding remarks (e.g., "Here is the rewritten text").
            8. Output ONLY the enhanced text.
            9.should be ats friendly and pass the ai resume screening tools.
            10.should use easy words has far has possible
            

Summary:
"${data}"
        `;

            const result = await model.generateContent(prompt);
            const enhancedText = result.response.text();


            onChange(enhancedText);
            toast.success("Summary enhanced with AI!");
        } catch (error) {
            console.error(error);
            toast.error("AI enhancement failed please try again.");
        } finally {
            setLoading(false);
        }
    };



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

        <>
            {loading && <AIOverlay />}

            <div className='space-y-4'>

                <div className='flex items-center justify-between'>
                    <div>
                        <h3 className='text-lg font-semibold text-gray-900'>Summary</h3>
                        <p className='text-sm text-gray-500'>Add summary for your resume.</p>
                    </div>

                    {/* <button onClick={enhanceWithAI} className='flex items-center gap-1 text-xs text-purple-800 hover:bg-[#052355] rounded-md py-2 px-3 bg-purple-100 transition-colors shadow-sm hover:text-white'>
                        <Sparkles className='size-4' />
                        AI Enhance
                    </button> */}
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
                   <AIsummry onClick={enhanceWithAI} />

                    <p
                        className={`text-xs text-gray-500 mt-2 text-center transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'
                            }`}
                    >

                        {tips[currentTipIndex]}
                    </p>
                </div>

            </div>
        </>
    )
}

export default Summary
