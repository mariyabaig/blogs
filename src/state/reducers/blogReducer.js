import { ADD_POST, DELETE_POST } from '../action-creators/index';

const initialState = {
  posts: []
};

const blogReducer = (state = initialState, action) => {
  console.log('Action:', action.type);
  console.log('Payload:', action.payload);
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload]
      };
      case DELETE_POST:
        return {
          ...state,
          posts: state.posts.filter((_, index) => index !== action.payload)
        };
    default:
      return state;
  }
};

export default blogReducer;
