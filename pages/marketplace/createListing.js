import { useState } from 'react';
import { useRouter } from 'next/router';

export default function CreateListing() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageBase64, setImageBase64] = useState(null);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageBase64(reader.result); // Set Base64 image string
    };
    reader.readAsDataURL(file); // Convert image to Base64
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const formData = {
      title,
      description,
      price: parseFloat(price),
      imageUrl: imageBase64,
      userId: 'cm3mamgmo0000107c0nx8iton', // Replace with the actual user ID
    };

    try {
      const response = await fetch('/api/marketplace/createListing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setMessage('Listing created successfully!');
        router.push('/marketplace');
      } else {
        setMessage(`Failed to create listing: ${result.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setMessage('An error occurred while creating the listing. Please try again.');
    }
  };

  return (
    <div style={containerStyle}>
      {/* Navbar */}
      <nav style={navbarStyle}>
        <h2>Create Your Own Listing</h2>
      </nav>

      {/* Form Container */}
      <div style={formContainerStyle}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Listing</h1>
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={inputStyle} />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Description:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required style={{ ...inputStyle, height: '80px' }} />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Price:</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required style={inputStyle} />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Image:</label>
            <input type="file" onChange={handleImageChange} required style={inputStyle} />
          </div>
          <button type="submit" style={submitButtonStyle}>Create Listing</button>
        </form>
        {message && <p style={messageStyle}>{message}</p>}
      </div>
    </div>
  );
}

// Styling for different elements
const containerStyle = {
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#f8f8f8',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const navbarStyle = {
  width: '100%',
  backgroundColor: '#FB923C',
  padding: '20px',
  color: '#fff',
  textAlign: 'center',
  fontSize: '1.5rem',
};

const formContainerStyle = {
  width: '100%',
  maxWidth: '500px',
  marginTop: '20px',
  backgroundColor: '#fff',
  padding: '30px',
  borderRadius: '10px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const inputGroupStyle = {
  marginBottom: '15px',
};

const labelStyle = {
  fontWeight: 'bold',
  marginBottom: '5px',
  display: 'block',
  color: '#333',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const submitButtonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#FB923C',
  color: '#fff',
  fontSize: '16px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '20px',
};

const messageStyle = {
  color: 'green',
  fontSize: '1.1rem',
  textAlign: 'center',
  marginTop: '20px',
};

