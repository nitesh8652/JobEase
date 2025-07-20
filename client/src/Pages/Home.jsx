import React from 'react'
import Navbar from '../Components/Navbar'
import Banner from '../Components/Banner'
import JobListing from '../Components/JobListing'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Banner/>
      <JobListing/>
    </div>
  )
}

export default Home