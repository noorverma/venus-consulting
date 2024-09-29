import React from 'react';
import { useRouter } from 'next/navigation';

const AdminNavbar = () => {
  const router = useRouter();

  return (
    <nav style={navbarStyle}>
      <div style={sidebarHeaderStyle}>Admin Dashboard</div>
      <div style={linkStyle} onClick={() => router.push('/admin')}>Appointments</div>{/*Tab for the admin*/}
      <div style={linkStyle} onClick={() => router.push('/history')}>History</div> {/*Tab for the admin*/}
    </nav>
  );
};
//Some CSS changes in AdminNavbar
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

export default AdminNavbar;
