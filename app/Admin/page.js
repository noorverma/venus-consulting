// Used perplexity AI for reference but I wrote the code myself
"use client";

import React, { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { fetchAppointments, updateAppointmentStatus } from "@/actions/appointments";
import { useUserAuth } from "../Lib/auth-context"; // Import authentication context
import { useRouter } from "next/navigation"; // Import Next.js router
import { doc, getDoc } from "firebase/firestore"; // Import Firestore methods
import { db } from "../Lib/firebase"; // Firestore instance

const AdminDashboard = () => {
  const { user, authLoading } = useUserAuth(); // Access user and loading state from authentication context
  const router = useRouter(); // Initialize router for navigation
  const [appointments, setAppointments] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false); // State to track admin authorization

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

  // Fetch appointments when the user is authorized
  useEffect(() => {
    if (isAuthorized) {
      const loadAppointments = async () => {
        const response = await fetchAppointments();
        if (response.success) {
          setAppointments(response.appointments);
        } else {
          console.error("Failed to fetch appointments");
        }
      };

      loadAppointments();
    }
  }, [isAuthorized]);

  const handleAction = (appointment, action) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((app) =>
        app.id === appointment.id ? { ...app, status: action } : app
      )
    );
  };

  const handleSubmit = async () => {
    const updatePromises = appointments.map(async (appointment) => {
      if (appointment.status === "Approved" || appointment.status === "Denied") {
        await updateAppointmentStatus(appointment.id, appointment.status);
      }
    });

    await Promise.all(updatePromises);
  };

  // Show loading message if authentication or authorization is being checked
  if (authLoading || (!user && !isAuthorized)) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen">
      <AdminNavbar />
      <div className="flex-1 ml-[220px] p-6 bg-gray-100">
        <h1 className="text-3xl font-bold text-orange-500 mb-6 text-center">
          Admin Dashboard - Appointments
        </h1>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-orange-500 text-white">
                  <th className="px-4 py-2 border border-gray-300">ID</th>
                  <th className="px-4 py-2 border border-gray-300">Email</th>
                  <th className="px-4 py-2 border border-gray-300">Date</th>
                  <th className="px-4 py-2 border border-gray-300">
                    Reason for Visit
                  </th>
                  <th className="px-4 py-2 border border-gray-300">Status</th>
                  <th className="px-4 py-2 border border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td className="px-4 py-2 border border-gray-300">
                      {appointment.id}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {appointment.email}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {new Date(appointment.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {appointment.reason}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      {appointment.status}
                    </td>
                    <td className="px-4 py-2 border border-gray-300">
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                        onClick={() => handleAction(appointment, "Approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => handleAction(appointment, "Denied")}
                      >
                        Deny
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;