import Navbar from '../Components/Navbar'
import { useState, useContext } from 'react'
import { assets, jobsApplied } from '../assets/assets'
import moment from 'moment'
import Footer from '../Components/Footer'
import { useUser, useAuth } from '@clerk/clerk-react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AppContext } from '../Context/AppContext'


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
      <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
        <h2 className='text-xl font-semibold'>Your Resume</h2>

        <div className='flex gap-2 mb-6 mt-3'>
          {isedit ? (
            <>
              <label className='flex items-center gap-2' htmlFor='resumeupload'>
                <p className='text-white bg-[#007AFF] px-4 py-2 rounded-lg cursor-pointer'>
                  Upload Resume
                </p>
                <input
                  id="resumeupload"
                  onChange={e => handleFileSelect(e.target.files[0])}
                  accept='application/pdf'
                  type="file"
                  className='border border-gray-300 rounded-lg px-4 py-2'
                />
                <img src={assets.profile_upload_icon} alt="upload icon" />
              </label>

              <button
                onClick={updateResume}
                className='bg-green-500 text-white rounded-lg px-4 py-2'
              >
                Save
              </button>
            </>
          ) : (
            <div className='flex gap-2'>
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
                <span className='bg-gray-200 text-gray-500 px-4 py-2 rounded-lg'>
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

        <h2 className='text-xl font-semibold mb-4'>Jobs Applied</h2>

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
            {userApplications.map((job, index) => (
              <tr key={index}>
                <td className="py-3 px-4 border border-gray-300 flex items-center gap-3">
                  <img className="w-8 h-8" src={job.companyId.image} alt={job.company} />
                  {job.companyId.name}
                </td>
                <td className="py-3 px-4 border border-gray-300">{job.jobId.title}</td>
                <td className="py-3 px-4 border border-gray-300 max-sm:hidden">{job.jobId.location}</td>
                <td className="py-3 px-4 border border-gray-300 max-sm:hidden">
                  {job.date ? moment(Number(job.date)).format('LL') : '—'}
                </td>
                <td className="py-3 px-4 border border-gray-300">
                  <span
                    className={`${job.status === 'Pending'
                      ? 'bg-blue-200 text-blue-800'
                      : job.status === 'Rejected'
                        ? 'bg-red-200 text-red-800'
                        : 'bg-green-200 text-green-800'
                      } rounded-lg py-1.5 px-4`}
                  >
                    {job.status}
                  </span>
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