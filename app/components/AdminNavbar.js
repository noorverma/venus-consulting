// Most of the code I wrote myself but I asked Perplexity AI what to do

'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '../Lib/firebase';

const AdminNavbar = () => {
  const router = useRouter();

  // handleLogout function is responsible for logging the user out
  // It calls the Firebase signOut method to log the user out of the current session.
  const handleLogout = async () => {
    try {
      // signOut from Firebase authentication
      await signOut(auth);

      // After successful sign out, navigate the user to the SignIn page
      router.push('/SignIn');
    } catch (error) {
      // If there's an error during sign out, log it to the console
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav style={navbarStyle}>
      {/* Sidebar Header */}
      <div style={sidebarHeaderStyle}>Admin Dashboard</div>

      {/* Navigation Links */}
      <div style={linkStyle} onClick={() => router.push('/Admin')}>
        Appointments
      </div>
      <div style={linkStyle} onClick={() => router.push('/history')}>
        History
      </div>
      <div style={linkStyle} onClick={() => router.push('/messages')}>
        Messages
      </div>
      <div style={linkStyle} onClick={() => router.push('/adminJobPostings')}>
        Postings
      </div>
      <div style={linkStyle} onClick={() => router.push('/adminJobApplicants')}>
        Applicants
      </div>
      <div style={linkStyle} onClick={() => router.push('/adminProducts')}>
        Products
      </div>
      <div style={linkStyle} onClick={() => router.push('/reports')}>
        Reports
      </div>

      {/* Logout Button */}
      <div style={logoutStyle} onClick={handleLogout}>
        Log out
      </div>
    </nav>
  );
};

// Styling for the navbar container (fixed sidebar)
const navbarStyle = {
  width: '220px', // Fixed width for the sidebar
  height: '100vh', // Full height of the viewport
  position: 'fixed', // Fix the sidebar to the left of the viewport
  top: 0, // Align the sidebar to the top
  left: 0, // Align the sidebar to the left
  backgroundColor: '#FB923C', // Sidebar background color
  color: '#fff', // Text color
  display: 'flex', // Flexbox layout for easy vertical alignment
  flexDirection: 'column', // Stack items vertically
  padding: '20px', // Add padding for spacing
  boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)', // Add a subtle shadow for depth
  zIndex: 1000, // Ensure the sidebar is above other elements
};

// Styling for the sidebar header
const sidebarHeaderStyle = {
  fontSize: '1.5rem', // Larger font size
  fontWeight: 'bold', // Bold text
  marginBottom: '30px', // Add space below the header
  textAlign: 'center', // Center-align the text
};

// Styling for the navigation links
const linkStyle = {
  fontSize: '1.2rem', // Font size for links
  margin: '10px 0', // Add spacing between links
  cursor: 'pointer', // Change cursor to pointer on hover
  padding: '10px', // Add padding for a clickable area
  textAlign: 'center', // Center-align the text
  backgroundColor: '#FFA94D', // Background color for links
  borderRadius: '5px', // Rounded corners
  transition: 'background-color 0.3s ease', // Smooth hover effect
};

// Styling for the logout button, positioned at the bottom
const logoutStyle = {
  fontSize: '1.2rem', // Font size for the logout button
  marginTop: 'auto', // Push the logout button to the bottom of the sidebar
  cursor: 'pointer', // Change cursor to pointer on hover
  padding: '10px', // Add padding for a clickable area
  textAlign: 'center', // Center-align the text
  backgroundColor: 'white', // Background color
  borderRadius: '5px', // Rounded corners
  transition: 'background-color 0.3s ease', // Smooth hover effect
  color: 'orange', // Text color
};

export default AdminNavbar;