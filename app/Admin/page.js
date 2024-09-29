"use client"; // it will enable the client side rendering
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminNavbar from '../components/AdminNavbar';

const AdminDashboard = () => {
  const router = useRouter(); // It will navigate to the history page

// This is just a dummy data
  const [appointments, setAppointments] = useState([
    { id: 1, email: 'john@example.com', date: '2024-09-15', reason: 'Consultation for electrical issues', status: 'Pending' },
    { id: 2, email: 'jane@example.com', date: '2024-09-16', reason: 'Request for project estimation', status: 'Pending' },
    { id: 3, email: 'alice@example.com', date: '2024-09-17', reason: 'Installation inquiry', status: 'Pending' },
  ]);

// used to handle approve/ deny by admin
  const handleAction = (id, action) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === id ? { ...appointment, status: action } : appointment
      )
    );
  };

  const handleSubmit = () => {
    router.push('/history'); // Navigate to history page
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar Navigation */}
      <AdminNavbar />

      {/* Main Content */}
      <div style={mainContentStyle}>
        <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Admin Dashboard - Appointments</h1>

        {/* Appointments Table */}
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
                <td style={tableCellStyle}>{appointment.date}</td>
                <td style={tableCellStyle}>{appointment.reason}</td>
                <td style={tableCellStyle}>{appointment.status}</td>
                <td style={tableCellStyle}>
                  <button style={approveButtonStyle} onClick={() => handleAction(appointment.id, 'Approved')}>Approve</button>
                  <button style={denyButtonStyle} onClick={() => handleAction(appointment.id, 'Denied')}>Deny</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Submit Button */}
        <div style={{ textAlign: 'center', margin: '20px' }}>
          <button style={submitButtonStyle} onClick={handleSubmit}>Submit Changes</button>
        </div>
      </div>
    </div>
  );
};

// Styles
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

const approveButtonStyle = {
  padding: '8px 12px',
  backgroundColor: 'green',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginRight: '10px',
};

const denyButtonStyle = {
  padding: '8px 12px',
  backgroundColor: 'red',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

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
