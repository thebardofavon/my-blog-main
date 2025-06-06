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
      title: "Discord Colour Generator",
      description: "Created a React+Vite web app for composing and copying ANSI-colored text snippets compatible with Discord. Includes an interactive editor supporting bold, underline, foreground/background ANSI styles, live tooltips, and HTML sanitization.",
      image: "/images/more-projects/discord-colour-generator.png",
      techStack: ["React", "Vite", "Mantine UI", "ESLint"],
      githubLink: "https://github.com/thebardofavon/discord-coloured-text-generator",
      demoLink: "https://discord-coloured-text-generator.vercel.app/"
    },
    {
      id: "5",
      title: "EcoFlix",
      description: "Developed a responsive streaming-platform clone spotlighting environmental documentaries. Leveraged Firebase for secure authentication, real-time database updates, and scalable content storage, plus Redux for state management.",
      image: "/images/more-projects/ecoflix.png",
      techStack: ["React", "Firebase", "Redux", "CSS"],
      githubLink: "https://github.com/thebardofavon/ecoflix",
      demoLink: "https://ecoflix.netlify.app/"
    },
    {
      id: "6",
      title: "ContactSphere (Mini-CRM)",
      description: "Engineered a full-stack mini-CRM with React, Node.js, and MySQL, supporting CRUD for 1,000+ contacts. Integrated a RESTful API with regex-based input validation and duplicate-entry checks, wrapped in a responsive Material UI interface.",
      image: "/images/more-projects/contact-sphere.png",
      techStack: ["React", "Node.js", "Express", "MySQL", "Material UI"],
      githubLink: "https://github.com/thebardofavon/customer-management",
      demoLink: "https://contact-sphere.netlify.app/"
    },
    {
      id: "7",
      title: "Relational DB with RAM & Non-Volatile Memory",
      description: "Developed a complete ACID-compliant database with optimized B+ tree indexing, multi-granular concurrency control, and client-server architecture supporting standard operations. Achieved 321% faster throughput and 360% lower latency than Redis in YCSB benchmarks.",
      image: "/images/projects/download.png",
      techStack: ["C", "B+ Tree", "ACID", "NVRAM"],
      githubLink: "https://github.com/thebardofavon/nvram-db",
      demoLink: null
    },
    {
      id: "8",
      title: "Academic Performance Tracker",
      description: "Built a full-stack analytics dashboard to track grade records and performance metrics for 1,100+ students. Features include program/course management, GPA calculation, and interactive progress visualizations in Material UI.",
      image: "/images/projects/download.png",
      techStack: ["React", "Node.js", "Express", "MySQL", "Material UI", "Chart.js"],
      githubLink: "https://github.com/knightofcookies/academic-tracking",
      demoLink: null
    }
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
                className="w-full h-50 object-cover"
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
