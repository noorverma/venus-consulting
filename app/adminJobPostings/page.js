"use client";
import { useState, useEffect } from "react";

const AdminJobPostings = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    salary: "",
    location: "",
    requirements: ""
  });

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
    fetchJobPostings();
  }, []);

  const handleChange = (e) => {
    setNewJob({
      ...newJob,
      [e.target.name]: e.target.value
    });
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/jobPostings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newJob)
    });
    const data = await response.json();
    if (data.success) {
      fetchJobPostings(); // Refresh job postings after adding a new one
      setNewJob({ title: "", description: "", salary: "", location: "", requirements: "" });
    } else {
      console.error("Failed to add job posting");
    }
  };

  return (
    <div>
      <h1>All Job Postings</h1>
      <form onSubmit={handleAddJob}>
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={newJob.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Job Description"
          value={newJob.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="salary"
          placeholder="Salary"
          value={newJob.salary}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newJob.location}
          onChange={handleChange}
        />
        <input
          type="text"
          name="requirements"
          placeholder="Requirements"
          value={newJob.requirements}
          onChange={handleChange}
        />
        <button type="submit">Add Job Posting</button>
      </form>

      {jobPostings.length === 0 ? (
        <p>No job postings found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobPostings.map((job) => (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.description}</td>
                <td>
                  <button onClick={() => viewApplicants(job.id)}>View Applicants</button>
                  <button onClick={() => editJobPosting(job.id)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminJobPostings;
