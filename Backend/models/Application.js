
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    resume: {
      type: String,
      trim: true,
      default: "",
    },

    coverLetter: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Shortlisted", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

applicationSchema.index(
  { job: 1, applicant: 1 },
  { unique: true }
);

const Application = mongoose.model(
  "Application",
  applicationSchema
);

module.exports = Application;
