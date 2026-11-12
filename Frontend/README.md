# Backend step

Open the terminal in Backend

Run these commands one by one:
=>npm init -y

Install the required packages:
=>npm install express mongoose dotenv cors

Install Nodemon for development:
=>npm install -D nodemon




# Package

Express	=>Creates your backend server and API routes
Mongoose =>	Connects Node.js to MongoDB
dotenv =>	Loads environment variables
cors =>	Allows your React frontend to communicate with the backend
Nodemon	=>Restarts the server when you change code


Step: 2
Update package.json
=>package.json has only the default test and start scripts. Replace the "scripts" section with:

"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}

Step 3: Create server.js
=>Inside your Backend folder, create a new file named server.js

```jsx
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("JobPilot Backend is running!");
});

app.get("/api/jobs", (req, res) => {
  res.json({
    success: true,
    message: "Jobs API is working",
    jobs: [],
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

Step 4: Start the server
npm run dev
You should see: Server running on port 4000




Step 2 — Set up MongoDB


Step 3 

Backend/models/Job.js
```jsx

const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    companyLogo: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship", "Contract"],
      default: "Full-time",
    },

    experienceLevel: {
      type: String,
      default: "Entry level",
    },

    salary: {
      type: String,
      default: "Not disclosed",
    },

    description: {
      type: String,
      required: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    isRemote: {
      type: Boolean,
      default: false,
    },

    applicationUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);
