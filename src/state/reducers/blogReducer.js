import { ADD_POST, DELETE_POST, EDIT_POST} from '../action-creators/index';

const initialState = {
  posts: []
};

const blogReducer = (state = initialState, action) => {
  // console.log('Action:', action.type);
  // console.log('Payload:', action.payload);
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
        // case EDIT_POST:
        //   return {
        //     ...state,
        //     posts: state.posts.map((post, index) => {
        //       if (index === action.payload.index) {
        //         return {
        //           ...post,
        //           title: action.payload.title,
        //           category: action.payload.category,
        //           context: action.payload.context
        //         };
        //       }
        //       return post;
        //     })
        //   };
        case EDIT_POST:
  return {
    ...state,
    posts: state.posts.map((post, index) => {
      if (index === action.payload.index) {
        return {
          ...post,
          ...action.payload.post
        };
      }
      return post;
    })
  };



        
    default:
      return state;
  }
};

export default blogReducer;
