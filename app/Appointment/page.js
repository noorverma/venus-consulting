"use client";
import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { createAppointment } from '@/actions/appointments';

export default function Appointment() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');

  const timeSlots = ['9:45 AM', '10:45 AM', '12:00 PM', '4:00 PM', '5:00 PM'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const formData = {
      name,
      email,
      phone,
      reason,
      date,
      time,
      userId: 'USER_ID_HERE',  // Replace with the actual user ID logic if applicable
    };

    try {
      const result = await createAppointment(formData);
      if (result.success) {
        setMessage('Appointment booked successfully!');
        // Reset form fields
        setName('');
        setEmail('');
        setPhone('');
        setReason('');
        setDate('');
        setTime('');
      } else {
        setMessage('Failed to book appointment. Please try again.');
      }
    } catch (error) {
      setMessage('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ fontFamily: 'Arial, sans-serif' }}>
        <div style={{ position: 'relative', width: '100%', textAlign: 'center', marginBottom: '20px' }}>
          <img
            src="/Consulting.png"
            alt="Appointment Page"
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(105, 105, 105, 0.7)', 
          }}></div>

          <h2 style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#fff',
            fontSize: '3rem',
            fontWeight: 'bold',
          }}>
            Book an Appointment
          </h2>
        </div>

        <h2 style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '2rem', margin: '20px 0 0 20%' }}>
          Fill in your details
        </h2>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 10%',
          alignItems: 'flex-start',
          marginTop: '20px',
        }}>
          <div style={{
            width: '60%',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
            backgroundColor: '#fff',
          }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
              <label>Reason for Visit</label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Reason for visit"
                style={inputStyle}
                required
              />

              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                style={inputStyle}
                required
              />

              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={inputStyle}
                required
              />

              <label>Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="123-456-7890"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                title="Phone number should be in the format: 123-456-7890"
                style={inputStyle}
                required
              />

              <label>Select Appointment Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={inputStyle}
                required
              />

              <label>Select Time</label>
              <p style={{ color: '#555', fontSize: '14px', marginBottom: '10px' }}>
                *You can only book from the available times below*:
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                {timeSlots.map((slot, index) => (
                  <button
                    key={index}
                    type="button"
                    style={{
                      padding: '10px 20px',
                      borderRadius: '5px',
                      border: 'none',
                      cursor: 'pointer',
                      backgroundColor: time === slot ? '#FB923C' : '#f0f0f0', 
                      color: time === slot ? '#fff' : '#000',
                    }}
                    onClick={() => setTime(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>

              <button type="submit" style={submitButtonStyle}>
                Book Now
              </button>
            </form>
            {message && <p>{message}</p>}
          </div>

          <div style={{
            width: '35%',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
            marginTop: '80px',
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>VENUS Electrical Consulting</h2>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>Headquarters</h3>
            <p>2308 Centre a St NE#107</p>
            <p>Calgary, AB</p>
            <p>T2E 2T7</p>
            <p><strong>Phone:</strong> <span style={{ color: 'orange' }}>(403) 603-0639</span></p>
          </div>
        </div>
      </div>
    </>
  );
}

const inputStyle = {
  padding: '10px',
  marginBottom: '20px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const submitButtonStyle = {
  padding: '15px',
  backgroundColor: '#FB923C', 
  color: '#fff',
  fontSize: '16px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};