```
Understand what you added

Field	Purpose
title	=>Frontend Developer, React Developer, etc.
company	=>Company name
location =>	Noida, Delhi, Remote, etc.
category	=>Frontend, Full Stack, Design, etc.
jobType =>	Full-time, Internship, etc.
salary	=>Salary or stipend
skills	=>React, JavaScript, HTML, CSS
timestamps	=>Automatically records creation and update dates

required: true means MongoDB validation will reject a job document if that field is missing. trim: true removes extra spaces at the beginning and end of a string.


Step: 5
 Now we'll connect your Job model to the Jobs API so JobPilot can retrieve job listings from MongoDB.

 Update Backend/server.js
 =>Replace your existing server.js code with this version. It keeps your current server setup and updates /api/jobs to fetch jobs from the database.


# bcryptjs hashes passwords before saving them to MongoDB.
npm install bcryptjs jsonwebtoken
jsonwebtoken creates a token after successful login so protected routes can identify the user.








 # Backend setup
- Created the Backend folder and Node.js/Express server.
- Installed Express, Mongoose, dotenv, and CORS.
- Configured environment variables in .env.
- Connected the backend to MongoDB Atlas.


# Job model

Created Backend/models/Job.js with fields for the title, company, location, category, job type, experience, salary, description, skills, and remote status.

# Jobs API
- GET /api/jobs — fetches jobs from MongoDB.
- POST /api/jobs — creates a job in MongoDB.
- Added basic required-field validation when creating jobs.


# Frontend integration
- Created src/services/jobService.js to fetch jobs.
- Updated Jobs.jsx to load jobs from the backend.
- Added loading/error handling and kept your existing filters and pagination.
- Confirmed that the Google Frontend Developer job appears on your Jobs page


# Interview question: How does your Jobs page fetch data?
A simple answer you can learn and explain in your own words:
My JobPilot frontend uses React to display jobs. I created a service file that sends a GET request to my Express backend using fetch(). The backend retrieves job documents from MongoDB using Mongoose and returns them as JSON. React then stores the returned jobs in state and renders them as job cards


# Question: What is the difference between frontend and backend?

A simple answer:
The frontend is the part of the application users interact with. In JobPilot, I use React to display job cards, search fields, and filters. The backend uses Node.js and Express to handle API requests, while MongoDB stores job data.

# Question: Why do we use async/await when fetching jobs?

A simple answer:
Fetching data from the backend takes time. I use async/await to wait for the API response before processing the returned JSON data.

# What is an API?

An API is a way for two software applications to communicate. In JobPilot, the React frontend sends requests to the Express backend to retrieve job data from MongoDB.


Interview preparation: What have you learned?
- req.query reads search and filter values from the URL.
- $regex lets you match text, while $options: "i" ignores letter case.
- Job.find(filter) retrieves matching documents from MongoDB.
- Job.create(req.body) saves a new job.
- async/await and try/catch handle asynchronous database operations and errors.







# What we have done
1) Backend project setup
Created the Backend folder, initialized npm, and installed Express, Mongoose, dotenv, and CORS, along with the authentication dependencies bcryptjs and jsonwebtoken.

2) installed backend packages
express, mongoose, dotenv, cors, and nodemon

3) Created the Express server
Created server.js, configured JSON parsing and CORS, loaded environment variables, and configured the server to use port 4000

4) Connected MongoDB Atlas
Configured the MongoDB connection using MONGO_URI in your .env file. The connection was subsequently successful.

# MongoDB connection
Connected your backend to MongoDB Atlas. Your terminal confirmed MongoDB connected successfully.

5) Created the Job model
Created models/Job to define the structure of job records stored in MongoDB.

6) Implemented jobs API
- GET /api/jobs — retrieve jobs.
- POST /api/jobs — validate submitted job fields and create a job record.

7) Connected frontend to backend
Created Frontend/src/services/jobService.js to fetch jobs. Your Jobs page successfully displayed records from MongoDB, including a Google job and a React Developer Intern test record.


8) Registration API
Implemented POST /api/auth/register. It validates required fields, checks for existing email addresses, hashes passwords with bcrypt, and creates a user.

9) Login API — successfully tested
Implemented POST /api/auth/login. Your latest Postman response confirmed successful password verification and JWT token generation.




# What we have learned about authentication
When a user registers:
1. The frontend sends the user's name, email, and password to the backend.
2. The backend checks whether the email is already registered.
3. bcryptjs hashes the password before it is saved to MongoDB.
4. The backend returns a successful registration response.
When a user logs in:
1. The backend finds the user by email.
2. bcryptjs compares the entered password with the stored hash.
3. jsonwebtoken generates a token after successful verification.
4. The backend returns the token and basic user details.




# Backend job validation summary
All the tests we've performed so far are passing:
- Required fields: title, company, location, category, description.
- isRemote: Boolean only.
- skills: array of non-empty strings.
- jobType: allowed enum values only.
- experienceLevel: allowed enum values only.
- salary, companyLogo, applicationUrl: strings only.
- Mongoose validation errors: return 400 instead of 500.


# What should we do next?
I recommend moving to backend security and data integrity improvements before frontend integration.

There are two important improvements:
1. Restrict accepted fields: Currently, Job.create(req.body) passes the entire request body to Mongoose. We should allow only the fields defined for job creation.
2. Validate URLs: Check that companyLogo and applicationUrl contain valid URLs when provided.


# We've completed:
- Authentication and role-based access tests.
- Job creation and required-field validation.
- Job model enum validation.
- Data type validation.
- Protection against unwanted extra fields.
- URL validation.


# Next task: Test the GET /api/jobs endpoint.

We'll verify that:
1. All jobs load correctly.
2. Search by job title works.
3. Search by company works.
4. Location filtering works.
5. Category filtering works.
6. Job type and experience filters work.
7. Multiple filters work together.




# What I would expect you to explain in an interview
Be prepared to answer these questions:
1. How does JWT authentication work in JobPilot?
2. How do you protect employer-only routes?
3. How do you prevent duplicate job applications?
4. How are Jobs, Users and Applications related in MongoDB?
5. How does your search and filtering functionality work?
6. How does the employer retrieve applications for their own jobs?




eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YWYwNTFhN2M0ODZmYmUzODgzNTZjZTgiLCJyb2xlIjoiZW1wbG95ZXIiLCJpYXQiOjE3OTQyMDY2NjYsImV4cCI6MTc5NDI5MzA2Nn0.gB-YdlkhE3cXE6VE4V04zJUDAHhsAPK-f0YPbZyak8U


6af051a7c486fbe388356ce8


