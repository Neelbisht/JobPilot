
// ==============================
// IMAGE IMPORTS
// ==============================

// About
import aboutHero from "./about-hero.svg";
import mission from "./mission.svg";

// Job and Internship
import jobHero from "./jobHero.png";
import internHero from "./internHero.png";

// Register and Profile
import registerImage from "./register-image.svg";
import profileCTA from "./profileCTA.png";

// Company logos
import oracle from "./oracle.png";
import amazon from "./amazon.png";
import flipkart from "./flipkart.png";
import adobe from "./adobe.png";
import hcl from "./hcl.png";
import cognizant from "./cognizant.png";
import github from "./github.png";
import samsung from "./samsung.png";
import microsoft from "./microsoft.png";
import google from "./google.png";
import linkedin from "./linkedin.png";
import pw from "./pw.png";
import mahindra from "./mahindra.png";
import infosys from "./infosys.png";

// App Download
import play_store from "./play_store.svg";
import app_store from "./app_store.svg";
import app_main_img from "./app_main_img.png";

// Job category images
import programming from "./programming.jpg";
import dataScience from "./data-science.jpg";
import designing from "./designing.jpg";
import networking from "./networking.jpg";
import management from "./management.jpg";
import marketing from "./marketing.jpg";
import cybersecurity from "./cyber-security.jpg";
import mobileApp from "./mobile-app.jpg";
import devops from "./devops.jpg";
import softwareTesting from "./software-testing.jpg";
import digitalMarketing from "./digital-marketing.jpg";
import technicalSupport from "./technical-support.jpg";

// Placement stories
import placement_1 from "./placement_1.jpg";
import placement_2 from "./placement_2.jpg";
import placement_3 from "./placement_3.jpg";
import placement_4 from "./placement_4.jpg";

// Icons
import {
  BriefcaseBusiness,
  UserRound,
  Award,
  Star,
} from "lucide-react";


// ==============================
// ASSETS
// ==============================

export const assets = {
  aboutHero,
  mission,
  jobHero,
  internHero,
  registerImage,
  profileCTA,

  oracle,
  amazon,
  flipkart,
  adobe,
  hcl,
  cognizant,
  github,
  samsung,
  microsoft,
  google,
  linkedin,
  pw,
  mahindra,
  infosys,

  play_store,
  app_store,
  app_main_img,
};


// ==============================
// POPULAR SEARCHES
// ==============================

export const popularSearches = [
  "Frontend Developer",
  "React Developer",
  "Data Science",
  "Remote",
  "Fresher",
];


// ==============================
// JOB HERO BENEFITS
// ==============================

export const benefits = [
  {
    title: "Wide Opportunities",
    description: "Explore job opportunities from top companies.",
    icon: BriefcaseBusiness,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Learn & Grow",
    description: "Gain practical experience and develop your skills.",
    icon: UserRound,
    color: "bg-pink-100 text-pink-500",
  },
  {
    title: "Build Your Resume",
    description: "Showcase your skills and strengthen your profile.",
    icon: Award,
    color: "bg-emerald-100 text-emerald-500",
  },
  {
    title: "Kickstart Your Career",
    description: "Take the next step towards your dream career.",
    icon: Star,
    color: "bg-amber-100 text-amber-500",
  },
];


// ==============================
// HOME PAGE FEATURES
// ==============================

export const features = [
  {
    icon: "▥",
    title: "AI-Powered Matching",
    description:
      "Find opportunities that match your skills, interests, and career goals.",
  },
  {
    icon: "✓",
    title: "Verified Employers",
    description:
      "Discover opportunities from employers and companies you can trust.",
  },
  {
    icon: "◷",
    title: "Real-time Updates",
    description:
      "Stay updated with new opportunities that match your preferences.",
  },
];

export const stats = [
  { number: "3,875", label: "CVs Processed This Month" },
  { number: "92%", label: "Success Rate" },
  { number: "14,230", label: "Jobs Filled" },
];


// ==============================
// PLACEMENT STORIES
// ==============================

