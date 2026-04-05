import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { UploadCloudIcon } from 'lucide-react'

import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const Resume = () => {
  const [allResumes, setallResumes] = useState([])
  const navigate = useNavigate();
  const { user } = useUser();


  return (
    <>
      <Navbar />
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <p className='text-2xl font-medium mb-6 bg-linear-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden'>
          Welcome, {user?.firstName || 'Login to Continue!'}
        </p>

        <div className='flex flex-wrap gap-5'>
         
          {/* Upload Button */}
          <button 
            onClick={() => navigate(`/resume-create/${user?.id}`)} 
            className="relative w-full sm:max-w-80 h-56 flex flex-col items-center justify-center rounded-xl gap-3 border transition-all duration-300 cursor-pointer bg-[linear-gradient(135deg,#f5eaff,#e2c6ff)] border-[#9333ea] hover:shadow-lg group"
          >
            <UploadCloudIcon className='size-11 transition-all duration-300 p-2.5 bg-linear-to-br from-indigo-300 to-indigo-500 text-white rounded-full' />
            <p className='text-sm group-hover:text-[#9333EA] transition-all duration-300'>Create Resume</p>
          </button>
        </div>
      </div>
    </>
  )
}

export default Resume
