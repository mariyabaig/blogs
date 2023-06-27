import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, editPost } from "../state/action-creators/index";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const List = () => {
  const navigate = useNavigate();
  const posts = useSelector((state) => state.blogReducer.posts);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [editedIndex, setEditedIndex] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedCategory, setEditedCategory] = useState("");
  const [editedContext, setEditedContext] = useState("");

  const handleDeletePost = (index) => {
    dispatch(deletePost(index));
    toast.error("Post deleted successfully!", {
      className: "toast-error",
    });
  };

  const handleEditPost = (index) => {
    setEditMode(true);
    setEditedIndex(index);
    const post = posts[index];
    setEditedTitle(post.title);
    setEditedCategory(post.category);
    setEditedContext(post.context);
  };

  const handleSaveEdit = () => {
    console.log("Edited Index:", editedIndex);
    console.log("Edited Title:", editedTitle);
    console.log("Edited Category:", editedCategory);
    console.log("Edited Context:", editedContext);
    dispatch(editPost(editedIndex, editedTitle, editedCategory, editedContext));
    setEditMode(false);
    setEditedIndex(null);
    setEditedTitle("");
    setEditedCategory("");
    setEditedContext("");
    toast.success("Post updated successfully!", {
      className: "toast-success",
    });
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedIndex(null);
    setEditedTitle("");
    setEditedCategory("");
    setEditedContext("");
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
      <div className="bg-gray-100">
        <h2 className="text-3xl font-bold m-2 flex justify-center font-karla">Submitted Posts:</h2>
        <button className="bg-purple-100 p-4 text-purple-800 font-bold rounded-lg block m-3" onClick={()=>navigate("/addblogs")}>Add new blog</button>
        {posts && posts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 m-4">
            {posts.map((post, index) => (
              <div
                key={index}
                className="m-4 p-8 rounded-md shadow-md bg-white"
              >
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
                      onClick={handleSaveEdit}
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
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this post?")) {
                          handleDeletePost(index);
                        }
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="m-2 text-purple-500 shadow-sm"
                      onClick={() => handleToggleLike(index)}
                    >
                      {likedPosts.includes(index) ? (
                        <BsSuitHeartFill size={20} />
                      ) : (
                        <BsSuitHeart size={20} />
                      )}
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
      />
    </>
  );
};

export default List;
