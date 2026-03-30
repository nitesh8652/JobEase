import React from 'react'
import Navbar from '../Features/Components/Navbar'
import Banner from '../Features/Components/Banner'
import JobListing from '../Features/Jobs/JobListing'
import Footer from '../Features/Components/Footer'

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