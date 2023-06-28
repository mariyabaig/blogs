import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FaShareAlt, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const BlogPost = () => {
  const { index } = useParams();
  const posts = useSelector((state) => state.blogReducer.posts);
  const post = posts[index];
  const [isHovered, setIsHovered] = useState(false);

  if (!post) {
    return <div>Loading...</div>; // You can replace this with an appropriate loading state
  }

  const handleShare = () => {
    setIsHovered(!isHovered);
  };

  const handleTwitterShare = () => {
    const url = encodeURIComponent(window.location.href);
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${url}`;
    window.open(twitterShareUrl, '_blank');
  };

  const handleWhatsAppShare = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post.title);
    const whatsAppShareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
    window.open(whatsAppShareUrl, '_blank');
  };

  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <div className="m-4 p-8 rounded-lg shadow-lg bg-white block w-3/4">
        <h2 className="text-2xl text-center font-bold text-purple-800 title">{post.title}</h2>
        <p className="text-lg">Category: {post.category}</p>
        <p className="text-lg">Context: {post.context}</p>
        {post.image && <img src={post.image} alt="" className="max-w-full h-auto mb-4" />}
        <div className="flex justify-center">
          <div
            className="mr-2 cursor-pointer flex"
            onClick={handleShare}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered ? (
              <>
                <FaTwitter size={32} color="#1DA1F2" onClick={handleTwitterShare} />
                <FaWhatsapp size={32} color="#25D366" onClick={handleWhatsAppShare} />
              </>
            ) :  (
            <FaShareAlt size={22} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
