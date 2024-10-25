"use client"; // Ensures that the component is rendered on the client side

import { useEffect, useState } from 'react';

const AdminJobApplications = () => {
  const [applications, setApplications] = useState([]); // State to store applications
  const [error, setError] = useState(null); // State to store any errors

  // Fetch applications from the API when the component is mounted
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('/api/jobApplication', {
          method: 'GET',  // Ensure the method is GET
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          setApplications(data.applications); // Store the fetched applications in state
        } else {
          setError(data.error || 'Failed to fetch applications');
        }
      } catch (error) {
        setError('Error fetching applications');
        console.error('Error fetching applications:', error);
      }
    };
    fetchApplications();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  // Display error if there's an issue fetching the applications
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Job Applications</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Job Title</th>
            <th>Resume</th>
          </tr>
        </thead>
        <tbody>
          {applications.length > 0 ? (
            applications.map((application) => (
              <tr key={application.id}>
                <td>{application.name}</td>
                <td>{application.email}</td>
                <td>{application.jobPosting?.title || 'N/A'}</td>
                <td>
                  <a href={application.resume} target="_blank" rel="noreferrer">
                    View Resume
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No job applications found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminJobApplications;
