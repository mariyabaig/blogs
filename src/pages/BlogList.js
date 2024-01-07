import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, editPost } from "../state/action-creators/index";
import {
  BsSuitHeart,
  BsSuitHeartFill,
  BsPencil,
  BsTrash,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MDEditor from "@uiw/react-md-editor";
import Modal from "../components/Modal";

const BlogList = () => {
  const navigate = useNavigate();
  const posts = useSelector((state) => state.blogReducer.posts);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [editedPost, setEditedPost] = useState({
    index: null,
    title: "",
    category: "",
    context: "",
    image: "",
  });
  const [likedPosts, setLikedPosts] = useState([]);
  const [selectedTag, setSelectedTag] = useState("all");

  const handleDeletePost = (index) => {
    dispatch(deletePost(index));
    toast.error("Post deleted successfully!", {
      className: "toast-error",
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
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    const { index, title, category, context, image } = editedPost;
    dispatch(editPost(index, title, category, context, image));
    setEditMode(false);
    setEditedPost({
      index: null,
      title: "",
      category: "",
      context: "",
      image: "",
    });
    toast.success("Post updated successfully!", {
      className: "toast-success",
    });
    setShowEditModal(false);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedPost({
      index: null,
      title: "",
      category: "",
      context: "",
      image: "",
    });
    setShowEditModal(false);
  };

  const handleToggleLike = (index) => {
    if (likedPosts.includes(index)) {
      setLikedPosts(likedPosts.filter((likedIndex) => likedIndex !== index));
      toast.error("Post unliked!", {
        className: "toast-error",
      });
    } else {
      setLikedPosts([...likedPosts, index]);
      toast.success("Post liked!", {
        className: "toast-success",
      });
    }
  };

  const handleViewPost = (index) => {
    navigate(`/blogs/${index}`);
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  const allTags = posts.reduce((tags, post) => {
    if (post.tags) {
      post.tags.forEach((tag) => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
    }
    return tags;
  }, []);

  const filteredPosts =
    selectedTag === "all"
      ? posts
      : posts.filter((post) => post.tags && post.tags.includes(selectedTag));

  return (
    <div className="bg-gray-100 p-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Your Recent Posts
      </h2>
      <div className="flex justify-center space-x-2 mb-4">
        <button
          className={`tag-button ${selectedTag === "all" ? "active-tag" : ""}`}
          onClick={() => handleTagClick("all")}
        >
          #All
        </button>
        {allTags.map((tag, index) => (
          <button
            key={index}
            className={`tag-button ${selectedTag === tag ? "active-tag" : ""}`}
            onClick={() => handleTagClick(tag)}
          >
            #{tag}
          </button>
        ))}
      </div>
      <button
        className="bg-purple-500 text-white font-bold py-2 px-4 rounded hover:bg-purple-600 transition-all duration-200"
        onClick={() => navigate("/addblogs")}
      >
        Add New Blog
      </button>
      {filteredPosts && filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          {filteredPosts.map((post, index) => (
            <div
              key={index}
              className="p-6 border rounded-lg shadow-md bg-white"
            >
              <h3 className="text-2xl font-bold mb-4 text-purple-800">
                {post.title}
              </h3>
              {post.category && (
                <span className="text-md font-bold">
                  Category: {post.category}
                </span>
              )}
              <div className="mb-4">
                <span className="tag grid grid-cols-4 gap-1">
                  {post.tags &&
                    post.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-md p-2 rounded-lg bg-gray-100 "
                      >
                        #{tag}
                      </span>
                    ))}
                </span>
              </div>
              <MDEditor.Markdown
                source={post.context}
                data-color-mode="light"
                className="mb-4"
                style={{backgroundColor: 'white', color : 'black'}}
              />
              <div className="flex justify-between">
                <div className="flex space-x-4">
                  <button
                    className="text-pink-600"
                    onClick={() => handleToggleLike(index)}
                  >
                    {likedPosts.includes(index) ? (
                      <BsSuitHeartFill size={25} />
                    ) : (
                      <BsSuitHeart size={25} />
                    )}
                  </button>
                  <button
                    className="bg-pink-500 text-white font-bold py-2 px-4 rounded hover:bg-pink-600 transition-all duration-200"
                    onClick={() => handleEditPost(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-pink-500 text-white font-bold py-2 px-4 rounded hover:bg-pink-600 transition-all duration-200"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this post?"
                        )
                      ) {
                        handleDeletePost(index);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
                <button
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-all duration-200"
                  onClick={() => handleViewPost(index)}
                >
                  Show More
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-700 mt-8">
          No posts found for the selected tag.
        </p>
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
      />
      {showEditModal && (
        <Modal
          editedPost={editedPost}
          setEditedPost={setEditedPost}
          handleSaveEdit={handleSaveEdit}
          handleCancelEdit={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default BlogList;
