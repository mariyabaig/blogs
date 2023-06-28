import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, editPost } from '../state/action-creators/index';
import { BsSuitHeart, BsSuitHeartFill, BsPencil, BsTrash, BsEye } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const List = () => {
  const navigate = useNavigate();
  const posts = useSelector((state) => state.blogReducer.posts);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [editedPost, setEditedPost] = useState({
    index: null,
    title: '',
    category: '',
    context: '',
    image: '',
  });
  const [likedPosts, setLikedPosts] = useState([]);

  const handleDeletePost = (index) => {
    dispatch(deletePost(index));
    toast.error('Post deleted successfully!', {
      className: 'toast-error',
    });
  };

  const handleEditPost = (index) => {
    setEditMode(true);
    const post = posts[index];
    setEditedPost({
      index,
      title: post.title,
      category: post.category,
      context: post.context,
      image: post.image,
    });
  };

  const handleSaveEdit = () => {
    const { index, title, category, context, image } = editedPost;
    dispatch(editPost(index, title, category, context, image));
    setEditMode(false);
    setEditedPost({ index: null, title: '', category: '', context: '', image: '' });
    toast.success('Post updated successfully!', {
      className: 'toast-success',
    });
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedPost({ index: null, title: '', category: '', context: '', image: '' });
  };

  const handleToggleLike = (index) => {
    if (likedPosts.includes(index)) {
      setLikedPosts(likedPosts.filter((likedIndex) => likedIndex !== index));
    } else {
      setLikedPosts([...likedPosts, index]);
    }
  };

  const handleViewPost = (index) => {
    navigate(`/blogs/${index}`);
  };

  return (
    <>
      <div>
        <h2 className="text-3xl font-bold m-2 flex justify-center font-karla">Submitted Posts:</h2>
        <button
          className="bg-purple-100 p-4 text-purple-800 font-bold rounded-lg block m-3"
          onClick={() => navigate('/addblogs')}
        >
          Add new blog
        </button>
        {posts && posts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 m-4">
            {posts.map((post, index) => (
              <div key={index} className="m-4 p-8 rounded-md shadow-md bg-white card">
                {editMode && editedPost.index === index ? (
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
                          className="mb-2 px-2 py-1 rounded border input"
                        />
                      );
                    })}
                    <button className="m-2 bg-blue-500 p-3 rounded text-white shadow-sm" onClick={handleSaveEdit}>
                      <BsPencil size={20} /> Save
                    </button>
                    <button className="m-2 bg-blue-500 p-3 rounded text-white shadow-sm" onClick={handleCancelEdit}>
                      <BsPencil size={20} /> Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col">
                      <span className="text-2xl text-center text-purple-800 title">
                        {post.title}
                        <button className="m-2 text-purple-500 shadow-sm" onClick={() => handleToggleLike(index)}>
                          {likedPosts.includes(index) ? <BsSuitHeartFill size={20} /> : <BsSuitHeart size={20} />}
                        </button>
                      </span>
                      <span className="text-lg">Category: {post.category}</span>
                      <div className="spacer h-5" />
                      <span className="text-lg">Context: {post.context}</span>
                      {/* {post.image && <img src={post.image} alt="" className="max-w-full h-auto mb-4" />} */}
                      <span>
                        <button
                          className="m-2 shadow-sm  p-2 rounded-sm  edit-button"
                          onClick={() => handleEditPost(index)}
                        >
                          <BsPencil size={20} /> 
                        </button>
                        <button
                          className="m-2 shadow-sm  p-2 rounded-sm delete-button"
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this post?')) {
                              handleDeletePost(index);
                            }
                          }}
                        >
                          <BsTrash size={20} /> 
                        </button>
                        <button
                          className="m-2 shadow-sm bg-blue-700 p-2 rounded-sm text-white font-bold view-button"
                          onClick={() => handleViewPost(index)}
                        >
                          Show More
                        </button>
                      </span>
                    </div>
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
