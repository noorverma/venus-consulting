//Most of the code I wrote myself but I asked Perplexity AI what to do
'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth'; 
import { auth } from '../Lib/firebase'; 

const AdminNavbar = () => {
  const router = useRouter();
  // Perplexity AI told me to call on Firebase in built signOut function
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
      <div style={sidebarHeaderStyle}>Admin Dashboard</div>

      <div style={linkStyle} onClick={() => router.push('/Admin')}>Appointments</div>
      <div style={linkStyle} onClick={() => router.push('/history')}>History</div>
      <div style={linkStyle} onClick={() => router.push('/messages')}>Messages</div> {/* Added a messages link here which will navigate the user to the messages page*/}
      <div style={linkStyle} onClick={() => router.push('/adminJobPostings')}>Postings</div>
      <div style={linkStyle} onClick={() => router.push('/adminJobApplicants')}>Applicants</div>
      <div style={linkStyle} onClick={() => router.push('/adminProducts')}>Products</div>
      <div style={linkStyle} onClick={() => router.push('/reports')}>Reports</div>
      <div style={logoutStyle} onClick={handleLogout}>Log out</div>
    </nav>
  );
};

// Navbar styling
const navbarStyle = {
  width: '220px',
  height: '100vh',
  backgroundColor: '#FB923C',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
};

const sidebarHeaderStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: '30px',
  textAlign: 'center',
};

// Link styling for navigation tabs
const linkStyle = {
  fontSize: '1.2rem',
  margin: '10px 0',
  cursor: 'pointer',
  padding: '10px',
  textAlign: 'center',
  backgroundColor: '#FFA94D',
  borderRadius: '5px',
  transition: 'background-color 0.3s ease',
};

// Logout button styling, placed at the bottom of the sidebar
const logoutStyle = {
  fontSize: '1.2rem',
  marginTop: 'auto',
  cursor: 'pointer',
  padding: '10px',
  textAlign: 'center',
  backgroundColor: 'white', 
  borderRadius: '5px',
  transition: 'background-color 0.3s ease',
  color: 'orange',
};

export default AdminNavbar;