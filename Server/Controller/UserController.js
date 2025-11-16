import JobApplication from "../Models/JobApplication.js"
import User from "../Models/User.js"
import {v2 as cloudinary} from "cloudinary"

export const getUserData = async (req, res) => {

    const userId = req.auth.userId

    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.json({ success: false, message: "User Not Found" })

        }
        return res.json({ success: true, user })
    } catch (error) {
        res.json({ success: false, message: error.message })

    }

}

export const applyForJob = async (req, res) => {

    const { jobId } = req.body
    const userId = req.auth.userId
    try {
        const isAlreadyApplied = await JobApplication.findOne({ userId, jobId })
        if (isAlreadyApplied) {
            return res.json({ success: false, message: "You have already applied for this job" })
        }
        const jobData = await Job.findById(jobId)
        if (!jobData) {
            return res.json({ success: false, message: "Job Not Found" })
        }
        await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            date: Date.now()
        })
        res.json({ success: true, message: "Job Application Successful" })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }

}

export const getUserJobApplication = async (req, res) => {

    try {
        const userId = req.auth.userId
        const application = await JobApplication.find({ userId }).populate('jobId').populate('companyId', 'name email image').populate('jobId', 'title description location category salary label').exec()

        if (!application) {
            return res.json({ success: false, message: "No Application Found" })
        }
        return res.json({ success: true, application })
    } catch (error) { }
    return res.json({ success: false, message: error.message })
}

export const updateUserResume = async (req, res) => {

    try{
        const userId = req.auth.userId
        const resumeFile = req.file.path
        const userData = await User.findById(userId)
        if(resumeFile){
            const reusmeUpload = await cloudinary.uploader.upload(resumeFile.path)
            userData.resume = reusmeUpload.secure_url
        }

        await userData.save()
        return res.json({success:true,message:"Resume Updated Successfully"})

    }catch(error){
        return res.json({success:false,message:error.message})
    }

}