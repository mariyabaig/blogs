import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState("");

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

  return (
    <>
      <nav className="shadow-lg bg-purple-200 flex justify-between font-karla">
        <div className="max-w-3xl mx-auto">
          <div className="grid sm:grid-cols-4 text-lg gap-4 text-center py-4 px-8">
            <div className="">
              <Link to="/" className="hover:font-bold p-2 font-cursive text-4xl font-extrabold text-purple-950">
                BlogAway
              </Link>
            </div>
            <div>
              <Link to="/addblogs" className="hover:font-bold p-2">
                add blogs
              </Link>
            </div>
            <div>
              <Link to="/list" className="hover:font-bold p-2">
                view blogs
              </Link>
            </div>
            <div>
              <Link to="/about" className="hover:font-bold p-2">
                about
              </Link>
            </div>
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
