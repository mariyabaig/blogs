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
      <nav className="shadow-lg bg-purple-200 flex justify-between font-karla">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center px-4 py-2">
            <Link to="/" className="hover:font-bold p-2 font-cursive text-4xl font-extrabold text-purple-950">
              BlogAway
            </Link>
            <button
              onClick={toggleMenu}
              className="text-purple-950 hover:text-purple-900 focus:outline-none focus:text-purple-900"
              aria-label="Toggle menu"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
          <div
            className={`${
              menuOpen ? "flex text-sm " : "hidden"
            } sm:flex sm:items-center sm:justify-between text-lg gap-4 text-center py-4 px-8`}
          >
            <Link to="/addblogs" className="hover:font-bold p-2">
              Add Blogs
            </Link>
            <Link to="/list" className="hover:font-bold p-2">
              View Blogs
            </Link>
            <Link to="/about" className="hover:font-bold p-2">
              About
            </Link>
          </div>
        </div>
        <div className="mr-8">
          <span className="text-sm text-gray-500">{currentTime}</span>
        </div>
      </nav>
      <div className="h-3 bg-purple-300"></div> {/* Colored div as navbar border */}
      <div className="h-3 bg-blue-200"></div> {/* Colored div as navbar border */}
    </>
  );
};

export default Navbar;
