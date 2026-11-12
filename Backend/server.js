
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const User = require("./models/User");
const Job = require("./models/Job");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Authentication routes
app.use("/api/auth", authRoutes);

// Application routes
app.use("/api/applications", applicationRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("JobPilot Backend is running!");
});

// Get currently logged-in user
app.get("/api/auth/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Fetch user error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch user",
    });
  }
});

// Get all jobs with search and filters
app.get("/api/jobs", async (req, res) => {
  try {
    const {
      search,
      location,
      category,
      jobType,
      experienceLevel,
    } = req.query;

    const filter = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }

    if (location) {
      filter.location = {
        $regex: location,
        $options: "i",
      };
    }

    if (category) {
      filter.category = {
        $regex: category,
        $options: "i",
      };
    }

    if (jobType) {
      filter.jobType = jobType;
    }

    if (experienceLevel) {
      filter.experienceLevel = experienceLevel;
    }

    const jobs = await Job.find(filter).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error("Fetch jobs error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
    });
  }
});

// Create a new job
// Only authenticated employers can create jobs
app.post("/api/jobs", authMiddleware, async (req, res) => {
  if (req.user.role !== "employer") {
    return res.status(403).json({
      success: false,
      message: "Only employers can create jobs",
    });
  }

  try {
    const {
      title,
      company,
      location,
      category,
      description,
      companyLogo,
      applicationUrl,
      skills,
      salary,
      isRemote,
    } = req.body;

    // Validate required fields
    const requiredFields = {
      title,
      company,
      location,
      category,
      description,
    };

    for (const [field, value] of Object.entries(requiredFields)) {
      if (typeof value !== "string" || !value.trim()) {
        return res.status(400).json({
          success: false,
          message: `Invalid or missing ${field}`,
        });
      }
    }

    // Validate skills
    if (
      skills !== undefined &&
      (!Array.isArray(skills) ||
        !skills.every(
          (skill) => typeof skill === "string" && skill.trim()
        ))
    ) {
      return res.status(400).json({
        success: false,
        message: "Skills must be an array of non-empty strings",
      });
    }

    // Validate salary
    if (salary !== undefined && typeof salary !== "string") {
      return res.status(400).json({
        success: false,
        message: "Salary must be a string",
      });
    }

    // Validate isRemote
    if (isRemote !== undefined && typeof isRemote !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isRemote must be true or false",
      });
    }

    // Validate URL fields
    const validateUrl = (value, fieldName) => {
      if (value === undefined || value === "") {
        return true;
      }

      if (typeof value !== "string") {
        return false;
      }

      try {
        const url = new URL(value);

        return ["http:", "https:"].includes(url.protocol);
      } catch {
        return false;
      }
    };

    if (!validateUrl(companyLogo, "companyLogo")) {
      return res.status(400).json({
        success: false,
        message: "Company logo must be a valid HTTP or HTTPS URL",
      });
    }

    if (!validateUrl(applicationUrl, "applicationUrl")) {
      return res.status(400).json({
        success: false,
        message: "Application URL must be a valid HTTP or HTTPS URL",
      });
    }

    // Create job
    const newJob = await Job.create({
      title,
      company,
      companyLogo,
      location,
      category,
      jobType: req.body.jobType,
      experienceLevel: req.body.experienceLevel,
      salary,
      description,
      skills,
      isRemote,
      applicationUrl,
      employer: req.user.userId,
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      job: newJob,
    });
  } catch (error) {
    console.error("Create job error:", error.message);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create job",
    });
  }
});


/* =====================================
   EMPLOYER JOB MANAGEMENT
===================================== */

// Get jobs published by logged-in employer
app.get("/api/jobs/employer", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({
        success: false,
        message: "Only employers can view their published jobs",
      });
    }

    const jobs = await Job.find({
      employer: req.user.userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error("Fetch employer jobs error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch your jobs",
    });
  }
});

// Edit a published job
app.put("/api/jobs/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({
        success: false,
        message: "Only employers can edit jobs",
      });
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    const allowedFields = [
      "title",
      "company",
      "companyLogo",
      "location",
      "category",
      "jobType",
      "experienceLevel",
      "salary",
      "description",
      "skills",
      "isRemote",
      "applicationUrl",
    ];

    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided to update",
      });
    }

    for (const field of [
      "title",
      "company",
      "location",
      "category",
      "description",
    ]) {
      if (
        updates[field] !== undefined &&
        (typeof updates[field] !== "string" ||
          !updates[field].trim())
      ) {
        return res.status(400).json({
          success: false,
          message: `Invalid ${field}`,
        });
      }
    }

    if (
      updates.skills !== undefined &&
      (!Array.isArray(updates.skills) ||
        !updates.skills.every(
          (skill) => typeof skill === "string" && skill.trim()
        ))
    ) {
      return res.status(400).json({
        success: false,
        message: "Skills must be an array of non-empty strings",
      });
    }

    if (
      updates.salary !== undefined &&
      typeof updates.salary !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Salary must be a string",
      });
    }

    if (
      updates.isRemote !== undefined &&
      typeof updates.isRemote !== "boolean"
    ) {
      return res.status(400).json({
        success: false,
        message: "isRemote must be true or false",
      });
    }

    for (const field of ["companyLogo", "applicationUrl"]) {
      if (
        updates[field] !== undefined &&
        updates[field] !== ""
      ) {
        try {
          const url = new URL(updates[field]);

          if (!["http:", "https:"].includes(url.protocol)) {
            throw new Error("Invalid URL");
          }
        } catch {
          return res.status(400).json({
            success: false,
            message: `${field} must be a valid HTTP or HTTPS URL`,
          });
        }
      }
    }

    const updatedJob = await Job.findOneAndUpdate(
      {
        _id: id,
        employer: req.user.userId,
      },
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found or you are not authorized to edit it",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    console.error("Update job error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to update job",
    });
  }
});

// Delete a published job
app.delete("/api/jobs/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({
        success: false,
        message: "Only employers can delete jobs",
      });
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    const deletedJob = await Job.findOneAndDelete({
      _id: id,
      employer: req.user.userId,
    });

    if (!deletedJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found or you are not authorized to delete it",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error("Delete job error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to delete job",
    });
  }
});


// Start server
const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from environment variables");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

startServer();









