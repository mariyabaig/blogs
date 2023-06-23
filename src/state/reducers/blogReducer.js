// const initialState = [{title : "", category: "", context:""}]
// const blogblogReducer  = (state=initialState, action)=>{
//     switch (action.type){
//         case 'updateBlog' :
//             return { ...state, ...action.payload };
//             default:
//               return state;
//     }
   
// }
// export default blogblogReducer 

// const initialState = [{ title: "", category: "", context: "" }];

// const blogblogReducer  = (state = initialState, action) => {
//   switch (action.type) {
//     case 'updateBlog':
//       return [action.payload];
//     default:
//       return state;
//   }
// };
// const initialState = [];

// const blogblogReducer  = (state = initialState, action) => {
//   switch (action.type) {
//     case 'updateBlog':
//       return [...state, action.payload];
//     default:
//       return state;
//   }
// };
import { ADD_POST, DELETE_POST } from '../action-creators/index';

const initialState = {
  posts: []
};

const blogReducer  = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload]
      };
      case DELETE_POST:
        return {
          ...state,
          posts: state.posts.filter((post, index) => index !== action.payload)
        };
    default:
      return state;
  }
};

export default blogReducer ;



