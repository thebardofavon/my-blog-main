import React from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Navbar = () => {
  return (
    <nav className="bg-brown-700 text-white p-4 shadow-2xl">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">anushka</Link>
        <div className="space-x-4">
          
          <Link to="/" className="hover:underline"><i className="fas fa-home mr-1 fa-0x"></i>home</Link>
          <Link to="/about" className="hover:underline"><i className="fas fa-user mr-1 fa-0x"></i>about</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