export const placementStories = [
  {
    id: 1,
    name: "A Frontend Developer Journey",
    role: "Frontend Developer",
    image: placement_1,
    description:
      "I had no idea how to enter the corporate world, what kind of job would be a good fit for me, or where to even start. JobPilot guided me through the entire process, helping me build the right skills and confidence. Thanks to their support and resources, I was able to secure an internship, which eventually led to a job offer from Flipkart.",
  },
  {
    id: 2,
    name: "From Student to Intern",
    role: "Software Intern",
    image: placement_2,
    description:
      "After facing disappointments from campus placement rejections, I turned to JobPilot. I learned valuable skills, how to crack interviews, and how to make a strong resume through their guidance. A few months later, I secured a data science internship with Flipkart. It's my first job after graduation. The office is huge, and I love it here!",
  },
  {
    id: 3,
    name: "Growing in Technology",
    role: "Software Developer",
    image: placement_3,
    description:
      "I applied to Amazon and got the job! It was my dream. I wanted to get into tech but I was from an electrical background. I learned the skills, which came in handy in my interviews. Thanks to JobPilot, I was able to explain the concepts and applications well. They helped me with everything.",
  },
  {
    id: 4,
    name: "Building a Career in AI",
    role: "AI Engineer",
    image: placement_4,
    description:
      "I applied to Amazon and got the job! It was my dream. I wanted to get into tech but I was from an electrical background. I learned the skills, which came in handy in my interviews. Thanks to JobPilot, I was able to explain the concepts and applications well. They helped me with everything.",
  },
];


// ==============================
// JOB FILTER OPTIONS
// ==============================

export const categories = [
  "Programming",
  "Data Science",
  "Designing",
  "Networking",
  "Management",
  "Marketing",
  "Cybersecurity",
  "Full stack developer",
  "Mern stack developer",
  "Frontend developer",
];

export const locations = [
  "Bangalore",
  "Hyderabad",
  "Mumbai",
  "Chennai",
  "Noida",
  "Delhi",
  "Pune",
];

export const levels = [
  "Entry level",
  "Intermediate level",
  "Senior level",
];

// Keep these values consistent with the backend Job model.
export const workTypes = [
  "Full-time",
  "Part-time",
  "Internship",
  "Contract",
];

export const salaryRanges = [
  { label: "All Salaries", min: 0, max: Infinity },
  { label: "0-3 LPA", min: 0, max: 3 },
  { label: "3-6 LPA", min: 3, max: 6 },
  { label: "6-10 LPA", min: 6, max: 10 },
  { label: "10+ LPA", min: 10, max: Infinity },
];


// ==============================
// STATIC JOB DATA
// ==============================

