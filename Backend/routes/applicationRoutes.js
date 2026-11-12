
const express = require("express");
const mongoose = require("mongoose");

const Application = require("../models/Application");
const Job = require("../models/Job");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// 1. Jobseeker views their applications
router.get("/my", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "jobseeker") {
      return res.status(403).json({
        success: false,
        message: "Only jobseekers can view their applications.",
      });
    }

    const applications = await Application.find({
      applicant: req.user.userId,
    })
      .populate(
        "job",
        "title company companyLogo location category jobType salary"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error("Fetch applications error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch applications.",
    });
  }
});

// 2. Employer views applications received
router.get("/employer", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({
        success: false,
        message: "Only employers can view received applications.",
      });
    }

    const applications = await Application.find({
      employer: req.user.userId,
    })
      .populate(
        "job",
        "title company companyLogo location category jobType salary"
      )
      .populate(
        "applicant",
        "name email mobile"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error("Fetch employer applications error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch received applications.",
    });
  }
});

// 3. Employer updates application status
router.patch("/:id/status", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({
        success: false,
        message: "Only employers can update application status.",
      });
    }

    const { id } = req.params;
    const { status } = req.body;

    // Validate application ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID.",
      });
    }

    // Validate application status
    const allowedStatuses = [
      "Pending",
      "Reviewed",
      "Shortlisted",
      "Rejected",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application status.",
      });
    }

    // Find application belonging to this employer
    const application = await Application.findOne({
      _id: id,
      employer: req.user.userId,
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found.",
      });
    }

    // Update status
    application.status = status;
    await application.save();

    return res.status(200).json({
      success: true,
      message: "Application status updated successfully.",
      application,
    });
  } catch (error) {
    console.error("Update application status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update application status.",
    });
  }
});

// 4. Jobseeker submits an application
router.post("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "jobseeker") {
      return res.status(403).json({
        success: false,
        message: "Only jobseekers can apply for jobs.",
      });
    }

    const { jobId, resume, coverLetter } = req.body;
    const applicantId = req.user.userId;

    // Check required Job ID
    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required.",
      });
    }

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Job ID.",
      });
    }

    // Find job
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    // Prevent applying to own job
    if (job.employer.toString() === applicantId) {
      return res.status(403).json({
        success: false,
        message: "You cannot apply for your own job.",
      });
    }

    // Check duplicate application
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: applicantId,
    });

    if (existingApplication) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this job.",
      });
    }

    // Create application
    const application = await Application.create({
      job: jobId,
      applicant: applicantId,
      employer: job.employer,
      resume: resume || "",
      coverLetter: coverLetter || "",
    });

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully.",
      application,
    });
  } catch (error) {
    console.error("Application submission error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this job.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to submit application.",
    });
  }
});

module.exports = router;




