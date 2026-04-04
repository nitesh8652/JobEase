import Job from "../Models/Job.js"

/**
 * @desc Get all available jobs
 * @route GET /api/jobs
 * @access Public
 * 
 * @logic
 * - Fetch only jobs where visibility is true
 * - Populate company details (excluding password)
 * - Remove orphan jobs (where company is deleted)
 * 
 * @why filtering?
 * - If a company is deleted, its jobs may still exist in DB
 * - populate() returns null for missing references
 * - We remove such jobs to maintain data integrity
 */

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

/**
 * @desc Get single job by ID
 * @route GET /api/jobs/:id
 * @access Public 
 * @logic
 * - Fetch job by ID
 * - Populate company details
 * - Validate job existence
 * - Also check if company exists (avoid broken references)
 */

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