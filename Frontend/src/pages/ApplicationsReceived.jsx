
// import React, { useEffect, useState } from "react";

// function ApplicationsReceived() {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [updatingId, setUpdatingId] = useState(null);

//   const fetchApplications = async () => {
//     try {
//       const token = sessionStorage.getItem("token");

//       const response = await fetch(
//         "http://localhost:4000/api/applications/employer",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Failed to load applications");
//       }

//       setApplications(data.applications || []);
//       setError("");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchApplications();
//   }, []);

//   const handleStatusChange = async (applicationId, status) => {
//     try {
//       setUpdatingId(applicationId);

//       const token = sessionStorage.getItem("token");

//       const response = await fetch(
//         `http://localhost:4000/api/applications/${applicationId}/status`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ status }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Failed to update status");
//       }

//       setApplications((previous) =>
//         previous.map((application) =>
//           application._id === applicationId
//             ? { ...application, status: data.application.status }
//             : application
//         )
//       );
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setUpdatingId(null);
//     }
//   };

//   const getStatusStyle = (status) => {
//     const styles = {
//       Pending: "bg-amber-50 text-amber-700 border-amber-200",
//       Reviewed: "bg-blue-50 text-blue-700 border-blue-200",
//       Shortlisted: "bg-green-50 text-green-700 border-green-200",
//       Rejected: "bg-red-50 text-red-700 border-red-200",
//     };

//     return styles[status] || "bg-gray-100 text-gray-700 border-gray-200";
//   };

//   const pendingCount = applications.filter(
//     (app) => app.status === "Pending"
//   ).length;

