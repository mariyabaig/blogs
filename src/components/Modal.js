import React from "react";
import MDEditor from "@uiw/react-md-editor";

const Modal = ({
  editedPost,
  setEditedPost,
  handleSaveEdit,
  handleCancelEdit,
}) => {
  const handleInputChange = (e, key) => {
    const value = e.target.value;
    setEditedPost((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditedPost((prevState) => ({
        ...prevState,
        image: imageUrl,
      }));
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50 backdrop-blur">
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
        <div className="bg-white rounded-md p-6 w-full sm:max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Edit Post</h2>
          <div className="mb-4">
            <label htmlFor="edit-title" className="block text-sm mb-1">
              Title:
            </label>
            <input
              id="edit-title"
              type="text"
              value={editedPost.title}
              onChange={(e) => handleInputChange(e, "title")}
              className="w-full border-b-2 p-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="edit-category" className="block text-sm mb-1">
              Category:
            </label>
            <input
              id="edit-category"
              type="text"
              value={editedPost.category}
              onChange={(e) => handleInputChange(e, "category")}
              className="w-full border-b-2 p-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="edit-image" className="block text-sm mb-1">
              Image:
            </label>
            <input
              id="edit-image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border-b-2 p-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="edit-context" className="block text-sm mb-1">
              Context:
            </label>
            <MDEditor
                          id="edit-context"
                          data-color-mode="light"
              value={editedPost.context}
              onChange={(value) =>
                handleInputChange({ target: { value } }, "context")
              }
              className="border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSaveEdit}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded shadow hover:bg-blue-600 transition-all duration-200 mr-2"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded shadow hover:bg-gray-400 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
