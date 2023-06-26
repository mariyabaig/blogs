import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="bg-white shadow-lg ">
        <div className="max-w-3xl mx-auto">
          <div className="grid sm:grid-cols-4 text-lg gap-4 text-center py-4 px-8">
            <div className="">
              <Link to="/" className="hover:font-bold p-2">
                BlogAway
              </Link>
            </div>
          
            <div>
              <Link to="/addblogs" className="hover:font-bold p-2">
                Add Blog
              </Link>
            </div>
            <div>
              <Link to="/list" className="hover:font-bold p-2">
                View Blogs
              </Link>
            </div>
            <div>
              <Link to="/about" className="hover:font-bold p-2">
                About
              </Link>
            </div>
          </div>
        </div>

        
      </nav>
    </>
  );
};

export default Navbar;
