
import React from "react";
import { Link } from "react-router-dom";


import PlacementStories from "../components/PlacementStories";
import { assets } from "../assets/assets";
import FAQ from "../components/FAQ";
import CompanyStats from "../components/CompanyStats";

const About = () => {
  return (
    <div className="w-full bg-white">
   
  {/* About Hero Section */}

<section className="grid grid-cols-1 items-center gap-10 px-6 py-6 md:grid-cols-5 md:px-12 lg:px-20 lg:py-12">

{/* Left Side - 60% */}

  <div className="flex flex-col justify-center md:col-span-3">


<span className="mb-5 w-fit rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-[#5B4BFF]">
  About JobPilot
</span>

<h1 className="text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
  Empowering Careers.
  <br />
  <span className="text-[#5B4BFF]">
    Connecting Opportunities.
  </span>
</h1>

<p className="mt-6 max-w-xl text-base leading-8 text-slate-600 md:text-lg">
  JobPilot is your trusted companion in finding the right job
  or internship. We help job seekers discover opportunities,
  showcase their skills, and take the next step toward a
  successful career.
</p>

{/* Action Buttons */}
<div className="mt-8 flex flex-wrap items-center gap-4">
  <Link
    to="/jobs"
    className="rounded-xl bg-[#5B4BFF] px-6 py-3 font-semibold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:bg-purple-700"
  >
    Explore Jobs <span className="ml-2">→</span>
  </Link>

  <Link
    to="/register"
    className="rounded-xl border border-[#5B4BFF] px-6 py-3 font-semibold text-[#5B4BFF] transition duration-300 hover:bg-purple-50"
  >
    Create Account
  </Link>
</div>

{/* Small Highlights */}
<div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-slate-600">
  <span className="hover:text-purple-600">✓ Find relevant jobs</span>
  <span className="hover:text-purple-600">✓ Explore internships</span>
  <span className="hover:text-purple-600">✓ Build your career</span>
</div>

  </div>

{/* Right Side - 40% */}

  <div className="relative flex items-center justify-center md:col-span-2">


{/* Background Decoration */}
<div className="absolute h-64 w-64 rounded-full bg-purple-100 blur-3xl sm:h-80 sm:w-80"></div>

<img
  src={assets.aboutHero}
  alt="Discover career opportunities with JobPilot"
  className="relative z-10 w-full max-w-md object-contain transition duration-500 hover:scale-105"
/>


  </div>

</section>

{/* ================= Company stats================= */}
<CompanyStats />
  

{/* WHO WE ARE SECTION */}
<section className="bg-gray-50 px-6 py-10 md:px-10 lg:py-12">
  <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-20">

    {/* Mission Image */}
    <div className="relative">
      <div className="absolute -left-4 -top-4 h-24 w-24 rounded-tl-3xl border-l-4 border-t-4 border-[#5B4BFF]"></div>

      <img
        src={assets.mission}
        alt="JobPilot helping people discover career opportunities"
        className="relative z-10 mx-auto w-full max-w-lg object-contain"
      />

      <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-br-3xl border-b-4 border-r-4 border-[#5B4BFF]"></div>
    </div>

    {/* Content */}
    <div className="rounded-3xl white p-6 text- shadow-xl md:p-10 lg:p-12">

      {/* Small Label */}
      <p className="mb-4 inline-block rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold tracking-wide text-black">
        WHO WE ARE
      </p>

      {/* Heading */}
      <h2 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
        Helping you find more than just a{" "}
        <span className="text-blue-500">job.</span>
      </h2>

      {/* Description */}
      <p className="mt-6 text-base leading-8 text-black">
        At JobPilot, we believe everyone deserves access to meaningful
        career opportunities. Our platform connects job seekers with
        companies, making the job search process simple, transparent,
        and efficient.
      </p>

      {/* Features */}
      <div className="mt-6 space-y-5">

        <div className="flex items-start gap-4">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500 font-bold text-black">
            ✓
          </span>
          <p className="leading-7 text-black">
            Discover relevant jobs and internships that match your skills
            and career goals.
          </p>
        </div>

        <div className="flex items-start gap-4">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500 font-bold text-black">
            ✓
          </span>
          <p className="leading-7 text-black">
            Connect with companies and explore opportunities to grow
            professionally.
          </p>
        </div>

        <div className="flex items-start gap-4">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-500 font-bold text-black">
            ✓
          </span>
          <p className="leading-7 text-black">
            Make your job search easier with a simple and user-friendly
            platform.
          </p>
        </div>

      </div>

    </div>
  </div>
</section>

        

     
      {/* Placement Stories */}
      <PlacementStories />

      {/*FAQ DATA*/}
      <FAQ/>

     

       {/* ================= NEXT MOVE ================= */}
<section className="flex min-h-[350px] w-full flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 px-6 py-16 text-center">

  <div className="max-w-4xl">

    <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
      What's{" "}
      <span className="text-blue-600">
        your next move?
      </span>
    </h1>

    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600 md:text-2xl">
      The right job, or the right hire. Both start here.
    </p>

    <div className="mt-8 flex flex-wrap justify-center gap-4">

      <Link
        to="/register"
        className="inline-flex items-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-lg"
      >
        Sign up to find a job →
      </Link>

      <Link
        to="/register"
        className="inline-flex items-center rounded-xl border border-blue-600 px-6 py-3 font-semibold text-blue-600 transition duration-300 hover:bg-blue-600 hover:text-white"
      >
        Hire talent →
      </Link>

    </div>

  </div>
</section>


    </div>
  );
};

export default About;

