import React, { useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const About = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-fade-in');
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('opacity-100');
      }, index * 200); 
    });
  }, []);

  return (
    <div className="bg-gradient-to-r from-brown-300 via-brown-500 to-brown-700 min-h-screen w-full flex items-center justify-center py-4 px-2 sm:px-6 rounded-lg">
      <div className="bg-white bg-opacity-90 p-6 sm:p-10 rounded-lg shadow-lg w-full max-w-4xl animate-fade-in opacity-0 transition-opacity duration-1000">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-center text-brown-700 animate-fade-in opacity-0 transition-opacity duration-1000">
          About Me
        </h1>
        <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-6 animate-fade-in opacity-0 transition-opacity duration-1000">
          <img
            src="https://i.imgur.com/6ReKHbM_d.jpeg?maxwidth=520&shape=thumb&fidelity=high"
            alt="Hinazuki Kayo"
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-brown-500 mb-4 sm:mb-0 sm:mr-6"
          />
          <p className="text-gray-700 leading-relaxed text-base sm:text-lg text-center sm:text-left">
            Hi! I'm Anushka, a CSE student passionate about software development, problem-solving, and blogging.
            This is my personal space where I share my journey, projects, and ideas. Welcome!
          </p>
        </div>
        <div className="text-center animate-fade-in opacity-0 transition-opacity duration-1000">
          <h2 className="text-xl sm:text-2xl font-semibold text-brown-600 mb-3 sm:mb-4">
            Connect with Me
          </h2>
          <div className="flex justify-center space-x-3 sm:space-x-4">
            <a
              href="https://www.linkedin.com/in/anushka-srivastava-72b719265/"
              className="text-brown-500 hover:text-brown-700 transition-colors duration-300"
            >
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
            <a
              href="https://github.com/thebardofavon?tab=repositories"
              className="text-brown-500 hover:text-brown-700 transition-colors duration-300"
            >
              <i className="fab fa-github fa-2x"></i>
            </a>
            <a
              href="https://www.instagram.com/anushka._.srivastava_/"
              className="text-brown-500 hover:text-brown-700 transition-colors duration-300"
            >
              <i className="fab fa-instagram fa-2x"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
