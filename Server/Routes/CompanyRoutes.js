import express from 'express';
import { changeJobApplications, changeJobApplicationStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../Controller/CompanyController.js';
import upload from '../Config/multer.js';
import { protectCompany } from '../Middleware/Authmiddleware.js';

const router = express.Router();

router.post('/register', upload.single('image'), registerCompany)

router.post('/login', loginCompany)

router.get('/company', protectCompany, getCompanyData)

router.post('/post-job', protectCompany, postJob)
 
router.get('/applicants', protectCompany, getCompanyJobApplicants)

router.get('/listjobs', protectCompany, getCompanyPostedJobs)

router.post('/changestatus', protectCompany, changeJobApplicationStatus)

router.post('/changevisibility', protectCompany,changeVisibility)

export default router