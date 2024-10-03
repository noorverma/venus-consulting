// Used perplexity AI for reference
'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminNavbar from '../components/AdminNavbar';
import { fetchAppointments, updateAppointmentStatus } from '@/actions/appointments';

const AdminDashboard = () => {
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);

  // Fetch appointments when the page loads
  useEffect(() => {
    async function loadAppointments() {
      const response = await fetchAppointments();
      if (response.success) {
        setAppointments(response.appointments);
      } else {
        console.error('Failed to fetch appointments');
      }
    }
    loadAppointments();
  }, []);

  // Handle approve/deny actions locally
  const handleAction = (id, action) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === id ? { ...appointment, status: action } : appointment
      )
    );
  };

  // Handle submit to update server and navigate to history
  const handleSubmit = async () => {
    const updatePromises = appointments.map(async (appointment) => {
      if (appointment.status === 'Approved' || appointment.status === 'Denied') {
        await updateAppointmentStatus(appointment.id, appointment.status);
        return null; // Return null for approved or denied appointments
      }
      return appointment; // Return other appointments unchanged
    });

    const results = await Promise.all(updatePromises);
    // Filter out null results (those that were approved or denied)
    const filteredAppointments = results.filter(appointment => appointment !== null);
    setAppointments(filteredAppointments); // Update state with remaining appointments

    router.push('/history'); // Navigate to the history page
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <AdminNavbar />
      <div style={mainContentStyle}>
        <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Admin Dashboard - Appointments</h1>

        <table style={tableStyle}>
          <thead>
            <tr style={{ backgroundColor: '#f9f9f9' }}>
              <th style={tableHeaderStyle}>ID</th>
              <th style={tableHeaderStyle}>Email</th>
              <th style={tableHeaderStyle}>Date</th>
              <th style={tableHeaderStyle}>Reason for Visit</th>
              <th style={tableHeaderStyle}>Status</th>
              <th style={tableHeaderStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td style={tableCellStyle}>{appointment.id}</td>
                <td style={tableCellStyle}>{appointment.email}</td>
                <td style={tableCellStyle}>{new Date(appointment.date).toLocaleDateString()}</td>
                <td style={tableCellStyle}>{appointment.reason}</td>
                <td style={tableCellStyle}>{appointment.status}</td>
                <td style={tableCellStyle}>
                  <button
                    style={approveButtonStyle}
                    onClick={() => handleAction(appointment.id, 'Approved')}
                  >
                    Approve
                  </button>
                  <button
                    style={denyButtonStyle}
                    onClick={() => handleAction(appointment.id, 'Denied')}
                  >
                    Deny
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ textAlign: 'center', margin: '20px' }}>
          <button style={submitButtonStyle} onClick={handleSubmit}>Submit Changes</button>
        </div>
      </div>
    </div>
  );
};

// styling using Tailwind CSS
const mainContentStyle = {
  flexGrow: 1,
  padding: '40px',
  backgroundColor: '#f5f5f5',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
};

const tableHeaderStyle = {
  padding: '12px',
  border: '1px solid #ddd',
  backgroundColor: '#FB923C',
  textAlign: 'center',
  color: '#fff',
  fontWeight: 'bold',
};

const tableCellStyle = {
  padding: '12px',
  border: '1px solid #ddd',
  textAlign: 'center',
};

// styling for approve button
const approveButtonStyle = {
  padding: '8px 12px',
  backgroundColor: 'green',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginRight: '10px',
};

// styling for deny button
const denyButtonStyle = {
  padding: '8px 12px',
  backgroundColor: 'red',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

// styling for submit button
const submitButtonStyle = {
  padding: '15px 30px',
  backgroundColor: '#FB923C',
  color: '#fff',
  fontSize: '16px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default AdminDashboard;