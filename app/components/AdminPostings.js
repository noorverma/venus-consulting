import { useEffect, useState } from 'react';

const AdminPostings = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [applicants, setApplicants] = useState([]); // State for applicants

  useEffect(() => {
    const fetchJobPostings = async () => {
      const response = await fetch('/api/jobPostings');
      const data = await response.json();
      if (data.success) {
        setJobPostings(data.jobPostings);
      } else {
        console.error('Failed to fetch job postings');
      }
    };
    fetchJobPostings();
  }, []);

  // Function to view applicants for a specific job
  const viewApplicants = async (jobId) => {
    const response = await fetch(`/api/jobApplications?jobId=${jobId}`);
    const data = await response.json();
    if (data.success) {
      setApplicants(data.applications); // Set the fetched applicants
    } else {
      console.error('Failed to fetch job applications');
    }
  };

  return (
    <div>
      <h1>All Job Postings</h1>
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

      {/* Render Applicants if available */}
      {applicants.length > 0 && (
        <div>
          <h2>Applicants for Job</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Resume</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((applicant) => (
                <tr key={applicant.id}>
                  <td>{applicant.user.name}</td>
                  <td>{applicant.user.email}</td>
                  <td>
                    <a href={applicant.resumeUrl} target="_blank" rel="noopener noreferrer">
                      View Resume
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPostings;
