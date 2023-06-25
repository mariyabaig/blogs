import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, editPost } from '../state/action-creators/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp as solidThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as regularThumbsUp } from '@fortawesome/free-regular-svg-icons';


const List = () => {
  const posts = useSelector((state) => state.blogReducer.posts);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [editedIndex, setEditedIndex] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedCategory, setEditedCategory] = useState('');
  const [editedContext, setEditedContext] = useState('');

  const handleDeletePost = (index) => {
    dispatch(deletePost(index));
  };

  const handleEditPost = (index) => {
    setEditMode(true);
    setEditedIndex(index);
    const post = posts[index];
    setEditedTitle(post.title);
    setEditedCategory(post.category);
    setEditedContext(post.context);
  };

  const handleSaveEdit = (index) => {
    dispatch(editPost(index, editedTitle, editedCategory, editedContext));
    setEditMode(false);
    setEditedIndex(null);
    setEditedTitle('');
    setEditedCategory('');
    setEditedContext('');
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedIndex(null);
    setEditedTitle('');
    setEditedCategory('');
    setEditedContext('');
  };
  const [likedPosts, setLikedPosts] = useState([]);

  const handleToggleLike = (index) => {
    if (likedPosts.includes(index)) {
      setLikedPosts(likedPosts.filter((likedIndex) => likedIndex !== index));
    } else {
      setLikedPosts([...likedPosts, index]);
    }
  };
  
  return (
    <>
      <div className='h-screen bg-gray-100'>
        <h2 className="text-xl font-bold mb-2">Submitted Posts:</h2>
        {posts && posts.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            <ul>
              {posts.map((post, index) => (
                <li key={index} className="m-4 p-8 rounded-md shadow-md bg-white">
                  {editMode && index === editedIndex ? (
                    <>
                      <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        className="mb-2 px-2 py-1 rounded border"
                      />
                      <input
                        type="text"
                        value={editedCategory}
                        onChange={(e) => setEditedCategory(e.target.value)}
                        className="mb-2 px-2 py-1 rounded border"
                      />
                      <input
                        type="text"
                        value={editedContext}
                        onChange={(e) => setEditedContext(e.target.value)}
                        className="mb-2 px-2 py-1 rounded border"
                      />
                      <button
                        className="m-2 bg-blue-500 p-3 rounded text-white shadow-sm"
                        onClick={() => handleSaveEdit(index)}
                      >
                        Save
                      </button>
                      <button
                        className="m-2 bg-blue-500 p-3 rounded text-white shadow-sm"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <h3 className="text-lg font-bold">Title: {post.title}</h3>
                      <p className="text-lg">Category: {post.category}</p>
                      <p className="text-lg">Context: {post.context}</p>
                      <button
                        className="m-2 bg-blue-500 p-3 rounded text-white shadow-sm"
                        onClick={() => handleEditPost(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="m-2 bg-blue-500 p-3 rounded text-white shadow-sm"
                        onClick={() => handleDeletePost(index)}
                      >
                        Delete
                      </button>
                      <button
          className="m-2 bg-blue-500 p-3 rounded text-white shadow-sm"
          onClick={() => handleToggleLike(index)}
        >
          {likedPosts.includes(index) ? (
            <FontAwesomeIcon icon={solidThumbsUp} />
          ) : (
            <FontAwesomeIcon icon={regularThumbsUp} />
          )}
          Like
        </button>
     
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default List;
