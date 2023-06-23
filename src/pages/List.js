import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { addPost } from '../state/action-creators/index';

const List = () => {

  const posts = useSelector((state)=>state.blogReducer.posts)
  return (
    <>
{posts && posts.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-2">
          <h2 className="text-xl font-bold mb-2">Submitted Posts:</h2>
          <ul>
            {posts.map((post, index) => (
              <li key={index} className="mb-4 bg-gray-200 p-16 rounded-md ">
                <h3 className="text-lg font-bold">Title: {post.title}</h3>
                <p className="text-gray-500">Category: {post.category}</p>
                <p>Context: {post.context}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default List;