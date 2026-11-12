
import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Pagination from "../components/pagination";
import InternshipHero from "../components/InternshipHero";
import JobProfileCTA from "../components/JobProfileCTA";

import {
  categories,
  locations,
  internshipLevels,
  internshipSalaryRanges,
} from "../assets/assets";

import { getJobs } from "../services/jobService";

// Normalize text for matching
const normalizeText = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

// Programming-related keywords
const programmingKeywords = [
  "programming",
  "frontend",
  "front end",
  "backend",
  "back end",
  "full stack",
  "fullstack",
  "mern",
  "react",
  "node",
  "javascript",
  "software developer",
  "software engineer",
  "web developer",
  "web development",
  "python developer",
  "java developer",
  "php developer",
  "angular",
  "vue",
  "html",
  "css",
];

// Category matching
const matchesCategory = (internship, selectedCategory) => {
  const selected = normalizeText(selectedCategory);
  const actual = normalizeText(internship.category);

  // Programming includes all programming-related roles
  if (selected === "programming") {
    const jobText = normalizeText(
      [
        internship.title,
        internship.category,
        internship.description,
        ...(Array.isArray(internship.skills)
          ? internship.skills
          : []),
      ].join(" ")
    );

    return programmingKeywords.some((keyword) =>
      jobText.includes(keyword)
    );
  }

  // Other categories
  if (actual === selected) return true;

  // Common category aliases
  const categoryAliases = {
    "frontend developer": ["frontend", "front end"],
    "full stack developer": ["fullstack", "full stack"],
    "mern stack developer": ["mern", "mern stack"],
  };

  const aliases = categoryAliases[selected] || [];

  return aliases.some((alias) => actual.includes(alias));
};

