import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { AppContext } from '../Context/AppContext'
import { useContext } from 'react'
import { assets, jobsData } from '../assets/assets'
import Loading from '../Components/Loading'
import Navbar from '../Components/Navbar'
import kconvert from 'k-convert'
import moment from 'moment'
import JobCard from '../Components/JobCard'
import Footer from '../Components/Footer'
import { toast } from 'react-toastify'
import axios from 'axios'

const ApplyJob = () => {

    const { id } = useParams()

    const [jobdata, setjobdata] = useState(null)
    const { jobs, backendUrl } = useContext(AppContext)

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



        useEffect(() => {


            fetchjob()

        }, [id])

        return jobdata ? (
            <>
                <Navbar />

                <div className='min-h-screen flex flex-col  py-10  container px-4 2xl:px-20 mx-auto ' >
                    <div className='bg-white text-black p-4 rounded-lg w-full'>
                        <div className='flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-sky-50 border border-[#00B3C7] rounded-xl '>
                            <div className='flex flex-col md:flex-row items-center'>
                                <img className='h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4' src={jobdata.companyId.image} />
                                <div className='text-center md:text-left text-neutral-700'>
                                    <h1 className='text-2xl sm:text-4xl font-medium' >{jobdata.title}</h1>
                                    <div className='flex flex-row flex-wrap max-md:justify-center  gap-8 items-center  mt-4' >
                                        <span className='flex items-center gap-2' >
                                            <img src={assets.suitcase_icon} />
                                            {jobdata.companyId.name}
                                        </span>
                                        <span className='flex items-center gap-2' >
                                            <img src={assets.location_icon} />
                                            {jobdata.location}
                                        </span>
                                        <span className='flex items-center gap-2' >
                                            <img src={assets.person_icon} />
                                            {jobdata.level}
                                        </span>
                                        <span className='flex items-center gap-2' >
                                            <img src={assets.money_icon} />
                                            Anual Salary:{kconvert.convertTo(jobdata.salary)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center'>
                                <button className='bg-blue-600 p-2.5 px-10 text-white rounded'  >Apply Now</button>
                                <p className='text-gray-500 mt-2'>Posted {moment(jobdata.createdAt).fromNow()}</p>
                            </div>
                        </div>

                        <div className='flex flex-col lg:flex-row justify-between items-start' >
                            <div className='w-full lg:w-2/3' >
                                <h2 className='font-bold text-2xl mb-4'>Job Description</h2>
                                <div className='rich-text' dangerouslySetInnerHTML={{ __html: jobdata.description }}></div>
                                <button className='bg-blue-600 mt-10 p-2.5 px-10 text-white rounded'  >Apply Now</button>
                            </div>

                            {/* {right sec} */}
                            <div className='w-full lg:w-1/3 mt-8 space-y-5'>
                                <h2 className='bg-[#e3f8ff] p-3 rounded-2xl'>More Jobs From {jobdata.companyId.name}</h2>
                                {jobs.filter(job => job._id !== jobdata._id && job.companyId._id === jobdata.companyId._id).filter(job => true).slice(0, 3).map((job, index) => <JobCard key={index} job={job} />)}
                            </div>

                        </div>

                    </div>
                </div>
                <Footer />
            </>
        ) : (
            <>

                <Loading />

            </>
        )
    }

    export default ApplyJob


