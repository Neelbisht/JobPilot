

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";
import { assets } from "../assets/assets";

const InternshipHero = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();

    const params = new URLSearchParams();

    if (keyword.trim()) {
      params.set("search", keyword.trim());
    }

    if (location.trim()) {
      params.set("location", location.trim());
    }

    navigate(`/internships?${params.toString()}`);
  };

  return (
    <section className="overflow-hidden bg-gradient-to-br from-violet-50 via-white to-indigo-50 px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
        {/* Left Content */}
        <div>
          <span className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
            Launch Your Career
          </span>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl">
            Find the Right{" "}
            <span className="text-violet-600">Internship</span>{" "}
            for Your Future
          </h1>

          <p className="mt-5 max-w-xl text-base leading-8 text-gray-600 sm:text-lg">
            Discover internships, gain practical experience, develop
            your skills, and take the first step toward your dream career.
          </p>

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="mt-8 flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-lg sm:flex-row"
          >
            <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
              <Search className="shrink-0 text-violet-600" size={20} />

              <input
                type="text"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="Internship title, company, skill..."
                aria-label="Search internship keyword"
                className="w-full min-w-0 py-3 text-sm text-gray-800 outline-none"
              />
            </div>

            <div className="flex min-w-0 flex-1 items-center gap-3 border-gray-200 px-3 sm:border-l">
              <MapPin className="shrink-0 text-violet-600" size={20} />

              <input
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Location, e.g. Noida"
                aria-label="Search internship location"
                className="w-full min-w-0 py-3 text-sm text-gray-800 outline-none"
              />
            </div>

            <button
              type="submit"
              className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
            >
              Search
            </button>
          </form>

          {/* Benefits */}
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-600">
            <span>✓ Beginner-friendly opportunities</span>
            <span>✓ Build practical skills</span>
            <span>✓ Explore career options</span>
          </div>

          {/* Links */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/internships"
              className="rounded-lg bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700"
            >
              Explore Internships
            </Link>

            <Link
              to="/about"
              className="rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center lg:justify-end">
          {assets.internHero && (
            <img
              src={assets.internHero}
              alt="Explore internship opportunities"
              className="h-auto max-h-[430px] w-full max-w-lg object-contain"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default InternshipHero;
