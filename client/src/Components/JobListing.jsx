import React, { useContext } from 'react'
import { AppContext } from '../Context/AppContext'
import { assets, JobCategories, JobLocations, jobsData } from '../assets/assets'
import JobCard from './JobCard'

const JobListing = () => {
  const { issearched, searchfilter, setSearchFilter } = useContext(AppContext)

  return (
    <div className='container 2xl:px-20 p-5 py-8'>
      <div className='lg:flex lg:gap-8 max-lg:space-y-8'>
        <div className='lg:w-1/4'>
          {
            issearched && (searchfilter.title !== "" || searchfilter.location !== "") && (
              <>
                <div className='shadow bg-[#97CADC] p-5 w-full rounded-lg flex flex-col mb-6'>
                  <h3 className='text-lg font-medium mb-4'>Your Current Filter</h3>
                  <div className='flex items-center gap-2 flex-col'>
                    {searchfilter.title && (
                      <span className='flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full'>
                        {searchfilter.title}
                        <img onClick={e => setSearchFilter(prev => ({ ...prev, title: "" }))} src={assets.cross_icon} />
                      </span>
                    )}

                    {searchfilter.location && (
                      <span className='flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full'>
                        {searchfilter.location}
                        <img onClick={e => setSearchFilter(prev => ({ ...prev, location: "" }))} src={assets.cross_icon} />
                      </span>
                    )}
                  </div>
                </div>
              </>
            )
          }

          <div className='max-lg:hidden'>
            <h4 className='font-medium text-lg py-4'>Search By Category</h4>
            <ul className='space-y-4 text-gray-600'>
              {
                JobCategories.map((Category, index) => (
                  <li className='flex gap-3 items-center' key={index}>
                    <input className='scale-125' type="checkbox" />
                    {Category}
                  </li>
                ))
              }
            </ul>
          </div>

          <div className='max-lg:hidden'>
            <h4 className='font-medium text-lg py-4 pt-14'>Search By Location</h4>
            <ul className='space-y-4 text-gray-600'>
              {
                JobLocations.map((location, index) => (
                  <li className='flex gap-3 items-center' key={index}>
                    <input className='scale-125' type="checkbox" />
                    {location}
                  </li>
                ))
              }
            </ul>
          </div>
        </div>

        <section className='lg:w-3/4 '>
          <h3 className='font-bold  text-3xl py-2' id="job-list">Latest Jobs</h3>
          <p className='mb-8 text-gray-500'>Latest jobs with top companies apply now and shape your carreer!</p>

          <div className='cards grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
            {jobsData.map((jobsData, index) => (
              <JobCard key={index} job={job} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default JobListing
