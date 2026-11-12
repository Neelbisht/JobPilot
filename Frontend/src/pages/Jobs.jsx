
import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Pagination from "../components/pagination";
import JobsHero from "../components/JobHero";
import JobProfileCTA from "../components/JobProfileCTA";

import {
  categories,
  locations,
  levels,
  workTypes,
  salaryRanges,
} from "../assets/assets";

import { getJobs } from "../services/jobService";

const JOBS_PER_PAGE = 8;

const normalize = (value) =>
  String(value ?? "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9.]+/g, "");

// Programming-related categories.
const programmingCategories = [
  "programming",
  "fullstack",
  "fullstackdeveloper",
  "fullstackdevelopment",
  "mernstack",
  "mernstackdeveloper",
  "mernstackdevelopment",
  "frontend",
  "frontenddeveloper",
  "frontenddevelopment",
  "backend",
  "backenddeveloper",
  "backenddevelopment",
  "webdevelopment",
  "softwaredevelopment",
  "softwaredeveloper",
  "javascriptdeveloper",
  "reactdeveloper",
  "nodejsdeveloper",
  "pythondeveloper",
  "javadeveloper",
  "phpdeveloper",
];

// Category aliases.
const categoryAliases = {
  fullstack: [
    "fullstack",
    "fullstackdeveloper",
    "fullstackdevelopment",
    "mernstack",
    "mernstackdeveloper",
  ],

  fullstackdeveloper: [
    "fullstack",
    "fullstackdeveloper",
    "fullstackdevelopment",
    "mernstack",
    "mernstackdeveloper",
  ],

  fullstackdevelopment: [
    "fullstack",
    "fullstackdeveloper",
    "fullstackdevelopment",
    "mernstack",
    "mernstackdeveloper",
  ],

  mernstackdeveloper: [
    "fullstack",
    "fullstackdeveloper",
    "fullstackdevelopment",
    "mernstack",
    "mernstackdeveloper",
  ],

  frontenddeveloper: [
    "frontend",
    "frontenddeveloper",
    "frontenddevelopment",
  ],

  frontenddevelopment: [
    "frontend",
    "frontenddeveloper",
    "frontenddevelopment",
  ],

  backenddeveloper: [
    "backend",
    "backenddeveloper",
    "backenddevelopment",
  ],

  backenddevelopment: [
    "backend",
    "backenddeveloper",
    "backenddevelopment",
  ],
};

const FilterGroup = ({
  title,
  options = [],
  selectedValues = [],
  onToggle,
}) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="border-t border-gray-200 py-5">
      <button
        type="button"
        onClick={() => setExpanded((previous) => !previous)}
        className="flex w-full items-center justify-between text-left"
        aria-expanded={expanded}
      >
        <span className="text-sm font-semibold text-gray-800">
          {title}
        </span>

        <span className="text-gray-500">
          {expanded ? "−" : "+"}
        </span>
      </button>

      {expanded && (
        <div className="mt-3 max-h-56 space-y-3 overflow-y-auto">
          {options.map((option) => {
            const isObject =
              typeof option === "object" && option !== null;

            const value = isObject ? option.label : option;

            return (
              <label
                key={String(value)}
                className="flex cursor-pointer items-center gap-3 text-sm text-gray-600 hover:text-gray-900"
              >
                <input
                  type="checkbox"
                  checked={selectedValues.includes(value)}
                  onChange={() => onToggle(value)}
                  className="h-4 w-4 rounded border-gray-300 accent-[#5B4BFF]"
                />

                <span>{value}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

const Jobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlSearch = searchParams.get("search") || "";
  const urlLocation = searchParams.get("location") || "";
  const urlJobType =
    searchParams.get("jobType") ||
    searchParams.get("type") ||
    "";

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState(urlSearch);
  const [locationSearch, setLocationSearch] = useState(urlLocation);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);

  const [selectedWorkTypes, setSelectedWorkTypes] = useState(
    urlJobType ? [urlJobType] : []
  );

  const [selectedSalaryRanges, setSelectedSalaryRanges] = useState([]);

  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  // Application form states.
  const [selectedJob, setSelectedJob] = useState(null);
  const [resume, setResume] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch jobs from backend.
  useEffect(() => {
    let cancelled = false;

    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getJobs();

        if (!cancelled) {
          setJobs(
            Array.isArray(data)
              ? data
              : Array.isArray(data?.jobs)
                ? data.jobs
                : []
          );
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);

        if (!cancelled) {
          setError("Unable to load jobs. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchJobs();

    return () => {
      cancelled = true;
    };
  }, []);

  // Update filters when URL changes.
  useEffect(() => {
    setSearch(urlSearch);
    setLocationSearch(urlLocation);
    setSelectedWorkTypes(urlJobType ? [urlJobType] : []);
    setCurrentPage(1);
  }, [urlSearch, urlLocation, urlJobType]);

  // Toggle filter values.
  const toggleFilter = (value, setSelectedValues) => {
    setSelectedValues((previous) =>
      previous.includes(value)
        ? previous.filter((item) => item !== value)
        : [...previous, value]
    );

    setCurrentPage(1);
  };

  // Filter jobs.
  const filteredJobs = useMemo(() => {
    const normalizedSearch = normalize(search);
    const normalizedLocation = normalize(locationSearch);

    return jobs.filter((job) => {
      const skills = Array.isArray(job.skills)
        ? job.skills
        : [];

      const searchableText = [
        job.title,
        job.company,
        job.description,
        job.category,
        ...skills,
      ]
        .map(normalize)
        .join(" ");

      const searchMatch =
        !normalizedSearch ||
        searchableText.includes(normalizedSearch);

      const locationMatch =
        !normalizedLocation ||
        normalize(job.location).includes(normalizedLocation);

      // Category filter.
      const jobCategory = normalize(job.category);

      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.some((value) => {
          const selectedCategory = normalize(value);

          // Programming displays all programming-related jobs.
          if (selectedCategory === "programming") {
            const categoryMatches =
              programmingCategories.includes(jobCategory);

            const programmingText = [
              job.title,
              job.description,
              ...skills,
            ]
              .map(normalize)
              .join(" ");

            const programmingKeywords = [
              "developer",
              "development",
              "programming",
              "software",
              "frontend",
              "backend",
              "fullstack",
              "mern",
              "react",
              "javascript",
              "nodejs",
              "python",
              "java",
              "php",
              "web",
              "html",
              "css",
            ];

            const textMatches = programmingKeywords.some(
              (keyword) => programmingText.includes(keyword)
            );

            return categoryMatches || textMatches;
          }

          const aliases = categoryAliases[selectedCategory] || [
            selectedCategory,
          ];

          return aliases.includes(jobCategory);
        });

      const sidebarLocationMatch =
        selectedLocations.length === 0 ||
        selectedLocations.some((value) =>
          normalize(job.location).includes(normalize(value))
        );

      const jobLevel =
        job.experienceLevel ?? job.level ?? "";

      const levelMatch =
        selectedLevels.length === 0 ||
        selectedLevels.some(
          (value) => normalize(value) === normalize(jobLevel)
        );

      const jobType =
        job.jobType ?? job.workType ?? "";

      const workTypeMatch =
        selectedWorkTypes.length === 0 ||
        selectedWorkTypes.some(
          (value) => normalize(value) === normalize(jobType)
        );

      // Salary filter.
      const salaryMatch =
        selectedSalaryRanges.length === 0 ||
        selectedSalaryRanges.some((selectedLabel) => {
          const range = salaryRanges.find((item) => {
            const label =
              typeof item === "object" && item !== null
                ? item.label
                : item;

            return label === selectedLabel;
          });

          if (!range || typeof range !== "object") {
            return false;
          }

          const salaryText = String(job.salary ?? "")
            .toLowerCase()
            .replace(/,/g, "");

          const numbers = salaryText.match(/\d+(\.\d+)?/g);

          if (!numbers) return false;

          const values = numbers.map(Number);

          let jobMin = Math.min(...values);
          let jobMax = Math.max(...values);

          if (
            salaryText.includes("month") ||
            salaryText.includes("monthly")
          ) {
            jobMin = (jobMin * 12) / 100000;
            jobMax = (jobMax * 12) / 100000;
          } else if (
            salaryText.includes("year") ||
            salaryText.includes("annual")
          ) {
            jobMin = jobMin / 100000;
            jobMax = jobMax / 100000;
          } else if (!salaryText.includes("lpa")) {
            return false;
          }

          const minSalary = Number(range.min);
          const maxSalary = Number(range.max);

          if (
            !Number.isFinite(minSalary) ||
            !Number.isFinite(maxSalary)
          ) {
            return false;
          }

          return (
            jobMax >= minSalary &&
            jobMin <= maxSalary
          );
        });

      return (
        searchMatch &&
        locationMatch &&
        categoryMatch &&
        sidebarLocationMatch &&
        levelMatch &&
        workTypeMatch &&
        salaryMatch
      );
    });
  }, [
    jobs,
    search,
    locationSearch,
    selectedCategories,
    selectedLocations,
    selectedLevels,
    selectedWorkTypes,
    selectedSalaryRanges,
  ]);

  // Sort jobs.
  const sortedJobs = useMemo(() => {
    const result = [...filteredJobs];

    if (sortBy === "title") {
      result.sort((a, b) =>
        String(a.title || "").localeCompare(
          String(b.title || "")
        )
      );
    } else if (sortBy === "company") {
      result.sort((a, b) =>
        String(a.company || "").localeCompare(
          String(b.company || "")
        )
      );
    } else {
      result.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();

        return dateB - dateA;
      });
    }

    return result;
  }, [filteredJobs, sortBy]);

  // Pagination.
  const totalPages = Math.ceil(
    sortedJobs.length / JOBS_PER_PAGE
  );

  const safeCurrentPage = Math.min(
    currentPage,
    Math.max(totalPages, 1)
  );

  const startIndex =
    (safeCurrentPage - 1) * JOBS_PER_PAGE;

  const paginatedJobs = sortedJobs.slice(
    startIndex,
    startIndex + JOBS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage((previous) =>
      Math.min(previous, Math.max(totalPages, 1))
    );
  }, [totalPages]);

  // Clear all filters.
  const clearFilters = () => {
    setSearch("");
    setLocationSearch("");
    setSelectedCategories([]);
    setSelectedLocations([]);
    setSelectedLevels([]);
    setSelectedWorkTypes([]);
    setSelectedSalaryRanges([]);
    setCurrentPage(1);
    setSearchParams({});
  };

  const hasActiveFilters =
    search.trim() !== "" ||
    locationSearch.trim() !== "" ||
    selectedCategories.length > 0 ||
    selectedLocations.length > 0 ||
    selectedLevels.length > 0 ||
    selectedWorkTypes.length > 0 ||
    selectedSalaryRanges.length > 0;

  // Open application form.
  const handleApply = (job) => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      window.alert("Please log in as a jobseeker to apply.");
      return;
    }

    if (!job._id) {
      window.alert("Job ID is missing. Please try again.");
      return;
    }

    setSelectedJob(job);
    setResume("");
    setCoverLetter("");
  };

  // Submit application to backend.
  const handleSubmitApplication = async (event) => {
    event.preventDefault();

    const token = sessionStorage.getItem("token");

    if (!token) {
      window.alert("Please log in first.");
      return;
    }

    if (!selectedJob?._id) {
      window.alert("Please select a valid job.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(
        "http://localhost:4000/api/applications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            jobId: selectedJob._id,
            resume: resume.trim(),
            coverLetter: coverLetter.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Application submission failed."
        );
      }

      window.alert("Application submitted successfully!");

      setSelectedJob(null);
      setResume("");
      setCoverLetter("");
    } catch (error) {
      console.error("Application submission error:", error);
      window.alert(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <JobsHero />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">

          {/* Sidebar */}
          <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-6 flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-gray-900">
                Filters
              </h2>

              <button
                type="button"
                onClick={clearFilters}
                className="text-sm font-semibold text-[#5B4BFF] hover:underline"
              >
                Clear all
              </button>
            </div>

            <div className="mb-6">
              <label
                htmlFor="job-search"
                className="mb-2 block text-sm font-semibold text-gray-800"
              >
                Search jobs
              </label>

              <input
                id="job-search"
                type="text"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Title, company, skill..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#5B4BFF] focus:ring-2 focus:ring-[#5B4BFF]/20"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="location-search"
                className="mb-2 block text-sm font-semibold text-gray-800"
              >
                Search location
              </label>

              <input
                id="location-search"
                type="text"
                value={locationSearch}
                onChange={(event) => {
                  setLocationSearch(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="e.g. Noida"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#5B4BFF] focus:ring-2 focus:ring-[#5B4BFF]/20"
              />
            </div>

            <FilterGroup
              title="Category"
              options={categories}
              selectedValues={selectedCategories}
              onToggle={(value) =>
                toggleFilter(value, setSelectedCategories)
              }
            />

            <FilterGroup
              title="Location"
              options={locations}
              selectedValues={selectedLocations}
              onToggle={(value) =>
                toggleFilter(value, setSelectedLocations)
              }
            />

            <FilterGroup
              title="Experience Level"
              options={levels}
              selectedValues={selectedLevels}
              onToggle={(value) =>
                toggleFilter(value, setSelectedLevels)
              }
            />

            <FilterGroup
              title="Job Type"
              options={workTypes}
              selectedValues={selectedWorkTypes}
              onToggle={(value) =>
                toggleFilter(value, setSelectedWorkTypes)
              }
            />

            <FilterGroup
              title="Salary"
              options={salaryRanges}
              selectedValues={selectedSalaryRanges}
              onToggle={(value) =>
                toggleFilter(value, setSelectedSalaryRanges)
              }
            />
          </aside>

          {/* Job Results */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Find Jobs
                </h1>

                <p className="mt-1 text-sm text-gray-600">
                  {loading
                    ? "Loading jobs..."
                    : `${sortedJobs.length} ${
                        sortedJobs.length === 1 ? "job" : "jobs"
                      } found`}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <label
                  htmlFor="sort-jobs"
                  className="whitespace-nowrap text-sm text-gray-600"
                >
                  Sort by:
                </label>

                <select
                  id="sort-jobs"
                  value={sortBy}
                  onChange={(event) => {
                    setSortBy(event.target.value);
                    setCurrentPage(1);
                  }}
                  className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#5B4BFF]"
                >
                  <option value="newest">Newest</option>
                  <option value="title">Job title</option>
                  <option value="company">Company</option>
                </select>
              </div>
            </div>

            {loading && (
              <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
                <p className="text-gray-600">Loading jobs...</p>
              </div>
            )}

            {!loading && error && (
              <div className="rounded-xl border border-red-200 bg-white p-6">
                <p className="text-red-600">{error}</p>

                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="mt-4 rounded-lg bg-[#5B4BFF] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                >
                  Try again
                </button>
              </div>
            )}

            {!loading && !error && paginatedJobs.length > 0 && (
              <div className="space-y-5">
                {paginatedJobs.map((job) => (
                  <article
                    key={job._id || job.id}
                    className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
                  >
                    <div className="flex flex-col justify-between gap-4 sm:flex-row">
                      <div className="min-w-0">
                        <h2 className="text-lg font-bold text-gray-900">
                          {job.title}
                        </h2>

                        <p className="mt-1 text-sm font-medium text-gray-600">
                          {job.company || "Company not specified"}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2 text-sm">
                          {job.location && (
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">
                              {job.location}
                            </span>
                          )}

                          {(job.jobType || job.workType) && (
                            <span className="rounded-full bg-indigo-50 px-3 py-1 text-indigo-700">
                              {job.jobType || job.workType}
                            </span>
                          )}

                          {(job.experienceLevel || job.level) && (
                            <span className="rounded-full bg-purple-50 px-3 py-1 text-purple-700">
                              {job.experienceLevel || job.level}
                            </span>
                          )}

                          {job.category && (
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">
                              {job.category}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0 sm:text-right">
                        {job.salary != null && (
                          <p className="font-semibold text-gray-900">
                            {job.salary}
                          </p>
                        )}

                        <button
                          type="button"
                          onClick={() => handleApply(job)}
                          className="mt-4 rounded-lg bg-[#5B4BFF] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4938e8]"
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>

                    {job.description && (
                      <p className="mt-5 text-sm leading-6 text-gray-600">
                        {job.description}
                      </p>
                    )}

                    {Array.isArray(job.skills) &&
                      job.skills.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {job.skills.map((skill, index) => (
                            <span
                              key={`${skill}-${index}`}
                              className="rounded-md border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-700"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                  </article>
                ))}
              </div>
            )}

            {!loading && !error && paginatedJobs.length === 0 && (
              <div className="rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center">
                <h2 className="text-xl font-bold text-gray-900">
                  No jobs found
                </h2>

                <p className="mt-2 text-sm text-gray-600">
                  Try another search or remove some filters.
                </p>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-5 rounded-lg bg-[#5B4BFF] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}

            {!loading && !error && totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={safeCurrentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Application Form */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Apply for Job
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                  {selectedJob.title} at {selectedJob.company}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="text-2xl text-gray-500 hover:text-gray-900"
                aria-label="Close application form"
              >
                &times;
              </button>
            </div>

            <form
              onSubmit={handleSubmitApplication}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="resume"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Resume URL
                </label>

                <input
                  id="resume"
                  type="url"
                  value={resume}
                  onChange={(event) => setResume(event.target.value)}
                  placeholder="Paste your Google Drive resume link"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#5B4BFF]"
                />
              </div>

              <div>
                <label
                  htmlFor="cover-letter"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Cover Letter
                </label>

                <textarea
                  id="cover-letter"
                  value={coverLetter}
                  onChange={(event) =>
                    setCoverLetter(event.target.value)
                  }
                  placeholder="Write why you are suitable for this job..."
                  rows="5"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#5B4BFF]"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  disabled={submitting}
                  className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-lg bg-[#5B4BFF] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#4938e8] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting
                    ? "Submitting..."
                    : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <JobProfileCTA />
    </main>
  );
};

export default Jobs;

