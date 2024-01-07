import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString();
      setCurrentTime(timeString);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className="bg-gray-100  py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="text-4xl font-bold text-blue-500 hover:font-bold font-cursive"
          >
            BlogAway
          </Link>
          <button
            onClick={toggleMenu}
            className="text-blue-500 hover:text-blue-500 focus:outline-none lg:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
          <div className="hidden lg:flex lg:items-center lg:justify-between text-lg gap-4 text-center py-4 px-8">
            <Link to="/addblogs" className="text-blue-500 hover:font-bold">
              Add Blogs
            </Link>
            <Link to="/list" className="text-blue-500 hover:font-bold">
              View Blogs
            </Link>
            <Link to="/about" className="text-blue-500 hover:font-bold">
              About
            </Link>
            <span className="text-md text-blue-500 ml-6">{currentTime}</span>
          </div>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-gray-100 py-4">
            <Link
              to="/addblogs"
              className="block py-2 text-purple-500 hover:font-bold"
            >
              Add Blogs
            </Link>
            <Link
              to="/list"
              className="block py-2 text-purple-500 hover:font-bold"
            >
              View Blogs
            </Link>
            <Link
              to="/about"
              className="block py-2 text-purple-500 hover:font-bold"
            >
              About
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
