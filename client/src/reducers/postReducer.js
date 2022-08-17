const postReducer = (
  state = { posts: [], loading: false, error: false, uploading: false },
  action
) => {
  switch (action.type) {
    case 'UPLOAD_START':
      return { ...state, error: false, uploading: true };

    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        posts: [...state.posts, action.data],
        uploading: false,
        error: false,
      };

    case 'UPLOAD_FAIL':
      return { ...state, uploading: false, error: true };

    //for posts.jsx;
    case 'RETRIVING_START':
      return { ...state, loading: true, error: false };

    case 'RETRIVING_SUCCESS':
      return { ...state, loading: false, posts: action.data, error: false };

    case 'RETRIVING_FAIL':
      return { ...state, loading: false, error: true };

    default:
      return state;
  }
};
export default postReducer;
