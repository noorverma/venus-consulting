"use client";
import React from 'react';
import Navbar from '../components/navbar'; // Importing the Navbar component
import Link from 'next/link'; // Import Next.js Link component for client-side navigation

export default function About() {
  return (
    <>
      {/* Navbar at the top */}
      <Navbar />
      {/*Main Container with global font*/}
      <div style={{ fontFamily: 'Arial, sans-serif' }}>
        {/* Full-Width Horizontal Image Section with Overlay */}
        <div style={{ position: 'relative', 
          width: '100%', 
          height: 'auto', 
          textAlign: 'center', 
          marginBottom: '20px' }}>
          {/* Background Image */}
          <img src="/About.jpg" alt="About Page" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />

          {/* Grey Overlay */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(105, 105, 105, 0.7)' }}></div>

          {/* Text on top of the image */}
          <h2 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#fff', fontSize: '3rem', fontWeight: 'bold' }}>
            About Us
          </h2>
        </div>

        {/* Written text below the image */}
        <div style={{ textAlign: 'center', padding: '40px 10%', backgroundColor: '#f9f9f9' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '20px' }}>We Excel in Power Design</h2>
          {/*About Company Expertise*/}
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#555', textAlign: 'justify' }}>
            At VENUS Electrical Consulting, we excel in power design, delivering tailored and comprehensive solutions to meet the specific demands of your project. Our expertise spans from initial concept design through to final implementation, ensuring that each project is optimized for efficiency, safety, and reliability. Whether you require assistance with power distribution, load analysis, or renewable energy integration, our team of experienced engineers is equipped with the knowledge and tools to provide innovative and cost-effective solutions. We focus on understanding the unique challenges of your project, ensuring compliance with industry standards while pushing the boundaries of technology to create sustainable, scalable power systems. By partnering with us, you can expect a seamless and collaborative process that results in a well-executed, reliable power design.
          </p>
        </div>

        {/* Values Section */}
        <div style={{ padding: '60px 10%', backgroundColor: '#fff', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '40px' }}>Values Driving Culture</h2>
          
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '40px' }}>
            {/* First Value */}
            <div style={{ width: '22%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '40px' }}>
              <img src="/First.png" alt="Serving Others" style={{ width: '100px', marginBottom: '20px' }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Serving Others</h3>
              <p style={{ fontSize: '1rem', color: '#555', textAlign: 'center' }}>
                As a people-first organization, VENUS is committed to the service of our customers and team members through honesty, integrity, and respect.
              </p>
            </div>

            {/* Second Value */}
            <div style={{ width: '22%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '40px' }}>
              <img src="/Second.png" alt="Improving Continually" style={{ width: '100px', marginBottom: '20px' }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Improving Continually</h3>
              <p style={{ fontSize: '1rem', color: '#555', textAlign: 'center' }}>
                At the core of VENUS are driven professionals committed to continual development and improving industry standards.
              </p>
            </div>

            {/* Third Value */}
            <div style={{ width: '22%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '40px' }}>
              <img src="/Third.png" alt="Enriching Environment" style={{ width: '100px', marginBottom: '20px' }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Enriching Environment</h3>
              <p style={{ fontSize: '1rem', color: '#555', textAlign: 'center' }}>
                We provide a dynamic and enriching work environment, fostering innovation and encouraging feedback and recognition.
              </p>
            </div>

            {/* Fourth Value */}
            <div style={{ width: '22%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '40px' }}>
              <img src="/Fourth.png" alt="Quality Results" style={{ width: '100px', marginBottom: '20px' }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Quality Results</h3>
              <p style={{ fontSize: '1rem', color: '#555', textAlign: 'center' }}>
                VENUS is dedicated to delivering quality results for our clients and ensuring that every first-time client becomes a long-term partner.
              </p>
            </div>
          </div>
        </div>

        {/* Add "Want to Join Our Team?" section below the Values */}
        <div style={{ padding: '40px 10%', backgroundColor: '#f9f9f9', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '20px' }}>Want to Join Our Team?</h2>
          <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '30px' }}>
            We have exciting opportunities for talented individuals. Explore the roles we offer and become part of our amazing team.
          </p>
          <Link href="/positions">  {/* Use Link from Next.js to ensure proper routing */}
            <button style={{ backgroundColor: '#FB923C', color: 'white', padding: '15px 30px', fontSize: '18px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Open Positions
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
