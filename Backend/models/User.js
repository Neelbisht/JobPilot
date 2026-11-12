
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // Common Fields
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      enum: ["jobseeker", "employer"],
      default: "jobseeker",
    },

    // Job Seeker Fields
    experience: {
      type: String,
      enum: ["Fresher", "Experienced"],
      required: function () {
        return this.role === "jobseeker";
      },
    },

    skills: {
      type: [String],
      default: [],
    },

    // Employer Fields
    companyName: {
      type: String,
      trim: true,
      required: function () {
        return this.role === "employer";
      },
    },

    companyLocation: {
      type: String,
      trim: true,
      required: function () {
        return this.role === "employer";
      },
    },

    companyWebsite: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

