import React from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth'; 
import { auth } from '../Lib/firebase'; 

const AdminNavbar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth); 
      router.push('/SignIn'); 
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav style={navbarStyle}>
      <div style={sidebarHeaderStyle}>Admin Dashboard</div>
      <div style={linkStyle} onClick={() => router.push('/Admin')}>Appointments</div>
      <div style={linkStyle} onClick={() => router.push('/history')}>History</div>
      <div style={linkStyle} onClick={() => router.push('/messages')}>Messages</div> {/* Added a messages link here which will navigate the user to the messages page*/}
      <div style={logoutStyle} onClick={handleLogout}>Log out</div>
    </nav>
  );
};

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