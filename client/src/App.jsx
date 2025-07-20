import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import ApplyJob from './Pages/ApplyJob'
import Application from './Pages/Application'
import Resume from './Pages/Resume'

const App = () => {
  return (  
    <div>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} />
        <Route path='/application' element={<Application />} />
        <Route path='/resume/:id' element={<Resume />} />
      </Routes>

    </div>
  )
}

export default App 