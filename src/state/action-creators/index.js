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
export const UPDATE_BLOG = 'UPDATE_BLOG';

// Action Creators
// export const addPost = (title, category, context) => ({
//   type: ADD_POST,
//   payload: { title, category, context }
// });

export const addPost = (title, category, context, tags, image) => ({
  type: ADD_POST,
  payload: { title, category, context, tags, image }
});
export const deletePost = (index) => ({
    type: DELETE_POST,
    payload: index
  });
  
// action-creators/index.js

export const editPost = (index, title, category, context, image) => {
  return {
    type: EDIT_POST,
    payload: {
      index: index,
      post: {
        title: title,
        category: category,
        context: context,
        image: image
      }
    }
  };
};




  
  export const updateBlog = (title, category, context, image) => ({
    type: UPDATE_BLOG,
    payload: { title, category, context,image }
  });
  