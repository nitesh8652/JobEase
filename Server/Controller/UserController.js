import JobApplication from "../Models/JobApplication.js"
import User from "../Models/User.js"
import Job from "../Models/Job.js"
import { clerkClient } from "@clerk/clerk-sdk-node"
import { v2 as cloudinary } from "cloudinary"

export const getUserData = async (req, res) => {
    try {
        console.log('token header:', req.headers.token);
        const userId = req.headers.token;
        if (!userId) {
            return res.json({ success: false, message: "Not authenticated" })
        }

        let user = await User.findById(userId)

        if (!user) {
            try {
                const clerkUser = await clerkClient.users.getUser(userId)

                const primaryEmail =
                    clerkUser.emailAddresses?.find(
                        (e) => e.id === clerkUser.primaryEmailAddressId
                    ) || clerkUser.emailAddresses?.[0]

                const email = primaryEmail?.emailAddress || ""

                const userData = {
                    _id: clerkUser.id,
                    email,
                    name:
                        `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
                        clerkUser.username ||
                        "",
                    image: clerkUser.imageUrl,
                    resume: "",
                }

                user = await User.create(userData)
            } catch (err) {
                return res.json({ success: false, message: "User Not Found" })
            }
        }

        return res.json({ success: true, user })
    } catch (error) {
        console.log("getUserData error:", error.message)
        return res.json({ success: false, message: error.message })
    }
}


export const applyForJob = async (req, res) => {
    try {
        const { jobId } = req.body
      const userId = req.headers.token  


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

        return res.json({ success: true, message: "Job Application Successful" })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const getUserJobApplication = async (req, res) => {
    try {
        const userId = req.auth.userId

        const application = await JobApplication.find({ userId })
            .populate('jobId')
            .populate('companyId', 'name email image')
            .exec()

        if (!application || application.length === 0) {
            return res.json({ success: false, message: "No Application Found" })
        }

        return res.json({ success: true, application })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

export const updateUserResume = async (req, res) => {
    try {
        const userId = req.headers.token

        if (!userId) {
            return res.json({ success: false, message: "Not authenticated" })
        }

        if (!req.file) {
            return res.json({ success: false, message: "No file uploaded" })
        }

        const userData = await User.findById(userId)

        if (!userData) {
            return res.json({ success: false, message: "User not found" })
        }

        const resumeUpload = await cloudinary.uploader.upload(req.file.path)
        userData.resume = resumeUpload.secure_url

        await userData.save()
        return res.json({ success: true, message: "Resume Updated Successfully" })

    } catch (error) {
        console.log("updateUserResume error:", error.message)
        return res.json({ success: false, message: error.message })
    }
}