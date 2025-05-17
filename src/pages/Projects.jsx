import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
      
        setProjects(sampleProjects);
        console.log("DEBUG: IN PROJECTS PAGE")
      } catch (error) {
        console.error("Error fetching projects: ", error);
        setProjects(sampleProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const sampleProjects = [
    {
      id: "4",
      title: "MasterChef Canada Bot",
      description: "Developed an automated Discord bot that tracks and notifies users about MasterChef Canada episodes, contestant updates, and competition results. Implemented real-time episode tracking and custom notification preferences.",
      image: "/images/projects/download.png",
      techStack: ["Discord.js", "Node.js", "MongoDB", "Express"],
      githubLink: "https://github.com/yourusername/masterchef-bot",
      demoLink: null
    },
    {
      id: "5",
      title: "Discord Colour Generator",
      description: "Created a Discord bot that generates and manages custom color roles for server members. Features include color preview, role management, and color palette suggestions based on user preferences.",
      image: "/images/projects/download.png",
      techStack: ["Discord.js", "Node.js", "Color Theory", "Express"],
      githubLink: "https://github.com/yourusername/discord-color-bot",
      demoLink: null
    },
    {
      id: "6",
      title: "Contacts Sphere",
      description: "Built a comprehensive contact management system with advanced search, categorization, and relationship mapping features. Implemented secure data storage and intuitive user interface for efficient contact organization.",
      image: "/images/projects/download.png",
      techStack: ["React", "Node.js", "MongoDB", "Express", "Material UI"],
      githubLink: "https://github.com/yourusername/contacts-sphere",
      demoLink: null
    },
    {
      id: "7",
      title: "EcoFlix",
      description: "Developed an eco-friendly streaming platform that promotes environmental documentaries and sustainable content. Features include content categorization, user recommendations, and environmental impact tracking.",
      image: "/images/projects/download.png",
      techStack: ["React", "Node.js", "MongoDB", "Express", "AWS S3"],
      githubLink: "https://github.com/yourusername/ecoflix",
      demoLink: null
    },
    {
      id: "8",
      title: "Academic Tracking System",
      description: "Created a comprehensive academic progress tracking system for students and educators. Features include grade management, course planning, GPA calculation, and academic goal setting with progress visualization.",
      image: "/images/projects/download.png",
      techStack: ["React", "Node.js", "PostgreSQL", "Express", "Chart.js"],
      githubLink: "https://github.com/yourusername/academic-tracker",
      demoLink: null
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-brown-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-brown-600"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-brown-50 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-brown-700 mb-12">
          My Projects
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-brown-700 mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech, index) => (
                    <span 
                      key={index}
                      className="bg-brown-100 text-brown-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.demoLink && (
                    <a 
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-brown-600 text-white px-4 py-2 rounded-lg hover:bg-brown-700 transition-colors"
                    >
                      <i className="fas fa-external-link-alt mr-2"></i>
                      Live Demo
                    </a>
                  )}
                  {project.githubLink && (
                    <a 
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors"
                    >
                      <i className="fab fa-github mr-2"></i>
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Projects;
