import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, deletePost } from '../state/action-creators/index';

const List = () => {
  const posts = useSelector((state) => state.blogReducer.posts);
  const dispatch = useDispatch();
  

  const handleDeletePost = (index) => {
    dispatch(deletePost(index));
  };
  return (
    <>
    <div className='h-screen  bg-gray-100'>
      <h2 className="text-xl font-bold mb-2 ">Submitted Posts:</h2>
      {posts && posts.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          <ul>
            {posts.map((post, index) => (
              <li
                key={index}
                className="m-4 p-8 rounded-md shadow-md bg-white"
              >
                <h3 className="text-lg font-bold">Title: {post.title}</h3>
                <p className="text-lg">Category: {post.category}</p>
                <p className="text-lg">Context: {post.context}</p>
                <button className="m-2 bg-blue-500 p-3 rounded text-white shadow-sm">
                  Edit
                </button>
                <button className="m-2 bg-blue-500 p-3 rounded text-white shadow-sm" onClick={() => handleDeletePost(index)}>
                  Delete
                </button>
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
