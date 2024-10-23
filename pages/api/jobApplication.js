// pages/api/jobApplication.js
import { fetchJobApplications } from "@/actions/jobs";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Fetch the job applications using the function in actions/jobs.js
      const result = await fetchJobApplications();

      if (result.success) {
        // If successful, return the job applications in the response
        res.status(200).json({ success: true, applications: result.jobApplications });
      } else {
        // If there was an error in fetching the applications, return the error
        res.status(500).json({ success: false, error: result.error });
      }
    } catch (error) {
      // In case of an internal server error, return 500 with the error message
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  } else {
    // If the request method is not GET, return a 405 Method Not Allowed
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
