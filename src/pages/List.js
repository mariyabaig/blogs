// List.jsx

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, editPost } from '../state/action-creators/index';
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const List = () => {
  // React Router hook for navigation
  const navigate = useNavigate();

  // Accessing the 'posts' array from the Redux store
  const posts = useSelector((state) => state.blogReducer.posts);

  // Accessing the dispatch function from Redux
  const dispatch = useDispatch();

  // State for controlling edit mode and storing edited post data
  const [editMode, setEditMode] = useState(false);
  const [editedPost, setEditedPost] = useState({
    index: null,
    title: '',
    category: '',
    context: '',
    image: '', // Add image property to the edited post state
  });

  // Function for deleting a post
  const handleDeletePost = (index) => {
    dispatch(deletePost(index));
    toast.error('Post deleted successfully!', {
      className: 'toast-error',
    });
  };

  // Function for entering edit mode and populating the edited post data
  const handleEditPost = (index) => {
    setEditMode(true);
    const post = posts[index];
    setEditedPost({
      index,
      title: post.title,
      category: post.category,
      context: post.context,
      image: post.image, // Assign image property from the selected post
    });
  };

  // Function for saving the edited post
  const handleSaveEdit = () => {
    const { index, title, category, context, image } = editedPost;
    dispatch(editPost(index, title, category, context, image)); // Include the image in the editPost action
    setEditMode(false);
    setEditedPost({ index: null, title: '', category: '', context: '', image: '' }); // Clear the image state
    toast.success('Post updated successfully!', {
      className: 'toast-success',
    });
  };

  // Function for canceling the edit mode and resetting the edited post data
  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedPost({ index: null, title: '', category: '', context: '', image: '' }); // Clear the image state
  };

  // State for tracking liked posts
  const [likedPosts, setLikedPosts] = useState([]);

  // Function for toggling the like status of a post
  const handleToggleLike = (index) => {
    if (likedPosts.includes(index)) {
      setLikedPosts(likedPosts.filter((likedIndex) => likedIndex !== index));
    } else {
      setLikedPosts([...likedPosts, index]);
    }
  };

  return (
    <>
      <div className="bg-gray-100">
        <h2 className="text-3xl font-bold m-2 flex justify-center font-karla">Submitted Posts:</h2>
        <button className="bg-purple-100 p-4 text-purple-800 font-bold rounded-lg block m-3" onClick={() => navigate('/addblogs')}>
          Add new blog
        </button>
        {posts && posts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 m-4">
            {posts.map((post, index) => (
              <div key={index} className="m-4 p-8 rounded-md shadow-md bg-white">
                {editMode && editedPost.index === index ? (
                  // Displaying input fields for editing the post
                  <>
                    {Object.entries(editedPost).map(([key, value]) => {
                      if (key === 'image') {
                        return (
                          <div key={key} className="mb-4">
                            <label className="block mb-1 font-bold" htmlFor="image-input">
                              Image:
                            </label>
                            <input
                              id="image-input"
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setEditedPost({ ...editedPost, image: reader.result });
                                };
                                if (file) {
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </div>
                        );
                      }
                      return (
                        <input
                          key={key}
                          type="text"
                          value={value}
                          onChange={(e) => setEditedPost({ ...editedPost, [key]: e.target.value })}
                          className="mb-2 px-2 py-1 rounded border"
                        />
                      );
                    })}
                    <button className="m-2 bg-blue-500 p-3 rounded text-white shadow-sm" onClick={handleSaveEdit}>
                      Save
                    </button>
                    <button className="m-2 bg-blue-500 p-3 rounded text-white shadow-sm" onClick={handleCancelEdit}>
                      Cancel
                    </button>
                  </>
                ) : (
                  // Displaying the post details, edit button, delete button, and like button
                  <>
                    <h3 className="text-lg font-bold">Title: {post.title}</h3>
                    <p className="text-lg">Category: {post.category}</p>
                    <p className="text-lg">Context: {post.context}</p>
                    {post.image && <img src={post.image} alt="Blog" className="max-w-full h-auto mb-4" />}
                    <button className="m-2 bg-blue-500 p-3 rounded text-white shadow-sm" onClick={() => handleEditPost(index)}>
                      Edit
                    </button>
                    <button
                      className="m-2 bg-blue-500 p-3 rounded text-white shadow-sm"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this post?')) {
                          handleDeletePost(index);
                        }
                      }}
                    >
                      Delete
                    </button>
                    <button className="m-2 text-purple-500 shadow-sm" onClick={() => handleToggleLike(index)}>
                      {likedPosts.includes(index) ? <BsSuitHeartFill size={20} /> : <BsSuitHeart size={20} />}
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={true} />
    </>
  );
};

export default List;
