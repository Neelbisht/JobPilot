import React from "react";
import Hero from "../components/Hero";

import FeaturedJobs from "../components/FeaturedJobs";
import JobCategories from "../components/JobCategories";
import AppDownload from "../components/AppDownload";

const Home = () => {
  return (
    <div>
      <Hero />
      <JobCategories />
      <FeaturedJobs />
      <AppDownload />
    </div>
  );
};

export default Home;  
       
          



      