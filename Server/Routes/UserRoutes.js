import express from 'express'
import { applyForJob, getUserData, getUserJobApplication, updateUserResume } from '../Controller/UserController.js'
import upload from '../Config/multer.js'

const router = express.Router()

//get user data

router.get('/user',getUserData)

//applying job

router.post('/apply',applyForJob)

//get applied job data

router.get('/applications', getUserJobApplication)

//update resume

router.post('/update-resume' , upload.single('resume'),updateUserResume)

export default router