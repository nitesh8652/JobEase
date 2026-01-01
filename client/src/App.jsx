import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import ApplyJob from './Pages/ApplyJob'
import Application from './Pages/Application'
import Resume from './Pages/Resume'
import RecuterLogin from './Components/RecuterLogin'
import { AppContextProvider, AppContext } from './Context/AppContext'
import { useContext } from 'react'
import Dashboard from './Pages/Dashboard'
import Addjob from './Pages/Addjob'
import Managejobs from './Pages/Managejobs'
import ViewApplication from './Pages/ViewApplication'
import ResumeCreator from './Pages/ResumeBuilder'
import 'quill/dist/quill.snow.css'
import { ToastContainer, toast } from 'react-toastify';

const AppContent = () => { 
  const { showRecruiterLogin , companyToken } = useContext(AppContext)

  return (
    <div>
      {showRecruiterLogin && <RecuterLogin />}
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} />
        <Route path='/application' element={<Application />} />
        <Route path='/resume/:id' element={<Resume />} />
      <Route path='/resume-create/:id' element={<ResumeCreator />} />
        <Route path='/dashboard' element={<Dashboard />} >
        {companyToken ? <> 
        <Route path='add-job' element={<Addjob />} />
          <Route path='manage-job' element={<Managejobs />} />
          <Route path='view-application' element={<ViewApplication />} />
         </>:null}
         
        </Route>
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