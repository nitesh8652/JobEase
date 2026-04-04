import Company from "../Models/Company.js";
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import generateToken from "../Utils/generateToken.js";
import Job from "../Models/Job.js";
import JobApplication from "../Models/JobApplication.js";
import crypto from 'crypto'
import  nodemailer from 'nodemailer'


/**
 * @desc Register a new company
 * @route POST /api/company/register
 * @access Public
 * 
 * @steps
 * 1. Validate input fields
 * 2. Check if company already exists
 * 3. Hash password using bcrypt
 * 4. Upload company image to Cloudinary
 * 5. Save company in DB
 * 6. Generate JWT token
 */


export const registerCompany = async (req, res) => {

    const { name, email, password } = req.body;

    const imageFile = req.file;
    if (!name || !email || !password || !imageFile) {
        return res.json({ success: false, message: "All fields are required." })
    }

    try {
        const companyExists = await Company.findOne({ email })

        if (companyExists) {
            return res.json({ success: false, message: "company already registered" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const imageUpload = await cloudinary.uploader.upload(imageFile.path)
        const company = await Company.create({
            name,
            email,
            password: hashPassword,
            image: imageUpload.secure_url
        })

        res.json({
            success: true,
            company: {
                _id: company._id,
                name: company.name,
                email: company.email,
                image: company.image
            },
            token: generateToken(company._id)
        })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

/**
 * @desc Login company
 * @route POST /api/company/login
 * @access Public
 * 
 * @logic
 * - Find company by email
 * - Compare hashed password using bcrypt
 * - Generate JWT token if valid
 */

export const loginCompany = async (req, res) => {

    const { email, password } = req.body
    try {

        const company = await Company.findOne({ email })

        if (await bcrypt.compare(password, company.password)) {
            res.json({
                success: true,
                company: {
                    _id: company._id,
                    name: company.name,
                    email: company.email,
                    image: company.image
                },
                token: generateToken(company._id)
            })
        }
        else {
            res.json({ success: false, message: "invalid EMAIL or PASSWORD" })
        }

    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

/**
 * @desc Get logged-in company data
 * @route GET /api/company/me
 * @access Private
 * 
 * @note
 * - req.company is injected via authentication middleware (JWT verification)
 */

export const getCompanyData = async (req, res) => {

    try {
        const company = req.company;
        res.json({ success: true, company })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

/**
 * @desc Post a new job
 * @route POST /api/company/post-job
 * @access Private (Company only)
 * 
 * @logic
 * - Extract job details
 * - Attach companyId from authenticated user
 * - Save job in DB
 */

export const postJob = async (req, res) => {

    const { title, description, location, salary, level, category } = req.body;
    const companyId = req.company._id

    try {
        const newJob = new Job({
            title,
            description,
            location,
            salary,
            companyId,
            date: Date.now(),
            level,
            category
        })
        await newJob.save()
        res.json({ success: true, newJob })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

/**
 * @desc Get all applicants for company's jobs
 * @route GET /api/company/applicants
 * @access Private
 * 
 * @important
 * - Uses Mongoose populate to fetch related data:
 *   user details + job details
 */

export const getCompanyJobApplicants = async (req, res) => {

    try {
        const companyId = req.company._id
        //find job application 
        const applications = await JobApplication.find({ companyId }).populate('userId', 'name image resume')
            .populate('jobId', 'title description location salary level category').exec()

        return res.json({ success: true, applications })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

/**
 * @desc Get all jobs posted by company
 * @route GET /api/company/jobs
 * @access Private
 * 
 * @logic
 * - Fetch all jobs by companyId
 * - Count number of applicants per job
 * - Merge applicant count into job object
 */

export const getCompanyPostedJobs = async (req, res) => {

    try {
        const companyId = req.company._id
        const jobs = await Job.find({ companyId })

        //applicants info
        const jobsData = await Promise.all(jobs.map(async (job) => {
            const applications = await JobApplication.find({ jobId: job._id });
            return { ...job.toObject(), applicants: applications.length };
        }))

        res.json({ success: true, jobsData })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

/**
 * @desc Update job application status (Accepted/Rejected)
 * @route PUT /api/company/application-status
 * @access Private
 * 
 * @note
 * - Uses headers instead of body (not recommended but works)
 */

export const changeJobApplicationStatus = async (req, res) => {
    try {
        const id = req.headers["application-id"];
        const status = req.headers["application-status"];

        if (!id || !status) {
            return res.json({ success: false, message: "Missing id or status" });
        }

        await JobApplication.findByIdAndUpdate(id, { status });

        return res.json({ success: true, message: "Status updated successfully" });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

/**
 * @desc Toggle job visibility (hide/show job)
 * @access Private
 * @logic
 * - Only job owner can toggle visibility
 * - Flips boolean value of "visible"
 */

export const changeVisibility = async (req, res) => {

    try {
        const { id } = req.body
        const companyId = req.company._id
        const job = await Job.findById(id)
        if (companyId.toString() === job.companyId.toString()) {
            job.visible = !job.visible
        }
        await job.save()
        res.json({ success: true, job })
    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}

/**
 * @desc Send password reset token to email
 * @route POST /api/company/forgot-password
 * @access Public
 * 
 * @steps
 * - Generate random token using crypto
 * - Store token + expiry in DB
 * - Send email via nodemailer
 */

    export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const company = await Company.findOne({ email });

        if (!company) {
            return res.json({ success: false, message: "Company not found" });
        }

        const resetToken = crypto.randomBytes(20).toString("hex");

        company.resetToken = resetToken;
        company.resetTokenExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
        await company.save();

        // Send email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: " JobEase. Password Reset ",
            text: `Your password reset code for job portal is: ${resetToken}`
        });

        res.json({ success: true, message: "Reset token sent to email" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

/**
 * @desc Reset password using token
 * @route POST /api/company/reset-password
 * @access Public
 * 
 * @logic
 * - Validate token + expiry
 * - Hash new password
 * - Clear reset token fields
 */

   export const resetPassword = async (req, res) => {
    const { email, token, newPassword } = req.body;
    try {
        const company = await Company.findOne({
            email,
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() }
        });
        if (!company) {
            return res.json({ success: false, message: "Invalid or expired token" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);
        company.password = hashPassword;
        company.resetToken = undefined;
        company.resetTokenExpiry = undefined;
        await company.save();
        res.json({ success: true, message: "Password reset successful" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};









