import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const JobProfileCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="mx-auto my-16 w-full max-w-7xl px-5 sm:px-8">
      <div className="grid overflow-hidden rounded-md border border-gray-200 bg-white md:grid-cols-2">

        {/* Left Image */}
        <div className="flex min-h-[280px] items-center justify-center  p-8 sm:min-h-[400px] md:min-h-[460px]">
          <img
            src={assets.profileCTA}
            alt="Create your professional profile"
            className="h-full max-h-[350px] w-full object-contain"
          />
        </div>

        {/* Right Content */}
        <div className="flex flex-col items-start justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-12">
          <h2 className="text-3xl font-normal leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Get started today
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-900 sm:text-xl lg:text-2xl">
            To apply to jobs with one-click and connect with founders and
            recruiters searching for your skills.
          </p>

          <button
            type="button"
            onClick={() => navigate("/register")}
            className="mt-10 rounded-2xl  bg-blue-600  px-4 py-3 text-base font-semibold text-white transition hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black sm:text-lg"
          >
            Create your profile
          </button>
        </div>

      </div>
    </section>
  );
};

export default JobProfileCTA;