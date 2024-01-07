import React from "react";
import { Link, Routes, BrowserRouter, Route } from "react-router-dom";
import Home from './pages/Home';
import AddBlogs from './pages/AddBlogs';
import AboutUs from './pages/AboutUs';
import BlogList from './pages/BlogList';
import Navbar from './components/Navbar';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BlogPost from "./pages/BlogPost";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addblogs" element={<AddBlogs />} />
          <Route exact path="/about" element={<AboutUs />} />
          <Route eaxct path="/list" element={<BlogList />} />
          <Route path="/blogs/:index" element={<BlogPost />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
