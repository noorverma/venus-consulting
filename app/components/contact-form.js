'use client';
import { useState } from "react";
// To build this feature I took help from a youtube video (https://youtu.be/T2xaiw7VK4A?si=1UJMRpckxfuVorNY) 
const ContactForm = () => {
  const [formData, setFormData] = useState({
    fname: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/mail", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("Email sent successfully!");
        
        setFormData({ fname: "", email: "", message: "" });
      } else {
        setStatus(`Failed to send email: ${data.message}`);
      }
    } catch (error) {
      console.error(error);
      setStatus("Failed to send email. Please try again later.");
    }
  };

  return (
    <div
      className="relative flex h-screen bg-cover bg-center align-center justify-center m-auto"
      style={{
        backgroundImage: "url('/contactus.jpg')",          
      }}
    >
      <div className="absolute inset-0 bg-gray-900 opacity-60"></div>

      <form
        className="relative bg-white bg-opacity-90 justify-center m-auto border-2 rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="justify-center text-center text-4xl font-bold">Get in Contact!</div>
        <div className="m-3 mt-10 ml-4">
          <label>Full Name:</label>
          <input
            type="text"
            id="name"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            className="relative border-2 border-black h-6 right-0 ml-2 w-2/3"
          />
        </div>
        <div className="m-4 ml-4">
          <label>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border-2 border-black h-6 ml-10 w-2/3"
            required
          />
        </div>
        <div className="m-3">
          <label>Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="border-2 border-black ml-4 w-auto"
          />
        </div>
        <div className="flex justify-center mt-6">
          <button
            className="block w-full rounded bg-gray-900 px-12 py-3 text-lg font-medium text-orange-500 shadow-lg hover:bg-orange-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
            type="submit"
          >
            Submit
          </button>
        </div>
        {status && <p className="text-center mt-4">{status}</p>}
      </form>
    </div>
  );
};

export default ContactForm;
                                            