// Used perplexity AI for reference but I wrote the code myself
// app/components/AdminJobApplicants.js

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AdminJobApplications = () => {
  const [applications, setApplications] = useState([]); // State to store job applications
  const [error, setError] = useState(null); // State to store error messages
  const router = useRouter(); // For navigation

  // Fetch applications on component mount
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch("/api/jobApplication", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          setApplications(data.applications); // Set fetched applications
        } else {
          setError(data.error || "Failed to fetch applications");
        }
      } catch (error) {
        setError("Error fetching applications");
        console.error("Error fetching applications:", error);
      }
    };
    fetchApplications();
  }, []);

  // If an error occurs, display it
  if (error) {
    return (
      <div className="bg-gray-100 text-center p-4 text-red-600 font-bold">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-orange-500 mb-6 text-center">
        Job Applications
      </h1>
      <table className="w-full border-collapse table-auto text-left">
        <thead>
          <tr>
            {/* Updated the background to orange and text to white */}
            <th className="bg-orange-500 text-white font-semibold p-4 border-b">
              Name
            </th>
            <th className="bg-orange-500 text-white font-semibold p-4 border-b">
              Email
            </th>
            <th className="bg-orange-500 text-white font-semibold p-4 border-b">
              Job Title
            </th>
            <th className="bg-orange-500 text-white font-semibold p-4 border-b">
              Resume
            </th>
          </tr>
        </thead>
        <tbody>
          {applications.length > 0 ? (
            applications.map((application) => (
              <tr key={application.id} className="hover:bg-gray-50">
                <td className="p-4 border-b">{application.name}</td>
                <td className="p-4 border-b">{application.email}</td>
                <td className="p-4 border-b">
                  {application.jobPostingId || "N/A"}
                </td>
                <td className="p-4 border-b">
                  {application.resumeURL ? (
                    <a
                      href={application.resumeURL}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Resume
                    </a>
                  ) : (
                    "No resume uploaded"
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="p-4 border-b text-center text-gray-600"
              >
                No job applications found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminJobApplications;
