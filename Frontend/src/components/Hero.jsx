
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  popularSearches,
  features,
} from "../assets/assets";
import {
  Search,
  MapPin,
  BriefcaseBusiness,
  Sparkles,
  ArrowRight,
  Clock3,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

const jobTypes = [
  "Full-time",
  "Part-time",
  "Internship",
  "Contract",
];

const Hero = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");

  // Search jobs
  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (keyword.trim()) {
      params.set("search", keyword.trim());
    }

    if (location.trim()) {
      params.set("location", location.trim());
    }

    if (jobType) {
      params.set("type", jobType);
    }

    const query = params.toString();

    navigate(query ? `/jobs?${query}` : "/jobs");
  };

  // Search popular keywords
  const handlePopularSearch = (item) => {
    setKeyword(item);

    const params = new URLSearchParams({
      search: item,
    });

    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <main className="w-full overflow-hidden bg-white text-gray-900">

      {/* HERO SECTION */}
      <section className="relative isolate bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-5 py-14 sm:px-8 sm:py-16 lg:px-[6%] lg:py-20">

        {/* Background decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 -z-0 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl"
        />

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">

          {/* LEFT CONTENT */}
          <div className="min-w-0">

            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-xs font-semibold text-blue-700 shadow-sm sm:text-sm">
              <Sparkles
                size={17}
                className="text-blue-600"
                aria-hidden="true"
              />
              Your next career opportunity starts here
            </div>

            {/* Heading */}
            <h1 className="max-w-2xl text-4xl leading-[1.12] font-extrabold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
              Discover{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                50,000+
              </span>{" "}
              career opportunities worldwide
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-base leading-8 text-gray-600 sm:text-lg">
              Find your next opportunity with JobPilot. Explore jobs,
              connect with employers, and take the next step in your
              professional journey.
            </p>

            {/* Search Form */}
            <form
              onSubmit={handleSearch}
              role="search"
              className="mt-8 max-w-3xl rounded-2xl border border-gray-200 bg-white p-3 shadow-xl shadow-blue-900/5 transition focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-50"
            >
              {/* Keyword */}
              <div className="flex min-w-0 items-center gap-3 border-b border-gray-100 px-3 py-3">
                <Search
                  size={21}
                  className="shrink-0 text-blue-600"
                  aria-hidden="true"
                />

                <input
                  type="search"
                  name="search"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Job title, skill or company"
                  aria-label="Job title, skill or company"
                  className="w-full min-w-0 bg-transparent py-2 text-sm outline-none placeholder:text-gray-400"
                />
              </div>

              {/* Location and Job Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2">

                {/* Location */}
                <div className="flex min-w-0 items-center gap-3 border-b border-gray-100 px-3 py-3 sm:border-r sm:border-b-0 sm:border-gray-200">
                  <MapPin
                    size={21}
                    className="shrink-0 text-blue-600"
                    aria-hidden="true"
                  />

                  <input
                    type="text"
                    name="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City or Remote"
                    aria-label="Job location"
                    className="w-full min-w-0 bg-transparent py-2 text-sm outline-none placeholder:text-gray-400"
                  />
                </div>

                {/* Job Type */}
                <div className="flex min-w-0 items-center gap-3 px-3 py-3">
                  <BriefcaseBusiness
                    size={21}
                    className="shrink-0 text-blue-600"
                    aria-hidden="true"
                  />

                  <select
                    name="type"
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    aria-label="Select job type"
                    className="w-full min-w-0 cursor-pointer bg-transparent py-2 text-sm text-gray-600 outline-none"
                  >
                    <option value="">All Job Types</option>

                    {jobTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:py-3"
              >
                <Search size={18} aria-hidden="true" />
                Search Jobs
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </form>

            {/* Popular Searches */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <span className="mr-1 text-sm font-semibold text-gray-500">
                Popular:
              </span>

              {popularSearches.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handlePopularSearch(item)}
                  className="rounded-full border border-blue-100 bg-white px-3.5 py-2 text-xs font-medium text-blue-700 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:text-sm"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Trust indicators */}
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <CheckCircle2
                  size={17}
                  className="text-green-600"
                  aria-hidden="true"
                />
                Easy job search
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2
                  size={17}
                  className="text-green-600"
                  aria-hidden="true"
                />
                Multiple opportunities
              </span>
            </div>
          </div>

          {/* RIGHT SIDE JOB CARDS */}
          <div className="relative mx-auto flex min-h-[390px] w-full max-w-lg items-center justify-center sm:min-h-[460px] lg:min-h-[520px]">

            {/* Background Circle */}
            <div
              aria-hidden="true"
              className="absolute h-64 w-64 rounded-full border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-100 sm:h-80 sm:w-80 lg:h-96 lg:w-96"
            >
              <div className="absolute inset-5 rounded-full border border-dashed border-blue-200" />
            </div>

            {/* Main Job Card */}
            <article className="relative z-10 w-64 rounded-2xl border border-gray-100 bg-white p-5 shadow-2xl shadow-blue-900/10 transition duration-300 hover:-translate-y-1 sm:w-72 sm:p-6">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-lg font-bold text-blue-700">
                  G
                </div>

                <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                  Remote
                </span>
              </div>

              <h2 className="text-lg font-bold text-gray-900">
                Software Developer
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Example Company
              </p>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-4">
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Clock3 size={14} aria-hidden="true" />
                  Full-time
                </span>

                <span className="text-sm font-bold text-blue-600">
                  ₹6–10 LPA
                </span>
              </div>
            </article>

            {/* Floating UX Designer Card */}
            <article className="absolute left-0 top-3 z-20 w-40 rounded-xl border border-gray-100 bg-white p-3 shadow-xl transition-transform duration-300 hover:-translate-y-1 sm:top-8 sm:w-48 sm:p-4">
              <div className="mb-3 flex items-center justify-between gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100 font-bold text-indigo-700">
                  A
                </div>

                <span className="rounded-full bg-indigo-50 px-2 py-1 text-[10px] font-semibold text-indigo-700">
                  On-site
                </span>
              </div>

              <h3 className="text-sm font-bold text-gray-900">
                UX Designer
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                Artboard Studios
              </p>

              <div className="mt-3 flex flex-wrap justify-between gap-1 border-t border-gray-100 pt-3">
                <span className="text-[10px] text-gray-500">
                  Contract
                </span>

                <span className="text-[10px] font-bold text-blue-600">
                  ₹5-8 LPA
                </span>
              </div>
            </article>

            {/* Job Match Card */}
            <article className="absolute right-0 top-2 z-20 w-32 rounded-xl border border-gray-100 bg-white p-3 shadow-lg sm:top-5 sm:w-36 sm:p-4">
              <div className="mb-3 flex items-center justify-between gap-1">
                <span className="text-xs font-semibold text-gray-700">
                  Job Match
                </span>

                <TrendingUp
                  size={16}
                  className="text-green-600"
                  aria-hidden="true"
                />
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-blue-100">
                <div className="h-full w-[85%] rounded-full bg-blue-600" />
              </div>

              <p className="mt-2 text-xs font-bold text-blue-600">
                85% Match Rate
              </p>
            </article>

            {/* Product Manager Card */}
            <article className="absolute right-0 bottom-2 z-20 w-40 rounded-xl border border-gray-100 bg-white p-3 shadow-xl transition-transform duration-300 hover:-translate-y-1 sm:right-0 sm:bottom-6 sm:w-48 sm:p-4">
              <div className="mb-3 flex items-center justify-between gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 font-bold text-blue-700">
                  T
                </div>

                <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-700">
                  Hybrid
                </span>
              </div>

              <h3 className="text-sm font-bold text-gray-900">
                Product Manager
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                TechFlow Inc.
              </p>

              <div className="mt-3 flex flex-wrap justify-between gap-1 border-t border-gray-100 pt-3">
                <span className="text-[10px] text-gray-500">
                  Full-time
                </span>

                <span className="text-[10px] font-bold text-blue-600">
                  ₹12-18 LPA
                </span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section
        aria-label="JobPilot features"
        className="bg-gray-50/70 px-5 py-12 sm:px-8 lg:px-[6%] lg:py-16"
      >
        <div className="mx-auto max-w-7xl">

          {/* Section Heading */}
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Why JobPilot?
            </span>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Everything you need to move your career forward
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
              Discover useful tools and opportunities designed to
              make your job search easier.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="group rounded-2xl border border-gray-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                  {feature.icon}
                </div>

                <h3 className="mb-2 text-base font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="text-sm leading-7 text-gray-600">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Hero;
























