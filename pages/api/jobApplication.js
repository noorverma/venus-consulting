// pages/api/jobApplication.js
import formidable from "formidable";
import { db } from "@/app/Lib/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getDocs } from "firebase/firestore";
import fs from "fs";

const storage = getStorage();

export const config = {
  api: {
    bodyParser: false,
  },
};

const parseForm = async (req) => {
  const form = formidable({
    keepExtensions: true,
    maxFileSize: 50 * 1024 * 1024,
    uploadDir: "C:\\Windows\\Temp", // Adjust the path if needed
    multiples: true,
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error("Formidable parse error:", err);
        reject(err);
      }
      if (!files || !files.resume) {
        console.error("Formidable did not receive a file:", files);
        reject(new Error("No file uploaded"));
      }
      resolve({ fields, files });
    });
  });
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const jobApplicationsSnapshot = await getDocs(collection(db, "jobApplications"));
      const jobApplications = jobApplicationsSnapshot.docs.map((doc) => ({
        id: doc.id, // Include the document ID
        ...doc.data(),
      }));
      res.status(200).json({ success: true, applications: jobApplications });
    } catch (error) {
      console.error("Error fetching job applications:", error);
      res.status(500).json({ success: false, error: "Failed to fetch applications" });
    }
  } else if (req.method === 'POST') {
    try {
      const { fields, files } = await parseForm(req);

      if (!fields.name || !fields.email || !fields.jobPostingId || !files.resume) {
        console.error("Missing fields or file:", { fields, files });
        return res.status(400).json({ success: false, error: "Required fields are missing" });
      }

      const resumeFile = files.resume[0]; // Access the first file if multiples were received
      const storageRef = ref(storage, `resumes/${Date.now()}_${resumeFile.originalFilename}`);
      const fileData = await fs.promises.readFile(resumeFile.filepath);
      await uploadBytes(storageRef, fileData);
      const resumeURL = await getDownloadURL(storageRef);

      const applicationData = {
        name: fields.name,
        email: fields.email,
        jobPostingId: fields.jobPostingId,
        resumeURL,
        timestamp: new Date(),
      };

      await addDoc(collection(db, "jobApplications"), applicationData);

      res.status(200).json({ success: true, message: "Application submitted successfully" });
    } catch (error) {
      console.error("Error creating job application:", error);
      res.status(500).json({ success: false, error: "Failed to create job application" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}