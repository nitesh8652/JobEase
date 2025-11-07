import Job from "../Models/Job.js"

export const getJobs = async (req,res) => {

    try{
        const jobs = await Job.find({visible:true}).populate({path:'companyId',select:'-password'})
        res.json({success:true,jobs})
    }catch(error){
        res.json({success:false,message:error.message})
    }

}


export const getJobById = async (req,res) => {

}