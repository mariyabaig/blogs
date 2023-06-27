
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../state/action-creators/index';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Blogs = () => {
  const [post, setPost] = useState({
    title: '',
    category: '',
    context: ''
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
    dispatch(addPost(post.title, post.category, post.context));

    // Reset form and error state
    setPost({ title: '', category: '', context: '' });

    // Show success message
    toast.success('Blog successfully added!');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const { title, category, context } = post;

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

          <button
            type="submit"
            className="block bg-blue-400 p-4 text-white font-bold rounded-lg shadow hover:shadow-lg"
          >
            Submit
          </button>

          <button className='bg-purple-100 block rounded-lg shadow hover:shadow-lg p-4 mt-2 font-bold text-purple-800' onClick={() => navigate("/list")}>View Blogs</button>
        </form>

        <ToastContainer />
      </div>
    </>
  );
};

export default Blogs;
