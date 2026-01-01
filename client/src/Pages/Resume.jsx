import React, { use, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import { PenIcon, FilePenLineIcon, PlusIcon, TrashIcon, UploadCloudIcon, X, UploadCloud } from 'lucide-react'
import { useState } from 'react'
import { dummyResumeData } from "../assets/assets";
import { useNavigate } from 'react-router-dom';

const Resume = () => {

  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];
  const [allResumes, setallResumes] = useState([])
  const [showCreateResumes, setShowCreateResumes] = useState(false)
  const [showUploadResumes, setShowUploadResumes] = useState(false)
  const [title, setTitle] = useState('')
  const [resume, setReusme] = useState(null)
  const [editResumeId, setEditResumeId] = useState('')

  const navigate = useNavigate();

  const loadAllResumes = async () => {
    setallResumes(dummyResumeData)
  }

  const createResume = async (event) => {
    event.preventDefault();
    setShowCreateResumes(false);
    navigate(`/resume-create/res123`);
  }

  const uploadResume = async (event) => {
    event.preventDefault();
    setShowUploadResumes(false);
    navigate(`/resume-create/res123`);

  }

  useEffect(() => {
    loadAllResumes()
  }, [])

  return (
    <>
      <Navbar />

      <div>

        <div className='max-w-7xl mx-auto px-4 py-8'>

          <p className='text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden' >Welcome, meownis</p>

          <div className='flex gap-5'>
            <button onClick={() => setShowCreateResumes(true)} className="relative w-full sm:max-w-80 h-56 flex flex-col items-center justify-center
             rounded-xl gap-2 border transition-all duration-300 cursor-pointer
             bg-[linear-gradient(135deg,#ffecec,#ffd4d4)]
             border-[#e63946] hover:shadow-lg group"
            >

              <PlusIcon className='size-11 transition-all duration-300 p-2.5 bg-[#DC2626] text-white rounded-full' />
              <p className='text-sm group-hover:text-[#DC2626] transition-all duration-300'  >Create Resume</p>
            </button>


            <button onClick={() => setShowUploadResumes(true)} className="relative w-full sm:max-w-80 h-56 flex flex-col items-center justify-center
             rounded-xl gap-3 border transition-all duration-300 cursor-pointer
             bg-[linear-gradient(135deg,#f5eaff,#e2c6ff)]
             border-[#9333ea] hover:shadow-lg group"
            >

              <UploadCloudIcon className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to bg-indigo-500 text-white rounded-full' />
              <p className='text-sm group-hover:text-[#9333EA] transition-all duration-300'  > Upload Resume</p>
            </button>


          </div>

          {/* showing pverios results of resume */}

          {/* <hr className='border-slate-400 my-6 sm:w-[305px]' /> */}

          {/* <div className='grid grid-cols-2 sm:flex flex-wrap gap-4'>
            {allResumes.map((resume, index) => {
              const baseColor = colors[index % colors.length];
              return (
                <button key={index} className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer" style={{ background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`, borderColor: baseColor + '40' }}
                >

                  <FilePenLineIcon className='size-7 group-hover:scale-105 transition-all ' style={{ color: baseColor }} />
                  <p className='text-sm group-hover:scale-105 transition-all px-2 text-center ' style={{ color: baseColor }}>{resume.title}</p>

                  <p
                    className="absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center"
                    style={{ color: baseColor + '90' }}
                  >
                    Updated On {new Date(resume.updatedAt).toLocaleDateString()}

                  </p>

                  <div className='absolute top-1 right-1 group-hover:flex items-center hidden'>
                    <TrashIcon className='size-7  p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors' />
                    <PenIcon className=" size-7  p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors " />

                  </div>

                </button>
              )
            })}
          </div> */}


          {showCreateResumes && (

            <form onSubmit={createResume} onClick={() => setShowCreateResumes(false)} className="fixed inset-0 bg-black/70 backdrop:-blur bg-opacity-30 flex items-center justify-center z-50">
              <div onClick={e => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
                <h2 className='text-xl font-semibold mb-5'>Create a Resume</h2>
                <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="Resume Title" className="border px-4 rounded w-full py-2 mb-4 focus:border-blue-600 ring-blue-600 " required />

                <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-green -700 transition-colors">Create</button>

                <X className="absolute top-4 right-4 size-8 text-gray-500 cursor-pointer hover:text-black" onClick={() => { setShowCreateResumes(false); setTitle('') }} />

              </div>
            </form>

          )}

          {showUploadResumes && (

            <form onSubmit={uploadResume} onClick={() => setShowUploadResumes(false)} className="fixed inset-0 bg-black/70 backdrop:-blur bg-opacity-30 flex items-center justify-center z-50">
              <div onClick={e => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
                <h2 className='text-xl font-semibold mb-5'>Upload your resume</h2>
                <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="Resume Title" className="border px-4 rounded w-full py-2 mb-4 focus:border-blue-600 ring-blue-600 " required />

                <div>
                  <label htmlFor="resume-input" className='block text-sm text-slate-700'>
                    select resume file
                    <div className='flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors'>
                      {resume ? (
                        <p className='text-blue-600 font-semibold'>{resume.name}</p>
                      ) : (
                        <>
                          <UploadCloud className='size-14 stroke-1' />
                          <p>Upload Resume</p>
                        </>
                      )}
                    </div>
                  </label>

                  <input type='file' id='resume-input' accept='.pdf' hidden onChange={(e) => setReusme(e.target.files[0])} />

                </div>
                <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-green -700 transition-colors">Create</button>
                <X className="absolute top-4 right-4 size-8 text-gray-500 cursor-pointer hover:text-black" onClick={() => { setShowUploadResumes(false); setTitle('') }} />

              </div>
            </form>


          )}


        </div>
      </div >

    </>
  )
}

export default Resume


