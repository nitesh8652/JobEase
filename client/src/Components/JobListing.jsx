import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/AppContext'
import { assets, JobCategories, JobLocations } from '../assets/assets'
import JobCard from './JobCard'
import { Link, useNavigate } from 'react-router-dom'
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const JobListing = () => {
  const { issearched, searchfilter, setSearchFilter, jobs } = useContext(AppContext)

  const [showFilter, setShowFilter] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedLocations, setSelectedLocations] = useState([])
  const [currentpage, setcurrentpage] = useState(1)
  const jobsPerPage = 9
  const [filteredjobs, setfilterjobs] = useState(jobs)
  const navigate = useNavigate()

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

  useEffect(() => {
    // 1. Filter by Category (Checkboxes)
    const matchesCategory = job =>
      selectedCategories.length === 0 || selectedCategories.includes(job.category)

    // 2. Filter by Location (Checkboxes)
    const matchesLocation = job =>
      selectedLocations.length === 0 || selectedLocations.includes(job.location)

    // 3. Filter by Search Title (Search Bar)
    const matchesTitleSearch = job =>
      searchfilter.title === "" ||
      job.title.toLowerCase().includes(searchfilter.title.toLowerCase()) ||
      job.category.toLowerCase().includes(searchfilter.title.toLowerCase())

    // 4. Filter by Search Location (Search Bar)
    const matchesLocationSearch = job =>
      searchfilter.location === "" ||
      job.location.toLowerCase().includes(searchfilter.location.toLowerCase())

    // Apply all filters
    const newFilteredJobs = jobs.slice().reverse().filter(
      job => matchesCategory(job) &&
        matchesLocation(job) &&
        matchesTitleSearch(job) &&
        matchesLocationSearch(job)
    )

    setfilterjobs(newFilteredJobs)
    setcurrentpage(1)

  }, [jobs, selectedCategories, selectedLocations, searchfilter])

  return (
    <div className='container 2xl:px-20 p-5 py-8 mt-10 lg:mt-40'>
      <div className='lg:flex lg:gap-8 max-lg:space-y-8'>

        {/* Sidebar Filters */}
        <div className='lg:w-1/4 lg:pl-[42px]'>
         <div className="  relative group rounded-2xl p-[2px] bg-gradient-to-r from-[#00b3c7] via-[#4de8dd] to-[#00b3c7] ">
            <div className="bg-white rounded-2xl p-6 h-full w-full mb-[8px]">

              <h4 className="text-xl font-black mb-4 bg-[#15163A] bg-clip-text text-transparent">
                Login For Free Perks!
              </h4>

              <ul className="space-y-3">
                <li className="flex items-start group/item">
                  <span className="mt-1 mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#e0faff] text-[#00b3c7] group-hover/item:scale-110 transition-transform">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" /></svg>
                  </span>
                  <div type="button" className="flex flex-col">
                    <button onClick={() => navigate("/resume/yourid")} className="font-bold text-gray-800 group-hover/item:text-[#00b3c7] transition-colors">AI Resume Maker</button>
                    <button className="text-xs text-gray-600 hover:text-gray-600 cursor-pointer text-left">Build resumes instantly</button>
                  </div>
                </li>
              </ul>

            </div>
          </div>

          {
            issearched && (searchfilter.title !== "" || searchfilter.location !== "") && (
              <>
                <div className='shadow bg-[#97CADC] mt-[28px] p-5 w-full rounded-lg flex flex-col mb-6'>
                  <h3 className='text-lg font-medium mb-4 '>Your Current Filter</h3>
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

          {/* Filter Lists */}
          <div className={showFilter ? "" : "max-lg:hidden"} >

            {/* Category Filter */}
            <h4 className='font-bold text-lg py-4 '>Filter By Top Categories! </h4>
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

            {/* Location Filter */}
            <h4 className='font-bold text-lg py-4 pt-14'>Filter By Top Locations!</h4>
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

        {/* Job Cards Section */}
        <section className='lg:w-3/4 '>
          <h3 className='font-bold text-3xl py-2' id="job-list">Latest Jobs</h3>
          <p className='mb-8 sm:mb-4 md:mb-8 text-gray-500'>Latest jobs with top companies. Apply now and shape your career!</p>

          <div className='cards grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
            {filteredjobs
              .slice((currentpage - 1) * jobsPerPage, currentpage * jobsPerPage)
              .map((job, index) => (
                <JobCard key={index} job={job} />
              ))}
          </div>

          {/* Pagination */}
          {filteredjobs.length > 0 && (
            <div className="flex items-center justify-center gap-2 mt-8">

              <a href="#job-list">
                <img
                  onClick={() => setcurrentpage(Math.max(currentpage - 1, 1))}
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
                  onClick={() => setcurrentpage(Math.min(currentpage + 1, Math.ceil(filteredjobs.length / jobsPerPage)))}
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