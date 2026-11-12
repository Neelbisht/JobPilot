
import React from "react";
import { Link } from "react-router-dom";
import { jobCategories } from "../assets/assets";

const JobCategories = () => {
  return (
    <section className="bg-gray-50 px-6 py-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Explore{" "}
            <span className="text-[#5B4BFF]">
              Job Categories
            </span>
          </h2>

          <p className="mt-3 text-gray-600">
            Find the right opportunity for your skills and interests.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {jobCategories.map((category) => (
            <Link
              to={`/jobs?search=${encodeURIComponent(
                category.keyword
              )}`}
              key={category.id}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#5B4BFF]/40 hover:shadow-lg"
            >
              {/* Category Image */}
              <div className="h-44 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Category Details */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 transition group-hover:text-[#5B4BFF]">
                  {category.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {category.description}
                </p>

                <span className="mt-4 inline-block text-sm font-semibold text-[#5B4BFF]">
                  Explore Jobs →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobCategories;

