

const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    companyLogo: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship", "Contract"],
      default: "Full-time",
    },

    experienceLevel: {
      type: String,
      enum: ["Entry level", "Intermediate level", "Senior level"],
      default: "Entry level",
    },

    salary: {
      type: String,
      default: "Not disclosed",
    },

    description: {
      type: String,
      required: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    isRemote: {
      type: Boolean,
      default: false,
    },

    applicationUrl: {
      type: String,
      default: "",
    },

    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);
