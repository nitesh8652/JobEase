import React from 'react'
import Navbar from '../Components/Navbar'
import Banner from '../Components/Banner'
import JobListing from '../Features/Jobs/JobListing'
import Footer from '../Components/Footer'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Banner/>
      <JobListing/>
      <Footer/>
    </div>
  )
}

export default Home