
import React, { useEffect, useState } from "react";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = sessionStorage.getItem("token");

        const response = await fetch(
          "http://localhost:4000/api/applications/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load applications.");
        }

        setApplications(data.applications || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Shortlisted":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      case "Reviewed":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading your applications...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          My Applications
        </h1>

        <p className="text-gray-500 mb-8">
          Track the status of jobs you have applied for.
        </p>

        {applications.length === 0 ? (
          <div className="bg-white rounded-xl p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              No applications yet
            </h2>
            <p className="text-gray-500">
              Your submitted job applications will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {applications.map((application) => (
              <div
                key={application._id}
                className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {application.job?.title || "Job title unavailable"}
                    </h2>

                    <p className="text-gray-600 mt-1">
                      {application.job?.company || "Company unavailable"}
                    </p>

                    <p className="text-sm text-gray-500 mt-2">
                      {application.job?.location || "Location unavailable"}
                      {" · "}
                      {application.job?.jobType || ""}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium w-fit ${getStatusStyle(
                      application.status
                    )}`}
                  >
                    {application.status}
                  </span>
                </div>

                <div className="border-t border-gray-100 mt-5 pt-4">
                  <p className="text-sm text-gray-500">
                    Applied on:{" "}
                    {new Date(application.createdAt).toLocaleDateString(
                      "en-IN"
                    )}
                  </p>

                  {application.resume && (
                    <a
                      href={application.resume}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block mt-3 text-[#5B4BFF] font-medium hover:underline"
                    >
                      View submitted resume
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyApplications;
