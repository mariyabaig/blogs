const initialState = {title : "", category: "", context:""}
const blogReducer = (state=initialState, action)=>{
    switch (action.type){
        case 'updateBlog' :
            return { ...state, ...action.payload };
            default:
              return state;
    }
   
}
export default blogReducer