export const jobs = [
  // Designing
  {
    id: 1,
    title: "Graphic Designer",
    category: "Designing",
    location: "Mumbai",
    level: "Intermediate level",
    workType: "Part-time",
    description: "Create visual designs and digital assets.",
    company: "Creative Studio",
    salary: 6,
  },
  {
    id: 2,
    title: "Visual Designer Intern",
    category: "Designing",
    location: "Delhi",
    level: "Entry level",
    workType: "Internship",
    description:
      "Create illustrations, social graphics, and visual assets for digital products.",
    company: "CanvasLab",
    salary: 2,
  },
  {
    id: 3,
    title: "UI/UX Designer",
    category: "Designing",
    location: "Noida",
    level: "Intermediate level",
    workType: "Full-time",
    description:
      "Design user-friendly interfaces, wireframes, and interactive prototypes.",
    company: "DesignHive",
    salary: 5,
  },
  {
    id: 4,
    title: "Graphic Designer Intern",
    category: "Designing",
    location: "Pune",
    level: "Entry level",
    workType: "Internship",
    description:
      "Create social media graphics, marketing visuals, and digital assets.",
    company: "Creative Studio",
    salary: 1.5,
  },

  // Programming
  {
    id: 5,
    title: "React Developer",
    category: "Programming",
    location: "Bangalore",
    level: "Intermediate level",
    workType: "Full-time",
    description:
      "Develop reusable React components and build responsive web applications.",
    company: "CodeCraft",
    salary: 6,
  },
  {
    id: 6,
    title: "Cloud Engineer",
    category: "Programming",
    location: "Noida",
    level: "Intermediate Level",
    workType: "Full-time",
    description: "Design and manage cloud infrastructure.",
    company: "CloudTech",
    salary: 12,
  },
  {
    id: 7,
    title: "Node.js Developer",
    category: "Programming",
    location: "Hyderabad",
    level: "Senior level",
    workType: "Full-time",
    description:
      "Build REST APIs and scalable backend services using Node.js and Express.",
    company: "TechNova",
    salary: 7,
  },
  {
    id: 8,
    title: "Junior Web Developer",
    category: "Programming",
    location: "Mumbai",
    level: "Entry level",
    workType: "Full-time",
    description:
      "Create and maintain websites using HTML, CSS, JavaScript, and React.",
    company: "PixelWorks",
    salary: 3,
  },
  {
    id: 9,
    title: "JavaScript Developer",
    category: "Programming",
    location: "Delhi",
    level: "Intermediate level",
    workType: "Full-time",
    description:
      "Develop interactive web features using modern JavaScript and browser APIs.",
    company: "ScriptWorks",
    salary: 7,
  },
  {
    id: 10,
    title: "Frontend Developer Intern",
    category: "Programming",
    location: "Noida",
    level: "Entry Level",
    workType: "Internship",
    description: "Build responsive user interfaces using React.",
    company: "WebSolutions",
    salary: 9,
  },
  {
    id: 11,
    title: "Full Stack Developer Intern",
    category: "Programming",
    location: "Bangalore",
    level: "Intermediate level",
    workType: "Internship",
    description:
      "Learn and contribute to frontend and backend development on real projects.",
    company: "InnovateLabs",
    salary: 1.8,
  },
  {
    id: 12,
    title: "Python Developer",
    category: "Programming",
    location: "Chennai",
    level: "Intermediate level",
    workType: "Contract",
    description:
      "Develop Python applications and integrate services through APIs.",
    company: "SoftBridge",
    salary: 5,
  },

  // Data Science
  {
    id: 13,
    title: "Data Analyst",
    category: "Data Science",
    location: "Mumbai",
    level: "Entry level",
    workType: "Full-time",
    description:
      "Analyze business data, prepare reports, and identify useful trends.",
    company: "DataWorks",
    salary: 4,
  },
  {
    id: 14,
    title: "Machine Learning Engineer",
    category: "Data Science",
    location: "Delhi",
    level: "Senior level",
    workType: "Full-time",
    description:
      "Develop machine learning models and deploy data-driven solutions.",
    company: "AI Frontier",
    salary: 12,
  },
  {
    id: 15,
    title: "Data Science Intern",
    category: "Data Science",
    location: "Hyderabad",
    level: "Entry level",
    workType: "Internship",
    description:
      "Assist with data cleaning, exploratory analysis, and model development.",
    company: "Insight Analytics",
    salary: 2,
  },

  // Networking
  {
    id: 16,
    title: "Network Administrator",
    category: "Networking",
    location: "Hyderabad",
    level: "Intermediate level",
    workType: "Full-time",
    description:
      "Maintain network infrastructure and troubleshoot connectivity issues.",
    company: "NetSolutions",
    salary: 5,
  },
  {
    id: 17,
    title: "Network Support Intern",
    category: "Networking",
    location: "Bangalore",
    level: "Entry level",
    workType: "Internship",
    description:
      "Help monitor networks and resolve basic connectivity and hardware issues.",
    company: "ConnectIT",
    salary: 1.8,
  },

  // Management
  {
    id: 18,
    title: "Project Manager",
    category: "Management",
    location: "Noida",
    level: "Intermediate level",
    workType: "Full-time",
    description:
      "Plan projects, manage teams, and ensure timely project delivery.",
    company: "ProManage",
    salary: 10,
  },
  {
    id: 19,
    title: "HR Manager",
    category: "Management",
    location: "Delhi",
    level: "Senior level",
    workType: "Full-time",
    description:
      "Manage recruitment, employee relations, and HR operations.",
    company: "PeopleFirst",
    salary: 8,
  },
  {
    id: 20,
    title: "Business Development Manager",
    category: "Management",
    location: "Gurgaon",
    level: "Intermediate level",
    workType: "Full-time",
    description:
      "Identify business opportunities and build strong client relationships.",
    company: "GrowthWave",
    salary: 12,
  },
  {
    id: 21,
    title: "Operations Manager",
    category: "Management",
    location: "Delhi",
    level: "Senior level",
    workType: "Full-time",
    description:
      "Oversee daily operations, improve workflows, and coordinate cross-functional teams.",
    company: "PrimeOperations",
    salary: 14,
  },
  {
    id: 22,
    title: "Operations Manager",
    category: "Management",
    location: "Bangalore",
    level: "Senior level",
    workType: "Full-time",
    description:
      "Oversee daily operations and improve business efficiency.",
    company: "OptiCore",
    salary: 15,
  },
  {
    id: 23,
    title: "Marketing Manager",
    category: "Management",
    location: "Mumbai",
    level: "Intermediate level",
    workType: "Full-time",
    description:
      "Develop marketing strategies and lead campaigns to grow the business.",
    company: "BrandSphere",
    salary: 9,
  },

  // Marketing
  {
    id: 24,
    title: "Digital Marketing Executive",
    category: "Marketing",
    location: "Chennai",
    level: "Entry level",
    workType: "Full-time",
    description:
      "Support SEO, social media campaigns, and digital marketing activities.",
    company: "Growth Media",
    salary: 3,
  },
  {
    id: 25,
    title: "Content Marketing Intern",
    category: "Marketing",
    location: "Noida",
    level: "Entry level",
    workType: "Internship",
    description:
      "Research topics and create engaging content for digital platforms.",
    company: "BrandSpark",
    salary: 1.5,
  },
  {
    id: 26,
    title: "Digital Marketing Executive",
    category: "Marketing",
    location: "Chennai",
    level: "Entry level",
    workType: "Full-time",
    description:
      "Support SEO, social media campaigns, and digital marketing activities.",
    company: "Growth Media",
    salary: 3,
  },
  {
    id: 27,
    title: "SEO Specialist",
    category: "Marketing",
    location: "Noida",
    level: "Entry level",
    workType: "Full-time",
    description:
      "Optimize website content, perform keyword research, and improve search engine rankings.",
    company: "RankBoost",
    salary: 4,
  },
  {
    id: 28,
    title: "Social Media Manager",
    category: "Marketing",
    location: "Delhi",
    level: "Intermediate level",
    workType: "Full-time",
    description:
      "Manage social media accounts, create engaging content, and analyze campaign performance.",
    company: "SocialSpark",
    salary: 6,
  },
  {
    id: 29,
    title: "Content Marketing Executive",
    category: "Marketing",
    location: "Gurgaon",
    level: "Entry level",
    workType: "Full-time",
    description:
      "Create blog posts, website content, and marketing materials to attract potential customers.",
    company: "ContentWave",
    salary: 3,
  },
  {
    id: 30,
    title: "Performance Marketing Specialist",
    category: "Marketing",
    location: "Bangalore",
    level: "Intermediate level",
    workType: "Full-time",
    description:
      "Manage paid advertising campaigns across Google Ads and social media platforms to improve conversions.",
    company: "AdVantage Digital",
    salary: 7,
  },

  // Networking
  {
    id: 31,
    title: "Network Engineer",
    category: "Networking",
    location: "Noida",
    level: "Entry level",
    workType: "Full-time",
    description:
      "Configure, monitor, and maintain network infrastructure to ensure reliable connectivity.",
    company: "NetConnect Solutions",
    salary: 4,
  },
  {
    id: 32,
    title: "Network Administrator",
    category: "Networking",
    location: "Delhi",
    level: "Intermediate level",
    workType: "Full-time",
    description:
      "Manage network devices, troubleshoot connectivity issues, and maintain network security.",
    company: "TechBridge",
    salary: 6,
  },
  {
    id: 33,
    title: "Network Security Engineer",
    category: "Networking",
    location: "Gurgaon",
    level: "Senior level",
    workType: "Full-time",
    description:
      "Monitor network security, identify vulnerabilities, and implement measures to protect network systems.",
    company: "SecureNet Technologies",
    salary: 8,
  },
  {
    id: 34,
    title: "Cloud Network Engineer",
    category: "Networking",
    location: "Bangalore",
    level: "Intermediate level",
    workType: "Full-time",
    description:
      "Design and manage cloud networking solutions, including virtual networks, routing, and connectivity.",
    company: "CloudLink Systems",
    salary: 9,
  },
  {
    id: 35,
    title: "IT Support and Network Technician",
    category: "Networking",
    location: "Chennai",
    level: "Entry level",
    workType: "Full-time",
    description:
      "Provide technical support, troubleshoot network hardware, and assist with LAN and Wi-Fi maintenance.",
    company: "InfoWave Technologies",
    salary: 3,
  },

  // Cybersecurity
  {
    id: 36,
    title: "Security Operations Analyst",
    category: "Cybersecurity",
    location: "Hyderabad",
    level: "Intermediate level",
    workType: "Full-time",
    description:
      "Monitor security events, investigate suspicious activity, and respond to cyber threats.",
    company: "CyberShield",
    salary: 8,
  },
  {
    id: 37,
    title: "Cybersecurity Analyst",
    category: "Cybersecurity",
    location: "Hyderabad",
    level: "Intermediate level",
    workType: "Full-time",
    description:
      "Monitor security alerts, investigate threats, and help protect IT systems.",
    company: "SecureNet",
    salary: 8,
  },

  // Designing
  {
    id: 38,
    title: "Visual Designer Intern",
    category: "Designing",
    location: "Delhi",
    level: "Entry level",
    workType: "Internship",
    description:
      "Create illustrations, social graphics, and visual assets for digital products.",
    company: "CanvasLab",
    salary: 2,
  },

  // Networking
  {
    id: 39,
    title: "IT Support Engineer",
    category: "Networking",
    location: "Hyderabad",
    level: "Entry level",
    workType: "Full-time",
    description:
      "Troubleshoot technical issues and support workplace hardware and network systems.",
    company: "HelpDeskPro",
    salary: 3,
  },

  // Cybersecurity
  {
    id: 40,
    title: "Security Engineer",
    category: "Cybersecurity",
    location: "Bangalore",
    level: "Senior level",
    workType: "Full-time",
    description:
      "Strengthen application security and investigate vulnerabilities across systems.",
    company: "ShieldPoint",
    salary: 15,
  },

  // Full Stack Developer
  {
    id: 41,
    title: "Full Stack Developer",
    category: "Full stack developer",
    location: "Bangalore",
    level: "Senior level",
    workType: "Full-time",
    description:
      "Build scalable web applications and maintain frontend and backend services.",
    company: "AppVertex",
    salary: 14,
  },
  {
    id: 42,
    title: "Full Stack Developer",
    category: "Full stack developer",
    location: "Bangalore",
    level: "Senior level",
    workType: "Full-time",
    description:
      "Build scalable web applications and maintain frontend and backend services.",
    company: "AppVertex",
    salary: 14,
  },

  // Frontend Developer
  {
    id: 43,
    title: "Senior Frontend Developer",
    category: "Frontend developer",
    location: "Noida",
    level: "Senior level",
    workType: "Full-time",
    description:
      "Lead frontend development and build scalable interfaces using React and modern JavaScript.",
    company: "UIEngine",
    salary: 16,
  },
  {
    id: 44,
    title: "React Developer Intern",
    category: "Frontend developer",
    location: "Hyderabad",
    level: "Entry level",
    workType: "Internship",
    description:
      "Learn to build reusable React components and integrate frontend APIs.",
    company: "ReactRise",
    salary: 8,
  },

  // Data Science
  {
    id: 45,
    title: "Data Science Intern",
    category: "Data Science",
    location: "Bangalore",
    level: "Entry level",
    workType: "Internship",
    description:
      "Assist with data cleaning, exploratory analysis, and basic machine learning tasks.",
    company: "DataOrbit",
    salary: 3,
  },

  // MERN Stack Developer
  {
    id: 46,
    title: "Junior MERN Developer",
    category: "Mern stack developer",
    location: "Hyderabad",
    level: "Entry level",
    workType: "Full-time",
    description:
      "Develop and maintain MERN stack features under guidance from senior developers.",
    company: "StackBridge",
    salary: 5,
  },
  {
    id: 47,
    title: "MongoDB Developer",
    category: "Mern stack developer",
    location: "Noida",
    level: "Intermediate level",
    workType: "Contract",
    description:
      "Design database collections, optimize queries, and maintain MongoDB data models.",
    company: "DataForge",
    salary: 6,
  },
];


