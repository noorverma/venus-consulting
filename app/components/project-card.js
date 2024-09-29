import React from 'react';
import Image from 'next/image';

const ProjectCard = ({ project, onLearnMore }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out relative">
      <Image
        src={project.imageSrc}
        alt={project.title}
        width={400}
        height={300}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900">{project.title}</h2>
        <p className="text-gray-600 mt-2">{project.shortDescription}</p>
        <button
          className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 transition-colors duration-300"
          onClick={() => onLearnMore(project)}
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
