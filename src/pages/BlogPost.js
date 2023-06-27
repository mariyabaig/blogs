import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const BlogPost = () => {
  const { index } = useParams();
  const posts = useSelector((state) => state.blogReducer.posts);
  const post = posts[index];

  if (!post) {
    return <div>Loading...</div>; // You can replace this with an appropriate loading state
  }

  return (
    <div className="m-4 p-8 rounded-md shadow-md bg-white">
      <h2 className="text-2xl text-center text-purple-800 title">{post.title}</h2>
      <p className="text-lg">Category: {post.category}</p>
      <p className="text-lg">Context: {post.context}</p>
      {post.image && <img src={post.image} alt="" className="max-w-full h-auto mb-4" />}
    </div>
  );
};

export default BlogPost;