// ==============================
// INTERNSHIP FILTER OPTIONS
// ==============================

export const internshipLevels = [
  "Entry level",
  "Intermediate level",
  "Senior level",
];

export const internshipSalaryRanges = [
  { label: "Unpaid", min: 0, max: 1000 },
  { label: "₹1,000 - ₹4,999", min: 1000, max: 5000 },
  { label: "₹5,000 - ₹9,999", min: 5000, max: 10000 },
  { label: "₹10,000 - ₹14,999", min: 10000, max: 15000 },
  { label: "₹15,000 - ₹19,999", min: 15000, max: 20000 },
  { label: "₹20,000+", min: 20000, max: Infinity },
];


// Static internship data.

export const internships = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "Tech Solutions",
    category: "Frontend developer",
    location: "Noida",
    level: "Entry level",
    workType: "Internship",
    salary: 12000,
    description:
      "Work with React, JavaScript, and responsive web interfaces.",
  },
  {
    id: 2,
    title: "Data Science Intern",
    company: "DataOrbit",
    category: "Data Science",
    location: "Bangalore",
    level: "Intermediate level",
    workType: "Internship",
    salary: 15000,
    description:
      "Assist with data cleaning, exploratory analysis, and basic machine learning tasks.",
  },
  {
    id: 3,
    title: "React Developer Intern",
    company: "ReactRise",
    category: "Frontend developer",
    location: "Hyderabad",
    level: "Senior level",
    workType: "Internship",
    salary: 20000,
    description:
      "Learn to build reusable React components and integrate frontend APIs.",
  },
  {
    id: 4,
    title: "React Developer Intern",
    company: "ReactRise",
    category: "Frontend developer",
    location: "Hyderabad",
    level: "Entry level",
    workType: "Internship",
    salary: 8000,
    description:
      "Learn to build reusable React components and integrate frontend APIs.",
  },
  {
    id: 5,
    title: "Frontend Developer Intern",
    company: "PixelCraft",
    category: "Frontend developer",
    location: "Noida",
    level: "Intermediate level",
    workType: "Internship",
    salary: 10000,
    description:
      "Build responsive user interfaces using HTML, CSS, JavaScript, and React.",
  },
  {
    id: 6,
    title: "MERN Stack Developer Intern",
    company: "CodeNest",
    category: "Mern stack developer",
    location: "Delhi",
    level: "Senior level",
    workType: "Internship",
    salary: 12000,
    description:
      "Assist in developing full-stack applications using MongoDB, Express, React, and Node.js.",
  },
  {
    id: 7,
    title: "JavaScript Developer Intern",
    company: "ScriptWave",
    category: "Programming",
    location: "Pune",
    level: "Senior level",
    workType: "Internship",
    salary: 9000,
    description:
      "Practice JavaScript fundamentals and implement interactive web application features.",
  },
  {
    id: 8,
    title: "UI Developer Intern",
    company: "DesignOrbit",
    category: "Designing",
    location: "Mumbai",
    level: "Senior level",
    workType: "Internship",
    salary: 10000,
    description:
      "Convert UI designs into clean, accessible, and responsive web pages.",
  },
  {
    id: 9,
    title: "Node.js Developer Intern",
    company: "BackendBridge",
    category: "Programming",
    location: "Mumbai",
    level: "Senior level",
    workType: "Internship",
    salary: 12000,
    description:
      "Learn to create REST APIs and work with server-side JavaScript and databases.",
  },
  {
    id: 10,
    title: "Web Development Intern",
    company: "WebSpring",
    category: "Full stack developer",
    location: "Noida",
    level: "Intermediate level",
    workType: "Internship",
    salary: 8000,
    description:
      "Contribute to real-world web projects using HTML, CSS, JavaScript, and backend APIs.",
  },
  {
    id: 11,
    title: "Python Developer Intern",
    company: "PyWorks",
    category: "Programming",
    location: "Delhi",
    level: "Senior level",
    workType: "Internship",
    salary: 5000,
    description:
      "Assist with Python scripting, debugging, and building small application features.",
  },
  {
    id: 12,
    title: "Data Science Intern",
    company: "DataSphere",
    category: "Data Science",
    location: "Bangalore",
    level: "Entry level",
    workType: "Internship",
    salary: 15000,
    description:
      "Explore datasets, perform basic data analysis, and create visualizations using Python.",
  },
  {
    id: 13,
    title: "Full Stack Developer Intern",
    company: "LaunchStack",
    category: "Full stack developer",
    location: "Chennai",
    level: "Senior level",
    workType: "Internship",
    salary: 25000,
    description:
      "Work on frontend components, backend APIs, database integration, and application testing.",
  },
];


