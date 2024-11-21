// Used Perplexity AI for reference
"use client";
import React, { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { fetchAppointments } from "@/actions/appointments";

const HistoryPage = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function loadHistory() {
      const response = await fetchAppointments();
      if (response.success) {
        setAppointments(
          response.appointments.filter(
            (appointment) => appointment.status !== "Pending"
          )
        );
      }
    }
    loadHistory();
  }, []);

  return (
    <div className="flex min-h-screen">
      <AdminNavbar />
      <div className="flex-1 ml-[220px] p-6 bg-gray-100">
        <h1 className="text-3xl font-bold text-orange-500 mb-6 text-center">
          Appointments History
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
                </tr>
              </thead>
              <tbody>
                {appointments.length > 0 ? (
                  appointments.map((appointment) => (
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
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-4 text-gray-500"
                    >
                      No appointments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;