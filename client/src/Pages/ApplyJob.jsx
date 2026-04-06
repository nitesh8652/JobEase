import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import Loading from '../Components/Loading'
import Navbar from '../Components/Navbar'
import kconvert from 'k-convert'
import moment from 'moment'
import JobCard from '../Features/Jobs/JobCard'
import Footer from '../Components/Footer'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useAuth, useUser } from '@clerk/clerk-react'
import { AppContext } from "../Context/AppContext"
import { ArrowLeftIcon } from 'lucide-react'

const ApplyJob = () => {
    const { id } = useParams()
    const { getToken } = useAuth()
    const navigate = useNavigate()
    const [jobdata, setjobdata] = useState(null)
    const [isAlreadyApplied, setIsAlreadyApplied] = useState(false)
    const { jobs, backendUrl, userData, userApplications, fetchUserApplications } = useContext(AppContext)
    const { user } = useUser()

    const fetchjob = async () => {
        try {
            const { data } = await axios.get(backendUrl + `/api/jobs/${id}`)
            if (data.success) {
                setjobdata(data.job)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const applyHandler = async () => {
        try {
            if (!userData) {
                return toast.error("Please login to apply for jobs")
            }
            if (!userData.resume) {
                navigate('/application')
                return toast.info("Please upload your resume before applying")
            }
            const token = await getToken()
            const { data } = await axios.post(
                backendUrl + '/api/users/apply',
                { jobId: jobdata._id },
                {
                    headers: {
                        token: userData._id
                    }
                }
            )
            if (data.success) {
                toast.success(data.message || "Applied successfully")
                fetchUserApplications()
            } else {
                toast.error(data.message || "Failed to apply")
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const checkIfApplied = () => {
        const hasApplied = userApplications.some(
            (item) => item.jobId?._id === jobdata?._id
        )
        setIsAlreadyApplied(hasApplied)
    }

    useEffect(() => {
        if (id) {
            fetchjob()
        }
    }, [id])

    useEffect(() => {
        if (userApplications.length > 0 && jobdata) {
            checkIfApplied()
        }
    }, [jobdata, userApplications])


    return jobdata ? (
        <>
            <Navbar />



            <div className='min-h-screen flex flex-col py-8 sm:py-10 container px-4 sm:px-6 2xl:px-20 mx-auto'>


                <Link
                    to={'/'}
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition"
                >
                    <ArrowLeftIcon className="w-4 h-4" />
                    Go Back
                </Link>


                <div className='bg-white text-black sm:p-4 rounded-lg w-full'>
                    {/* Hero Section */}
                    <div className='flex flex-col md:flex-row items-center md:items-start justify-between gap-8 p-6 sm:p-10 md:px-14 md:py-16 mb-8 bg-sky-50 border border-[#00B3C7] rounded-xl'>
                        <div className='flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 w-full md:w-auto'>
                            {/* Company Logo */}
                            <div className='bg-white rounded-lg p-3 sm:p-4 shrink-0 shadow-sm'>
                                <img
                                    className='h-16 w-16 sm:h-20 sm:w-20 object-contain'
                                    src={jobdata?.companyId?.image || assets.suitcase_icon}
                                    alt="Company Logo"
                                />
                            </div>

                            {/* Job Details */}
                            <div className='text-center md:text-left text-neutral-700 mt-2 md:mt-0'>
                                <h1 className='text-2xl sm:text-3xl md:text-4xl font-medium text-gray-900'>
                                    {jobdata.title}
                                </h1>
                                <div className='flex flex-wrap justify-center md:justify-start gap-3 sm:gap-6 items-center mt-4 text-sm sm:text-base'>
                                    <span className='flex items-center gap-1.5 sm:gap-2'>
                                        <img src={assets.suitcase_icon} className="w-4 h-4 sm:w-5 sm:h-5" alt="" />
                                        {jobdata?.companyId?.name}
                                    </span>
                                    <span className='flex items-center gap-1.5 sm:gap-2'>
                                        <img src={assets.location_icon} className="w-4 h-4 sm:w-5 sm:h-5" alt="" />
                                        {jobdata.location}
                                    </span>
                                    <span className='flex items-center gap-1.5 sm:gap-2'>
                                        <img src={assets.person_icon} className="w-4 h-4 sm:w-5 sm:h-5" alt="" />
                                        {jobdata.level}
                                    </span>
                                    <span className='flex items-center gap-1.5 sm:gap-2'>
                                        <img src={assets.money_icon} className="w-4 h-4 sm:w-5 sm:h-5" alt="" />
                                        Salary: {kconvert.convertTo(jobdata.salary)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Apply Action */}
                        <div className='flex flex-col items-center md:items-end justify-center w-full md:w-auto shrink-0'>
                            <button
                                onClick={applyHandler}
                                className={`w-full md:w-auto px-10 py-3 text-white rounded-lg font-medium transition-colors ${isAlreadyApplied ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                                    }`}
                                disabled={isAlreadyApplied}
                            >
                                {isAlreadyApplied ? "Applied" : "Apply Now"}
                            </button>
                            <p className='text-gray-500 text-sm mt-3'>
                                Posted {moment(jobdata.date).fromNow()}
                            </p>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className='flex flex-col lg:flex-row gap-10 lg:gap-16 items-start'>

                        {/* Left column: Description */}
                        <div className='w-full lg:w-[65%]'>
                            <h2 className='font-bold text-xl sm:text-2xl mb-4 sm:mb-6 text-gray-900'>
                                Job Description
                            </h2>
                            <div
                                className='rich-text text-gray-700 leading-relaxed'
                                dangerouslySetInnerHTML={{ __html: jobdata.description }}
                            />
                            <button
                                onClick={applyHandler}
                                className={`mt-8 sm:mt-10 px-10 py-3 w-full sm:w-auto text-white rounded-lg font-medium transition-colors ${isAlreadyApplied ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                                    }`}
                                disabled={isAlreadyApplied}
                            >
                                {isAlreadyApplied ? "Applied" : "Apply Now"}
                            </button>
                        </div>

                        {/* Right column: More Jobs Sidebar */}
                        {jobs && jobs.some(job =>
                            job._id !== jobdata._id &&
                            job.companyId?._id === jobdata.companyId?._id
                        ) && (
                                <div className='w-full lg:w-[35%] space-y-5 bg-gray-50/50 p-4 sm:p-6 rounded-xl border border-gray-100'>
                                    <h2 className='bg-[#e3f8ff] text-blue-900 font-medium p-3 rounded-lg flex justify-center text-center'>
                                        More Jobs From {jobdata?.companyId?.name}
                                    </h2>

                                    <div className="flex flex-col gap-4">
                                        {jobs
                                            .filter(job =>
                                                job._id !== jobdata._id &&
                                                job.companyId?._id === jobdata.companyId?._id
                                            )
                                            .filter(job => {
                                                const appliedJobsId = new Set(userApplications.map(app => app.jobId && app.jobId._id));
                                                return !appliedJobsId.has(job._id);
                                            })
                                            .slice(0, 3)
                                            .map((job, index) => <JobCard key={index} job={job} />)
                                        }
                                    </div>
                                </div>
                            )}
                    </div>

                </div>
            </div>
            <Footer />
        </>
    ) : (
        <Loading />
    )
}

export default ApplyJob