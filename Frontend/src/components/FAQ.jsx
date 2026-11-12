
import React, { useState } from "react";

const faqData = [
  {
    question: "What is JobPilot?",
    answer:
      "JobPilot helps job seekers discover job opportunities and internships while helping companies connect with suitable candidates.",
  },
  {
    question: "Is JobPilot free for job seekers?",
    answer:
      "Yes, job seekers can explore job opportunities, discover internships, and create their profiles on JobPilot.",
  },
  {
    question: "How can companies post jobs?",
    answer:
      "Companies can sign up for an account, log in, and use the employer dashboard to create and manage job listings.",
  },
  {
    question: "How do I apply for a job?",
    answer:
      "Browse available jobs, select a position that matches your skills, and click the Apply button to start your application.",
  },
  {
    question: "Can I upload my resume?",
    answer:
      "Yes, you can upload your resume to your profile to help recruiters learn more about your qualifications and experience.",
  },
  {
    question: "How can I find internships?",
    answer:
      "Visit the Internships page to explore opportunities for students, freshers, and candidates looking to gain practical experience.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-gray-50 px-6 py-16 md:px-12 lg:px-20">
      <div className="mx-auto max-w-4xl">

        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="mb-3 font-semibold uppercase tracking-widest text-[#5B4BFF]">
            FAQs
          </p>

          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Frequently Asked Questions
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Everything you need to know about finding jobs and internships
            with JobPilot.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:border-[#5B4BFF]/50"
            >
              {/* Question */}
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-6"
                aria-expanded={activeIndex === index}
              >
                <span className="font-semibold text-gray-800">
                  {faq.question}
                </span>

                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#5B4BFF]/10 text-xl font-medium text-[#5B4BFF]">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>

              {/* Answer */}
              {activeIndex === index && (
                <div className="px-5 pb-5 md:px-6">
                  <p className="border-t border-gray-100 pt-4 leading-7 text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;

