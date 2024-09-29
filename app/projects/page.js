"use client";
import React, { useState } from "react";
import ProjectCard from "../components/project-card";
import Navbar from "../components/navbar";
import Image from "next/image";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  // Sample projects data. Replace this with your actual data source.
  const projects = [
    {
      title: "Custom Electrical Grid for Commercial Space",
      shortDescription: "Designed and implemented an electrical grid for a large commercial building.",
      description: "This project involved setting up a highly efficient electrical grid for a multi-story commercial space to ensure safety, efficiency, and scalability. The installation involved numerous safety checks, adherence to commercial regulations, and collaboration with multiple stakeholders. The project ensured long-term reliability and future scalability, making it an ideal solution for the client's needs.",
      imageSrc: "/project1.jpg",
    },
    {
      title: "Residential Solar Panel Installation",
      shortDescription: "Installed solar panels and optimized power usage for a residential building.",
      description: "Solar panel installation, energy optimization, and grid integration for a modern, energy-efficient residential home. The project aimed at reducing the homeowner's electricity bills by at least 40% and contributing to sustainable energy goals. Custom battery storage solutions were integrated for better energy efficiency during non-sunny periods.",
      imageSrc: "/project2.jpg",
    },
    {
      title: "Advanced Office Lighting System",
      shortDescription: "Developed an advanced lighting solution for an office building.",
      description: "Custom lighting design and installation for enhanced productivity and energy efficiency in a corporate office. This project utilized smart IoT solutions to provide programmable lighting schedules and ensured compliance with workplace safety standards while reducing energy consumption by 30%.",
      imageSrc: "/project3.png",
    },
  ];

  // Function to handle the "Learn More" button click
  const openProjectDetails = (project) => {
    setSelectedProject(project);
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <Navbar />
      <main className="bg-gray-100 min-h-screen pt-28 flex">
        {/* Left Side: Projects List */}
        <div className="w-1/2 px-6 sm:px-8 lg:px-10 border-r border-gray-300">
          <h1 className="text-4xl font-bold text-center mb-12">Our Projects</h1>
          <div className="grid grid-cols-1 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} onLearnMore={openProjectDetails} />
            ))}
          </div>
        </div>

        {/* Right Side: Initially Empty */}
        <div className="w-1/2 flex items-center justify-center">
          {!selectedProject && (
            <div className="text-center text-gray-500">
              <p className="text-2xl">Select a project to view details</p>
            </div>
          )}
        </div>

        {/* Modal for Project Details on the Right Side (Below Navbar) */}
        {selectedProject && (
          <div className="fixed top-28 right-0 w-1/2 h-[calc(100vh-7rem)] bg-white p-8 shadow-lg z-50 flex items-start justify-center border-l border-gray-300 overflow-auto">
            {/* Close Button */}
            <button
              onClick={closeProjectDetails}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>

            {/* Project Details Content */}
            <div className="text-left w-full max-w-2xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {selectedProject.title}
              </h2>
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Larger Image Size */}
                <div className="lg:w-1/2">
                  <Image
                    src={selectedProject.imageSrc}
                    alt={selectedProject.title}
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover rounded-md mb-4"
                  />
                </div>
                {/* Description Section */}
                <div className="lg:w-1/2">
                  <p className="text-lg text-gray-700 leading-relaxed">{selectedProject.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};
export default Projects; 