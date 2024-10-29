"use client";

import { useEffect, useState } from 'react';

const AdminJobApplications = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('/api/jobApplication', {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          setApplications(data.applications);
        } else {
          setError(data.error || 'Failed to fetch applications');
        }
      } catch (error) {
        setError('Error fetching applications');
        console.error('Error fetching applications:', error);
      }
    };
    fetchApplications();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Job Applications</h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Job Title</th>
            <th style={thStyle}>Resume</th>
          </tr>
        </thead>
        <tbody>
          {applications.length > 0 ? (
            applications.map((application) => (
              <tr key={application.id}>
                <td style={tdStyle}>{application.name}</td>
                <td style={tdStyle}>{application.email}</td>
                <td style={tdStyle}>{application.jobPostingId || 'N/A'}</td>
                <td style={tdStyle}>
                  {application.resumeURL ? (
                    <a href={application.resumeURL} target="_blank" rel="noreferrer" style={linkStyle}>
                      View Resume
                    </a>
                  ) : (
                    'No resume uploaded'
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={tdStyle}>No job applications found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
};

const thStyle = {
  backgroundColor: '#f2f2f2',
  border: '1px solid #ddd',
  padding: '12px',
  textAlign: 'left',
};

const tdStyle = {
  border: '1px solid #ddd',
  padding: '12px',
};

const linkStyle = {
  color: '#0066cc',
  textDecoration: 'none',
};

export default AdminJobApplications;