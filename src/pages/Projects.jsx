import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsCollection = collection(db, "projects");
        const projectsSnapshot = await getDocs(projectsCollection);
        const projectsList = projectsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        // If no projects in Firestore yet, use sample data
        setProjects(projectsList.length > 0 ? projectsList : sampleProjects);
      } catch (error) {
        console.error("Error fetching projects: ", error);
        setProjects(sampleProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Sample projects data (until you set up the Firebase collection)
  const sampleProjects = [
    {
      id: "1",
      title: "Relational DB with RAM & Non-Volatile Memory",
      description: "Developed a complete ACID-compliant database with optimized B+ tree indexing, multi-granular concurrency control, and client-server architecture supporting standard operations. Achieved 321% faster throughput and 360% lower latency than Redis in YCSB benchmarks.",
      image: "/images/projects/download.png",
      techStack: ["C", "B+ Tree", "ACID", "NVRAM"],
      githubLink: "https://github.com/thebardofavon/nvram-db",
      demoLink: null
    },
    {
      id: "2",
      title: "Luxe - AI-Powered E-commerce Platform",
      description: "Built responsive e-commerce platform with React/Redux featuring user/admin interfaces, authentication, and inventory management. Implemented AI recommendation system using CLIP and Annoy with 15.37% NDCG@5 improvement over baseline models.",
      image: "/images/projects/download.png",
      techStack: ["ReactJS", "Redux Toolkit", "Material UI", "CLIP", "FastAPI"],
      githubLink: "https://github.com/thebardofavon/cs331",
      demoLink: null
    },
    {
      id: "3",
      title: "DocQA - Document Question Answering System",
      description: "Engineered a high-performance Document Question Answering chatbot leveraging ReactJS, LangChain, Pinecone, and Groq API with Llama 3. Achieved 25% reduction in query latency compared to traditional keyword search methods.",
      image: "/images/projects/download.png",
      techStack: ["ReactJS", "Pinecone", "LangChain", "Groq API", "Llama 3"],
      githubLink: "https://github.com/thebardofavon/pinecone-langchain-nextjs-info-search-app",
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
        <h1 className="text-4xl font-bold text-center text-brown-700 mb-12 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
          All Projects
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000"
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <img 
                src={project.image || "/api/placeholder/600/400"} 
                alt={project.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-brown-700 mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack?.map((tech, i) => (
                      <span key={i} className="bg-brown-100 text-brown-700 px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-4">
                  {project.demoLink && (
                    <a 
                      href={project.demoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-brown-600 text-white px-4 py-2 rounded-lg hover:bg-brown-700 transition-colors hover-brown"
                    >
                      <i className="fas fa-external-link-alt mr-2"></i> Live Demo
                    </a>
                  )}
                  
                  {project.githubLink && (
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors"
                    >
                      <i className="fab fa-github mr-2"></i> View Code
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