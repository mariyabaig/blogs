// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { updateBlog } from "../state/action-creators";

// const Blogs = () => {
//   // const [blogs, setBlogs] = useState({ title: "", category: "", context: "" });
//   const blogs = useSelector((state)=>state)
//   const dispatch = useDispatch()

//   const handleChange = (event)=>{
//     const { name, value } = event.target;
//     const updatedBlog = {
//       ...blogs,
//       [name]: value,
//     };
//    dispatch(updateBlog(updatedBlog))
//    localStorage.setItem('formValues', JSON.stringify(updatedBlog));
//   //  localStorage.setItem('formValues', JSON.stringify({ ...blogs, [event.target.name]: event.target.value }));
//   }
//   const handleSubmit = (event) => {
//     event.preventDefault();
//    console.log(blogs)
//    console.log("local storage", localStorage)
   
//   };

//   return (
//     <>
//       <div className="bg-blue-200 min-h-screen py-32 px-10">
//         <div className="bg-white p-10 rounded-lg shadow m:w-3/4 lg:w-1/2 mx-auto">
//           <form onSubmit={handleSubmit}>
//             <div className="mb-5">
//               <lable for="title" className="block mb-2 text-gray-500 font-bold">
//                 Title
//               </lable>
//               <input
//                 type="text"
//                 id="title"
//                 value={blogs.title}
//                 onChange={handleChange}
//                 name="title"
//                 placeholder="what did i do today?"
//                 className="border border-gray-300 p-3 w-full rounded shadow focus:outline-none focus:ring-2 focus:border-blue-300"
//               />
//             </div>

//             <div className="mb-10">
//               <lable
//                 for="category"
//                 className="block mb-2 text-gray-500 font-bold"
//               >
//                 Category
//               </lable>
//               <input
//                 type="text"
//                 name="category"
//                 value={blogs.category} onChange={handleChange}
//                 id="category"
//                 placeholder="Journal"
//                 className="border border-gray-300 p-3 w-full rounded shadow focus:outline-none focus:ring-2 focus:border-blue-300"
//               />

//               {/* <p className="text-red-400 text-sm mt-2">
//                 Twitter username is required
//               </p> */}
//             </div>
//             <div className="mb-10">
//               <lable
//                 for="content"
//                 className="block mb-2 text-gray-500 font-bold"
//               >
//                 Content
//               </lable>
//               <input
//                 type="text"
//                 id="content"
//                 name="context"
//                 value={blogs.context}
//                 onChange={handleChange}
//                 className="border border-gray-300 p-3 w-full rounded shadow focus:outline-none focus:ring-2 focus:border-blue-300"
//               />

//               {/* <p className="text-red-400 text-sm mt-2">
//                 Twitter username is required
//               </p> */}
//             </div>
//             <button
//               onClick={() => {
//                 console.log("Submitted");
//               }}
//               className="block w-full bg-blue-400 p-4 text-white font-bold rounded-lg shadow hover:shadow-lg"
//             >
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>

//       <hr />
//     </>
//   );
// };

// export default Blogs;
import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { addPost } from '../state/action-creators/index';

const Blogs = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [context, setContext] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch action to add post
    dispatch(addPost(title, category, context));

    // Reset form
    setTitle('');
    setCategory('');
    setContext('');
  };
  const posts = useSelector((state) => state.blogReducer.posts);


  return (
    <>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div>
        <label>Context:</label>
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
    
    {posts && posts.length > 0 && (
     <div>
     <h2>Submitted Posts:</h2>
          <ul>
            {posts.map((post, index) => (
              <li key={index}>
                <h3>{post.title}</h3>
                <p>Category: {post.category}</p>
                <p>Context: {post.context}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
     
  
    </>
  );
};

export default Blogs;
