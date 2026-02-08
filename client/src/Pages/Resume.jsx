import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { PlusIcon, UploadCloudIcon } from 'lucide-react'
import { dummyResumeData } from "../assets/assets";
import { useNavigate } from 'react-router-dom';

const Resume = () => {
  const [allResumes, setallResumes] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    setallResumes(dummyResumeData)
  }, [])

  return (
    <>
      <Navbar />
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <p className='text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden'>
          Welcome, Nitesh
        </p>

        <div className='flex flex-wrap gap-5'>
          {/* Create Button */}
          {/* <button 
            onClick={() => navigate('/resume-create/res123')} 
            className="relative w-full sm:max-w-80 h-56 flex flex-col items-center justify-center rounded-xl gap-2 border transition-all duration-300 cursor-pointer bg-[linear-gradient(135deg,#ffecec,#ffd4d4)] border-[#e63946] hover:shadow-lg group"
          >
            <PlusIcon className='size-11 transition-all duration-300 p-2.5 bg-[#DC2626] text-white rounded-full' />
            <p className='text-sm group-hover:text-[#DC2626] transition-all duration-300'>Create Resume</p>
          </button> */}

          {/* Upload Button */}
          <button 
            onClick={() => navigate('/resume-create/res123')} 
            className="relative w-full sm:max-w-80 h-56 flex flex-col items-center justify-center rounded-xl gap-3 border transition-all duration-300 cursor-pointer bg-[linear-gradient(135deg,#f5eaff,#e2c6ff)] border-[#9333ea] hover:shadow-lg group"
          >
            <UploadCloudIcon className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full' />
            <p className='text-sm group-hover:text-[#9333EA] transition-all duration-300'>Create Resume</p>
          </button>
        </div>
      </div>
    </>
  )
}

export default Resume
