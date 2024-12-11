// /app/positions/page.js
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const fetchJobPostings = async () => {
  const response = await fetch("/api/jobPostings");
  const data = await response.json();
  return data.jobPostings;
};

export default function PositionsPage() {
  const [jobPostings, setJobPostings] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const getJobPostings = async () => {
      const jobs = await fetchJobPostings();
      setJobPostings(jobs);
    };
    getJobPostings();
  }, []);

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
      <div style={navbarStyle}>Find your dream job</div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={contentContainer}
      >
        <div style={jobListContainer}>
          {jobPostings && jobPostings.length > 0 ? (
            jobPostings.map((job) => (
              <motion.div
                key={job.id}
                style={jobItemStyle}
                whileHover={{ scale: 1.05 }}
              >
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
              </motion.div>
            ))
          ) : (
            <p style={noJobsStyle}>No jobs available at the moment.</p>
          )}
        </div>

        {selectedJob && (
          <motion.div
            style={jobDetailsContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
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
                    style={submitButtonStyle}
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
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

// CSS-in-JS Styling
const pageContainer = {
  background: "linear-gradient(to bottom, #FFD3A4, #FFF8E7)",
  minHeight: "100vh",
  fontFamily: "Arial, sans-serif",
  padding: "20px",
};

const navbarStyle = {
  backgroundColor: "#FC7303",
  padding: "20px",
  textAlign: "center",
  color: "#fff",
  fontSize: "2.5rem",
  fontWeight: "bold",
};

const contentContainer = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "20px",
  padding: "20px",
};

const jobListContainer = {
  flex: 1,
  marginRight: "20px",
};

const jobItemStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  marginBottom: "15px",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
};

const jobTitleStyle = {
  fontSize: "1.5rem",
  fontWeight: "bold",
  color: "#333",
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
  backgroundColor: "#FC7303",
  color: "#fff",
  padding: "10px 15px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "1rem",
};

const jobDetailsContainer = {
  flex: 1,
  padding: "20px",
  backgroundColor: "#fefefe",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  overflowY: "auto",
  maxHeight: "calc(100vh - 150px)",
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

const submitButtonStyle = {
  backgroundColor: "#FC7303",
  color: "#fff",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const noJobsStyle = {
  fontSize: "1rem",
  color: "#555",
  textAlign: "center",
  marginTop: "20px",
};

const successMessageStyle = {
  color: "green",
  fontWeight: "bold",
  marginTop: "15px",
};
