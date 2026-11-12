
import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";

import Profile from "./pages/Profile";
import PublishJob from "./pages/PublishJob";
import ProtectedRoute from "./components/ProtectedRoute";

import Jobs from "./pages/Jobs";
import Home from "./pages/Home";
import About from "./pages/About";
import Internships from "./pages/Internships";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyApplications from "./pages/MyApplications";
import ApplicationsReceived from "./pages/ApplicationsReceived";
import MyPublishedJobs from "./pages/MyPublishedJobs";

import Footer from "./components/footer";
import Logo from "./pages/Logo";

const App = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Logo />
              <Home />
            </>
          }
        />

        <Route path="/jobs" element={<Jobs />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-job"
          element={
            <ProtectedRoute>
              <PublishJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-applications"
          element={
            <ProtectedRoute>
              <MyApplications />
            </ProtectedRoute>
          }
        />
        <Route
  path="/applications-received"
  element={
    <ProtectedRoute>
      <ApplicationsReceived />
    </ProtectedRoute>
  }
/>

    <Route
  path="/my-published-jobs"
  element={
    <ProtectedRoute>
      <MyPublishedJobs />
    </ProtectedRoute>
  }
/>
      </Routes>

      <Footer />
    </div>
  );
};

export default App;


