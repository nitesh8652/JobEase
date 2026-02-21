import React, { useContext, useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../Context/AppContext'

const Banner = () => {
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  
  const { setSearchFilter, setsearched } = useContext(AppContext)

  // UPDATED LOGIC HERE:
  useEffect(() => {
    // 1. Always update the search terms in context
    setSearchFilter({
        title: title,
        location: location
    })

    // 2. logic to toggle "searched" state
    // If both fields are empty, we are NOT searching (show all jobs)
    if (title.trim() === '' && location.trim() === '') {
        setsearched(false)
    } else {
        // If there is text, we ARE searching
        setsearched(true)
    }
    
  }, [title, location, setSearchFilter, setsearched]) 

  return (
    <div className="w-full">
      <div className="relative bg-[#15163A] py-20 px-6 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Find Your Dream Job With JobEase.
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Your Dream Job Awaits You! Build Your Resume With JobEase. And Path Your Career!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-4xl mx-auto">
            
            {/* Title Input */}
            <div className="flex items-center bg-white rounded-lg px-4 py-3 w-full sm:flex-1 shadow-lg">
              <img src={assets.search_icon} alt="Search" className="w-5 h-5 mr-3" />
              <input
                type="text"
                placeholder="Search job title, or company"
                maxLength={30}
                className="flex-1 outline-none text-gray-700 placeholder-gray-400"
                value={title}
                // Update state on change
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Location Input */}
            <div className="flex items-center bg-white rounded-lg px-4 py-3 w-full sm:flex-1 shadow-lg">
              <img src={assets.location_icon} alt="Location" className="w-5 h-5 mr-3" />
              <input
                type="text"
                placeholder="Location"
                maxLength={30}
                className="flex-1 outline-none text-gray-700 placeholder-gray-400"
                value={location}
                // Update state on change
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 w-full sm:w-auto shadow-lg"
            >
              Search
            </button>
          </div>
        </div>

        {/* Trusted By Section */}
        <div
          className=" hidden lg:block absolute left-1/2 transform -translate-x-1/2 bg-white py-10 px-4 sm:px-6 lg:px-8 shadow w-[90%] sm:w-[80%] md:w-[70%] rounded-[20px]"
          style={{ top: '85%' }}
        >
          <h4 className="text-2xl font-semibold text-gray-800 text-center mb-8">
            Trusted By
          </h4>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 ">
            <img className="h-8 opacity-70 hover:opacity-100 transition-opacity md:w-[12%] sm:w-[35%]" src={assets.microsoft_logo} alt="Microsoft" />
            <img className="h-8 opacity-70 hover:opacity-100 transition-opacity md:w-[12%] sm:w-[35%]" src={assets.walmart_logo} alt="Walmart" />
            <img className="h-8 opacity-70 hover:opacity-100 transition-opacity md:w-[12%] sm:w-[35%]" src={assets.adobe_logo} alt="Adobe" />
            <img className="h-9 opacity-70 hover:opacity-100 transition-opacity md:w-[12%] sm:w-[20%]" src={assets.accenture_logo} alt="Accenture" />
            <img className="h-9 opacity-70 hover:opacity-100 transition-opacity md:w-[12%] sm:w-[35%]" src={assets.samsung_logo} alt="Samsung" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner