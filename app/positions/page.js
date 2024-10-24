"use client";
import React, { useState, useEffect } from "react";
 
// Fetch job postings from the backend API
const fetchJobPostings = async () => {
  const response = await fetch("/api/jobPostings");
  const data = await response.json();
  return data.jobPostings;
};
 
export default function PositionsPage() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [jobPostings, setJobPostings] = useState([]);
 
  // Fetch job postings on component mount
  useEffect(() => {
    const getJobPostings = async () => {
      const jobs = await fetchJobPostings();
      setJobPostings(jobs);
    };
    getJobPostings();
  }, []);
 
  // Handle selecting a job
  const handleLearnMore = (job) => {
    setSelectedJob(job);
    setShowForm(false); // Hide the form when a new job is selected
    setFormSubmitted(false); // Reset the form submitted message
  };
 
  // Handle form submission to apply for a job
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const formData = new FormData(e.target); // Assuming you're handling file uploads
    const applicationData = {
      jobPostingId: selectedJob.id,
      name: formData.get('name'),
      email: formData.get('email'),
      resume: formData.get('resume'), // Assuming resume is a file or URL
    };
 
    try {
      const response = await fetch('/api/jobApplication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });
 
      const result = await response.json();
      if (result.success) {
        setFormSubmitted(true); // Show success message after submission
      } else {
        console.error('Error submitting application:', result.error);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };
 
  return (
    <div style={pageContainer}>
      {/* Navbar Section */}
      <div style={navbarStyle}>
        <h1 style={navbarTitle}>Open Positions</h1>
      </div>
 
      <div style={contentContainer}>
        {/* Left Section - Job List */}
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
 
        {/* Right Section - Job Details */}
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
 
            {/* Conditionally render the form */}
            {showForm && (
              <div style={{ marginTop: "20px" }}>
                <h2 style={jobDetailHeadingStyle}>Submit Your Application</h2>
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: "15px" }}>
                    <label style={jobDetailHeadingStyle}>Name:</label>
                    <input
                      type="text"
                      name="name"
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                      }}
                    />
                  </div>
 
                  <div style={{ marginBottom: "15px" }}>
                    <label style={jobDetailHeadingStyle}>Email:</label>
                    <input
                      type="email"
                      name="email"
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                      }}
                    />
                  </div>
 
                  <div style={{ marginBottom: "15px" }}>
                    <label style={jobDetailHeadingStyle}>Upload Resume:</label>
                    <input type="file" name="resume" />
                  </div>
 
                  <button
                    type="submit"
                    style={{
                      ...applyButtonStyle,
                      backgroundColor: "#FB923C", // Orange for the button
                      marginTop: "10px",
                    }}
                  >
                    Submit Application
                  </button>
                </form>
 
                {/* Show success message after form submission */}
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
  backgroundColor: "#FB923C", // Orange theme matching the website
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
  backgroundColor: "#f2f2f2", // Lighter grey for inside job box
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
};
 
const jobTitleStyle = {
  fontSize: "1.5rem", // Increased size for better heading visibility
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
  backgroundColor: "#FF8C00", // Orange theme
  color: "#fff",
  padding: "8px 15px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
 
const jobDetailsContainer = {
  width: "50%",
  padding: "20px",
  backgroundColor: "#fefefe", // White background for details section
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
};
 
const jobDetailHeadingStyle = {
  fontSize: "1.1rem", // Slightly larger font for headings
  color: "#333", // Proper black color
  fontWeight: "bold", // Bold only for the headings
  marginBottom: "8px",
};
 
const jobDetailStyle = {
  fontSize: "1rem", // Normal font for main description
  color: "#555", // Proper black for the text
  marginBottom: "15px",
};
 
const applyButtonStyle = {
  backgroundColor: "#28a745", // Green for apply button
  color: "#fff",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
 
const successMessageStyle = {
  color: "green",
  fontWeight: "bold",
  marginTop: "15px",
};