//   const shortlistedCount = applications.filter(
//     (app) => app.status === "Shortlisted"
//   ).length;

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-10 h-10 border-4 border-[#5B4BFF] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-500 font-medium">
//             Loading applications...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
//         <div className="bg-white rounded-2xl border border-red-100 p-8 text-center max-w-md w-full shadow-sm">
//           <div className="text-red-500 text-3xl mb-3">!</div>
//           <h2 className="text-xl font-bold text-gray-900">
//             Unable to load applications
//           </h2>
//           <p className="text-gray-500 mt-2">{error}</p>
//           <button
//             onClick={() => {
//               setLoading(true);
//               fetchApplications();
//             }}
//             className="mt-5 bg-[#5B4BFF] text-white px-5 py-2.5 rounded-lg hover:bg-[#4938e8] transition"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#F7F8FC] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
//       <div className="max-w-6xl mx-auto">

//         {/* Page Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
//           <div>
//             <p className="text-sm font-semibold text-[#5B4BFF] mb-2">
//               EMPLOYER DASHBOARD
//             </p>
//             <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
//               Applications Received
//             </h1>
//             <p className="text-gray-500 mt-2">
//               Manage candidates and track their application progress.
//             </p>
//           </div>

//           <div className="bg-white border border-gray-200 rounded-xl px-5 py-3 shadow-sm">
//             <p className="text-xs text-gray-500 font-medium">
//               TOTAL APPLICATIONS
//             </p>
//             <p className="text-2xl font-bold text-gray-900 mt-1">
//               {applications.length}
//             </p>
//           </div>
//         </div>

//         {/* Summary Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
//           <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
//             <p className="text-sm text-gray-500 font-medium">
//               Total Applications
//             </p>
//             <h2 className="text-3xl font-bold text-gray-900 mt-2">
//               {applications.length}
//             </h2>
//             <p className="text-xs text-gray-400 mt-2">
//               Candidates who applied
//             </p>
//           </div>

//           <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
//             <p className="text-sm text-gray-500 font-medium">
//               Pending Review
//             </p>
//             <h2 className="text-3xl font-bold text-amber-600 mt-2">
//               {pendingCount}
//             </h2>
//             <p className="text-xs text-gray-400 mt-2">
//               Applications awaiting review
//             </p>
//           </div>

//           <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
//             <p className="text-sm text-gray-500 font-medium">
//               Shortlisted
//             </p>
//             <h2 className="text-3xl font-bold text-green-600 mt-2">
//               {shortlistedCount}
//             </h2>
//             <p className="text-xs text-gray-400 mt-2">
//               Candidates shortlisted
//             </p>
//           </div>
//         </div>

//         {/* Applications List */}
//         <div className="mb-5 flex items-center justify-between">
//           <div>
//             <h2 className="text-xl font-bold text-gray-900">
//               Candidate Applications
//             </h2>
//             <p className="text-sm text-gray-500 mt-1">
//               Review candidate information and update their status.
//             </p>
//           </div>
//         </div>

//         {applications.length === 0 ? (
//           <div className="bg-white border border-gray-200 rounded-2xl p-10 sm:p-16 text-center shadow-sm">
//             <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center mx-auto mb-5">
//               <span className="text-3xl">📄</span>
//             </div>
//             <h2 className="text-xl font-bold text-gray-900">
//               No applications yet
//             </h2>
//             <p className="text-gray-500 mt-2 max-w-md mx-auto">
//               When candidates apply for your published jobs, their applications
//               will appear here.
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-5">
//             {applications.map((application) => (
//               <div
//                 key={application._id}
//                 className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
//               >
//                 {/* Candidate Header */}
//                 <div className="p-5 sm:p-6">
//                   <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
//                     <div className="flex items-start gap-4">
//                       <div className="w-14 h-14 shrink-0 rounded-2xl bg-purple-100 text-[#5B4BFF] flex items-center justify-center text-xl font-bold">
//                         {(application.applicant?.name || "A")
//                           .charAt(0)
//                           .toUpperCase()}
//                       </div>

//                       <div className="min-w-0">
//                         <h3 className="text-lg sm:text-xl font-bold text-gray-900">
//                           {application.applicant?.name || "Applicant"}
//                         </h3>

//                         <p className="text-sm text-gray-500 mt-1 break-all">
//                           {application.applicant?.email || "Email unavailable"}
//                         </p>

//                         <div className="flex flex-wrap items-center gap-2 mt-3">
//                           <span className="text-sm font-semibold text-gray-800">
//                             {application.job?.title || "Job title unavailable"}
//                           </span>
//                           <span className="text-gray-300">•</span>
//                           <span className="text-sm text-gray-500">
//                             {application.job?.company || "Company"}
//                           </span>
//                         </div>

//                         <p className="text-sm text-gray-400 mt-1">
//                           {application.job?.location || "Location unavailable"}
//                           {application.job?.jobType
//                             ? ` · ${application.job.jobType}`
//                             : ""}
//                         </p>
//                       </div>
//                     </div>

//                     <span
//                       className={`self-start shrink-0 inline-flex items-center px-3 py-1.5 rounded-full border text-xs font-semibold ${getStatusStyle(
//                         application.status
//                       )}`}
//                     >
//                       {application.status}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Application Details */}
//                 <div className="border-t border-gray-100 bg-gray-50/70 px-5 sm:px-6 py-5">
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                     <div>
//                       <h4 className="text-sm font-bold text-gray-800 mb-2">
//                         Cover Letter
//                       </h4>
//                       <p className="text-sm text-gray-600 leading-6 whitespace-pre-line">
//                         {application.coverLetter ||
//                           "No cover letter provided."}
//                       </p>
//                     </div>

//                     <div>
//                       <h4 className="text-sm font-bold text-gray-800 mb-2">
//                         Application Details
//                       </h4>

//                       <p className="text-sm text-gray-500">
//                         Applied on:{" "}
//                         <span className="text-gray-700 font-medium">
//                           {application.createdAt
//                             ? new Date(
//                                 application.createdAt
//                               ).toLocaleDateString("en-IN")
//                             : "Date unavailable"}
//                         </span>
//                       </p>

//                       {application.resume ? (
//                         <a
//                           href={application.resume}
//                           target="_blank"
//                           rel="noreferrer"
//                           className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-[#5B4BFF] hover:text-[#4938e8] hover:underline"
//                         >
//                           View Resume
//                           <span>↗</span>
//                         </a>
//                       ) : (
//                         <p className="text-sm text-gray-400 mt-4">
//                           No resume provided
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   {/* Status Update */}
//                   <div className="border-t border-gray-200 mt-5 pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//                     <div>
//                       <p className="text-sm font-bold text-gray-800">
//                         Application Status
//                       </p>
//                       <p className="text-xs text-gray-500 mt-1">
//                         Update the candidate's progress.
//                       </p>
//                     </div>

//                     <select
//                       value={application.status}
//                       disabled={updatingId === application._id}
//                       onChange={(e) =>
//                         handleStatusChange(
//                           application._id,
//                           e.target.value
//                         )
//                       }
//                       className="w-full sm:w-52 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 outline-none focus:border-[#5B4BFF] focus:ring-2 focus:ring-purple-100 disabled:opacity-60"
//                     >
//                       <option value="Pending">Pending</option>
//                       <option value="Reviewed">Reviewed</option>
//                       <option value="Shortlisted">Shortlisted</option>
//                       <option value="Rejected">Rejected</option>
//                     </select>
//                   </div>

//                   {updatingId === application._id && (
//                     <p className="text-xs text-[#5B4BFF] mt-2 text-right">
//                       Updating status...
//                     </p>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ApplicationsReceived;





import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Users,
  Clock,
  UserCheck,
  Mail,
  MapPin,
  CalendarDays,
  FileText,
  ExternalLink,
  ClipboardList,
} from "lucide-react";

