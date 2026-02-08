import { Plus, Trash2Icon } from 'lucide-react'
import Projectbtt from './Buttons/Projectbtt';

const Project = ({ data, onChange }) => {

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


    return (
        <div>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='text-lg font-bold text-gray-900'>Projects</h3>
                    <p className='text-sm text-gray-500'>Add your projects.</p>
                </div>

               
              <Projectbtt  onClick={addProject} />
                {/* <button onClick={addProject} className='flex items-center gap-1 text-sm text-blue-800 bg-blue-50 hover:bg-blue-100 transition-all px-2 py-2 rounded-md shadow-sm'>
                    <Plus className='size-4' />
                    Add Project
                </button> */}
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

                        {/* ROW 1: Institute & Degree */}
                        <div className='grid  gap-3'>
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
                                placeholder="Project Type (e.g Website, Appilcation, etc)"
                                className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            />
                            <input
                                value={project.link || ""}
                                onChange={(e) => updateProject(index, "link", e.target.value)}
                                type="link"
                                placeholder="Link to the live project or repository"
                                className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-blue-700 " />
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



                    </div>
                ))}
            </div>

        </div>
    )
}

export default Project