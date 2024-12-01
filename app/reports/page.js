"use client";

import { useEffect, useState } from "react"; // Import hooks
import Analytics from "../components/analytics";
import AdminNavbar from "../components/AdminNavbar"; // Import AdminNavbar component
import { useUserAuth } from "../Lib/auth-context"; // Import authentication context
import { useRouter } from "next/navigation"; // Import Next.js router
import { doc, getDoc } from "firebase/firestore"; // Import Firestore methods
import { db } from "../Lib/firebase"; // Import Firestore instance

const ReportPage = () => {
  const { user, authLoading } = useUserAuth(); // Access user and loading state from authentication context
  const router = useRouter(); // Initialize router for navigation
  const [isAuthorized, setIsAuthorized] = useState(false); // State to track admin authorization

  // Check user role and authorization
  useEffect(() => {
    const checkAuthorization = async () => {
      if (!authLoading && user) {
        try {
          const userDocRef = doc(db, "users", user.uid); // Reference to the user's document in Firestore
          const userDoc = await getDoc(userDocRef);

          // Check if the user has the "admin" role
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

  // Show loading message if authentication or authorization is being checked
  if (authLoading || (!user && !isAuthorized)) {
    return <div>Loading...</div>;
  }

  // Main content for authorized users
  return (
    <div className="flex min-h-screen">
      <AdminNavbar /> {/* Fixed Sidebar */}
      {/* Main Content */}
      <div className="flex-1 ml-[220px] p-6 bg-gray-100">
        <h1 className="text-3xl font-bold text-orange-500 mb-6 text-center">
          Reports and Analytics
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Analytics />
        </div>
      </div>
    </div>
  );
};

export default ReportPage;