import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    image: {
        type: String,
        required: true

    },

    password: {
        type: String,
        required: true
    },
})

const Company = mongoose.model('Company',CompanySchema)

export default Company