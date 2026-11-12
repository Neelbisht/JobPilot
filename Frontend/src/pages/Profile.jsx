
import React from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  BriefcaseBusiness,
  MapPin,
  Building2,
  Globe,
  Code,
  GraduationCap,
  ShieldCheck,
  FileCheck,
  Users,
  ClipboardList,
  ArrowRight,
  PlusCircle,
} from "lucide-react";

const Profile = () => {
  const user = JSON.parse(sessionStorage.getItem("user") || "null");

  const isEmployer = user?.role === "employer";

  const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-4 transition hover:border-violet-200 hover:shadow-sm">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-[#5B4BFF]">
        <Icon size={20} />
      </div>

      <div className="min-w-0">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="mt-1 break-words font-semibold text-gray-800">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );

  const DashboardCard = ({ icon: Icon, title, description, link }) => (
    <Link
      to={link}
      className="group flex items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-5 transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-md"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-[#5B4BFF]">
          <Icon size={23} />
        </div>

        <div>
          <h4 className="font-bold text-gray-900">{title}</h4>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
      </div>

      <ArrowRight
        size={20}
        className="shrink-0 text-gray-400 transition group-hover:translate-x-1 group-hover:text-[#5B4BFF]"
      />
    </Link>
  );

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <User size={42} className="mx-auto mb-4 text-[#5B4BFF]" />

          <h2 className="text-2xl font-bold text-gray-900">
            Login Required
          </h2>

          <p className="mt-2 text-gray-500">
            Please log in to view your profile.
          </p>
        </div>
      </div>
    );
  }

  const initials = user.name
    ? user.name
        .split(" ")
        .filter(Boolean)
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  return (
    <div className="min-h-screen bg-[#F7F8FC] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Page Heading */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#5B4BFF]">
            Account
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-gray-500">
            Manage and view your personal account information.
          </p>
        </div>

        {/* Profile Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#5141E8] via-[#6655F2] to-[#8575FF] p-6 text-white shadow-lg sm:p-9">
          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-32 right-40 h-64 w-64 rounded-full bg-white/10" />

          <div className="relative flex flex-col items-center gap-5 sm:flex-row">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border-4 border-white/30 bg-white text-3xl font-bold text-[#5B4BFF] shadow-md">
              {initials}
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold sm:text-3xl">
                {user.name}
              </h2>

              <p className="mt-2 flex items-center justify-center gap-2 text-sm text-white/80 sm:justify-start">
                <Mail size={16} />
                {user.email}
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-sm font-semibold">
                  <ShieldCheck size={16} />
                  {isEmployer ? "Employer Account" : "Job Seeker Account"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Actions */}
        <div className="mt-7 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              My Dashboard
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Quick access to your JobPilot activities.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {isEmployer ? (
              <>
                <DashboardCard
                  icon={PlusCircle}
                  title="Publish a Job"
                  description="Create and publish a new job listing."
                  link="/create-job"
                />

                <DashboardCard
                  icon={ClipboardList}
                  title="My Published Jobs"
                  description="View, edit and delete your job listings."
                  link="/my-published-jobs"
                />

                <DashboardCard
                  icon={Users}
                  title="Applications Received"
                  description="View and manage applications from candidates."
                  link="/applications-received"
                />
              </>
            ) : (
              <DashboardCard
                icon={FileCheck}
                title="My Applications"
                description="Track your submitted job applications."
                link="/my-applications"
              />
            )}
          </div>
        </div>

        {/* Personal Information */}
        <div className="mt-7 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-[#5B4BFF]">
              <User size={21} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Personal Information
              </h3>

              <p className="text-sm text-gray-500">
                Your basic account details
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <InfoItem icon={User} label="Full Name" value={user.name} />
            <InfoItem icon={Mail} label="Email Address" value={user.email} />
            <InfoItem icon={Phone} label="Mobile Number" value={user.mobile} />

            <InfoItem
              icon={BriefcaseBusiness}
              label="Account Type"
              value={isEmployer ? "Employer" : "Job Seeker"}
            />
          </div>
        </div>

        {/* Job Seeker Section */}
        {!isEmployer && (
          <div className="mt-7 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-[#5B4BFF]">
                <BriefcaseBusiness size={21} />
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Career Information
                </h3>

                <p className="text-sm text-gray-500">
                  Your experience and professional skills
                </p>
              </div>
            </div>

            <InfoItem
              icon={GraduationCap}
              label="Experience Level"
              value={user.experience}
            />

            <div className="mt-5">
              <div className="mb-3 flex items-center gap-2">
                <Code size={19} className="text-[#5B4BFF]" />

                <h4 className="font-semibold text-gray-800">
                  Professional Skills
                </h4>
              </div>

              {user.skills?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="rounded-full border border-violet-100 bg-violet-50 px-4 py-2 text-sm font-medium text-[#5B4BFF]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="rounded-xl bg-gray-50 p-4 text-sm text-gray-500">
                  No skills added yet.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Employer Section */}
        {isEmployer && (
          <div className="mt-7 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-[#5B4BFF]">
                <Building2 size={21} />
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Company Information
                </h3>

                <p className="text-sm text-gray-500">
                  Your organization details
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <InfoItem
                icon={Building2}
                label="Company Name"
                value={user.companyName}
              />

              <InfoItem
                icon={MapPin}
                label="Company Location"
                value={user.companyLocation}
              />

              <div className="sm:col-span-2">
                <InfoItem
                  icon={Globe}
                  label="Company Website"
                  value={
                    user.companyWebsite ? (
                      <a
                        href={user.companyWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#5B4BFF] hover:underline"
                      >
                        {user.companyWebsite}
                      </a>
                    ) : (
                      "Not provided"
                    )
                  }
                />
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-gray-400">
          Your JobPilot account information.
        </p>
      </div>
    </div>
  );
};

export default Profile;

