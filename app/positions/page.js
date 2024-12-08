"use client";

import React, { useState, useEffect } from "react";
import { useUserAuth } from "../Lib/auth-context"; // Import authentication context
import { useRouter } from "next/navigation"; // Import Next.js router

const fetchJobPostings = async () => {
  const response = await fetch("/api/jobPostings");
  const data = await response.json();
  return data.jobPostings;
};

export default function PositionsPage() {
  const { user, authLoading } = useUserAuth();
  const router = useRouter();

  const [selectedJob, setSelectedJob] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [jobPostings, setJobPostings] = useState([]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/SignIn");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const getJobPostings = async () => {
      const jobs = await fetchJobPostings();
      setJobPostings(jobs);
    };
    getJobPostings();
  }, []);

  if (authLoading || !user) {
    return <div>Loading...</div>;
  }

  const handleLearnMore = (job) => {
    setSelectedJob(job);
    setShowForm(false);
    setFormSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("jobPostingId", selectedJob.id);

    try {
      const response = await fetch("/api/jobApplication", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        setFormSubmitted(true);
      } else {
        console.error("Error submitting application:", result.error);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  return (
    <div style={pageContainer}>
      <div style={navbarStyle}>
        <h1 style={navbarTitle}>Open Positions</h1>
      </div>

      <div style={contentContainer}>
        <div style={jobListContainer}>
          {jobPostings && jobPostings.length > 0 ? (
            jobPostings.map((job) => (
              <div key={job.id} style={jobItemStyle}>
                <h2 style={jobTitleStyle}>{job.title}</h2>
                <p style={jobLocationStyle}>
                  <strong>Location:</strong> {job.location}
                </p>
                <p style={jobDescriptionStyle}>{job.description}</p>
                <button
                  style={learnMoreButtonStyle}
                  onClick={() => handleLearnMore(job)}
                >
                  Learn More
                </button>
              </div>
            ))
          ) : (
            <p>No jobs available at the moment.</p>
          )}
        </div>

        {selectedJob && (
          <div style={jobDetailsContainer}>
            <h2 style={jobTitleStyle}>{selectedJob.title}</h2>
            <p style={jobDetailHeadingStyle}>Location:</p>
            <p style={jobDetailStyle}>{selectedJob.location}</p>
            <p style={jobDetailHeadingStyle}>Description:</p>
            <p style={jobDetailStyle}>{selectedJob.description}</p>
            <p style={jobDetailHeadingStyle}>Salary:</p>
            <p style={jobDetailStyle}>{selectedJob.salary}</p>
            <p style={jobDetailHeadingStyle}>Requirements:</p>
            <p style={jobDetailStyle}>{selectedJob.requirements}</p>
            <button
              style={applyButtonStyle}
              onClick={() => setShowForm(!showForm)}
            >
              Apply Now
            </button>
            {showForm && (
              <div style={{ marginTop: "20px" }}>
                <h2 style={jobDetailHeadingStyle}>Submit Your Application</h2>
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: "15px" }}>
                    <label style={jobDetailHeadingStyle}>Name:</label>
                    <input
                      type="text"
                      name="name"
                      required
                      style={inputStyle}
                    />
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <label style={jobDetailHeadingStyle}>Email:</label>
                    <input
                      type="email"
                      name="email"
                      required
                      style={inputStyle}
                    />
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <label style={jobDetailHeadingStyle}>Upload Resume:</label>
                    <input type="file" name="resume" required />
                  </div>
                  <button
                    type="submit"
                    style={{
                      ...applyButtonStyle,
                      backgroundColor: "#FB923C",
                      marginTop: "10px",
                    }}
                  >
                    Submit Application
                  </button>
                </form>
                {formSubmitted && (
                  <p style={successMessageStyle}>
                    Your application has been submitted successfully!
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// CSS-in-JS Styling
const pageContainer = {
  display: "flex",
  flexDirection: "column",
  fontFamily: "Arial, sans-serif",
};

const navbarStyle = {
  backgroundColor: "#FB923C",
  padding: "20px",
  textAlign: "center",
};

const navbarTitle = {
  color: "#fff",
  fontSize: "2rem",
  margin: 0,
};

const contentContainer = {
  display: "flex",
  justifyContent: "space-between",
  padding: "20px",
};

const jobListContainer = {
  width: "45%",
};

const jobItemStyle = {
  padding: "15px",
  marginBottom: "15px",
  backgroundColor: "#f2f2f2",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
};

const jobTitleStyle = {
  fontSize: "1.5rem",
  color: "#333",
  fontWeight: "bold",
};

const jobLocationStyle = {
  fontSize: "1rem",
  color: "#666",
};

const jobDescriptionStyle = {
  fontSize: "0.9rem",
  color: "#555",
  marginBottom: "10px",
};

const learnMoreButtonStyle = {
  backgroundColor: "#FF8C00",
  color: "#fff",
  padding: "8px 15px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const jobDetailsContainer = {
  width: "50%",
  padding: "20px",
  backgroundColor: "#fefefe",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
};

const jobDetailHeadingStyle = {
  fontSize: "1.1rem",
  color: "#333",
  fontWeight: "bold",
  marginBottom: "8px",
};

const jobDetailStyle = {
  fontSize: "1rem",
  color: "#555",
  marginBottom: "15px",
};

const applyButtonStyle = {
  backgroundColor: "#28a745",
  color: "#fff",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const successMessageStyle = {
  color: "green",
  fontWeight: "bold",
  marginTop: "15px",
};
