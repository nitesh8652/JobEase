import React from 'react'
import Navbar from '../Components/Navbar'
import { useState } from 'react'

const Application = () => {

  const [isedit, setisedit] = useState(false)

  return (
    <>
      <Navbar />
      <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
        <h2 className='text-xl  font-semibold' >Your Resume</h2>
        <div className='flex gap-2 mb-6 mt-3'>
          {
            isedit ? <></>
              : <div className='flex gap-2'> 
                <a className='bg-blue-200 text-blue-700 px-4 py-2 rounded-lg' href="">
                Resume
                </a> 
                <button onClick={()=> setisedit(true)} className='text-gray-600 border border-gray-300 rounded-lg px-4 py-2'>Edit</button>
                </div>
          }
        </div>
      </div>
    </>
  )
}

export default Application


