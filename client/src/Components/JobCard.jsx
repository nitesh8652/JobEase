import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const JobCard = ({ job }) => {
    const navigate = useNavigate()

    if (!job || !job.companyId) {
        return null
    }

    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between p-6">

            {/* 1. UPPER SECTION: Logo and Title */}
            <div className="flex flex-col items-center mb-4">

                {/* LOGO CONTAINER */}
                <div className="w-full h-32 flex items-center justify-center mb-4 bg-gray-50 rounded-lg p-2">
                    <img
                        src={job.companyId.image}
                        alt="Company Logo"
                        className="max-h-full max-w-full object-contain"
                    />
                </div>

                {/* JOB TITLE */}
                <h3 className="text-xl font-bold text-gray-900 text-center mb-1">
                    {job.title}
                </h3>

                {/* COMPANY NAME (Optional) */}
                <span className="text-sm text-gray-500 font-medium">
                    {job.companyName}
                </span>
            </div>

            {/* 2. TAGS (Location/Level) */}
            <div className="flex justify-center gap-2 mb-4">
                <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded border border-blue-100">
                    {job.location}
                </span>
                <span className="bg-red-50 text-red-600 text-xs font-semibold px-3 py-1 rounded border border-red-100">
                    {job.level}
                </span>
            </div>

            {/* 3. DESCRIPTION */}
            <p className="text-gray-600 text-sm text-center mb-6 line-clamp-3" 
               dangerouslySetInnerHTML={{ __html: job.description }}>
            </p>

            {/* 4. FOOTER: Single Apply Button */}
            <div className="mt-auto w-full">
                <button 
                    onClick={() => {
                        navigate(`/apply-job/${job._id}`);
                        scrollTo(0, 0)
                    }} 
                    className="w-full bg-blue-600 text-white px-4 py-2.5 rounded-md text-sm font-semibold hover:bg-blue-700 hover:shadow-md transition-all duration-200"
                >
                    Apply Now
                </button>
            </div>

        </div>
    );
};

export default JobCard;