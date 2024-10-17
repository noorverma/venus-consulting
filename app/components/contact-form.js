'use client';
import { useState, useEffect, useRef } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fname: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);

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

  // Use Intersection Observer to lazy-load the map
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setMapLoaded(true);
        observer.disconnect(); // Stop observing once map is loaded
      }
    });

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div className="relative flex flex-col bg-cover bg-center justify-center m-auto mt-20"
    style={{
      backgroundImage: "url('/contactus.jpg')", 
      backgroundSize: "cover", 
      backgroundPosition: "center", 
      backgroundAttachment: "fixed"
    }}>
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gray-900 opacity-60"></div>

      {/* Contact Form */}
      <form
        className="relative bg-white justify-center m-auto border-2 rounded-lg p-10 mt-20"
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

      {/* Add some space before the map */}
      <div className="mt-52"></div> 

      <div className="bg-white p-10 relative z-10">  
        
        <div className="text-center text-4xl font-bold mb-6 text-black mt-10">Find us</div>
        
        {/* Lazy-loaded Map Section */}
        <div className="relative mt-10 flex justify-center" ref={mapRef}>
          {mapLoaded ? (
            <iframe
            //To integrate the map these are the steps I followed 
            //went to google maps
            //selected location
            //when to the share the location
            //embedded a map and copied the link 
            //pasted the link here 
            //used chatGPT for the styling 
            //prompt: this is the embed link can you make some adjustments in the height and weight of the map 

              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5013.872715685945!2d-114.06466642355747!3d51.07272487171769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53716565dd4035e5%3A0xc07fba08128d0169!2sVenus%20Electrical%20Consulting!5e0!3m2!1sen!2sca!4v1729105604823!5m2!1sen!2sca"
              width="1200"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          ) : (
            <p>Loading map...</p>
          )}
        </div>

        {/* Contact Details Section (Below the Map) */}
        <div className="flex flex-col items-center justify-center mt-10">
          <div className="text-center text-lg mb-4">
            <p><strong>Phone:</strong> +1 (403) 603-0639</p>
            <p><strong>Physical Address:</strong> #107, 2308 Centre St NE, Calgary, AB T2E 2T7</p>
            <p><strong>Opening Hours:</strong> Monday - Friday: 8am - 6pm</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
