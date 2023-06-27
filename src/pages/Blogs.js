import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../state/action-creators/index';
import { useNavigate } from 'react-router-dom';

const Blogs = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [context, setContext] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();
const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === '' || category.trim() === '' || context.trim() === '') {
      setError('Please fill in all fields.');
      setShowAlert(true);
      return;
    }

    // Dispatch action to add post
    dispatch(addPost(title, category, context));

    // Reset form and error state
    setTitle('');
    setCategory('');
    setContext('');
    setError('');

    // Show success message
    setSuccessMessage('Blog successfully added!');
    setShowAlert(true);
  };

  useEffect(() => {
    let timer;
    if (showAlert) {
      timer = setTimeout(() => {
        setShowAlert(false);
        setSuccessMessage('');
      }, 3000); // Duration for which the alert will be displayed (in milliseconds)
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showAlert]);

  const posts = useSelector((state) => state.blogReducer.posts);

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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 p-3 w-full rounded shadow focus:outline-none focus:ring-2 focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="context" className="block mb-2 text-gray-500 font-bold">
              Context:
            </label>
            <textarea
              id="context"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="border border-gray-300 p-3 w-full rounded shadow focus:outline-none focus:ring-2 focus:border-blue-300"
            ></textarea>
          </div>

          <button
            type="submit"
            className="block bg-blue-400 p-4 text-white font-bold rounded-lg shadow hover:shadow-lg"
          >
            Submit
          </button>
          {showAlert && error && (
          <div className="bg-red-200 text-red-800 p-3 rounded mt-4">
            {error}
            <button
              className="ml-2 text-red-800 font-semibold"
              onClick={() => setShowAlert(false)}
            >
              Cancel
            </button>
          </div>
        )}

        {showAlert && successMessage && (
          <div className="bg-purple-200 text-purple-800 p-3 rounded mt-4">
            {successMessage}
            <button
              className="ml-2 text-purple-800 font-semibold"
              onClick={() => setShowAlert(false)}
            >
              Close
            </button>
          </div>
        )}
<button className='bg-purple-100 block rounded-lg shadow hover:shadow-lg p-4 mt-2 font-bold text-purple-800' onClick={()=>navigate("/list")}>View Blogs</button>
        </form>


      
      </div>
    </>
  );
};

export default Blogs;
