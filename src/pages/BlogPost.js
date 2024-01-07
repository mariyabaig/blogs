import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaShareAlt, FaTwitter, FaWhatsapp } from "react-icons/fa";
import MDEditor from "@uiw/react-md-editor";

const BlogPost = () => {
  const { index } = useParams();
  const posts = useSelector((state) => state.blogReducer.posts);
  const post = posts[index];
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate()

  if (!post) {
    return <div>Loading...</div>; 
  }


  return (
    <>
      <div className="bg-gray-100 h-screen flex justify-center items-center sm:flex-wrap">
        <div className="m-4 p-8 rounded-lg shadow-lg bg-white block w-3/4 ">
          <button
            onClick={() => navigate("/list")}
            className="bg-pink-500 text-white font-bold py-2 px-4 rounded hover:bg-pink-600 transition-all duration-200"
          >
            Back
          </button>
          <h2 className="text-2xl text-center font-bold text-pink-500 title">
            {post.title}
          </h2>
          <div className="tag">
            <span className="text-md p-2 rounded-lg  font-bold">
              Category: {post.category}
            </span>
          </div>
          <div className="spacer h-5" />
          <MDEditor.Markdown
            source={post.context}
            data-color-mode="light"
            style={{
              background: "white",
              color: "black",
              padding: "1rem",
              borderRadius: "0.5rem",
            }}
          />

          {post.image && (
            <img src={post.image} alt="" className="max-w-full h-auto mb-4" />
          )}
        </div>
      </div>
    </>
  );
};

export default BlogPost;
