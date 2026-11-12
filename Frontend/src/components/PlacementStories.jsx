import React, { useState } from "react";
import { placementStories } from "../assets/assets.js";

const PlacementStories = () => {
const [expandedStories, setExpandedStories] = useState([]);

const toggleStory = (id) => {
setExpandedStories((previous) =>
previous.includes(id)
? previous.filter((storyId) => storyId !== id)
: [...previous, id]
);
};

return ( <section className="'bg-gradient-to-b 'from-violet-50 to-white px-5 py-16 md:px-10 md:py-20 lg:px-16"> <div className="mx-auto max-w-7xl">

```
    {/* Section Heading */}
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <span className="inline-flex items-center rounded-full border border-violet-100 bg-white px-4 py-2 text-sm font-semibold text-[#5B4BFF] shadow-sm">
        Career journeys
      </span>

      <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
        Every career has a{" "}
        <span className="text-[#5B4BFF]">story.</span>
      </h2>

      <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
        Discover career journeys, learn from different experiences, and
        get inspired to take your next step with JobPilot.
      </p>
    </div>

    {/* Story Cards */}
    <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {placementStories.map((story) => {
        const isExpanded = expandedStories.includes(story.id);

        return (
          <article
            key={story.id}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/60"
          >
            {/* Image */}
            <div className="relative overflow-hidden bg-violet-50">
              <img
                src={story.image}
                alt={`Image for ${story.name}`}
                loading="lazy"
                className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <span className="absolute left-4 top-4 rounded-full border border-white/60 bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#5B4BFF] shadow-sm">
                Career story
              </span>
            </div>

            {/* Card Content */}
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-[#5B4BFF]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7m-13 0h18v12H3V7Zm0 4h18m-11 0v2h4v-2"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Career path
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#5B4BFF]">
                    {story.role}
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-bold leading-7 text-gray-900 transition-colors group-hover:text-[#5B4BFF]">
                {story.name}
              </h3>

              <div className="mt-3 flex gap-2">
                <span className="text-3xl font-serif leading-none text-violet-300">
                  “
                </span>

                <p
                  className={`text-sm leading-6 text-gray-600 ${
                    isExpanded ? "" : "line-clamp-4"
                  }`}
                >
                  {story.description}
                </p>
              </div>

              {/* Read More */}
              <button
                type="button"
                onClick={() => toggleStory(story.id)}
                aria-expanded={isExpanded}
                className="mt-5 self-start text-sm font-bold text-[#5B4BFF] transition-colors hover:text-violet-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5B4BFF]"
              >
                {isExpanded ? "Read less ↑" : "Read full story →"}
              </button>
            </div>
          </article>
        );
      })}
    </div>
      
    </div>

</section>


);
};

export default PlacementStories;

