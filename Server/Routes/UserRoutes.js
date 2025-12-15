import express from 'express'
import { applyForJob, getUserData, getUserJobApplication, updateUserResume } from '../Controller/UserController.js'
import upload from '../Config/multer.js'
import { requireAuth } from '@clerk/express' 

const router = express.Router()
router.get('/user', getUserData)

router.post('/apply', applyForJob)

router.get('/applications', getUserJobApplication)

router.post('/update-resume', upload.single('resume'), updateUserResume)
export default router