import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, limit, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleSendMessage = () =>  {
    console.log("clicked!!");
  }

  // Sample projects data (until you set up the Firebase collection)
  const sampleProjects = [
    {
      id: "1",
      title: "Portfolio Website",
      description: "A responsive portfolio website built with React and Firebase. Features a blog, project showcase, and contact form.",
      image: "/api/placeholder/600/300",
      techStack: ["React", "Firebase", "Tailwind CSS"],
      demoLink: "https://your-portfolio-url.com",
      githubLink: "https://github.com/yourusername/portfolio",
    },
    {
      id: "2",
      title: "Task Management App",
      description: "A full-stack task management application with user authentication, task categories, and drag-and-drop functionality.",
      image: "/api/placeholder/600/300",
      techStack: ["React", "Node.js", "MongoDB"],
      demoLink: "https://task-app-demo.herokuapp.com",
      githubLink: "https://github.com/yourusername/task-manager",
    },
    {
      id: "3",
      title: "E-commerce Product Page",
      description: "A responsive e-commerce product page with image gallery, reviews, and cart functionality.",
      image: "/api/placeholder/600/300",
      techStack: ["React", "CSS Modules", "Context API"],
      demoLink: "https://ecommerce-product-demo.netlify.app",
      githubLink: "https://github.com/yourusername/ecommerce-product",
    }
  ];

  // Skills data organized by category
  const skillsData = [
    {
      category: "Languages",
      skills: [
        { name: "JavaScript", proficiency: 90 },
        { name: "HTML5", proficiency: 95 },
        { name: "CSS3", proficiency: 85 },
        { name: "Python", proficiency: 80 },
        { name: "Java", proficiency: 75 },
      ]
    },
    {
      category: "Frontend",
      skills: [
        { name: "React", proficiency: 90 },
        { name: "Tailwind CSS", proficiency: 85 },
        { name: "Bootstrap", proficiency: 80 },
      ]
    },
    {
      category: "Backend",
      skills: [
        { name: "Node.js", proficiency: 75 },
        { name: "Firebase", proficiency: 85 },
        { name: "RESTful APIs", proficiency: 80 }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section id="about" className="py-20 bg-gradient-to-r from-brown-300 via-brown-500 to-brown-700">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
            <img
              src="https://i.imgur.com/6ReKHbM_d.jpeg?maxwidth=520&shape=thumb&fidelity=high"
              alt="Anushka Srivastava"
              className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-white shadow-lg mx-auto"
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-300">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Hi, I'm Anushka Srivastava
            </h1>
            <h2 className="text-2xl font-bold text-white mb-6">
              Computer Science Student & Software Developer
            </h2>
            <p className="text-white text-lg mb-8 max-w-lg">
              I'm passionate about building elegant, functional web applications with React and Firebase.
              Currently pursuing my Computer Science degree and seeking summer internship opportunities.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a 
                href="#projects" 
                className="bg-white text-brown-700 px-6 py-3 rounded-lg font-semibold hover:bg-brown-100 transition-colors hover-brown"
              >
                View My Work
              </a>
              <a 
                href="#contact" 
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-brown-700 transition-colors"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
            <h2 className="text-3xl font-bold text-brown-700 mb-8">About Me</h2>
            <p className="text-lg text-gray-700 mb-6">
              I'm a third-year Computer Science student with a passion for web development, problem-solving, 
              and creating elegant, user-friendly applications. My journey in tech began with curiosity about 
              how websites work, which led me to explore HTML, CSS, and JavaScript, eventually discovering my 
              love for React and modern web technologies.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              When I'm not coding, you'll find me writing technical articles, experimenting with new technologies, 
              or contributing to open-source projects. I'm currently seeking summer internship opportunities to apply 
              my skills in a professional environment and learn from industry experts.
            </p>
            <div className="flex justify-center space-x-4 mt-8">
              <a
                href="https://www.linkedin.com/in/anushka-srivastava-72b719265/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brown-500 hover:text-brown-700 transition-colors"
              >
                <i className="fab fa-linkedin fa-2x"></i>
              </a>
              <a
                href="https://github.com/thebardofavon?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brown-500 hover:text-brown-700 transition-colors"
              >
                <i className="fab fa-github fa-2x"></i>
              </a>
              <a
                href="https://www.instagram.com/anushka._.srivastava_/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brown-500 hover:text-brown-700 transition-colors"
              >
                <i className="fab fa-instagram fa-2x"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-brown-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-brown-700 mb-12 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
            My Projects
          </h2>
          
          <div className="max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} 
                  bg-white rounded-lg shadow-lg overflow-hidden mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="md:w-2/5">
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
                "Agile/Scrum", "Problem Solving", "Technical Writing",
                "UI/UX Principles", "RESTful APIs", "MongoDB"
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
            Resume
          </h2>
          
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
            <div className="bg-gradient-to-r from-brown-600 to-brown-800 p-8 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-white">Anushka Srivastava</h3>
                <p className="text-brown-100">Computer Science Student & Software Developer</p>
              </div>
              
              <a 
                href="/path-to-your-resume.pdf" 
                download
                className="bg-white text-brown-700 px-4 py-2 rounded-lg hover:bg-brown-100 transition-colors flex items-center hover-brown"
              >
                <i className="fas fa-download mr-2"></i> Download PDF
              </a>
            </div>
            
            <div className="p-8">
              {/* Education */}
              <div className="mb-10">
                <h4 className="text-xl font-bold text-brown-700 mb-6 flex items-center">
                  <i className="fas fa-graduation-cap mr-3 text-brown-600"></i> Education
                </h4>
                
                <div className="border-l-4 border-brown-500 pl-6 py-2 mb-6">
                  <div className="flex justify-between items-center">
                    <h5 className="text-lg font-semibold">Bachelor of Computer Science</h5>
                    <span className="text-brown-500 font-medium">2022 - Present</span>
                  </div>
                  <p className="text-gray-700 mb-2">University Name</p>
                  <p className="text-gray-600">
                    Current GPA: 3.8/4.0
                  </p>
                </div>
              </div>
              
              {/* Experience */}
              <div>
                <h4 className="text-xl font-bold text-brown-700 mb-6 flex items-center">
                  <i className="fas fa-briefcase mr-3 text-brown-600"></i> Experience
                </h4>
                
                <div className="border-l-4 border-brown-500 pl-6 py-2">
                  <div className="flex justify-between items-center">
                    <h5 className="text-lg font-semibold">Web Development Intern</h5>
                    <span className="text-brown-500 font-medium">Summer 2023</span>
                  </div>
                  <p className="text-gray-700 mb-2">Company Name</p>
                  <ul className="list-disc list-inside text-gray-600 mt-2">
                    <li>Developed and maintained responsive web applications using React</li>
                    <li>Collaborated with designers to implement UI/UX improvements</li>
                    <li>Participated in code reviews and team meetings</li>
                  </ul>
                </div>
              </div>
            </div>
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
                        <span className="text-xs text-gray-500">{post.date}</span>
                        <span className="text-white bg-brown-500 hover:bg-brown-700 px-3 py-1 rounded transition-all">
                          Read More
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-gray-500">No blog posts available yet.</p>
              </div>
            )}
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
                    <p className="text-brown-100">anushka.srivastava.iiitg@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-brown-500 p-2 rounded-full mr-4">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p className="text-brown-100">Gurugram, Haryana, India</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-brown-500 p-2 rounded-full mr-4">
                    <i className="fas fa-globe"></i>
                  </div>
                  <div>
                    <h4 className="font-medium">Social Media</h4>
                    <div className="flex space-x-4 mt-2">
                      <a href="https://www.linkedin.com/in/anushka-srivastava-72b719265/" className="hover:text-brown-300 transition-colors" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin"></i>
                      </a>
                      <a href="https://github.com/thebardofavon" className="hover:text-brown-300 transition-colors" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-github"></i>
                      </a>
                      <a href="https://www.instagram.com/anushka._.srivastava_/" className="hover:text-brown-300 transition-colors" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="md:w-2/3 bg-white rounded-lg shadow-lg p-8 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-300">
              <h3 className="text-xl font-bold text-brown-700 mb-6">Send Me a Message</h3>
              
              <form>
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
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="bg-brown-600 text-white px-6 py-3 rounded-lg hover:bg-brown-700 transition-colors focus:outline-none focus:ring-2 focus:ring-brown-500 focus:ring-offset-2 hover-brown"
                  onClick={handleSendMessage}
                >
                  Send Message
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