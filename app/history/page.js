// Used perplexity AI for reference
"use client";
import React, { useState, useEffect } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import { fetchAppointments } from '@/actions/appointments';

const HistoryPage = () => {
  const [appointments, setAppointments] = useState([]);

  // Fetch history appointments
  useEffect(() => {
    async function loadHistory() {
      const response = await fetchAppointments();
      console.log('Fetch Response:', response); // Log the response
      if (response.success) {
        // Only show approved or denied appointments
        const filteredAppointments = response.appointments.filter(appointment => appointment.status !== 'Pending');
        console.log('Filtered Appointments:', filteredAppointments); // Log filtered appointments
        setAppointments(filteredAppointments);
      }
    }
    loadHistory();
  }, []);

  // Function to determine the text color based on status
  const getStatusStyle = (status) => {
    return {
      color: status === 'Approved' || status === 'Denied' ? 'black' : 'inherit',
    };
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <AdminNavbar />
      <div style={mainContentStyle}>
        <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Appointments History</h1>

        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>ID</th>
              <th style={tableHeaderStyle}>Email</th>
              <th style={tableHeaderStyle}>Date</th>
              <th style={tableHeaderStyle}>Reason for Visit</th>
              <th style={tableHeaderStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>No appointments found</td>
              </tr>
            ) : (
              appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td style={tableCellStyle}>{appointment.id}</td>
                  <td style={tableCellStyle}>{appointment.email}</td>
                  <td style={tableCellStyle}>{new Date(appointment.date).toLocaleDateString()}</td>
                  <td style={tableCellStyle}>{appointment.reason}</td>
                  <td style={{ ...tableCellStyle, ...getStatusStyle(appointment.status) }}>
                    {appointment.status || 'N/A'} {/* Show N/A if status is undefined */}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// CSS styling using Tailwind CSS
const mainContentStyle = {
  flexGrow: 1,
  padding: '40px',
  backgroundColor: '#f5f5f5',
  overflowY: 'auto',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
  backgroundColor: '#fff',
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

export default HistoryPage;