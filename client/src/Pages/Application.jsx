import Navbar from '../Components/Navbar'

import { useState, useContext } from 'react'

import { assets, jobsApplied } from '../assets/assets';

import moment from 'moment';

import Footer from '../Components/Footer'

import { useUser, useAuth } from '@clerk/clerk-react';

import { toast } from 'react-toastify'

import axios from 'axios'

import { AppContext } from '../Context/AppContext';



const Application = () => {

  const { user } = useUser()

  const { getToken } = useAuth()



  const [isedit, setisedit] = useState(false);

  const [resume, setResume] = useState(null); // file object selected by user (client-side)

  const { backendUrl, userData, fetchUserData } = useContext(AppContext);



  const handleFileSelect = (file) => {

    // set selected file and make Edit button appear (but don't yet upload)

    setResume(file || null)

    setisedit(false) // ensure not in full "edit" mode yet

  }



 const updateResume = async () => {
    try {
      if (!resume) {
        toast.error("Please select a resume file")
        return
      }

      const formData = new FormData()
      formData.append('resume', resume)

      const token = await getToken()

      const { data } = await axios.post(
        backendUrl + '/api/users/update-resume',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
           
            // Let Axios set the boundary automatically!
          },
          validateStatus: () => true
        }
      )

      if (data && data.success) {
        toast.success(data.message || "Resume uploaded successfully")
        await fetchUserData()
        setisedit(false)
        setResume(null)
      } else {
        // Log the actual error to the console so we can see it
        console.error("Upload failed response:", data)
        toast.error(data?.message || "Failed to upload resume")
      }

    } catch (error) {
      console.error("Resume upload error:", error)
      toast.error(error.message || "Something went wrong")
    }
  }


  return (
    <>
      <Navbar />
      <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
        <h2 className='text-xl  font-semibold' >Your Resume</h2>
        <div className='flex gap-2 mb-6 mt-3'>
          {
            isedit ?
              <>

                <label className='flex items-center gap-2' htmlFor='resumeupload'>
                  <p className='text-white bg-[#007AFF] px-4 py-2 rounded-lg mr-r'>Upload Resume</p>
                  <input id="resumeupload" onChange={e => setResume(e.target.files[0])} accept='application/pdf' type="file" className='border border-gray-300 rounded-lg px-4 py-2' />'
                  <img src={assets.profile_upload_icon} />
                </label>

                <button onClick={updateResume} className='bg-green-500 text-white  rounded-lg px-4 py-2' >Save</button>

              </>
              : <div className='flex gap-2'>
                {userData && userData.resume ? (
                  <a 
                    className='bg-blue-200 text-blue-700 px-4 py-2 rounded-lg' 
                    href={userData.resume} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    View Resume
                  </a>
                ) : (
                  <span className='bg-gray-200 text-gray-500 px-4 py-2 rounded-lg'>No Resume</span>
                )}
                <button onClick={() => setisedit(true)} className='text-gray-600 border border-gray-300 rounded-lg px-4 py-2'>Edit</button>
              </div>
          }
        </div>

        <h2 className='text-xl font-semibold mb-4' > Jobs Applied </h2>
         
        <table className="min-w-full w-full bg-white border border-gray-300 rounded-lg border-collapse">
  <thead>
    <tr>
      <th className="py-3 px-4 border border-gray-300 text-left">Company</th>
      <th className="py-3 px-4 border border-gray-300 text-left">Job Title</th>
      <th className="py-3 px-4 border border-gray-300 text-left max-sm:hidden">Location</th>
      <th className="py-3 px-4 border border-gray-300 text-left max-sm:hidden">Date</th>
      <th className="py-3 px-4 border border-gray-300 text-left">Status</th>
    </tr>
  </thead>
  <tbody>
    {jobsApplied.map((job, index) => (
      <tr key={index}>
        <td className="py-3 px-4 border border-gray-300 flex items-center gap-3">
          <img className="w-8 h-8" src={job.logo} alt={job.company} />
          {job.company}
        </td>
        <td className="py-3 px-4 border border-gray-300">{job.title}</td>
        <td className="py-3 px-4 border border-gray-300 max-sm:hidden">{job.location}</td>
       <td className="py-3 px-4 border border-gray-300 max-sm:hidden">{job.date}</td>

        <td className="py-3 px-4 border border-gray-300">
          <span className={`${job.status === 'Pending' ? 'bg-blue-200 text-blue-800 rounded-lg py-1.5 px-4' : job.status === 'Rejected' ? 'bg-red-200 text-red-800 rounded-lg py-1.5 px-4' : 'bg-green-200 text-green-800 rounded-lg py-1.5 px-4 '} px-2 py-1 rounded-full}`}>{job.status} </span>
          </td>
      </tr>
    ))}
  </tbody>
</table>


      </div>
      <Footer />
    </>
  )
}

export default Application