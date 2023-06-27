// Blogs.jsx

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../state/action-creators/index';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Blogs = () => {
  const [post, setPost] = useState({
    title: '',
    category: '',
    context: '',
    image: null
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (post.title.trim() === '' || post.category.trim() === '' || post.context.trim() === '') {
      toast.error('Please fill in all fields.');
      return;
    }

    // Dispatch action to add post
    dispatch(addPost(post.title, post.category, post.context, post.image));

    // Reset form and error state
    setPost({ title: '', category: '', context: '', image: null });

    // Show success message
    toast.success('Blog successfully added!');
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setPost((prevState) => ({
      ...prevState,
      [name]: name === 'image' ? files[0] : value
    }));
  };

  const { title, category, context, image } = post;

  return (
    <>
      <div className='bg-gray-100 h-screen flex justify-center items-center'>
        <form onSubmit={handleSubmit} className="bg-white p-12 rounded" >
          <div className="mb-4">
            <label htmlFor="title" className="block mb-2 text-gray-500 font-bold">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded shadow focus:outline-none focus:ring-2 focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block mb-2 text-gray-500 font-bold">
              Category:
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={category}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded shadow focus:outline-none focus:ring-2 focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="context" className="block mb-2 text-gray-500 font-bold">
              Context:
            </label>
            <textarea
              id="context"
              name="context"
              value={context}
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded shadow focus:outline-none focus:ring-2 focus:border-blue-300"
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block mb-2 text-gray-500 font-bold">
              Image:
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded shadow focus:outline-none focus:ring-2 focus:border-blue-300"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded shadow hover:bg-blue-600 transition-all duration-200"
          >
            Add Blog
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={true} />
    </>
  );
};

export default Blogs;
