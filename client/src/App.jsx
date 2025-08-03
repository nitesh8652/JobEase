import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import ApplyJob from './Pages/ApplyJob'
import Application from './Pages/Application'
import Resume from './Pages/Resume'
import RecuterLogin from './Components/RecuterLogin'
import { AppContextProvider, AppContext } from './Context/AppContext'
import { useContext } from 'react'

const AppContent = () => {
  const{showRecruiterLogin} = useContext(AppContext)

  return (
    <div>
      {showRecruiterLogin && <RecuterLogin />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} />
        <Route path='/application' element={<Application />} />
        <Route path='/resume/:id' element={<Resume />} />
      </Routes>
    </div>
  )
}

const App = () => {
  return (
    <AppContextProvider>
      <AppContent />
    </AppContextProvider>
  )
}

export default App 