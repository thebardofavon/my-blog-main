import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, limit, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { getFunctions, httpsCallable } from 'firebase/functions';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.animate-on-scroll');
      
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight * 0.75) {
          section.classList.add('opacity-100');
          section.classList.remove('translate-y-10');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch projects (if you have a projects collection)
        const projectsCollection = collection(db, "projects");
        const projectsSnapshot = await getDocs(projectsCollection);
        const projectsList = projectsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        // If no projects in Firestore yet, use sample data
        setProjects(projectsList.length > 0 ? projectsList : sampleProjects);
        
        // Fetch recent blog posts
        const postsQuery = query(
          collection(db, "posts"),
          orderBy("date", "desc"),
          limit(3)
        );
        const postsSnapshot = await getDocs(postsQuery);
        const postsList = postsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(postsList);
        
        setRecentPosts(postsList);


      } catch (error) {
        console.error("Error fetching data: ", error);
        setProjects(sampleProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');
    setFormSuccess('');

    try {
      const formData = new FormData(e.target);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
      };

      // TODO 

      setFormSuccess('Thank you for your message! I will get back to you soon.');
      e.target.reset();
    } catch (error) {
      console.error('Error sending message:', error);
      setFormError(error.message || 'Failed to send message. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleHireMe = () => {
    window.location.href = `mailto:${profileInfo.email}?subject=Job Opportunity`;
  };

  const handleViewMoreProjects = () => {
    window.location.href = '/projects';
  };

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
      image: "/images/projects/luxe.png",
      techStack: ["ReactJS", "Redux Toolkit", "Material UI", "CLIP", "FastAPI"],
      githubLink: "https://github.com/thebardofavon/cs331",
      demoLink: null
    },
    {
      id: "3",
      title: "DocQA - Document Question Answering System",
      description: "Engineered a high-performance Document Question Answering chatbot leveraging ReactJS, LangChain, Pinecone, and Groq API with Llama 3. Achieved 25% reduction in query latency compared to traditional keyword search methods.",
      image: "/images/projects/docqa.png",
      techStack: ["ReactJS", "Pinecone", "LangChain", "Groq API", "Llama 3"],
      githubLink: "https://github.com/thebardofavon/pinecone-langchain-nextjs-info-search-app",
      demoLink: null
    }
  ];

  // Skills data organized by category
  const skillsData = [
    {
      category: "Languages",
      skills: [
        { name: "C/C++", proficiency: 90 },
        { name: "Java", proficiency: 65 },
        { name: "Python", proficiency: 65 },
        { name: "JavaScript/TypeScript", proficiency: 90 },
        { name: "HTML5/CSS3", proficiency: 85 },
        { name: "SQL", proficiency: 80 },
      ]
    },
    {
      category: "Developer Tools",
      skills: [
        { name: "Git", proficiency: 90 },
        { name: "VS Code", proficiency: 95 },
        { name: "Firebase", proficiency: 85 },
        { name: "AWS", proficiency: 80 },
        { name: "Postman", proficiency: 85 },
        { name: "LangChain", proficiency: 80 }
      ]
    },
    {
      category: "Frameworks",
      skills: [
        { name: "ReactJS", proficiency: 90 },
        { name: "Node.js", proficiency: 85 },
        { name: "MaterialUI", proficiency: 85 },
        { name: "Tailwind CSS", proficiency: 90 },
        { name: "FastAPI", proficiency: 80 },
        { name: "Next.js", proficiency: 80 }
      ]
    }
  ];

  // Update profile info
  const profileInfo = {
    name: "Anushka Srivastava",
    title: "Computer Science Student & Software Developer",
    description: "I'm a Computer Science student at IIIT Guwahati with a passion for building innovative software solutions. Currently seeking internship opportunities to apply my skills in a professional environment.",
    email: "anushka.srivastava.iiitg@gmail.com",
    phone: "+91 7026179621",
    location: "Gurugram, Haryana, India",
    social: {
      linkedin: "https://www.linkedin.com/in/anushka-srivastava-72b719265/",
      github: "https://github.com/thebardofavon",
      leetcode: "https://leetcode.com/thebardofavon/",
      geeksforgeeks: "https://auth.geeksforgeeks.org/user/schrodingerszanycat/"
    }
  };

  // Add hobbies data
  const hobbies = [
    {
      name: "Cube Collection",
      icon: "fas fa-cube",
      description: "Speed solving various Rubik's cubes and puzzles",
      images: [
        { name: "2x2 Cube", src: "/images/cubes/2x2.png" },
        { name: "3x3 Cube", src: "/images/cubes/3x3.png" },
        { name: "4x4 Cube", src: "/images/cubes/4x4.png" },
        { name: "Mirror Cube", src: "/images/cubes/mirror.png" },
        { name: "Pyraminx", src: "/images/cubes/pyraminx.png" },
        { name: "Skewb", src: "/images/cubes/skewb.png" }
      ]
    },
    {
      name: "Piano",
      icon: "fas fa-music",
      description: "Playing classical and contemporary pieces",
      image: "/images/piano.png"
    },
    {
      name: "Swimming",
      icon: "fas fa-swimming-pool",
      description: "Competitive swimming and water sports",
      image: "/images/swimming.png"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section id="about" className="relative bg-brown-50">
        {/* Cover Image */}
        <div className="w-[100%] h-[400px] mx-auto relative">
          <img
            src="https://i.pinimg.com/736x/97/f1/b7/97f1b7aadb7cb7df20993d5d1e588946.jpg"
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-black/20"></div>
        </div>

        {/* Profile Section */}
        <div className="container mx-auto px-4 -mt-48 relative z-10">
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Profile Picture */}
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl mx-auto md:mx-0 transform hover:scale-105 transition-transform duration-300">
              <img
                src="https://i.imgur.com/6ReKHbM_d.jpeg?maxwidth=520&shape=thumb&fidelity=high"
                // src="/images/me/prof.jpeg"
                alt="Anushka Srivastava"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-3 text-brown-800">
                Anushka Srivastava
              </h1>
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-brown-600">
                Computer Science Student & Software Developer
              </h2>
              <p className="text-base md:text-lg mb-6 max-w-lg mx-auto md:mx-0 text-gray-700">
                I'm passionate about building elegant, functional web applications with React and Firebase.
                Currently pursuing my Computer Science degree and seeking summer internship opportunities.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <a 
                  href="#projects" 
                  className="bg-brown-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brown-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  View My Work
                </a>
                <a 
                  href="#contact" 
                  className="bg-white text-brown-600 border-2 border-brown-600 px-6 py-3 rounded-lg font-semibold hover:bg-brown-50 transition-all transform hover:scale-105 shadow-lg"
                >
                  Get In Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-brown-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-center text-brown-700 mb-12 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
              My Projects
            </h2>
            <button
              onClick={handleViewMoreProjects}
              className="bg-brown-600 text-white px-6 py-3 rounded-lg hover:bg-brown-700 transition-colors hover-brown animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000"
            >
              View More Projects
            </button>
          </div>
          
          <div className="max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} 
                  bg-white rounded-lg shadow-lg overflow-hidden mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="md:w-3/5">
                  <img 
                    src={project.image || "/api/placeholder/600/400"} 
                    alt={project.title} 
                    className="w-full h-full object-cover min-h-[200px]"
                  />
                </div>
                <div className="md:w-3/5 p-8">
                  <h3 className="text-2xl font-bold text-brown-700 mb-4">{project.title}</h3>
                  
                  <p className="text-gray-600 mb-6">
                    {project.description}
                  </p>
                  
                  <div className="mb-6">
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
      </section>

       {/* Skills Section */}
       <section id="skills" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brown-700 mb-12 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
            My Skills
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {skillsData.map((category, categoryIndex) => (
              <div 
                key={categoryIndex} 
                className="bg-white rounded-lg shadow-lg p-6 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000"
                style={{ transitionDelay: `${categoryIndex * 200}ms` }}
              >
                <h3 className="text-xl font-bold text-brown-700 mb-6 text-center">
                  {category.category}
                </h3>
                
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-gray-700">{skill.name}</span>
                        <span className="text-sm text-gray-500">{skill.proficiency}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-brown-600 h-2.5 rounded-full" 
                          style={{ width: `${skill.proficiency}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Additional Skills */}
          <div className="mt-16 max-w-4xl mx-auto animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-500">
            <h3 className="text-xl font-bold text-center text-brown-700 mb-8">
              Other Skills & Tools
            </h3>
            
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Git & GitHub", "VS Code", "Responsive Design", 
                "Agile/Scrum", "Problem Solving", "Technical Writing", "RESTful APIs"
              ].map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-brown-50 text-brown-700 py-2 px-4 rounded-lg text-center"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-20 bg-brown-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brown-700 mb-12 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
            My Resume
          </h2>
          
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-brown-700 mb-4">Career Interests & Goals</h3>
              <p className="text-gray-600 mb-6">
                I am passionate about software development with a focus on building scalable and efficient solutions. 
                My interests lie in full-stack development, database systems, and AI/ML applications. 
                I am particularly drawn to projects that combine technical innovation with practical problem-solving.
              </p>
              <p className="text-gray-600">
                Currently seeking opportunities to contribute to impactful projects and grow as a software engineer.
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-6 mt-8">
              <a 
                href="https://drive.google.com/file/d/1V8mAU0IH7UEyE9iRETYLPwEu4vC4_AIY/view?usp=drive_link" 
                download
                className="bg-brown-600 text-white px-8 py-3 rounded-lg hover:bg-brown-700 transition-colors flex items-center justify-center gap-2 hover-brown"
              >
                <i className="fas fa-download"></i>
                Download Resume
              </a>
              <a 
                href="#contact" 
                className="bg-white border-2 border-brown-600 text-brown-600 px-8 py-3 rounded-lg hover:bg-brown-50 transition-colors flex items-center justify-center gap-2"
                onClick={handleHireMe}
              >
                <i className="fas fa-handshake"></i>
                Hire Me
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Hobbies Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brown-700 mb-12 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
            My Hobbies & Interests
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {hobbies.map((hobby, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow group animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="w-16 h-16 bg-brown-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <i className={`${hobby.icon} text-2xl text-brown-600`}></i>
                </div>
                <h3 className="text-xl font-bold text-brown-700 mb-4">{hobby.name}</h3>
                <p className="text-gray-600 mb-6">{hobby.description}</p>
                
                {hobby.name === "Cube Collection" ? (
                  <div className="grid grid-cols-2 gap-4">
                    {hobby.images.map((cube, idx) => (
                      <div key={idx} className="relative group">
                        <img
                          src={cube.src}
                          alt={cube.name}
                          className="w-full h-32 object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                          <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                            {cube.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="relative group">
                    <img
                      src={hobby.image}
                      alt={hobby.name}
                      className="w-full h-49 object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                        {hobby.name}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-20 bg-brown-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-brown-700 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
              Recent Blog Posts
            </h2>
            <Link 
              to="/blog" 
              className="text-brown-600 hover:text-brown-800 font-semibold hover:underline animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000"
            >
              View All Posts <i className="fas fa-arrow-right ml-1"></i>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.length > 0 ? (
              recentPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="bg-white border border-brown-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000"
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <Link to={`/blog/${post.id}`}>
                    <img
                      src={post.image || "https://i.pinimg.com/736x/97/f1/b7/97f1b7aadb7cb7df20993d5d1e588946.jpg"}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-brown-700 mb-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {post.content.replaceAll('#', ' ').substring(0, 100)}...
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">{new Date(post.date).toLocaleDateString()}</span>
                        <span className="text-white bg-brown-500 hover:bg-brown-700 px-3 py-1 rounded transition-all">
                          Read More
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-8 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                <p className="text-gray-500">No blog posts available yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brown-700 mb-12 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
            Get In Touch
          </h2>
          
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
            {/* Contact Information */}
            <div className="md:w-1/3 bg-gradient-to-br from-brown-600 to-brown-800 text-white rounded-lg shadow-lg p-8 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-brown-500 p-2 rounded-full mr-4">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-brown-100">{profileInfo.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-brown-500 p-2 rounded-full mr-4">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p className="text-brown-100">{profileInfo.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-brown-500 p-2 rounded-full mr-4">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <p className="text-brown-100">{profileInfo.phone}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-brown-500 p-2 rounded-full mr-4">
                    <i className="fas fa-globe"></i>
                  </div>
                  <div>
                    <h4 className="font-medium">Social Media</h4>
                    <div className="flex space-x-4 mt-2">
                      <a href={profileInfo.social.linkedin} className="hover:text-brown-300 transition-colors" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin"></i>
                      </a>
                      <a href={profileInfo.social.github} className="hover:text-brown-300 transition-colors" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-github"></i>
                      </a>
                      <a href={profileInfo.social.leetcode} className="hover:text-brown-300 transition-colors" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-leetcode"></i>
                      </a>
                      <a href={profileInfo.social.geeksforgeeks} className="hover:text-brown-300 transition-colors" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-geeks-for-geeks"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="md:w-2/3 bg-white rounded-lg shadow-lg p-8 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-300">
              <h3 className="text-xl font-bold text-brown-700 mb-6">Send Me a Message</h3>
              
              {formError && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                  {formError}
                </div>
              )}
              
              {formSuccess && (
                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                  {formSuccess}
                </div>
              )}
              
              <form onSubmit={handleSendMessage}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                      placeholder="Your name"
                      disabled={formLoading}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                      placeholder="Your email"
                      disabled={formLoading}
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                    placeholder="Message subject"
                    disabled={formLoading}
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                    placeholder="Your message"
                    disabled={formLoading}
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="bg-brown-600 text-white px-6 py-3 rounded-lg hover:bg-brown-700 transition-colors focus:outline-none focus:ring-2 focus:ring-brown-500 focus:ring-offset-2 hover-brown disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={formLoading}
                >
                  {formLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;