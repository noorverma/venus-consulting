// app/history/page.js

"use client"; // Enable client-side rendering
import React, { useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';

const HistoryPage = () => {
  // Sample data for appointment history
  const [appointments] = useState([
    { id: 1, email: 'john@example.com', date: '2024-09-15', reason: 'Consultation for electrical issues', status: 'Approved' },
    { id: 2, email: 'jane@example.com', date: '2024-09-16', reason: 'Request for project estimation', status: 'Denied' },
    { id: 3, email: 'alice@example.com', date: '2024-09-17', reason: 'Installation inquiry', status: 'Approved' },
  ]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar Navigation */}
      <AdminNavbar />

      {/* Main Content */}
      <div style={mainContentStyle}>
        <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Appointments History</h1>

        {/* Appointments Table */}
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
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td style={tableCellStyle}>{appointment.id}</td>
                <td style={tableCellStyle}>{appointment.email}</td>
                <td style={tableCellStyle}>{appointment.date}</td>
                <td style={tableCellStyle}>{appointment.reason}</td>
                <td style={tableCellStyle}>{appointment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Styles
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
  backgroundColor: '#FB923C', // Orange color
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
