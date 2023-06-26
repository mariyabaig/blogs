import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className=" shadow-lg bg-purple-200 flex justify-center font-karla">
        <div className="max-w-3xl mx-auto">
          <div className="grid sm:grid-cols-4 text-lg gap-4 text-center py-4 px-8">
            <div className="">
              <Link to="/" className="hover:font-bold p-2 font-cursive text-4xl font-extrabold text-purple-950 ">
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

        
      </nav>
      <div className="h-3 bg-purple-300"></div> {/* Colored div as navbar border */}
      <div className="h-3 bg-blue-200"></div> {/* Colored div as navbar border */}
    </>
  );
};

export default Navbar;
