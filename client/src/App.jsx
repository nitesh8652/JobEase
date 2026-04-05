import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import ApplyJob from './Pages/ApplyJob'
import Application from './Pages/Application'
import Resume from './Pages/Resume'
import RecuterLogin from './Features/Auth/RecuterLogin'
import { AppContextProvider, AppContext } from './Context/AppContext'
import { useContext } from 'react'
import Dashboard from './Features/Dashboard/Dashboard'
import Addjob from './Features/Dashboard/Addjob'
import Managejobs from '../src/Features/Dashboard/Managejobs'
import ViewApplication from './Features/Dashboard/ViewApplication'
import ResumeCreator from './Features/Resume/ResumeEssentials/ResumeBuilder'
import ProtectedRoute from './Features/Protected/ProtectedRoute'
import 'quill/dist/quill.snow.css'
import { ToastContainer, toast } from 'react-toastify';
import UserProtectedRoute from './Features/Protected/UserProtected'

const AppContent = () => {
  const { showRecruiterLogin, companyToken } = useContext(AppContext)

  return (
    <div>
      {showRecruiterLogin && <RecuterLogin />}
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} />
        <Route path='/resume/:id' element={<Resume />} />
        <Route
          path='/resume-create/:id'
          element={
            <UserProtectedRoute>
              <ResumeCreator />
            </UserProtectedRoute>
          }
        />
        <Route
          path='/application'
          element={
            <UserProtectedRoute>
              <Application />
            </UserProtectedRoute>
          }
        />
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path='add-job' element={<Addjob />} />
          <Route path='manage-job' element={<Managejobs />} />
          <Route path='view-application' element={<ViewApplication />} />
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
