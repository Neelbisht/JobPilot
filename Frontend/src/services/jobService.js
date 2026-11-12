
const API_URL = "http://localhost:4000/api/jobs";

// Get jobs with optional search and filters
export const getJobs = async (filters = {}) => {
  try {
    // Create URL parameters
    const params = new URLSearchParams();

    if (filters.search) {
      params.append("search", filters.search);
    }

    if (filters.location) {
      params.append("location", filters.location);
    }

    if (filters.category) {
      params.append("category", filters.category);
    }

    if (filters.jobType) {
      params.append("jobType", filters.jobType);
    }

    if (filters.experienceLevel) {
      params.append("experienceLevel", filters.experienceLevel);
    }

    // Build the API URL
    const url = `${API_URL}?${params.toString()}`;

    // Request jobs from backend
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch jobs");
    }

    const data = await response.json();

    return data.jobs;
  } catch (error) {
    console.error("Error fetching jobs:", error.message);
    throw error;
  }
};


