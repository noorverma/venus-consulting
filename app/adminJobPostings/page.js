// app/adminJobPostings/page.js
"use client";

import { useState, useEffect } from "react";
import { useUserAuth } from "../Lib/auth-context"; // Import authentication context
import { useRouter } from "next/navigation"; // Import Next.js router
import { doc, getDoc } from "firebase/firestore"; // Import Firestore methods
import { db } from "../Lib/firebase"; // Firestore instance
import AdminNavbar from "../components/AdminNavbar"; // Import AdminNavbar component

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
    <div className="flex min-h-screen">
      <AdminNavbar /> {/* Fixed Sidebar */}
      {/* Main Content */}
      <div className="flex-1 ml-[220px] p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-center text-orange-500">Admin Job Postings</h1>

        {/* Add Job Posting Form */}
        <form onSubmit={handleAddJob} className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Add New Job Posting</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              placeholder="Job Title"
              value={newJob.title}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
            <input
              type="text"
              name="description"
              placeholder="Job Description"
              value={newJob.description}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
            <input
              type="text"
              name="salary"
              placeholder="Salary"
              value={newJob.salary}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={newJob.location}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
            <input
              type="text"
              name="requirements"
              placeholder="Requirements"
              value={newJob.requirements}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <button className="mt-4 bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600">
            Add Job Posting
          </button>
        </form>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Job Postings Table */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Job Postings</h2>
          {jobPostings.length === 0 ? (
            <p>No job postings found</p>
          ) : (
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-orange-500 text-white">
                  <th className="px-4 py-2 border border-gray-300">Title</th>
                  <th className="px-4 py-2 border border-gray-300">Description</th>
                  <th className="px-4 py-2 border border-gray-300">Salary</th>
                  <th className="px-4 py-2 border border-gray-300">Location</th>
                  <th className="px-4 py-2 border border-gray-300">Requirements</th>
                </tr>
              </thead>
              <tbody>
                {jobPostings.map((job) => (
                  <tr key={job.id}>
                    <td className="px-4 py-2 border border-gray-300">{job.title}</td>
                    <td className="px-4 py-2 border border-gray-300">{job.description}</td>
                    <td className="px-4 py-2 border border-gray-300">{job.salary}</td>
                    <td className="px-4 py-2 border border-gray-300">{job.location}</td>
                    <td className="px-4 py-2 border border-gray-300">{job.requirements}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminJobPostings;