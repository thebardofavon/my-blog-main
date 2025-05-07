// import React from 'react';
// import { Link } from 'react-router-dom';
// import '@fortawesome/fontawesome-free/css/all.min.css';

// const Navbar = () => {
//   return (
//     <nav className="bg-brown-700 text-white p-4 shadow-2xl">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link to="/" className="text-xl font-bold">anushka</Link>
//         <div className="hidden md:flex space-x-4">
//           <Link to="/" className="hover:underline"><i className="fas fa-home mr-1"></i>Home</Link>
//           <Link to="/projects" className="hover:underline"><i className="fas fa-code mr-1"></i>Projects</Link>
//           <Link to="/skills" className="hover:underline"><i className="fas fa-cogs mr-1"></i>Skills</Link>
//           <Link to="/resume" className="hover:underline"><i className="fas fa-file mr-1"></i>Resume</Link>
//           <Link to="/blog" className="hover:underline"><i className="fas fa-blog mr-1"></i>Blog</Link>
//           <Link to="/contact" className="hover:underline"><i className="fas fa-envelope mr-1"></i>Contact</Link>
//           <Link to="/services" className="hover:underline"><i className="fas fa-briefcase mr-1"></i>Hire Me</Link>
//         </div>
        
//         {/* Mobile menu button */}
//         <div className="md:hidden">
//           {/* Implement a mobile menu toggle here */}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-brown-700 text-white p-4 shadow-2xl sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">anushka</Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <a href="/#about" className="hover:underline">
            <i className="fas fa-user mr-1"></i>About
          </a>
          <a href="/#projects" className="hover:underline">
            <i className="fas fa-code mr-1"></i>Projects
          </a>
          <a href="/#skills" className="hover:underline">
            <i className="fas fa-cogs mr-1"></i>Skills
          </a>
          <a href="/#resume" className="hover:underline">
            <i className="fas fa-file mr-1"></i>Resume
          </a>
          <a href="/#contact" className="hover:underline">
            <i className="fas fa-envelope mr-1"></i>Contact
          </a>
          <Link to="/blog" className="hover:underline">
            <i className="fas fa-blog mr-1"></i>Blog
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} fa-lg`}></i>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-brown-600 py-2 px-4 mt-2 rounded-lg">
          <div className="flex flex-col space-y-3">
            <a 
              href="/#about" 
              className="hover:bg-brown-500 px-3 py-2 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fas fa-user mr-2"></i>About
            </a>
            <a 
              href="/#projects" 
              className="hover:bg-brown-500 px-3 py-2 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fas fa-code mr-2"></i>Projects
            </a>
            <a 
              href="/#skills" 
              className="hover:bg-brown-500 px-3 py-2 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fas fa-cogs mr-2"></i>Skills
            </a>
            <a 
              href="/#resume" 
              className="hover:bg-brown-500 px-3 py-2 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fas fa-file mr-2"></i>Resume
            </a>
            <a 
              href="/#contact" 
              className="hover:bg-brown-500 px-3 py-2 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fas fa-envelope mr-2"></i>Contact
            </a>
            <Link 
              to="/blog" 
              className="hover:bg-brown-500 px-3 py-2 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fas fa-blog mr-2"></i>Blog
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;