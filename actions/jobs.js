// actions/jobs.js

import prisma from "@/app/Lib/prisma";

export async function createJobPosting(data) {
  const { title, description, location, salary, requirements } = data;
  try {
    const jobPosting = await prisma.jobPosting.create({
      data: {
        title,
        description,
        location,
        salary,
        requirements,
      },
    });
    return { success: true, jobPosting };
  } catch (error) {
    console.error("Error creating job posting:", error);
    return { success: false, error: error.message };
  }
}

export async function fetchJobPostings() {
  try {
    const jobPostings = await prisma.jobPosting.findMany();
    return { success: true, jobPostings };
  } catch (error) {
    console.error("Error fetching job postings:", error);
    return { success: false, error: error.message };
  }
}

export async function fetchJobApplications() {
  try {
    console.log("Fetching job applications...");
    const jobApplications = await prisma.jobApplication.findMany({
      include: {
        jobPosting: true,
        user: true,
      },
    });
    console.log("Fetched job applications:", jobApplications);
    return { success: true, jobApplications };
  } catch (error) {
    console.error("Error fetching job applications:", error);
    return { success: false, error: error.message };
  }
}

export async function createJobApplication(data) {
  const { name, email, resume, jobPostingId, userId } = data;
  try {
    console.log("Creating job application with data:", data);
    const jobApplication = await prisma.jobApplication.create({
      data: {
        name,
        email,
        resume,
        jobPosting: { connect: { id: jobPostingId } },
        user: userId ? { connect: { id: userId } } : undefined,
      },
    });
    console.log("Created job application:", jobApplication);
    return { success: true, jobApplication };
  } catch (error) {
    console.error("Error creating job application:", error);
    return { success: false, error: error.message };
  }
}