import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/AppContext'
import { assets, JobCategories, JobLocations, jobsData } from '../assets/assets'
import JobCard from './JobCard'

const JobListing = () => {
  const { issearched, searchfilter, setSearchFilter, jobsData, jobs } = useContext(AppContext)

  const [showFilter, setShowFilter] = useState(true)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedLocations, setSelectedLocations] = useState([])
  const [currentpage, setcurrentpage] = useState(1)
  const jobsPerPage = 9
  const[filteredjobs, setfilterjobs] = useState(jobs)


  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }
 
  const handleLocationChange = (location) => {
    setSelectedLocations(prev =>
      prev.includes(location)
        ? prev.filter(l => l !== location)
        : [...prev, location]
    )
  }

useEffect(()=>{
  const matchescatogery = job => selectedCategories.length === 0 || selectedCategories.includes(job.category)

  const matcheslocation = job => selectedCategories.length === 0 || selectedLocations.includes(job.location)

  const matchesjobtitle = job => searchfilter.title === " " || job.title.toLowerCase().includes(searchfilter.title.toLowerCase())

  const matcheslocationtitle = job => searchfilter.location === " " || job.location.toLowerCase().includes(searchfilter.location.toLowerCase())

  const newfilteredjobs = jobs.slice().reverse().filter(job=> matchescatogery(job)&& matchesjobtitle(job) && matcheslocationtitle(job))

  setfilterjobs(newfilteredjobs)
  setcurrentpage(1)

},[jobs,selectedCategories,selectedLocations,searchfilter]) 

  return (
    <div className='container 2xl:px-20 p-5 py-8 mt-40'>
      <div className='lg:flex lg:gap-8 max-lg:space-y-8'>
        <div className='lg:w-1/4 pl-[42px]'>
          {
            issearched && (searchfilter.title !== "" || searchfilter.location !== "") && (
              <>
                <div className='shadow bg-[#97CADC] p-5 w-full rounded-lg flex flex-col mb-6'>
                  <h3 className='text-lg font-medium mb-4'>Your Current Filter</h3>
                  <div className='flex flex-wrap items-center gap-2 '>
                    {searchfilter.title && (
                      <span className='flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full'>
                        {searchfilter.title}
                        <img
                          onClick={() => setSearchFilter(prev => ({ ...prev, title: "" }))}
                          src={assets.cross_icon}
                          className='cursor-pointer w-4 h-4'
                          alt="Remove filter"
                        />
                      </span>
                    )}

                    {searchfilter.location && (
                      <span className='flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full'>
                        {searchfilter.location}
                        <img
                          onClick={() => setSearchFilter(prev => ({ ...prev, location: "" }))}
                          src={assets.cross_icon}
                          className='cursor-pointer w-4 h-4'
                          alt="Remove filter"
                        />
                      </span>
                    )}
                  </div>
                </div>
              </>
            )
          }

         
          <button
            className='px-6 py-1.5 rounded border border-gray-400 lg:hidden mt-18'
            onClick={() => setShowFilter(!showFilter)}
          >
            {showFilter ? "Close" : "Filters"}
          </button>

          {/* Both category and location filters controlled by showFilter state */}
          <div className={showFilter ? "" : "max-lg:hidden"} >
            {/* Category Filter */}
            <h4 className='font-medium text-lg py-4 '>Search By Category</h4>
            <ul className='space-y-4 text-gray-600'>
              {
                JobCategories.map((Category, index) => (
                  <li className='flex gap-3 items-center' key={index}>
                    <input
                      className='scale-125 cursor-pointer'
                      type="checkbox"
                      onChange={() => handleCategoryChange(Category)}
                      checked={selectedCategories.includes(Category)}
                    />
                    <label className='cursor-pointer'>{Category}</label>
                  </li>
                ))
              }
            </ul>

            
            <h4 className='font-medium text-lg py-4 pt-14'>Search By Location</h4>
            <ul className='space-y-4 text-gray-600'>
              {
                JobLocations.map((location, index) => (
                  <li className='flex gap-3 items-center' key={index}>
                    <input
                      className='scale-125 cursor-pointer'
                      type="checkbox"
                      onChange={() => handleLocationChange(location)}
                      checked={selectedLocations.includes(location)}
                    />
                    <label className='cursor-pointer'>{location}</label>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>

        <section className='lg:w-3/4 '>
          <h3 className='font-bold text-3xl py-2' id="job-list">Latest Jobs</h3>
          <p className='mb-8 sm:mb-4 md:mb-8 text-gray-500'>Latest jobs with top companies. Apply now and shape your career!</p>

          <div className='cards grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
            {filteredjobs
              .slice((currentpage - 1) * jobsPerPage, currentpage * jobsPerPage)
              .map((jobsData, index) => (
                <JobCard key={index} job={jobsData} />
              ))}
          </div>


          {filteredjobs.length > 0 && (
            <div className="flex items-center justify-center gap-2 mt-8">
             
              <a href="#job-list">
                <img 
                 onClick={()=> setcurrentpage(Math.max(currentpage-1,1))}
                src={assets.left_arrow_icon} alt="Previous" />
              </a>

              {Array.from({ length: Math.ceil(filteredjobs.length / jobsPerPage) }).map((_, index) => (
                
                <a href="#job-list" key={index}>
                  <button 
                    className={`w-8 h-8 rounded ${currentpage === index + 1 ? 'bg-[#1447E6] text-white' : 'bg-gray-100'}`}
                    onClick={() => setcurrentpage(index + 1)}
                  >
                    {index + 1}
                  </button>
              
                </a>
              ))}

              <a href="#job-list">
                <img 
                onClick={()=> setcurrentpage(Math.min(currentpage+1, Math.ceil(filteredjobs.length / jobsPerPage)))}
                src={assets.right_arrow_icon} alt="Next" />
              </a>

            </div> 
          )}

        </section>
      </div>
    </div>
  )
}

export default JobListing