function ApplicationsReceived() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchApplications = async () => {
    try {
      setError("");

      const token = sessionStorage.getItem("token");

      const response = await fetch(
        "http://localhost:4000/api/applications/employer",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load applications");
      }

      setApplications(data.applications || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusChange = async (applicationId, status) => {
    try {
      setUpdatingId(applicationId);

      const token = sessionStorage.getItem("token");

      const response = await fetch(
        `http://localhost:4000/api/applications/${applicationId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update status");
      }

      setApplications((previous) =>
        previous.map((application) =>
          application._id === applicationId
            ? {
                ...application,
                status: data.application.status,
              }
            : application
        )
      );
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusStyle = (status) => {
    const styles = {
      Pending: "bg-amber-50 text-amber-700 border-amber-200",
      Reviewed: "bg-blue-50 text-blue-700 border-blue-200",
      Shortlisted: "bg-green-50 text-green-700 border-green-200",
      Rejected: "bg-red-50 text-red-700 border-red-200",
    };

    return styles[status] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  const pendingCount = applications.filter(
    (app) => app.status === "Pending"
  ).length;

  const shortlistedCount = applications.filter(
    (app) => app.status === "Shortlisted"
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F8FC] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#5B4BFF] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">
            Loading applications...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F7F8FC] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-red-100 p-8 text-center max-w-md w-full shadow-sm">
          <div className="text-red-500 text-3xl font-bold mb-3">!</div>

          <h2 className="text-xl font-bold text-gray-900">
            Unable to load applications
          </h2>

          <p className="text-gray-500 mt-2">{error}</p>

          <button
            onClick={() => {
              setLoading(true);
              fetchApplications();
            }}
            className="mt-5 bg-[#5B4BFF] text-white px-5 py-2.5 rounded-lg hover:bg-[#4938e8] transition"
          >
            Try Again
          </button>

          <Link
            to="/profile"
            className="block mt-4 text-sm font-semibold text-[#5B4BFF] hover:underline"
          >
            Back to Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8FC] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="max-w-6xl mx-auto">

        {/* Back to Profile */}
        <Link
          to="/profile"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#5B4BFF] transition mb-6"
        >
          <ArrowLeft size={17} />
          Back to Profile
        </Link>

        {/* Header */}
        <div className="bg-gradient-to-r from-[#5141E8] to-[#8171FF] rounded-3xl p-6 sm:p-8 text-white shadow-lg mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div>
              <p className="text-sm font-semibold text-purple-100 mb-2">
                EMPLOYER DASHBOARD
              </p>

              <h1 className="text-3xl sm:text-4xl font-bold">
                Applications Received
              </h1>

              <p className="text-purple-100 mt-2 text-sm sm:text-base">
                Review candidates and manage their application progress.
              </p>
            </div>

            <div className="bg-white/15 border border-white/20 rounded-2xl p-5 min-w-36">
              <Users size={22} className="mb-2" />

              <p className="text-sm text-purple-100">
                Total Applications
              </p>

              <p className="text-3xl font-bold mt-1">
                {applications.length}
              </p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Total Applications
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mt-2">
                  {applications.length}
                </h2>
              </div>

              <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#5B4BFF] flex items-center justify-center">
                <ClipboardList size={23} />
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-3">
              Candidates who applied
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Pending Review
                </p>

                <h2 className="text-3xl font-bold text-amber-600 mt-2">
                  {pendingCount}
                </h2>
              </div>

              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock size={23} />
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-3">
              Applications awaiting review
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Shortlisted
                </p>

                <h2 className="text-3xl font-bold text-green-600 mt-2">
                  {shortlistedCount}
                </h2>
              </div>

              <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                <UserCheck size={23} />
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-3">
              Candidates shortlisted
            </p>
          </div>
        </div>

        {/* Applications Heading */}
        <div className="mb-5">
          <h2 className="text-xl font-bold text-gray-900">
            Candidate Applications
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Review candidate information and update their status.
          </p>
        </div>

        {/* Empty State */}
        {applications.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-10 sm:p-16 text-center shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-purple-50 text-[#5B4BFF] flex items-center justify-center mx-auto mb-5">
              <BriefcaseBusiness size={30} />
            </div>

            <h2 className="text-xl font-bold text-gray-900">
              No applications yet
            </h2>

            <p className="text-gray-500 mt-2 max-w-md mx-auto">
              When candidates apply for your published jobs, their
              applications will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {applications.map((application) => (
              <div
                key={application._id}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                {/* Candidate Information */}
                <div className="p-5 sm:p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
                    <div className="flex items-start gap-4 min-w-0">
                      <div className="w-14 h-14 shrink-0 rounded-2xl bg-purple-100 text-[#5B4BFF] flex items-center justify-center text-xl font-bold">
                        {(application.applicant?.name || "A")
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                          {application.applicant?.name || "Applicant"}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1 break-all flex items-center gap-2">
                          <Mail size={14} className="shrink-0" />
                          {application.applicant?.email || "Email unavailable"}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 mt-3">
                          <span className="text-sm font-semibold text-gray-800">
                            {application.job?.title || "Job title unavailable"}
                          </span>

                          <span className="text-gray-300">•</span>

                          <span className="text-sm text-gray-500">
                            {application.job?.company || "Company"}
                          </span>
                        </div>

                        <p className="text-sm text-gray-400 mt-2 flex flex-wrap items-center gap-2">
                          <MapPin size={14} />

                          {application.job?.location || "Location unavailable"}

                          {application.job?.jobType &&
                            ` · ${application.job.jobType}`}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`self-start shrink-0 inline-flex items-center px-3 py-1.5 rounded-full border text-xs font-semibold ${getStatusStyle(
                        application.status
                      )}`}
                    >
                      {application.status}
                    </span>
                  </div>
                </div>

                {/* Application Details */}
                <div className="border-t border-gray-100 bg-gray-50/70 px-5 sm:px-6 py-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                    {/* Cover Letter */}
                    <div>
                      <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <FileText size={16} className="text-[#5B4BFF]" />
                        Cover Letter
                      </h4>

                      <p className="text-sm text-gray-600 leading-6 whitespace-pre-line">
                        {application.coverLetter ||
                          "No cover letter provided."}
                      </p>
                    </div>

                    {/* Application Information */}
                    <div>
                      <h4 className="text-sm font-bold text-gray-800 mb-3">
                        Application Details
                      </h4>

                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        <CalendarDays size={15} />

                        Applied on:

                        <span className="text-gray-700 font-medium">
                          {application.createdAt
                            ? new Date(
                                application.createdAt
                              ).toLocaleDateString("en-IN")
                            : "Date unavailable"}
                        </span>
                      </p>

                      {application.resume ? (
                        <a
                          href={application.resume}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-[#5B4BFF] hover:text-[#4938e8] hover:underline"
                        >
                          View Resume
                          <ExternalLink size={15} />
                        </a>
                      ) : (
                        <p className="text-sm text-gray-400 mt-4">
                          No resume provided
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Status Update */}
                  <div className="border-t border-gray-200 mt-5 pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-gray-800">
                        Application Status
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        Update the candidate's progress.
                      </p>
                    </div>

                    <select
                      value={application.status}
                      disabled={updatingId === application._id}
                      onChange={(e) =>
                        handleStatusChange(
                          application._id,
                          e.target.value
                        )
                      }
                      className="w-full sm:w-52 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 outline-none focus:border-[#5B4BFF] focus:ring-2 focus:ring-purple-100 disabled:opacity-60"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Reviewed">Reviewed</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>

                  {updatingId === application._id && (
                    <p className="text-xs text-[#5B4BFF] mt-2 text-right">
                      Updating status...
                    </p>
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

export default ApplicationsReceived;
