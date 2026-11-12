

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-gray-300">

      {/* Main Footer */}
      <div className="mx-auto flex w-full max-w-7xl flex-wrap justify-between gap-12 px-10 py-16">

        {/* Company Information */}
        <div className="w-full max-w-sm">
          <Link
            to="/"
            className="text-3xl font-bold text-white"
          >
            JobPilot.
          </Link>

          <p className="mt-5 text-sm leading-6 text-gray-400">
            JobPilot is the AI recruiting platform and talent marketplace
            for startups. Post jobs, source candidates with AI agents,
            or partner with a dedicated recruiter.
          </p>

          {/* Social Media */}
          <div className="mt-6 flex gap-5 text-sm">
            <a
              href="#"
              className="transition-colors hover:text-white"
            >
              LinkedIn
            </a>

            <a
              href="#"
              className="transition-colors hover:text-white"
            >
              Instagram
            </a>

            <a
              href="#"
              className="transition-colors hover:text-white"
            >
              YouTube
            </a>
          </div>
        </div>

        {/* For Candidates */}
        <div className="flex flex-col gap-3">
          <h3 className="mb-2 text-sm font-semibold tracking-wide text-white">
            FOR CANDIDATES
          </h3>

          <Link
            to="/jobs"
            className="text-sm text-gray-400 transition-colors hover:text-white"
          >
            Find Jobs
          </Link>

          <Link
            to="/internships"
            className="text-sm text-gray-400 transition-colors hover:text-white"
          >
            Internships
          </Link>

          <Link
            to="/create-profile"
            className="text-sm text-gray-400 transition-colors hover:text-white"
          >
            Create Profile
          </Link>

          <Link
            to="/applications"
            className="text-sm text-gray-400 transition-colors hover:text-white"
          >
            My Applications
          </Link>
        </div>

        {/* For Companies */}
        <div className="flex flex-col gap-3">
          <h3 className="mb-2 text-sm font-semibold tracking-wide text-white">
            FOR COMPANIES
          </h3>

          <Link
            to="/admin/add-job"
            className="text-sm text-gray-400 transition-colors hover:text-white"
          >
            Post a Job
          </Link>

          <Link
            to="/about"
            className="text-sm text-gray-400 transition-colors hover:text-white"
          >
            Recruiting
          </Link>
        </div>

        {/* Company */}
        <div className="flex flex-col gap-3">
          <h3 className="mb-2 text-sm font-semibold tracking-wide text-white">
            COMPANY
          </h3>

          <Link
            to="/about"
            className="text-sm text-gray-400 transition-colors hover:text-white"
          >
            About JobPilot
          </Link>

          <Link
            to="/about"
            className="text-sm text-gray-400 transition-colors hover:text-white"
          >
            Contact
          </Link>

          <Link
            to="/about"
            className="text-sm text-gray-400 transition-colors hover:text-white"
          >
            Careers
          </Link>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-10 py-6">
          <p className="text-sm text-gray-500">
            © 2026 JobPilot. All rights reserved.
          </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;

