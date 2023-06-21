import React from "react";
import { Link, Routes, BrowserRouter, Route } from "react-router-dom";
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import About from './pages/About';
import List from './pages/List';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addblogs" element={<Blogs />} />
          <Route exact path="/about" element={<About />} />
          <Route eaxct path="/list" element={<List />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
