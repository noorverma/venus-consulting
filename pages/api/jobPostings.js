import prisma from "@/app/Lib/prisma";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, description, salary, location, requirements } = req.body;

    try {
      const newJob = await prisma.jobPosting.create({
        data: {
          title,
          description,
          salary,
          location,
          requirements,
        },
      });

      res.status(200).json({ success: true, jobPosting: newJob });
    } catch (error) {
      console.error("Error adding job posting:", error);
      res.status(500).json({ success: false, error: "Error adding job posting" });
    }
  } else if (req.method === 'GET') {
    // Return existing job postings
    try {
      const jobPostings = await prisma.jobPosting.findMany();
      res.status(200).json({ success: true, jobPostings });
    } catch (error) {
      console.error("Error fetching job postings:", error);
      res.status(500).json({ success: false, error: "Error fetching job postings" });
    }
  } else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
}
