

import React from "react";
import { assets } from "../assets/assets";

const companies = [
{ name: "Google", logo: assets.google },
{ name: "Microsoft", logo: assets.microsoft },
{ name: "HCL", logo: assets.hcl },
{ name: "Amazon", logo: assets.amazon },
{ name: "Adobe", logo: assets.adobe },
{ name: "Oracle", logo: assets.oracle },
{ name: "Flipkart", logo: assets.flipkart },
{ name: "GitHub", logo: assets.github },
{ name: "Samsung", logo: assets.samsung },
{ name: "Linkedin", logo: assets.linkedin },
{ name: "Pw", logo: assets.pw },
{ name: "Mahindra", logo: assets.mahindra },
{ name: "Infosys", logo: assets.infosys },
];

const CompanyStats = () => {
return ( <section className="overflow-hidden bg-white px-6 py-10"> <h2 className="mb-8 text-center text-2xl font-semibold text-slate-800">
Get hired by the teams{" "} <span className="font-sarif">
building what's next. </span> </h2>

  {/* Moving Company Logos */}
  <div className="relative overflow-hidden">
    <div className="flex w-max animate-scroll items-center gap-10 md:gap-16">
      {[...companies, ...companies].map((company, index) => (
        <div
          key={`${company.name}-${index}`}
          className="flex h-20 w-40 shrink-0 items-center justify-center"
        >
          <img
            src={company.logo}
            alt={`${company.name} logo`}
            className="h-12 w-32 object-contain"
          />
        </div>
      ))}
    </div>
  </div>

  <p className="mt-8 text-center text-sm font-medium tracking-wider text-slate-600">
    <span className="text-blue-500">1,000+</span>{" "}
    COMPANIES DISCOVERING TALENT ON JOBPILOT
  </p>
</section>

);
};

export default CompanyStats;
