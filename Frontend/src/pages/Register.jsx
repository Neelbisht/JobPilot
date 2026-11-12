

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    experience: "Fresher",
    skills: "",
    companyName: "",
    companyLocation: "",
    companyWebsite: "",
    role: "jobseeker",
  });

  // Handle input changes
  const handleChange = (e) => {
    setMessage("");

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle registration
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      setMessageType("error");
      setMessage("Password must contain at least 8 characters.");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.mobile)) {
      setMessageType("error");
      setMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (
      formData.role === "employer" &&
      (!formData.companyName.trim() ||
        !formData.companyLocation.trim())
    ) {
      setMessageType("error");
      setMessage("Please enter your company name and location.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:4000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            password: formData.password,
            mobile: formData.mobile,
            role: formData.role,

            ...(formData.role === "jobseeker"
              ? {
                  experience: formData.experience,
                  skills: formData.skills,
                }
              : {
                  companyName: formData.companyName.trim(),
                  companyLocation: formData.companyLocation.trim(),
                  companyWebsite: formData.companyWebsite.trim(),
                }),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      setMessageType("success");
      setMessage("Registration successful! Redirecting to login...");

      setFormData({
        name: "",
        email: "",
        password: "",
        mobile: "",
        experience: "Fresher",
        skills: "",
        companyName: "",
        companyLocation: "",
        companyWebsite: "",
        role: "jobseeker",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      setMessageType("error");

      if (error instanceof TypeError) {
        setMessage(
          "Unable to connect to the server. Make sure your backend is running."
        );
      } else {
        setMessage(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition duration-200 placeholder:text-slate-400 focus:border-[#5B4BFF] focus:bg-white focus:ring-4 focus:ring-[#5B4BFF]/10";

  const labelClass =
    "mb-2 block text-sm font-medium text-slate-700";

  return (
    <div className="min-h-[calc(100vh-72px)] bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-2">

        {/* Left Illustration */}
        <div className="relative hidden overflow-hidden rounded-3xl bg-gradient-to-br from-violet-100 via-indigo-50 to-white p-8 lg:flex lg:min-h-[650px] lg:flex-col lg:items-center lg:justify-center">

          <img
            src={assets.registerImage}
            alt="Build your career with JobPilot"
            className="w-full max-w-lg object-contain"
          />

          <h2 className="mt-8 text-center text-3xl font-bold text-slate-900">
            Your next opportunity starts here.
          </h2>

          <p className="mt-3 max-w-md text-center leading-7 text-slate-600">
            Showcase your skills, discover exciting jobs, and take the next
            step in your career with JobPilot.
          </p>
        </div>

        {/* Registration Section */}
        <div className="mx-auto w-full max-w-2xl">

          {/* Heading */}
          <div className="mb-8 text-center">

            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Create Your{" "}
              <span className="text-[#5B4BFF]">JobPilot</span> Profile
            </h1>

            <p className="mt-3 text-slate-500">
              Build your profile and start discovering opportunities.
            </p>

          </div>

          {/* Registration Card */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Account Type */}
              <div>

                <p className={labelClass}>
                  I want to register as
                </p>

                <div className="grid grid-cols-2 gap-4">

                  {/* Job Seeker */}
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                      formData.role === "jobseeker"
                        ? "border-[#5B4BFF] bg-violet-50"
                        : "border-slate-200 hover:border-violet-300"
                    }`}
                  >

                    <input
                      type="radio"
                      name="role"
                      value="jobseeker"
                      checked={formData.role === "jobseeker"}
                      onChange={handleChange}
                      className="h-4 w-4 accent-[#5B4BFF]"
                    />

                    <div>
                      <p className="font-semibold text-slate-800">
                        Job Seeker
                      </p>

                      <p className="text-xs text-slate-500">
                        Looking for a job
                      </p>
                    </div>

                  </label>

                  {/* Employer */}
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                      formData.role === "employer"
                        ? "border-[#5B4BFF] bg-violet-50"
                        : "border-slate-200 hover:border-violet-300"
                    }`}
                  >

                    <input
                      type="radio"
                      name="role"
                      value="employer"
                      checked={formData.role === "employer"}
                      onChange={handleChange}
                      className="h-4 w-4 accent-[#5B4BFF]"
                    />

                    <div>
                      <p className="font-semibold text-slate-800">
                        Employer
                      </p>

                      <p className="text-xs text-slate-500">
                        Hiring candidates
                      </p>
                    </div>

                  </label>

                </div>
              </div>

              {/* Name and Email */}
              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label htmlFor="name" className={labelClass}>
                    {formData.role === "employer"
                      ? "Contact Person Name"
                      : "Full Name"}
                  </label>

                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>
                    {formData.role === "employer"
                      ? "Work Email"
                      : "Email Address"}
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    className={inputClass}
                    required
                  />
                </div>

              </div>

              {/* Mobile and Password */}
              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label htmlFor="mobile" className={labelClass}>
                    Mobile Number
                  </label>

                  <input
                    id="mobile"
                    type="tel"
                    name="mobile"
                    placeholder="10-digit mobile number"
                    value={formData.mobile}
                    onChange={handleChange}
                    autoComplete="tel"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    title="Enter a 10-digit mobile number"
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className={labelClass}>
                    Password
                  </label>

                  <div className="relative">

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="new-password"
                      minLength={8}
                      className={`${inputClass} pr-20`}
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#5B4BFF] hover:text-[#4938E8]"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>

                  </div>

                  <p className="mt-2 text-xs text-slate-500">
                    Use at least 8 characters.
                  </p>
                </div>

              </div>

              {/* Job Seeker Fields */}
              {formData.role === "jobseeker" && (
                <>
                  {/* Experience */}
                  <div>

                    <p className={labelClass}>
                      Experience
                    </p>

                    <div className="flex flex-wrap gap-6">

                      {["Fresher", "Experienced"].map((option) => (
                        <label
                          key={option}
                          className="flex cursor-pointer items-center gap-2 text-sm text-slate-700"
                        >

                          <input
                            type="radio"
                            name="experience"
                            value={option}
                            checked={formData.experience === option}
                            onChange={handleChange}
                            className="h-4 w-4 accent-[#5B4BFF]"
                          />

                          {option}

                        </label>
                      ))}

                    </div>
                  </div>

                  {/* Skills */}
                  <div>

                    <label htmlFor="skills" className={labelClass}>
                      Skills
                    </label>

                    <input
                      id="skills"
                      type="text"
                      name="skills"
                      placeholder="e.g. React, JavaScript, Node.js"
                      value={formData.skills}
                      onChange={handleChange}
                      className={inputClass}
                    />

                    <p className="mt-2 text-xs text-slate-500">
                      Separate multiple skills with commas.
                    </p>

                  </div>
                </>
              )}

              {/* Employer Fields */}
              {formData.role === "employer" && (
                <>
                  {/* Company Name */}
                  <div>

                    <label htmlFor="companyName" className={labelClass}>
                      Company Name
                    </label>

                    <input
                      id="companyName"
                      type="text"
                      name="companyName"
                      placeholder="Enter your company name"
                      value={formData.companyName}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />

                  </div>

                  {/* Company Location */}
                  <div>

                    <label htmlFor="companyLocation" className={labelClass}>
                      Company Location
                    </label>

                    <input
                      id="companyLocation"
                      type="text"
                      name="companyLocation"
                      placeholder="e.g. Noida, Delhi, Gurgaon"
                      value={formData.companyLocation}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />

                  </div>

                  {/* Company Website */}
                  <div>

                    <label htmlFor="companyWebsite" className={labelClass}>
                      Company Website (Optional)
                    </label>

                    <input
                      id="companyWebsite"
                      type="url"
                      name="companyWebsite"
                      placeholder="https://www.example.com"
                      value={formData.companyWebsite}
                      onChange={handleChange}
                      className={inputClass}
                    />

                  </div>
                </>
              )}

              {/* Terms */}
              <div className="flex items-start gap-3">

                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 shrink-0 accent-[#5B4BFF]"
                />

                <label
                  htmlFor="terms"
                  className="text-sm leading-6 text-slate-600"
                >
                  I agree to the JobPilot terms and privacy policy.
                </label>

              </div>

              {/* Status Message */}
              {message && (
                <p
                  role="status"
                  aria-live="polite"
                  className={`rounded-lg p-3 text-sm ${
                    messageType === "success"
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {message}
                </p>
              )}

              {/* Create Account */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#5B4BFF] py-3.5 font-semibold text-white shadow-lg shadow-[#5B4BFF]/20 transition duration-200 hover:-translate-y-0.5 hover:bg-[#4938E8] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#5B4BFF]/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

            </form>

            {/* Login Link */}
            <p className="mt-6 text-center text-sm text-slate-600">

              Already have an account?{" "}

              <Link
                to="/login"
                className="font-semibold text-[#5B4BFF] hover:underline"
              >
                Login
              </Link>

            </p>

          </div>

          <p className="mt-5 text-center text-xs text-slate-400">
            Start your next career journey with JobPilot.
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;
