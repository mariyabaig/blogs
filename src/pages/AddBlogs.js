import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../state/action-creators/index";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MDEditor from "@uiw/react-md-editor";

const AddBlogs = () => {
  const [post, setPost] = useState({
    title: "",
    category: "",
    tags: [],
    image: null,
  });

  const [blogContext, setBlogContext] = useState("");

  const handleBlogContextChange = (e) => {
    setBlogContext(e);
    setPost((prevState) => ({
      ...prevState,
      context: blogContext,
    }));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      post.title.trim() === "" ||
      post.category.trim() === "" ||
      post.context.trim() === ""
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    dispatch(
      addPost(post.title, post.category, post.context, post.tags, post.image)
    );

    setPost({ title: "", category: "", context: "", tags: [], image: null });

    setBlogContext("");
    toast.success("Blog successfully added!");
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPost((prevState) => ({
          ...prevState,
          image: reader.result,
        }));
      };
      if (files[0]) {
        reader.readAsDataURL(files[0]);
      } else {
        setPost((prevState) => ({
          ...prevState,
          image: null,
        }));
      }
    } else if (name === "tags") {
      const tagArray = value.split(",").map((tag) => tag.trim());
      setPost((prevState) => ({
        ...prevState,
        tags: tagArray,
      }));
    } else {
      setPost((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const { title, category, context, tags, image } = post;

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md max-w-2xl w-full"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-pink-500">
          Add A Blog
        </h2>

        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 text-gray-600 font-bold">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block mb-2 text-gray-600 font-bold"
          >
            Category:
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={category}
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="tags" className="block mb-2 text-gray-600 font-bold">
            Tags:
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            placeholder="Tags separated by commas"
            value={tags.join(", ")}
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="context"
            className="block mb-2 text-gray-600 font-bold"
          >
            Blog Content:
          </label>
          <MDEditor
            data-color-mode="light"
            id="context"
            name="context"
            value={blogContext}
            onChange={handleBlogContextChange}
            className="border-b border-gray-400 p-2 w-full focus:outline-none focus:border-blue-500 bg-gray-200"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block mb-2 text-gray-600 font-bold">
            Image:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:border-blue-300"
          />
        </div>

        {image && (
          <img src={image} alt="Blog" className="max-w-full h-auto mb-4" />
        )}

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-all duration-200"
          >
            Add Blog
          </button>
          <button
            type="button"
            className="text-pink-500 font-bold hover:underline"
            onClick={() => navigate("/list")}
          >
            View Blogs
          </button>
        </div>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
      />
    </div>
  );
};

export default AddBlogs;
