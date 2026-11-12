

import React from "react";
import { assets } from "../assets/assets";

const AppDownload = () => {
  return (
    <section className="bg-white px-5 py-6 sm:px-8 sm:py-8 lg:py-10">

      <div className="mx-auto my-5 flex max-w-6xl flex-col items-center justify-between gap-12 overflow-hidden rounded-3xl border border-gray-100 gradient-to-br from-indigo-50 via-white to-blue-50 p-8 shadow-sm sm:p-12 lg: flex-row lg:p-14">
     
        {/* Left Content */}

        <div className="w-full flex-1">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">  JobPilot Mobile App</p>

          <h2 className="max-w-xl text-3xl font-extrabold text-gray-900 sm:text-4xl leading-tight tracking-tight lg:text-5xl">Your next opportunity,
            <span className="block text-indigo-600"> just a tap away.</span>
          </h2>

          <p className="mt-5 max-w-lg text-base leading-7 text-gray-600 sm:text-lg">Get job updates, discover internships, and explore new career
            opportunities wherever you go.</p>

         {/* App Store Buttons */}

         <div className="mt-8 flex flex-wrap items-center gap-4">

          <img src={assets.play_store}
          alt="Get it on Google Play"
          className="h-12 w-auto object-contain"/>

          <img src={assets.app_store}
          alt="Download on the App Store"
          className="h-12 w-auto object-contain"/>

         </div>

         <p className="mt-6 text-sm text-gray-500">Find your next career move with JobPilot.</p>



        </div>

           {/* Right Content */}

           <div className="flex w-full flex-1 items-center justify-center lg:justify-end">

             <img src={assets.app_main_img}
             
           alt="Main image" className="relative z-10 max-h-[420px] w-full object-contain transition duration-500 hover:scale-105"/>

           </div>

          


        
      </div>
    </section>
     
   
  );
};

export default AppDownload;


