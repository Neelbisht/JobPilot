

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BriefcaseBusiness,
  MapPin,
  CalendarDays,
  IndianRupee,
  Pencil,
  Trash2,
  ArrowLeft,
  Building2,
  FileText,
  X,
  ClipboardList,
} from "lucide-react";

function MyPublishedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingJob, setEditingJob] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [formData, setFormData] = useState({
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
  });

  const API_URL = "http://localhost:4000/api/jobs";

  // Fetch employer's jobs
  const fetchJobs = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const response = await fetch(`${API_URL}/employer`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch jobs");
      }

      setJobs(data.jobs || []);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Open edit form
  const handleEdit = (job) => {
    setEditingJob(job);

    setFormData({
      title: job.title || "",
      company: job.company || "",
      location: job.location || "",
      category: job.category || "",
      jobType: job.jobType || "Full-time",
      experienceLevel: job.experienceLevel || "Entry level",
      salary: job.salary || "",
      description: job.description || "",
      skills: Array.isArray(job.skills)
        ? job.skills.join(", ")
        : "",
      applicationUrl: job.applicationUrl || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Update job
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const token = sessionStorage.getItem("token");

      const updatedData = {
        ...formData,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      };

      const response = await fetch(
        `${API_URL}/${editingJob._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update job");
      }

      alert("Job updated successfully!");

      setEditingJob(null);
      await fetchJobs();
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Delete job
  const handleDelete = async (jobId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(jobId);

      const token = sessionStorage.getItem("token");

      const response = await fetch(`${API_URL}/${jobId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete job");
      }

      setJobs((previous) =>
        previous.filter((job) => job._id !== jobId)
      );

      alert("Job deleted successfully!");
    } catch (err) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#5B4BFF] focus:bg-white focus:ring-4 focus:ring-purple-100";

  const labelClass =
    "mb-2 block text-sm font-semibold text-gray-700";

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F8FC] flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-purple-100 border-t-[#5B4BFF]" />
          <p className="font-medium text-gray-500">
            Loading your published jobs...
          </p>
        </div>
      </div>
    );
  }

  // Error screen
  if (error) {
    return (
      <div className="min-h-screen bg-[#F7F8FC] flex flex-col items-center justify-center px-4">
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <p className="mb-5 text-red-600">{error}</p>

          <button
            onClick={() => {
              setLoading(true);
              fetchJobs();
            }}
            className="rounded-xl bg-[#5B4BFF] px-6 py-3 font-semibold text-white hover:bg-[#4938e8]"
          >
            Try Again
          </button>

          <div className="mt-5">
            <Link
              to="/profile"
              className="font-semibold text-[#5B4BFF] hover:underline"
            >
              Back to Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8FC] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Back to Profile */}
        <Link
          to="/profile"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-[#5B4BFF]"
        >
          <ArrowLeft size={17} />
          Back to Profile
        </Link>

        {/* Dashboard Header */}
        <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-[#5141E8] to-[#8171FF] p-7 text-white shadow-lg shadow-purple-200 sm:p-10">
          <div className="absolute -right-10 -top-16 h-64 w-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-24 right-40 h-56 w-56 rounded-full bg-white/10" />

          <div className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold tracking-wide">
                <BriefcaseBusiness size={15} />
                EMPLOYER DASHBOARD
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                My Published Jobs
              </h1>

              <p className="mt-3 max-w-lg text-sm leading-6 text-purple-100 sm:text-base">
                Manage your job listings, update details, and keep your
                opportunities up to date.
              </p>
            </div>

            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/15">
              <ClipboardList size={43} strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex items-center gap-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-50 text-[#5B4BFF]">
              <BriefcaseBusiness size={27} />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Published Jobs
              </p>
              <h2 className="mt-1 text-3xl font-bold text-gray-900">
                {jobs.length}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <ClipboardList size={27} />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">
                Listing Status
              </p>
              <h2 className="mt-1 text-xl font-bold text-gray-900">
                {jobs.length > 0 ? "Active Listings" : "No Listings"}
              </h2>
            </div>
          </div>
        </div>

        {/* Edit Job Form */}
        {editingJob && (
          <div className="mb-8 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 bg-purple-50/60 px-6 py-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#5B4BFF]">
                  Manage Listing
                </p>
                <h2 className="mt-1 text-xl font-bold text-gray-900">
                  Edit Job Details
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setEditingJob(null)}
                className="rounded-lg p-2 text-gray-500 transition hover:bg-white hover:text-red-500"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-6 p-6 sm:p-8">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Job Title</label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="e.g. Frontend Developer"
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Company</label>
                  <input
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Company name"
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Location</label>
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="e.g. Noida"
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Category</label>
                  <input
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="e.g. Programming"
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Job Type</label>
                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Internship</option>
                    <option>Contract</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Experience Level</label>
                  <select
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option>Entry level</option>
                    <option>Intermediate</option>
                    <option>Senior level</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Salary</label>
                  <input
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="e.g. 5-8 LPA"
                  />
                </div>

                <div>
                  <label className={labelClass}>Application URL</label>
                  <input
                    name="applicationUrl"
                    type="url"
                    value={formData.applicationUrl}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  Skills
                  <span className="ml-2 font-normal text-gray-400">
                    (Separate with commas)
                  </span>
                </label>

                <input
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="React, JavaScript, Node.js"
                />
              </div>

              <div>
                <label className={labelClass}>Job Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  className={inputClass}
                  placeholder="Describe the job responsibilities and requirements..."
                  required
                />
              </div>

              <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-5">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-[#5B4BFF] px-7 py-3 font-semibold text-white shadow-md shadow-purple-200 transition hover:bg-[#4938e8] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Saving Changes..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  onClick={() => setEditingJob(null)}
                  className="rounded-xl border border-gray-200 px-7 py-3 font-semibold text-gray-600 transition hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Section Heading */}
        <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Your Job Listings
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              All the opportunities you have published.
            </p>
          </div>

          <span className="w-fit rounded-full bg-purple-50 px-4 py-2 text-xs font-semibold text-[#5B4BFF]">
            {jobs.length} {jobs.length === 1 ? "Job" : "Jobs"} Found
          </span>
        </div>

        {/* Empty State */}
        {jobs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-purple-50 text-[#5B4BFF]">
              <BriefcaseBusiness size={36} />
            </div>

            <h2 className="text-xl font-bold text-gray-900">
              No published jobs yet
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
              Your published job listings will appear here. Start by
              publishing your first opportunity.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-purple-100 hover:shadow-lg sm:p-7"
              >
                <div className="flex flex-col justify-between gap-5 sm:flex-row">
                  {/* Job Information */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-[#5B4BFF]">
                        <Building2 size={26} />
                      </div>

                      <div className="min-w-0">
                        <h3 className="break-words text-lg font-bold text-gray-900 transition group-hover:text-[#5B4BFF] sm:text-xl">
                          {job.title}
                        </h3>

                        <p className="mt-1 flex items-center gap-2 text-sm font-medium text-gray-600">
                          <Building2 size={15} className="shrink-0" />
                          {job.company}
                        </p>
                      </div>
                    </div>

                    {/* Job Details */}
                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm text-gray-500">
                      <span className="flex items-center gap-2">
                        <MapPin size={16} className="text-[#5B4BFF]" />
                        {job.location}
                      </span>

                      <span className="flex items-center gap-2">
                        <IndianRupee size={16} className="text-[#5B4BFF]" />
                        {job.salary || "Not specified"}
                      </span>

                      <span className="flex items-center gap-2">
                        <CalendarDays size={16} className="text-[#5B4BFF]" />
                        {job.createdAt
                          ? new Date(job.createdAt).toLocaleDateString("en-IN")
                          : "Date unavailable"}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {[job.category, job.jobType, job.experienceLevel]
                        .filter(Boolean)
                        .map((item, index) => (
                          <span
                            key={index}
                            className="rounded-lg border border-purple-100 bg-purple-50 px-3 py-1.5 text-xs font-semibold text-[#5B4BFF]"
                          >
                            {item}
                          </span>
                        ))}
                    </div>

                    {/* Description */}
                    {job.description && (
                      <p className="mt-5 line-clamp-2 max-w-3xl text-sm leading-6 text-gray-500">
                        {job.description}
                      </p>
                    )}

                    {/* Skills */}
                    {Array.isArray(job.skills) && job.skills.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="rounded-md bg-gray-100 px-2.5 py-1 text-xs text-gray-600"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex shrink-0 flex-row gap-3 border-t border-gray-100 pt-4 sm:flex-col sm:border-0 sm:pt-0">
                    <button
                      onClick={() => handleEdit(job)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#5B4BFF] px-5 py-2.5 text-sm font-semibold text-[#5B4BFF] transition hover:bg-purple-50 sm:flex-none"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(job._id)}
                      disabled={deletingId === job._id}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
                    >
                      <Trash2 size={16} />
                      {deletingId === job._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom */}
        <div className="mt-10 border-t border-gray-200 pt-6 text-center">
          <p className="text-sm text-gray-400">
            JobPilot · Employer Dashboard
          </p>
        </div>
      </div>
    </div>
  );
}

export default MyPublishedJobs;
