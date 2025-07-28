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
 
const ApplyJob = () => {

    const { id } = useParams()

    const [jobdata, setjobdata] = useState(null)
    const { jobs } = useContext(AppContext)

    const fetchjob = async () => {
        const data = jobs.filter(job => job._id === id)
        if (data.length !== 0) {
            setjobdata(data[0])
            console.log(data[0])
        }
    }

    useEffect(() => {
        if (jobs.length > 0) {

            fetchjob()
        }
    }, [id, jobs])

    return jobdata ? (
        <>
            <Navbar />

            <div className='min-h-screen flex flex-col  py-10  container px-4 2xl:px-20 mx-auto ' >
                <div className='bg-white text-black p-4 rounded-lg w-full'>
                    <div className='flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-sky-50 border border-[#00B3C7] rounded-xl '>
                        <div className='flex flex-col md:flex-row items-center'>
                            <img className='h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4' src={jobdata.companyId.image} />
                            <div className='text-center md:text-left text-neutral-700'>
                                <h1>{jobdata.title}</h1>
                                <div>
                                    <span>
                                        <img src={assets.suitcase_icon} />
                                        {jobdata.companyId.name}
                                    </span>
                                    <span>
                                        <img src={assets.location_icon} />
                                        {jobdata.location}
                                    </span>
                                    <span>
                                        <img src={assets.person_icon} />
                                        {jobdata.level}
                                    </span>
                                    <span>
                                        <img src={assets.money_icon} />
                                        Anual Salary:{kconvert.convertTo(jobdata.salary)} 
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button>Apply Now</button>
                            <p>Posted {moment(jobdata.createdAt).fromNow()}</p>
                            </div>
                    </div>
                </div>
            </div>

        </>
    ) : (
        <>

            <Loading />

        </>
    )
}

export default ApplyJob


