// export const updateBlog = (blog)=>{
//     return {
       
//             type : "updateBlog",
//             payload : blog
     
//     }

// }

// Action Types
export const ADD_POST = 'ADD_POST';

// Action Creators
export const addPost = (title, category, context) => ({
  type: ADD_POST,
  payload: { title, category, context }
});
