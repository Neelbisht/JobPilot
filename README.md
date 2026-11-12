# JobPilot – Job Portal

JobPilot is a MERN stack job portal that connects job seekers with employers. Job seekers can explore job opportunities, search and filter listings, and apply for jobs. Employers can publish and manage job listings through their accounts.

The goal of this project is to make the job search and recruitment process simple and convenient.

## Features

- User registration and login
- Separate Job Seeker and Employer roles
- Browse and search job opportunities
- Filter jobs by category, location, experience level, and job type
- Explore internship opportunities
- Employers can publish, edit, and delete job listings
- User profile management
- JWT-based authentication

## Technologies Used

**Frontend**
- React.js
- JavaScript
- Tailwind CSS
- React Router
- Vite

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs

## Project Structure

```text
JobPilot/
│
├── Backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── Frontend/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       └── services/
│
└── README.md
```

## Getting Started

Follow these steps to run JobPilot on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/Neelbisht/JobPilot.git
cd JobPilot
```

### 2. Start the Backend

```bash
cd Backend
npm install
```

Create a `.env` file inside the Backend folder and add:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=4000
```

Start the backend:

```bash
npm run dev
```

The backend will run at `http://localhost:4000`.

### 3. Start the Frontend

Open another terminal from the project folder and run:

```bash
cd Frontend
npm install
npm run dev
```

Open the local URL displayed in your terminal to access JobPilot.

## Environment Variables

The backend requires the following environment variables:

| Variable | Purpose |
|---|---|
| MONGO_URI | MongoDB connection string |
| JWT_SECRET | Secret key for authentication tokens |
| PORT | Backend server port |

**Note:** Keep your `.env` file private. Do not upload it to GitHub.

## Author

**Neeraj Bisht**

[GitHub Profile](https://github.com/Neelbisht)

**Project:** [JobPilot Repository](https://github.com/Neelbisht/JobPilot)
