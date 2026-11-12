
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  BriefcaseBusiness,
  Building2,
  MapPin,
  Layers,
  Wallet,
  GraduationCap,
  FileText,
  Code,
  Link as LinkIcon,
  ArrowLeft,
  Send,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const PublishJob = () => {
  const navigate = useNavigate();

  const initialFormData = {
    title: "",
    company: "",
    location: "",
    category: "",
    jobType: "Full-time",
    experienceLevel: "Entry level",
    salary: "",
    description: "",
    skills: "",
    applicationUrl: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get token before using it
    const token = sessionStorage.getItem("token");

    const user = JSON.parse(
      sessionStorage.getItem("user") || "null"
    );

    console.log("Publish button clicked");
    console.log("Token:", token);
    console.log("User:", user);

    if (!token) {
      toast.error("Please login first");
      return;
    }

    if (user?.role !== "employer") {
      toast.error("Only employers can publish jobs");
      return;
    }

    try {
      setIsSubmitting(true);

      const jobData = {
        ...formData,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      };

      const response = await fetch(
        "http://localhost:4000/api/jobs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(jobData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create job"
        );
      }

      toast.success("Job published successfully!");

      setFormData(initialFormData);

      // Go to Jobs page after successful publishing
      setTimeout(() => {
        navigate("/jobs");
      }, 1000);

    } catch (error) {
      console.error("Create Job Error:", error);
      toast.error(error.message || "Something went wrong");

    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#5B4BFF] focus:ring-2 focus:ring-[#5B4BFF]/10";

  const labelClass =
    "mb-2 block text-sm font-semibold text-gray-700";

  const sectionHeading = (Icon, title, description) => (
    <div className="mb-6 flex items-start gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-[#5B4BFF]">
        <Icon size={21} />
      </div>

      <div>
        <h2 className="text-lg font-bold text-gray-900">
          {title}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );

  return (
    <section className="min-h-screen bg-[#F7F8FC] px-4 py-10 md:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Breadcrumb */}
        <button
          type="button"
          onClick={() => navigate("/jobs")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#5B4BFF]"
        >
          <ArrowLeft size={17} />
          Back to Jobs
        </button>

        {/* Page Heading */}
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-[#5B4BFF]">
            <BriefcaseBusiness size={14} />
            EMPLOYER DASHBOARD
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Post a New Job
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 md:text-base">
            Find the right talent for your company. Share your job opening
            and connect with qualified candidates.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Basic Information */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-8">

            {sectionHeading(
              Building2,
              "Basic Information",
              "Start with the essential details about this job."
            )}

            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className={labelClass}>Job Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Frontend Developer"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Company Name *</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Job Location *</label>
                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Noida, Delhi"
                    className={`${inputClass} pl-11`}
                    required
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Job Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="">Select category</option>
                  <option value="Programming">Programming</option>
                  <option value="Frontend Development">Frontend Development</option>
                  <option value="Backend Development">Backend Development</option>
                  <option value="Full Stack Development">Full Stack Development</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Designing">Designing</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                </select>
              </div>

            </div>
          </div>

          {/* Job Requirements */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-8">

            {sectionHeading(
              GraduationCap,
              "Job Requirements",
              "Specify the type of job and candidate experience."
            )}

            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className={labelClass}>Job Type *</label>
                <div className="relative">
                  <BriefcaseBusiness
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    className={`${inputClass} pl-11`}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>Experience Level *</label>
                <div className="relative">
                  <Layers
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <select
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    className={`${inputClass} pl-11`}
                  >
                    <option value="Entry level">Entry level</option>
                    <option value="Intermediate level">Intermediate level</option>
                    <option value="Senior level">Senior level</option>
                  </select>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Salary / Stipend *</label>
                <div className="relative">
                  <Wallet
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="e.g. 3-5 LPA or 10000 per month"
                    className={`${inputClass} pl-11`}
                    required
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Job Description */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-8">

            {sectionHeading(
              FileText,
              "Job Description",
              "Explain the responsibilities and skills required."
            )}

            <div className="space-y-5">

              <div>
                <label className={labelClass}>Job Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the role, responsibilities, and what the candidate will work on..."
                  rows={7}
                  className={`${inputClass} resize-y`}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Required Skills</label>
                <div className="relative">
                  <Code
                    size={18}
                    className="absolute left-4 top-4 text-gray-400"
                  />
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="React, JavaScript, HTML, CSS"
                    className={`${inputClass} pl-11`}
                  />
                </div>
                <p className="mt-2 text-xs text-gray-400">
                  Enter skills separated by commas.
                </p>
              </div>

              <div>
                <label className={labelClass}>Application URL</label>
                <div className="relative">
                  <LinkIcon
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="url"
                    name="applicationUrl"
                    value={formData.applicationUrl}
                    onChange={handleChange}
                    placeholder="https://company.com/apply"
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col-reverse items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:flex-row md:p-6">

            <p className="text-sm text-gray-500">
              Fields marked with * are required.
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#5B4BFF] px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              <Send size={17} />
              {isSubmitting ? "Publishing..." : "Publish Job"}
            </button>

          </div>

        </form>
      </div>
    </section>
  );
};

export default PublishJob;



