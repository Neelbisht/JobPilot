
import React from "react";
import { Link } from "react-router-dom";
import { jobs } from "../data/jobsData";
import JobCard from "./JobCard";


const FeaturedJobs = () => {
  return (
    <section className="bg-gray-50 px-6 py-20 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[#5B4BFF]">
              Find your next opportunity
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
              Featured Jobs
            </h2>

            <p className="mt-3 text-gray-500">
              Explore opportunities across different career paths.
            </p>
          </div>

          <Link
            to="/jobs"
            className="font-semibold text-[#5B4BFF] hover:underline"
          >
            View all jobs →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.slice(0, 3).map((job) => (
  <JobCard key={job.id} job={job} />
))}
         
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;
