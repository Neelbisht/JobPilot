import React from "react";
import Hero from "../components/Hero";
import JobCategories from "../components/JobCategories";
import FeaturedJobs from "../components/FeaturedJobs";
import AppDownload from "../components/AppDownload";

const Logo = () => {
  return (
    <div>
      <Hero />
      <JobCategories />
      <FeaturedJobs />
      <AppDownload />
    </div>
  );
};

export default Logo;