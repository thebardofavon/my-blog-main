import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, limit, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { getFunctions, httpsCallable } from 'firebase/functions';
import emailjs from '@emailjs/browser';

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
        // // Fetch projects (if you have a projects collection)
        // const projectsCollection = collection(db, "projects");
        // const projectsSnapshot = await getDocs(projectsCollection);
        // const projectsList = projectsSnapshot.docs.map(doc => ({
        //   id: doc.id,
        //   ...doc.data(),
        // }));
        
        // // If no projects in Firestore yet, use sample data
        // setProjects(projectsList.length > 0 ? projectsList : sampleProjects);

        // Hardcoding the projects for now
        setProjects(sampleProjects);

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
      const result = await emailjs.sendForm(
        'service_l7c648q',    
        'template_spdr3ja',   
        e.target,
        'etBEg7LZ2lmYb9N62'     
      );
      setFormSuccess('Thank you for your message! I will get back to you soon.');
      e.target.reset();
    } catch (error) {
      setFormError('Failed to send message. Please try again.');
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
      title: "DocQA - Document Question Answering System",
      description: "Engineered a high-performance Document Question Answering chatbot leveraging ReactJS, LangChain, Pinecone, and Groq API with Llama 3. Achieved 25% reduction in query latency compared to traditional keyword search methods.",
      image: "/images/projects/docqa.png",
      techStack: ["ReactJS", "Pinecone", "LangChain", "Groq API", "Llama 3"],
      githubLink: "https://github.com/thebardofavon/pinecone-langchain-nextjs-info-search-app",
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
      title: "MasterChef Canada Bot",
      description: "Built a full-stack chatbot that lets users interact with AI-driven versions of MasterChef Canada judges. Features include real-time text-to-speech voice synthesis for Alvin Leung, Michael Bonacini, and Claudio Aprile; mute/unmute controls; and character-specific response styling.",
      image: "/images/more-projects/masterchef-bot.png",
      techStack: ["React.js", "Node.js", "Express", "OpenRouter API", "Web Speech API", "CSS"],
      githubLink: "https://github.com/thebardofavon/masterchef-canada-bot",
      demoLink: "https://masterchef-canada-chatbot.netlify.app/"
    },
  ];

  // Skills data organized by category
  const skillsData = [
    {
      category: "Languages",
      skills: [
        { name: "C/C++", proficiency: 90, icon: "fab fa-c", funFact: "For DSA!" },
        { name: "Java", proficiency: 65, icon: "fab fa-java", funFact: "Learnt it and used in Semester 3 project." },
        { name: "Python", proficiency: 65, icon: "fab fa-python", funFact: "Created fun projects in school." },
        { name: "JavaScript/TypeScript", proficiency: 90, icon: "fab fa-js", funFact: "Enables me to turns ideas into tangible solutions!" },
        { name: "HTML5/CSS3", proficiency: 85, icon: "fab fa-html5", funFact: "I've designed a few responsive websites." },
        { name: "SQL", proficiency: 80, icon: "fas fa-database", funFact: "I've worked with MySQL and dabbled with PostgreSQL." },
      ]
    },
    {
      category: "Developer Tools",
      skills: [
        // { name: "Git", proficiency: 90, icon: "git-alt", funFact: "I've contributed to open-source projects." },
        { name: "VS Code", proficiency: 95, icon: "fa-solid fa-code", funFact: "I'm a VS Code power user." },
        { name: "Firebase", proficiency: 85, icon: "fa-solid fa-fire", funFact: "I've used Firebase for real-time applications." },
        { name: "AWS", proficiency: 80, icon: "fa-brands fa-aws", funFact: "I've deployed a few applications on AWS." },
        { name: "Postman", proficiency: 85, icon: "fa-solid fa-hand-sparkles", funFact: "I've tested a lot of APIs." },
        { name: "LangChain", proficiency: 80, icon: "fa-solid fa-link", funFact: "I've built a few LLM applications." },
        { name: "Azure", proficiency: 80, icon: "fa-solid fa-cloud", funFact: "Learnt through my internship at SPNeosys LLC." },
      ]
    },
    {
      category: "Frameworks",
      skills: [
        { name: "ReactJS", proficiency: 90, icon: "fab fa-react", funFact: "I've built a few React applications." },
        { name: "Node.js", proficiency: 85, icon: "fab fa-node-js", funFact: "I've created a few backend services." },
        { name: "MaterialUI", proficiency: 85, icon: "fa-solid fa-palette", funFact: "I've designed a few beautiful UIs." },
        { name: "Tailwind CSS", proficiency: 90, icon: "fab fa-css3", funFact: "Used to make my projects look good!" },
        { name: "FastAPI", proficiency: 80, icon: "fa-solid fa-bolt", funFact: "I've built a few RESTful APIs." },
        { name: "Next.js", proficiency: 80, icon: "fa-solid fa-rocket", funFact: "I've deployed a few Next.js applications." },
      ]
    }
  ];

  // Update profile info
  const profileInfo = {
    name: "Anushka Srivastava",
    title: "Computer Science Student",
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
                // src="https://i.imgur.com/6ReKHbM_d.jpeg?maxwidth=520&shape=thumb&fidelity=high"
                src="/images/me/profile-photo-edit.jpeg"
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
                Computer Science Student
              </h2>
              <p className="text-base md:text-lg mb-6 max-w-lg mx-auto md:mx-0 text-gray-700">
                I build elegant, functional web applications with React, Node.js and Firebase. Fueled by AI's potential and a commitment to continuous learning, 
                I'm pursuing my Computer Science degree and seeking summer internships or full-time roles.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <a 
                  href="#projects" 
                  className="bg-brown-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brown-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  View My Work
                </a>
                {/* <a 
                  href="#contact" 
                  className="bg-white text-brown-600 border-2 border-brown-600 px-6 py-3 rounded-lg font-semibold hover:bg-brown-50 transition-all transform hover:scale-105 shadow-lg"
                >
                  Get In Touch
                </a> */}
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
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-brown-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-center text-brown-700 mb-6 md:mb-0 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
              My Projects
            </h2>
            <button
              onClick={handleViewMoreProjects}
              className="bg-brown-600 text-white px-6 py-3 rounded-lg hover:bg-brown-700 transition-colors hover-brown animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000"
            >
              View More Projects
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div 
                key={project.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000"
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
                    {/* {project.demoLink && (
                      <a 
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-brown-600 text-white px-4 py-2 rounded-lg hover:bg-brown-700 transition-colors"
                      >
                        <i className="fas fa-external-link-alt mr-2"></i>
                        Live Demo
                      </a>
                    )} */}
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
      </section>

       {/* Skills Section */}
       <section id="skills" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brown-700 mb-12 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
            My Skills 
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {skillsData.map((category, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-lg p-6 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                <h3 className="text-xl font-bold text-brown-700 mb-6 text-center">{category.category}</h3>
                <div className="space-y-4">
                  {category.skills.map((skill, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <i className={`${skill.icon} text-2xl text-brown-600`}></i>
                      <div>
                        <span className="font-medium text-gray-700">{skill.name}</span>
                        <p className="text-sm text-gray-500">{skill.funFact}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-brown-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brown-700 mb-12 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
            Education
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {/* IIIT Guwahati */}
            <div className="bg-white rounded-lg shadow-lg p-8 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-brown-700">Indian Institute of Information Technology, Guwahati</h3>
                  <p className="text-gray-600">Bachelor of Technology in Computer Science and Engineering</p>
                  {/* <p className="text-gray-500 mt-1">CGPA: 8.76</p> */}
                </div>
                <div className="text-right mt-4 md:mt-0">
                  <span className="bg-brown-100 text-brown-700 px-4 py-2 rounded-full text-sm font-medium">
                    2022 - Present
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-brown-100 p-2 rounded-full mr-4">
                    <i className="fas fa-graduation-cap text-brown-600"></i>
                  </div>
                  <div>
                    <h4 className="font-medium text-brown-700">Relevant Coursework</h4>
                    <p className="text-gray-600">
                      Algorithms, Artificial Intelligence, Computer Architecture, Data Structures, Database Management System, 
                      Operating Systems, Object-Oriented Programming, Linear Algebra, Probability, Machine Learning, 
                      Networking, Cloud Computing, Theory of Computation, Software Engineering, Computer Security
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Lourdes Central School - 12th
            <div className="bg-white rounded-lg shadow-lg p-8 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h3 className="text-2xl font-bold text-brown-700">Lourdes Central School, Mangalore</h3>
                  <p className="text-gray-600">Central Board of Secondary Education (CBSE)</p>
                  <p className="text-gray-500 mt-1">Percentage: 95.4%</p>
                </div>
                <div className="text-right mt-4 md:mt-0">
                  <span className="bg-brown-100 text-brown-700 px-4 py-2 rounded-full text-sm font-medium">
                    2021
                  </span>
                </div>
              </div>
            </div>

            {/* Lourdes Central School - 10th */}
            {/* <div className="bg-white rounded-lg shadow-lg p-8 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h3 className="text-2xl font-bold text-brown-700">Lourdes Central School, Mangalore</h3>
                  <p className="text-gray-600">Central Board of Secondary Education (CBSE)</p>
                  <p className="text-gray-500 mt-1">Percentage: 95.2%</p>
                </div>
                <div className="text-right mt-4 md:mt-0">
                  <span className="bg-brown-100 text-brown-700 px-4 py-2 rounded-full text-sm font-medium">
                    2019
                  </span>
                </div>
              </div>
            </div>  */}
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-20 bg-white">
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

       {/* Hobbies Section */}
       <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brown-700 mb-12">
            My Hobbies & Interests
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {hobbies.map((hobby, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow group"
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
                      className="w-full h-48 object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform"
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

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-brown-50">
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