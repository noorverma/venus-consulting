//used perplexity AI and chatGPT for reference
//Appointments page.js
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/navbar';
import { createAppointment } from '@/actions/appointments';

export default function Appointment() {
  const router = useRouter();
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
    const formData = { name, email, phone, reason, date, time, userId: 'USER_ID_HERE' };
    try {
      const result = await createAppointment(formData);
      if (result.success) {
        setMessage('Appointment booked successfully!');
        setName(''); setEmail(''); setPhone(''); setReason(''); setDate(''); setTime('');
      } else {
        setMessage('Failed to book appointment. Please try again.');
      }
    } catch (error) {
      setMessage('An unexpected error occurred. Please try again.');
    }
  };

  const handleLearnMore = (productId) => {
    router.push(`/products/${productId}`);
  };

  return (
    <>
      <Navbar />
      <div style={{ fontFamily: 'Poppins, Arial, sans-serif' }}>
        <div style={{ position: 'relative', width: '100%', textAlign: 'center', marginBottom: '20px' }}>
          <img src="/Consulting.png" alt="Appointment Page" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(105, 105, 105, 0.7)' }}></div>
          <h2 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#fff', fontSize: '3rem', fontWeight: 'bold' }}>
            Book an Appointment
          </h2>
        </div>

        <h2 style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '2rem', margin: '20px 0 0 20%' }}>Fill in your details</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 10%', alignItems: 'flex-start', marginTop: '20px' }}>
          <div style={{ width: '60%', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)', backgroundColor: '#fff' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
              <label>Reason for Visit</label>
              <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason for visit" style={inputStyle} required />
              <label>Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" style={inputStyle} required />
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" style={inputStyle} required />
              <label>Phone Number</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="000-000-0000" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" title="Phone number should be in the format: 123-456-7890" style={inputStyle} required />
              <label>Select Appointment Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={inputStyle} required />
              <label>Select Time</label>
              <p style={{ color: '#555', fontSize: '14px', marginBottom: '10px' }}>*You can only book from the available times below*:</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                {timeSlots.map((slot, index) => (
                  <button key={index} type="button" style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer', backgroundColor: time === slot ? '#FB923C' : '#f0f0f0', color: time === slot ? '#fff' : '#000' }} onClick={() => setTime(slot)}>
                    {slot}
                  </button>
                ))}
              </div>
              <button type="submit" style={submitButtonStyle}>Book Now</button>
            </form>
            {message && <p style={{ color: message.includes('Failed') || message.includes('error') ? 'red' : 'green', fontSize: '1.5rem', textAlign: 'center', marginTop: '20px' }}>{message}</p>}
          </div>

          <div style={{ width: '35%' }}>
            <h2 className="text-2xl font-bold mb-4">Explore Our Equipment</h2>
            <div className="flex overflow-x-scroll space-x-6 pb-6">
              {/* Product 1 */}
              <div className="w-64 bg-white rounded-lg shadow-lg p-4 flex-shrink-0 flex flex-col justify-between">
                <img src="/voltagetester.png" alt="Voltage Tester" className="w-full h-30 object-cover rounded-t-lg" />
                <div>
                  <h3 className="text-lg font-semibold mt-4">Voltage Tester</h3>
                  <p className="text-gray-600 mt-2">High-quality voltage tester for safe electrical inspections.</p>
                  <p className="font-bold mt-2">$25.99</p>
                </div>
                <button onClick={() => handleLearnMore('a9wktPgH3Nw5Whp0yJB0')} className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                  Learn More
                </button>
              </div>

              {/* Product 2 */}
              <div className="w-64 bg-white rounded-lg shadow-lg p-4 flex-shrink-0 flex flex-col justify-between">
                <img src="/insulatedgloves.jpeg" alt="Insulated Gloves" className="w-full h-30 object-cover rounded-t-lg" />
                <div>
                  <h3 className="text-lg font-semibold mt-4">Insulated Gloves</h3>
                  <p className="text-gray-600 mt-2">Electrical safety gloves with high insulation protection.</p>
                  <p className="font-bold mt-2">$15.50</p>
                </div>
                <button onClick={() => handleLearnMore('insulatedGloves')} className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                  Learn More
                </button>
              </div>

              {/* Product 3 */}
              <div className="w-64 bg-white rounded-lg shadow-lg p-4 flex-shrink-0 flex flex-col justify-between">
                <img src="/circuitbreakerfinder.png" alt="Circuit Breaker Finder" className="w-full h-30 object-cover rounded-t-lg" />
                <div>
                  <h3 className="text-lg font-semibold mt-4">Circuit Breaker Finder</h3>
                  <p className="text-gray-600 mt-2">Accurate circuit breaker finder for quick electrical testing.</p>
                  <p className="font-bold mt-2">$40.00</p>
                </div>
                <button onClick={() => handleLearnMore('circuitBreakerFinder')} className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                  Learn More
                </button>
              </div>
            </div>

            <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)', marginTop: '10px', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>VENUS Electrical Consulting</h2>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>Headquarters</h3>
              <p>2308 Centre a St NE#107</p>
              <p>Calgary, AB</p>
              <p>T2E 2T7</p>
              <p><strong>Phone:</strong> <span style={{ color: 'orange' }}>(403) 603-0639</span></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Common styles for input fields
const inputStyle = {
  padding: '10px',
  marginBottom: '20px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

// Common style for submit button
const submitButtonStyle = {
  padding: '15px',
  backgroundColor: '#FB923C',
  color: '#fff',
  fontSize: '16px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};