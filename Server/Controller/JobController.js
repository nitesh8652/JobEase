import Job from "../Models/Job.js"

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ visible: true })
      .populate({ path: 'companyId', select: '-password' })

    // Filter out orphaned jobs (company was deleted → populate returns null)
    const validJobs = jobs.filter(job => job.companyId !== null)

    res.json({ success: true, jobs: validJobs })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export const getJobById = async (req, res) => {
  try {
    const { id } = req.params
    const job = await Job.findById(id).populate({ path: 'companyId', select: '-password' })

    if (!job || !job.companyId) {
      return res.json({ success: false, message: "Job Not Found" })
    }

    res.json({ success: true, job })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}