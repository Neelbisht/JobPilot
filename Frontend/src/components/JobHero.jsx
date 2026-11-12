
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  BriefcaseBusiness,
  Rocket,
  ChartPie,
} from "lucide-react";

import { assets, popularSearches, benefits } from "../assets/assets";

const JobHero = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  // Search jobs by keyword and location
  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (keyword.trim()) {
      params.set("search", keyword.trim());
    }

    if (location.trim()) {
      params.set("location", location.trim());
    }

    navigate(`/jobs?${params.toString()}`);
  };

  // Search using popular keywords
  const handlePopularSearch = (search) => {
    const params = new URLSearchParams();
    params.set("search", search);

    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-violet-50 via-white to-indigo-50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:min-h-[680px] lg:grid-cols-2 lg:gap-6 lg:py-12">

          {/* LEFT CONTENT */}
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-100/80 px-4 py-2 text-sm font-semibold text-violet-700">
              Find Your First Opportunity
            </div>

            <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-[#11143b] sm:text-5xl lg:text-6xl">
              Start Your Journey with the Right{" "}
              <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
                Job.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-gray-600 sm:text-lg">
              Discover internships, gain practical experience, develop your
              skills, and take the first step toward your dream career.
            </p>

            {/* SEARCH FORM */}
            <form
              onSubmit={handleSearch}
              role="search"
              className="mt-8 flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-xl shadow-violet-900/5 sm:flex-row sm:items-center"
            >
              {/* Keyword */}
              <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-gray-200 px-3 py-3.5 transition focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-100">
                <Search size={21} className="shrink-0 text-gray-500" />

                <input
                  type="search"
                  name="search"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Job title, company or skill"
                  aria-label="Search by job title, company or skill"
                  className="w-full min-w-0 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
                />
              </div>

              {/* Location */}
              <div className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-gray-200 px-3 py-3.5 transition focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-100">
                <MapPin size={21} className="shrink-0 text-gray-500" />

                <input
                  type="text"
                  name="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City or remote"
                  aria-label="Search by location"
                  className="w-full min-w-0 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
                />
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-4 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:from-violet-700 hover:to-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
              >
                <Search size={18} />
                Search Jobs
              </button>
            </form>

            {/* POPULAR SEARCHES */}
            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              <span className="mr-1 text-sm font-semibold text-gray-600">
                Popular Searches:
              </span>

              {popularSearches.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handlePopularSearch(item)}
                  className="rounded-full border border-violet-100 bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700 transition hover:border-violet-200 hover:bg-violet-100"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE SECTION */}
          <div className="relative mx-auto flex min-h-[400px] w-full max-w-xl items-end justify-center sm:min-h-[480px] lg:min-h-[580px]">
            <div
              aria-hidden="true"
              className="absolute bottom-5 right-1 h-72 w-72 rounded-full bg-gradient-to-br from-violet-300 via-violet-400 to-indigo-500 sm:h-96 sm:w-96 lg:right-0 lg:h-[440px] lg:w-[440px]"
            />

            <div
              aria-hidden="true"
              className="absolute left-2 top-1/2 grid grid-cols-4 gap-4 opacity-50"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <span
                  key={i}
                  className="h-2 w-2 rounded-full bg-violet-200"
                />
              ))}
            </div>

            <img
              src={assets.jobHero}
              alt="Student exploring job opportunities"
              fetchPriority="high"
              className="relative z-10 max-h-[560px] w-full object-contain object-bottom"
            />

            {/* Floating Job Card */}
            <div className="absolute left-0 top-10 z-20 w-56 rounded-3xl border border-white bg-white/95 p-5 shadow-xl sm:left-2 sm:w-64 lg:-left-3 lg:top-12">
              <div className="mb-4 flex items-center justify-between">
                <div className="h-2 w-16 rounded-full bg-violet-200">
                  <div className="h-2 w-10 rounded-full bg-violet-600" />
                </div>
                <div className="h-6 w-6 rounded-md bg-gray-100" />
              </div>

              <h3 className="text-lg font-bold leading-6 text-[#11143b]">
                Job
                <br />
                Opportunity
              </h3>

              <div className="mt-4 flex items-center gap-3">
                <div className="rounded-xl bg-violet-100 p-3 text-violet-600">
                  <BriefcaseBusiness size={30} />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="h-2 rounded-full bg-gray-200" />
                  <div className="h-2 w-4/5 rounded-full bg-gray-200" />
                  <div className="h-2 w-1/2 rounded-full bg-gray-200" />
                </div>
              </div>
            </div>

            {/* Floating Rocket */}
            <div
              aria-hidden="true"
              className="absolute right-2 top-4 z-20 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg sm:right-4 sm:h-20 sm:w-20"
            >
              <Rocket size={34} />
            </div>

            {/* Floating Chart Card */}
            <div
              aria-hidden="true"
              className="absolute right-0 top-[45%] z-20 rounded-2xl bg-white p-4 shadow-xl"
            >
              <ChartPie size={55} className="text-violet-500" />
              <div className="mt-3 h-2 w-16 rounded-full bg-gray-200" />
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section
        aria-label="Benefits of using JobPilot"
        className="bg-white px-5 py-10 sm:px-8 lg:py-12"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <article key={benefit.title} className="flex items-start gap-4">
                <div
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${benefit.color}`}
                >
                  <Icon size={32} strokeWidth={1.6} aria-hidden="true" />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-[#11143b]">
                    {benefit.title}
                  </h2>

                  <p className="mt-2 text-sm leading-7 text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default JobHero;




      