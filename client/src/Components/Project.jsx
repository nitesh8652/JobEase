import { Plus, Trash2Icon } from 'lucide-react'
import Projectbtt from './Buttons/Projectbtt';
import AIproj from './Buttons/AIproj';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { toast } from 'react-toastify';
import { useState } from "react";
import Loader from '../Components/Buttons/AIloader.jsx';
import AIOverlay from './AILoader.jsx';

const Project = ({ data, onChange }) => {

    const [loadingIndex, setLoadingIndex] = useState(null);


    const addProject = () => {
        const newProject = {
            name: '',
            type: '',
            description: '',
            link: ''
        };
        onChange([...data, newProject])
    }

    const removeProject = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated)
    }

    const updateProject = (index, field, value) => {
        const updated = [...data]
        updated[index] = { ...updated[index], [field]: value }
        onChange(updated)
    }

    const genAI = new GoogleGenerativeAI(
        import.meta.env.VITE_GEMINI_API_KEY
    );

    const enhanceProjectWithAI = async (index) => {
        const project = data[index];

        if (!project.description || project.description.trim().length < 8) {
            toast.error("Please write some project description first");
            return;
        }

        try {
            setLoadingIndex(index); // 🔥 START LOADER

            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

            const prompt = `
  Act as a Senior Technical Resume Writer. 
  Your task is to rewrite the "Project Description" to highlight technical implementation, specific tools used, and the project's functionality or impact.

  Strict Rules:
  1. Provide 2 to 3 concise achievement statements (new lines only).
  2. Start each line with a strong, clear ACTION VERB (e.g., Developed, Built, Deployed, Engineered, Designed).
  3. **Tech Stack Integration:** You MUST mention specific technologies, languages, or libraries found in the input (e.g., React, Node.js, Arduino, Swift, Python) naturally within the sentences.
  4. **Simple Vocabulary:** Use direct and professional words. Avoid overly complex or "fluff" words (e.g., use "Improved" instead of "Ameliorated", use "Built" instead of "Fabricated") to ensure readability.
  5. **Problem & Solution:** Briefly mention what the project does or the problem it solves (e.g., "to automate data entry," "for real-time tracking," "to reduce server load").
  6. Remove all personal pronouns (I, me, my, we).
  7. Do NOT use bullet points, asterisks (*), or dashes (-) at the start of lines.
  8. Do NOT provide introductory or concluding remarks. Just return the text.
  9. The output should be ATS-friendly and focused on keywords relevant to the project type.
  10. include numbers and metrics (e.g., "increased sales by 30%")

  Project Title: ${project.name || "Project Name"}
  Project Type: ${project.type || "Not specified"}

  Description:
  "${project.description}"
`;
            const result = await model.generateContent(prompt);
            const enhancedText = result.response.text();

            updateProject(index, "description", enhancedText);
            toast.success("Project enhanced with AI!");
        } catch (error) {
            console.error(error);
            toast.error("AI enhancement failed. Please try again.");
        } finally {
            setLoadingIndex(null); // 🔥 STOP LOADER
        }
    };

    return (
        <>
            {loadingIndex !== null && <AIOverlay />}
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='text-lg font-bold text-gray-900'>Projects</h3>
                    <p className='text-sm text-gray-500'>Add your projects.</p>
                </div>

                <Projectbtt onClick={addProject} />
            </div>

            <div className='space-y-4 mt-6'>
                {data.map((project, index) => (
                    <div key={index} className='border border-gray-300 rounded-lg p-4 space-y-3 bg-white'>
                        <div className='flex justify-between items-start'>
                            <h4>Project #{index + 1}</h4>
                            <button onClick={() => removeProject(index)} className='text-red-500 hover:text-red-700 transition-colors'>
                                <Trash2Icon className='size-4' />
                            </button>
                        </div>

                        <div className='grid gap-3'>
                            <input
                                value={project.name || ""}
                                onChange={(e) => updateProject(index, "name", e.target.value)}
                                type="text"
                                placeholder="Name of the project"
                                className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            />
                            <input
                                value={project.type || ""}
                                onChange={(e) => updateProject(index, "type", e.target.value)}
                                type="text"
                                placeholder="Project Type (e.g Website, Application, etc)"
                                className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            />
                            <input
                                value={project.link || ""}
                                onChange={(e) => updateProject(index, "link", e.target.value)}
                                type="text"
                                placeholder="Link to the live project or repository"
                                className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-blue-700"
                            />
                        </div>

                        <div className='space-y-2'>
                            <textarea
                                value={project.description || ''}
                                onChange={(e) => updateProject(index, 'description', e.target.value)}
                                rows={5}
                                className='w-full text-sm px-3 py-2 rounded-lg resize-none border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                placeholder='Describe your project...'
                            />
                        </div>


                        <AIproj onClick={() => enhanceProjectWithAI(index)} />


                    </div>
                ))}
            </div>
        </>
    )
}

export default Project
