import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { addPost } from '../state/action-creators/index';

const List = () => {

  const posts = useSelector((state)=>state.blogReducer.posts)
  return (
    <>
{posts && posts.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Submitted Posts:</h2>
          <ul>
            {posts.map((post, index) => (
              <li key={index} className="mb-4">
                <h3 className="text-lg font-bold">{post.title}</h3>
                <p className="text-gray-500">Category: {post.category}</p>
                <p>{post.context}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default List;