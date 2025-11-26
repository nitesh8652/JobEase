import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const JobCard = ({ job }) => {

    const navigate = useNavigate()

    return (
        <>
            {/* 1. Added flex and flex-col to make the card a vertical flex container */}
            <div className='shadow-md border border-[#002761]  p-6 rounded-[6px] flex flex-col'>

                <div className="flex items-center gap-[12px]" >
                    <img src={job.companyId.image} alt="company icon" />
                    <h4 className='font-medium text-xl '>{job.title}</h4>
                </div>
                
                {/* 2. Added flex-grow to make this section expand */}
                <div className='flex flex-col gap-4 mt-2 text-xs flex-grow'>
                    <div className='flex flex-row gap-6 '>
                        <span className='bg-blue-100 border-blue-200 px-4 py-1 rounded' >{job.location}</span>
                        <span className='bg-blue-100 border-blue-200 px-4 py-1 rounded' >{job.level}</span>
                    </div>
                    <p className='text-gray-700 text-sm' dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }} ></p>
                </div>
                
                <div className='flex justify-between mt-4'> {/* A little margin-top on the buttons is good practice */}
                    <button onClick={() => {
                        navigate(
                            `/apply-job/${job._id}`
                        );
                        scrollTo(0, 0)
                    }} className='bg-[#032252] text-white px-3 py-2 rounded-[6px] text-sm'>Apply Now</button>
                    <button className='bg-white border border-gray-400 px-3 py-2 rounded-[6px] text-sm'>Learn More</button>
                </div>
            </div>

        </>
    )
}

export default JobCard