const Internships = () => {
  const [searchParams] = useSearchParams();

  const urlSearch = searchParams.get("search") || "";
  const urlLocation = searchParams.get("location") || "";

  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState(urlSearch);
  const [locationSearch, setLocationSearch] = useState(urlLocation);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [
    selectedInternshipSalaryRanges,
    setInternshipSelectedSalaryRanges,
  ] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const internshipsPerPage = 8;

  // Application form states
  const [selectedJob, setSelectedJob] = useState(null);
  const [resume, setResume] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch internships from backend
  useEffect(() => {
    let cancelled = false;

    const fetchInternships = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getJobs();

        if (!cancelled) {
          const jobsList = Array.isArray(data)
            ? data
            : Array.isArray(data?.jobs)
              ? data.jobs
              : [];

          const internshipList = jobsList.filter(
            (job) =>
              normalizeText(job.jobType) === "internship"
          );

          setInternships(internshipList);
        }
      } catch (err) {
        console.error("Error fetching internships:", err);

        if (!cancelled) {
          setError(
            "Unable to load internships. Please check your backend connection."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchInternships();

    return () => {
      cancelled = true;
    };
  }, []);

  // Update search when URL parameters change
  useEffect(() => {
    setSearch(urlSearch);
    setLocationSearch(urlLocation);
    setCurrentPage(1);
  }, [urlSearch, urlLocation]);

  // Toggle filters
  const toggleFilter = (value, setter) => {
    setter((previous) =>
      previous.includes(value)
        ? previous.filter((item) => item !== value)
        : [...previous, value]
    );

    setCurrentPage(1);
  };

  // Filter internships
  const filteredInternships = useMemo(() => {
    return internships.filter((internship) => {
      // Search filter
      const searchableText = [
        internship.title,
        internship.company,
        internship.description,
        internship.category,
        ...(Array.isArray(internship.skills)
          ? internship.skills
          : []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const searchMatch = searchableText.includes(
        search.trim().toLowerCase()
      );

      // Location search
      const internshipLocation = normalizeText(
        internship.location
      );

      const locationSearchMatch = internshipLocation.includes(
        locationSearch.trim().toLowerCase()
      );

      // Category filter
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.some((category) =>
          matchesCategory(internship, category)
        );

      // Location filter
      const locationMatch =
        selectedLocations.length === 0 ||
        selectedLocations.some(
          (location) =>
            normalizeText(location) === internshipLocation
        );

      // Experience level filter
      const level = normalizeText(internship.experienceLevel);

      const levelMatch =
        selectedLevels.length === 0 ||
        selectedLevels.some(
          (selectedLevel) =>
            normalizeText(selectedLevel) === level
        );

      // Monthly stipend filter
      const salaryText = String(internship.salary || "");
      const numbers = salaryText.match(/\d+(\.\d+)?/g);

      let salary = numbers ? Number(numbers[0]) : NaN;

      // Convert annual LPA to monthly rupees
      if (
        salaryText.toLowerCase().includes("lpa") &&
        Number.isFinite(salary)
      ) {
        salary = (salary * 100000) / 12;
      }

      const salaryMatch =
        selectedInternshipSalaryRanges.length === 0 ||
        selectedInternshipSalaryRanges.some((label) => {
          const range = internshipSalaryRanges.find(
            (item) => item.label === label
          );

          return (
            range &&
            Number.isFinite(salary) &&
            salary >= range.min &&
            salary < range.max
          );
        });

      return (
        searchMatch &&
        locationSearchMatch &&
        categoryMatch &&
        locationMatch &&
        levelMatch &&
        salaryMatch
      );
    });
  }, [
    internships,
    search,
    locationSearch,
    selectedCategories,
    selectedLocations,
    selectedLevels,
    selectedInternshipSalaryRanges,
  ]);

  // Pagination
  const totalPages = Math.ceil(
    filteredInternships.length / internshipsPerPage
  );

  const safeCurrentPage = Math.min(
    currentPage,
    Math.max(totalPages, 1)
  );

  const startIndex = (safeCurrentPage - 1) * internshipsPerPage;

  const currentInternships = filteredInternships.slice(
    startIndex,
    startIndex + internshipsPerPage
  );

  useEffect(() => {
    setCurrentPage((previous) =>
      Math.min(previous, Math.max(totalPages, 1))
    );
  }, [totalPages]);

  // Clear all filters
  const clearFilters = () => {
    setSearch("");
    setLocationSearch("");
    setSelectedCategories([]);
    setSelectedLocations([]);
    setSelectedLevels([]);
    setInternshipSelectedSalaryRanges([]);
    setCurrentPage(1);
  };

  // Open application form
  const handleApply = (internship) => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      window.alert("Please log in as a jobseeker to apply.");
      return;
    }

    if (!internship._id) {
      window.alert("Internship ID is missing. Please try again.");
      return;
    }

    setSelectedJob(internship);
    setResume("");
    setCoverLetter("");
  };

  // Submit internship application
  const handleSubmitApplication = async (event) => {
    event.preventDefault();

    const token = sessionStorage.getItem("token");

    if (!token) {
      window.alert("Please log in first.");
      return;
    }

    if (!selectedJob?._id) {
      window.alert("Please select a valid internship.");
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
    <>
      <InternshipHero />

      <div className="min-h-screen bg-gray-50 px-4 py-10 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[260px_1fr]">

            {/* Filters Sidebar */}
            <aside className="h-fit rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">
                  Filters
                </h2>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm font-medium text-violet-600 hover:text-violet-800"
                >
                  Clear All
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label
                  htmlFor="internship-search"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Search internships
                </label>

                <input
                  id="internship-search"
                  type="text"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Title, company, skill..."
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-violet-500"
                />
              </div>

              {/* Location Search */}
              <div className="mb-6">
                <label
                  htmlFor="internship-location-search"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Search location
                </label>

                <input
                  id="internship-location-search"
                  type="text"
                  value={locationSearch}
                  onChange={(event) => {
                    setLocationSearch(event.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="e.g. Noida"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-violet-500"
                />
              </div>

              {/* Sidebar Filters */}
              {[
                {
                  title: "Category",
                  options: categories,
                  selected: selectedCategories,
                  setter: setSelectedCategories,
                },
                {
                  title: "Location",
                  options: locations,
                  selected: selectedLocations,
                  setter: setSelectedLocations,
                },
                {
                  title: "Experience Level",
                  options: internshipLevels,
                  selected: selectedLevels,
                  setter: setSelectedLevels,
                },
                {
                  title: "Monthly Stipend",
                  options: internshipSalaryRanges.map(
                    (item) => item.label
                  ),
                  selected: selectedInternshipSalaryRanges,
                  setter: setInternshipSelectedSalaryRanges,
                },
              ].map((group) => (
                <div
                  key={group.title}
                  className="mb-6 border-t border-gray-200 pt-5"
                >
                  <h3 className="mb-3 font-semibold text-gray-800">
                    {group.title}
                  </h3>

                  {group.options.map((option) => {
                    const value =
                      typeof option === "object"
                        ? option.label
                        : option;

                    return (
                      <label
                        key={value}
                        className="mb-2 flex cursor-pointer items-center gap-2 text-sm text-gray-600"
                      >
                        <input
                          type="checkbox"
                          checked={group.selected.includes(value)}
                          onChange={() =>
                            toggleFilter(value, group.setter)
                          }
                          className="accent-violet-600"
                        />

                        {value}
                      </label>
                    );
                  })}
                </div>
              ))}
            </aside>

            {/* Internship Results */}
            <section>
              <div className="mb-5">
                <h2 className="text-xl font-bold text-gray-900">
                  Latest Internships
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {loading
                    ? "Loading internships..."
                    : `${filteredInternships.length} internships available`}
                </p>
              </div>

              {loading && (
                <div className="rounded-xl border bg-white p-10 text-center">
                  Loading internships...
                </div>
              )}

              {!loading && error && (
                <div className="rounded-xl border border-red-200 bg-white p-6 text-red-600">
                  {error}

                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="mt-3 block rounded-lg bg-violet-600 px-4 py-2 text-white"
                  >
                    Try again
                  </button>
                </div>
              )}

              {!loading &&
                !error &&
                currentInternships.length > 0 && (
                  <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                    {currentInternships.map((internship) => (
                      <article
                        key={internship._id}
                        className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                      >
                        <div className="mb-4 flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">
                              {internship.title}
                            </h3>

                            <p className="mt-1 text-sm font-medium text-violet-600">
                              {internship.company}
                            </p>
                          </div>

                          <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
                            Internship
                          </span>
                        </div>

                        <div className="mb-4 flex flex-wrap gap-2">
                          <span className="rounded-md bg-gray-100 px-3 py-1 text-xs text-gray-600">
                            {internship.location}
                          </span>

                          <span className="rounded-md bg-gray-100 px-3 py-1 text-xs text-gray-600">
                            {internship.experienceLevel}
                          </span>

                          <span className="rounded-md bg-gray-100 px-3 py-1 text-xs text-gray-600">
                            {internship.category}
                          </span>
                        </div>

                        <p className="mb-4 line-clamp-3 text-sm leading-6 text-gray-600">
                          {internship.description}
                        </p>

                        {Array.isArray(internship.skills) &&
                          internship.skills.length > 0 && (
                            <div className="mb-4 flex flex-wrap gap-2">
                              {internship.skills.map((skill, index) => (
                                <span
                                  key={`${skill}-${index}`}
                                  className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          )}

                        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
                          <p className="font-semibold text-gray-900">
                            {internship.salary ||
                              "Stipend not disclosed"}
                          </p>

                          <button
                            type="button"
                            onClick={() => handleApply(internship)}
                            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-700"
                          >
                            Apply Now
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                )}

              {!loading &&
                !error &&
                currentInternships.length === 0 && (
                  <div className="rounded-xl border border-gray-200 bg-white px-5 py-14 text-center">
                    <h3 className="text-lg font-semibold text-gray-800">
                      No internships found
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                      Try a different keyword or location, or change your
                      filters.
                    </p>

                    <button
                      type="button"
                      onClick={clearFilters}
                      className="mt-4 rounded-lg bg-violet-600 px-5 py-2 text-sm font-semibold text-white hover:bg-violet-700"
                    >
                      Clear All
                    </button>
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
            </section>
          </div>
        </div>
      </div>

      {/* Application Form */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Apply for Internship
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
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-violet-500"
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
                  placeholder="Write why you are suitable for this internship..."
                  rows="5"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-violet-500"
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
                  className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
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
    </>
  );
};

export default Internships;
