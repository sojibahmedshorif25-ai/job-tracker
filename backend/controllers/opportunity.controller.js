import Job from "../models/job.model.js";

// @desc    Post a job
// @route   POST /api/job/post
// @access  Private (Recruiter)
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      positions,
      companyId,
    } = req.body;
    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !positions ||
      !companyId
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","), // we need in the form of array
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: Number(experience),
      positions: Number(positions),
      company: companyId,
      createdBy: userId,
    });

    return res
      .status(201)
      .json({ message: "New job created successfully", success: true, job });
  } catch (error) {
    console.log("Error in posting job", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// @desc    Get all jobs
// @route   GET /api/job/get
// @access  Public
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({ path: "company" })
      .sort({ createdAt: -1 });

    if (!jobs) {
      return res
        .status(404)
        .json({ message: "Jobs not found", success: false });
    }

    return res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.log("Error in getting jobs", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// @desc    Get job by ID
// @route   GET /api/job/get/:id
// @access  Private
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    return res.status(200).json({ success: true, job });
  } catch (error) {
    console.log("Error in getting job by ID", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// @desc    Get recruiter jobs
// @route   GET /api/job/get-recruiter-jobs
// @access  Private (Recruiter)
export const getRecruiterJobs = async (req, res) => {
  try {
    const recruiterId = req.id;
    const jobs = await Job.find({ createdBy: recruiterId }).populate({
      path: "company",
      createdAt: -1,
    });

    if (!jobs) {
      return res
        .status(404)
        .json({ message: "Jobs not found", success: false });
    }

    return res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.log("Error in getting recruiter jobs", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
