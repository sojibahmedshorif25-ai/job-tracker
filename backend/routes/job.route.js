import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  getAllJobs,
  getJobById,
  getRecruiterJobs,
  postJob,
} from "../controllers/job.controller.js";

const router = express.Router();

router.post("/post", protect, postJob);
router.get("/get", getAllJobs); // public route, no protect middleware
router.get("/get/:id", getJobById);
router.get("/get-recruiter-jobs", protect, getRecruiterJobs);

export default router;
