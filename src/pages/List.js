import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../state/action-creators/index';

const List = () => {
  const posts = useSelector((state) => state.blogReducer.posts);

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
                <button className="m-2 bg-blue-500 p-3 rounded text-white shadow-sm">
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
