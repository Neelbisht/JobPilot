
import React from "react";
import {
  MapPin,
  BriefcaseBusiness,
  Bookmark,
} from "lucide-react";

const JobCard = ({ job }) => {
  const Icon = job.icon;

  return (
    <article className="group flex h-full min-h-[440px] flex-col rounded-2xl border border-gray-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#5B4BFF] hover:shadow-xl">

      {/* Icon and Bookmark */}
      <div className="flex shrink-0 items-center justify-between">
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${job.color}`}
        >
          <Icon size={27} strokeWidth={1.8} />
        </div>

        <button
          type="button"
          aria-label={`Save ${job.title}`}
          className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:border-[#5B4BFF] hover:text-[#5B4BFF]"
        >
          <Bookmark size={19} />
        </button>
      </div>

      {/* Job Title and Company */}
      <div className="mt-5 min-h-[76px]">
        <h3 className="line-clamp-2 min-h-[56px] text-lg font-bold leading-7 text-gray-900 group-hover:text-[#5B4BFF]">
          {job.title}
        </h3>

        <p className="truncate text-sm font-medium text-gray-600">
          {job.company}
        </p>
      </div>

      {/* Location and Job Type */}
      <div className="mt-4 flex min-h-[40px] flex-wrap content-start gap-x-4 gap-y-2 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <MapPin size={15} className="shrink-0" />
          {job.location}
        </span>

        <span className="flex items-center gap-1">
          <BriefcaseBusiness size={15} className="shrink-0" />
          {job.type}
        </span>
      </div>

      {/* Salary and Experience */}
      <div className="mt-4 flex min-h-[36px] flex-wrap items-center justify-between gap-2">
        <span className="font-bold text-gray-900">
          {job.salary}
        </span>

        <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-[#5B4BFF]">
          {job.experience}
        </span>
      </div>

      {/* Skills: fixed area */}
      <div className="mt-4 min-h-[58px]">
        <div className="flex flex-wrap content-start gap-2">
          {job.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="rounded-md bg-gray-100 px-2.5 py-1 text-xs text-gray-600"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Description: same reserved height */}
      <p className="mt-3 line-clamp-2 min-h-[48px] text-sm leading-6 text-gray-500">
        {job.description}
      </p>

      {/* Button stays at bottom */}
      <button
        type="button"
        className="mt-auto w-full rounded-xl bg-[#5B4BFF] py-3 font-semibold text-white transition hover:bg-[#4938E8]"
      >
        View Details →
      </button>
    </article>
  );
};

export default JobCard;