// ==============================
// JOB CATEGORY CARDS
// ==============================

export const jobCategories = [
  {
    id: 1,
    title: "Programming",
    description: "Explore software and web development jobs.",
    image: programming,
    keyword: "Programming",
  },
  {
    id: 2,
    title: "Data Science",
    description: "Discover data science and analytics roles.",
    image: dataScience,
    keyword: "Data Science",
  },
  {
    id: 3,
    title: "Designing",
    description: "Find UI/UX and graphic design opportunities.",
    image: designing,
    keyword: "Designing",
  },
  {
    id: 4,
    title: "Networking",
    description: "Explore network engineering opportunities.",
    image: networking,
    keyword: "Networking",
  },
  {
    id: 5,
    title: "Management",
    description: "Discover product management and leadership jobs.",
    image: management,
    keyword: "Management",
  },
  {
    id: 6,
    title: "Marketing",
    description: "Explore digital marketing and SEO opportunities.",
    image: marketing,
    keyword: "Marketing",
  },
  {
    id: 7,
    title: "Cybersecurity",
    description: "Explore information security opportunities.",
    image: cybersecurity,
    keyword: "Cybersecurity",
  },
  {
    id: 8,
    title: "Mobile App Development",
    description: "Android, iOS & React Native.",
    image: mobileApp,
    keyword: "Mobile Development",
  },
  {
    id: 9,
    title: "DevOps",
    description: "Cloud, Docker & CI/CD.",
    image: devops,
    keyword: "DevOps",
  },
  {
    id: 10,
    title: "Software Testing",
    description: "Manual testing, automation & QA.",
    image: softwareTesting,
    keyword: "Testing",
  },
  {
    id: 11,
    title: "Digital Marketing",
    description: "SEO, social media & online marketing.",
    image: digitalMarketing,
    keyword: "Digital Marketing",
  },
  {
    id: 12,
    title: "Technical Support",
    description: "IT support, troubleshooting & systems.",
    image: technicalSupport,
    keyword: "Technical Support",
  },
];
