import Company from "../Models/Company.js";
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import generateToken from "../Utils/generateToken.js";
import Job from "../Models/Job.js";

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


export const loginCompany = async (req, res) => {

    const { email, password } = req.body
    try {

        const company = await Company.findOne({ email })

        if (bcrypt.compare(password, company.password)) {
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

export const getCompanyData = async (req, res) => {

}

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
            date:Date.now(),
            level,
            category
        })
        await newJob.save()
        res.json({ success: true, newJob })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

export const getCompanyJobApplicants = async (req, res) => {

}

export const getCompanyPostedJobs = async (req, res) => {

}

export const changeJobApplications = async (req, res) => {

}
export const changeVisibility = async (req, res) => {

}
export const changeJobApplicationStatus = async (req, res) => {

}



