// export const updateBlog = (blog)=>{
//     return {
       
//             type : "updateBlog",
//             payload : blog
     
//     }

// }

// Action Types
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const EDIT_POST = 'EDIT_POST';

// Action Creators
export const addPost = (title, category, context) => ({
  type: ADD_POST,
  payload: { title, category, context }
});


export const deletePost = (index) => ({
    type: DELETE_POST,
    payload: index
  });
  
  export const editPost = (index) => ({
    type: EDIT_POST,
    payload: index
  });
  