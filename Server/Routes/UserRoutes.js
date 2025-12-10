// import express from 'express'
// import { applyForJob, getUserData, getUserJobApplication, updateUserResume } from '../Controller/UserController.js'
// import upload from '../Config/multer.js'

// const router = express.Router()

// //get user data

// router.get('/user',getUserData)

// //applying job

// router.post('/apply',applyForJob)

// //get applied job data

// router.get('/applications', getUserJobApplication)

// //update resume

// router.post('/update-resume' , upload.single('resume'),updateUserResume)

// export default router

import express from 'express'
import { applyForJob, getUserData, getUserJobApplication, updateUserResume } from '../Controller/UserController.js'
import upload from '../Config/multer.js'
// 1. IMPORT REQUIREAUTH
import { requireAuth } from '@clerk/express' 

const router = express.Router()

// 2. ADD requireAuth() TO ALL PROTECTED ROUTES

// Get user data
router.get('/user', requireAuth(), getUserData)

// Apply for job
router.post('/apply', requireAuth(), applyForJob)

// Get applied job data
router.get('/applications', requireAuth(), getUserJobApplication)

// Update resume
// ⚠️ CRITICAL: requireAuth() must be BEFORE upload.single()
router.post('/update-resume', requireAuth(), upload.single('resume'), updateUserResume)
export default router