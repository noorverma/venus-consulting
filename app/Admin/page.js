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
  const handleAction = (appointment, action) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((app) =>
        app.id === appointment.id ? { ...app, status: action } : app
      )
    );

    // Make sure to pass 'appointment.time' here
    sendEmail(appointment.email, appointment.reason, appointment.date, appointment.time, action);
  };

  // Sending the email function which contains async and await
  const sendEmail = async (email, reason, date, time, action) => {
    try {
      const response = await fetch('/api/SendAppointmentEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email, // recipient's email
          reason, // reason for the appointment
          date,  // appointment date
          time,  // appointment time
          status: action, 
        }),
      });

      const data = await response.json();
      if (data.success) {
        console.log('Email sent successfully');
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
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

        {/* Scrollable table container */}
        <div style={tableContainerStyle}>
          <table style={tableStyle}>
            <thead>
              <tr style={{ backgroundColor: '#f9f9f9' }}>
                <th style={tableHeaderStyle}>ID</th>
                <th style={tableHeaderStyle}>Email</th>
                <th style={tableHeaderStyle}>Date</th>
                <th style={tableHeaderStyle}>Reason for Visit</th>
                <th style={tableHeaderStyle}>Status</th>
                <th style={tableHeaderStyle}>Time</th> {/* Add Time Column */}
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
                  <td style={tableCellStyle}>{appointment.time || 'N/A'}</td> {/* Display Time */}
                  <td style={tableCellStyle}>
                    <button
                      style={approveButtonStyle}
                      onClick={() => handleAction(appointment, 'Approved')}
                    >
                      Approve
                    </button>
                    <button
                      style={denyButtonStyle}
                      onClick={() => handleAction(appointment, 'Denied')}
                    >
                      Deny
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ textAlign: 'center', margin: '20px' }}>
          <button style={submitButtonStyle} onClick={handleSubmit}>Submit Changes</button>
        </div>
        
      </div>
    </div>
  );
};

// Styling
const mainContentStyle = {
  flexGrow: 1,
  padding: '40px',
  backgroundColor: '#f5f5f5',
};

const tableContainerStyle = {
  maxHeight: '400px', // Limit table height to 400px and allow scrolling
  overflowY: 'scroll',
  border: '1px solid #ddd',
  marginTop: '20px',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
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
