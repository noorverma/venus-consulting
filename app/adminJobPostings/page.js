"use client";

import { useState, useEffect } from "react";
import { useUserAuth } from "../Lib/auth-context"; // Import authentication context
import { useRouter } from "next/navigation"; // Import Next.js router
import { doc, getDoc } from "firebase/firestore"; // Import Firestore methods
import { db } from "../Lib/firebase"; // Firestore instance

const AdminJobPostings = () => {
  const { user, authLoading } = useUserAuth(); // Access user and loading state from authentication context
  const router = useRouter(); // Initialize router for navigation
  const [isAuthorized, setIsAuthorized] = useState(false); // State to track admin authorization
  const [jobPostings, setJobPostings] = useState([]); // State for job postings
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    salary: "",
    location: "",
    requirements: "",
  });
  const [error, setError] = useState(""); // State for form error handling

  // Check user role and authorization
  useEffect(() => {
    const checkAuthorization = async () => {
      if (!authLoading && user) {
        try {
          const userDocRef = doc(db, "users", user.uid); // Reference to the user's document in Firestore
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists() && userDoc.data().role === "admin") {
            setIsAuthorized(true); // Grant access if the user is an admin
          } else {
            router.push("/Main"); // Redirect to Main if the user is not an admin
          }
        } catch (error) {
          console.error("Error checking user role:", error);
          router.push("/Main"); // Redirect to Main on error
        }
      } else if (!authLoading && !user) {
        router.push("/SignIn"); // Redirect to SignIn if user is not logged in
      }
    };

    checkAuthorization();
  }, [user, authLoading, router]);

  // Fetch job postings
  const fetchJobPostings = async () => {
    const response = await fetch("/api/jobPostings");
    const data = await response.json();
    if (data.success) {
      setJobPostings(data.jobPostings);
    } else {
      console.error("Failed to fetch job postings");
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      fetchJobPostings();
    }
  }, [isAuthorized]);

  const handleChange = (e) => {
    setNewJob({
      ...newJob,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddJob = async (e) => {
    e.preventDefault();

    // Basic input validation
    if (!newJob.title || !newJob.description || !newJob.salary || !newJob.location) {
      setError("All fields are required.");
      return;
    }

    setError(""); // Clear error

    const response = await fetch("/api/jobPostings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });
    const data = await response.json();
    if (data.success) {
      fetchJobPostings(); // Refresh job postings after adding a new one
      setNewJob({ title: "", description: "", salary: "", location: "", requirements: "" });
    } else {
      console.error("Failed to add job posting");
    }
  };

  // Show loading message if authentication or authorization is being checked
  if (authLoading || (!user && !isAuthorized)) {
    return <div>Loading...</div>;
  }

  return (
    <div style={containerStyle}>
      {/* Navbar Section */}
      <div style={navbarStyle}>
        <h1 style={navbarTitle}>Admin Dashboard - Job Postings</h1>
      </div>

      <div style={contentContainer}>
        <form onSubmit={handleAddJob} style={formStyle}>
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={newJob.title}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="description"
            placeholder="Job Description"
            value={newJob.description}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="salary"
            placeholder="Salary"
            value={newJob.salary}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={newJob.location}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="requirements"
            placeholder="Requirements"
            value={newJob.requirements}
            onChange={handleChange}
            style={inputStyle}
          />
          <button type="submit" style={submitButtonStyle}>
            Add Job Posting
          </button>
        </form>

        {error && <p style={errorStyle}>{error}</p>} {/* Display validation errors */}

        {jobPostings.length === 0 ? (
          <p>No job postings found</p>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Title</th>
                <th style={tableHeaderStyle}>Description</th>
                <th style={tableHeaderStyle}>Salary</th>
                <th style={tableHeaderStyle}>Location</th>
                <th style={tableHeaderStyle}>Requirements</th>
              </tr>
            </thead>
            <tbody>
              {jobPostings.map((job) => (
                <tr key={job.id}>
                  <td style={tableCellStyle}>{job.title}</td>
                  <td style={tableCellStyle}>{job.description}</td>
                  <td style={tableCellStyle}>{job.salary}</td>
                  <td style={tableCellStyle}>{job.location}</td>
                  <td style={tableCellStyle}>{job.requirements}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

// CSS-in-JS styling
const containerStyle = {
  backgroundColor: "#FFFFFF", // White background for the container
  padding: "20px",
  minHeight: "100vh",
};

const navbarStyle = {
  backgroundColor: "#FB923C", // Orange navbar
  padding: "15px",
  textAlign: "center",
  marginBottom: "20px",
};

const navbarTitle = {
  color: "#fff",
  fontSize: "2rem",
  margin: 0,
};

const contentContainer = {
  padding: "20px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  marginBottom: "20px",
};

const inputStyle = {
  margin: "10px 0",
  padding: "10px",
  fontSize: "1rem",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const submitButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#FB923C",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const errorStyle = {
  color: "red",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
};

const tableHeaderStyle = {
  padding: "10px",
  borderBottom: "2px solid #FF8C00",
  textAlign: "left",
  color: "#333",
};

const tableCellStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

export default AdminJobPostings;
