import React from 'react'
import { assets } from '../assets/assets'

const JobCard = ({ job }) => {
    return (
        <>

            <div className='shadow border p-6 rounded-[6px]  '>

                <div className="flex items-center gap-[12px]" >
                    <img src={assets.company_icon} />
                    <h4 className='font-medium text-xl '>{job.title}</h4>
                </div>
                <div className='flex  gap-4 mt-2 text-xs flex-col'>
                    <div className='flex flex-row gap-6 '>
                        <span className='bg-blue-100 border-blue-200 px-4 py-1 rounded ' >{job.location}</span>
                        <span className='bg-blue-100 border-blue-200 px-4 py-1 rounded' >{job.level}</span>
                    </div>
                    <p className='text-gray-700 text-sm' dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }} ></p> 
                </div>
                <div className='flex justify-around'>
                    <button className='bg-[#032252] text-white mt-5 px-3 py-2 rounded-[6px] text-sm'>Apply Now</button>
                    <button className='bg-white border border-gray-400 mt-5 px-3 py-2 rounded-[6px] text-sm'>Learn More</button>
                </div>
            </div>

        </>
    )
}

export default JobCard