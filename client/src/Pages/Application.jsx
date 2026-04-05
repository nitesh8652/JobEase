import Navbar from '../Components/Navbar'
import { useState, useContext } from 'react'

import moment from 'moment'
import Footer from '../Components/Footer'
import { useUser, useAuth } from '@clerk/clerk-react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AppContext } from '../Context/AppContext'
import { EyeOffIcon } from 'lucide-react'


const Application = () => {
  const { user } = useUser()
  const { getToken, userId } = useAuth()
  const [isedit, setisedit] = useState(false)
  const [resume, setResume] = useState(null)
  const { userData, userApplications, fetchUserData } = useContext(AppContext)
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  const handleFileSelect = (file) => {
    setResume(file || null)
  }

  const updateResume = async () => {
    console.log(resume)
    try {
      if (!resume) {
        toast.error("Please select a resume file")
        return
      }

      const formData = new FormData()
      formData.append('resume', resume)

      const token = await getToken()

      const { data } = await axios.post(`${backendUrl}/api/users/update-resume`,
        formData,
        {
          headers: {
            'token': `${userId}`,
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
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[65vh] my-8'>

        {/* Resume Section */}
        <h2 className='text-xl font-semibold'>Your Resume</h2>

        <div className='flex flex-col sm:flex-row gap-3 mb-6 mt-3'>

          {isedit ? (
            <>
              <label className='flex flex-col sm:flex-row sm:items-center gap-3 w-full'>
                <span className='text-white bg-[#007AFF] px-4 py-2 rounded-lg cursor-pointer text-center'>
                  Upload Resume
                </span>

                <input
                  id="resumeupload"
                  onChange={e => handleFileSelect(e.target.files[0])}
                  accept='application/pdf'
                  type="file"
                  className='border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-auto'
                />
              </label>

              <button
                onClick={updateResume}
                className='bg-green-500 text-white rounded-lg px-4 py-2 w-full sm:w-auto'
              >
                Save
              </button>
            </>
          ) : (
            <div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto'>
              {userData && userData.resume ? (
                <a
                  className='bg-blue-200 text-blue-700 px-4 py-2 rounded-lg text-center'
                  href={userData.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Resume
                </a>
              ) : (
                <span className='bg-gray-200 text-gray-500 px-4 py-2 rounded-lg text-center'>
                  No Resume
                </span>
              )}

              <button
                onClick={() => setisedit(true)}
                className='text-gray-600 border border-gray-300 rounded-lg px-4 py-2'
              >
                Edit
              </button>
            </div>
          )}
        </div>

        {/* Jobs Section */}
        <h2 className='text-xl font-semibold mb-4'>Jobs Applied</h2>

        {userApplications.length === 0 ? (

          <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
            <p className="text-gray-500 text-lg font-medium">
              <EyeOffIcon className='flex mx-auto' /> No Jobs Applied
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Start applying to jobs and they will appear here.
            </p>
          </div>

        ) : (

          <div className="overflow-x-auto rounded-lg border border-gray-300">
            <table className="min-w-175 w-full bg-white border-collapse">

              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left">Company</th>
                  <th className="py-3 px-4 text-left">Job Title</th>
                  <th className="py-3 px-4 text-left hidden sm:table-cell">Location</th>
                  <th className="py-3 px-4 text-left hidden sm:table-cell">Date</th>
                  <th className="py-3 px-4 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {userApplications.map((job, index) => (
                  <tr key={index} className="border-t border-gray-200">

                    <td className="py-3 px-4 flex items-center gap-3">
                      <img
                        className="w-8 h-8 object-contain"
                        src={job.companyId.image}
                        alt=""
                      />
                      <span className="whitespace-nowrap">
                        {job.companyId.name}
                      </span>
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      {job.jobId.title}
                    </td>

                    <td className="py-3 px-4 hidden sm:table-cell whitespace-nowrap">
                      {job.jobId.location}
                    </td>

                    <td className="py-3 px-4 hidden sm:table-cell whitespace-nowrap">
                      {job.date ? moment(Number(job.date)).format('LL') : '—'}
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`
                  text-sm font-medium rounded-lg px-4 py-1.5 whitespace-nowrap
                  ${job.status === 'Pending'
                            ? 'bg-blue-100 text-blue-700'
                            : job.status === 'Rejected'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-green-100 text-green-700'
                          }
                `}
                      >
                        {job.status}
                      </span>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        )}
      </div>

      <Footer />
    </>
  )
}

export default Application