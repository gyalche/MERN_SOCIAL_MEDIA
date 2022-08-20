const authReducer = (
  state = {
    authData: null,
    loading: false,
    error: false,
    updateloading: false,
  },
  action
) => {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, loading: true, error: false };

    case 'AUTH_SUCCESS':
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, error: false };

    case 'AUTH_FAIL':
      return { ...state, loading: false, error: true };

    case 'UPDATING_START':
      return { ...state, updateloading: true, erro: false };

    case 'UPDATING_SUCCESS':
      localStorage.setItem('profile', JSON.stringify(action?.data));
      return {
        ...state,
        authData: action.data,
        updateloading: false,
        error: false,
      };

    case 'UPDATING_FAIL':
      return {
        ...state,
        error: true,
        updateloading: false,
      };

    case 'FOLLOW_USER':
      return {
        ...state,
        error: false,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: [...state.authData.user.following, action.data],
          },
        },
      };

    case 'UNFOLLOW_USER':
      return {
        ...state.authData,
        user: {
          ...state.authData.user,
          following: [
            ...state.authData.user.following.filter(
              (personId) => personId !== action.data
            ),
          ],
        },
      };
    default:
      return state;
  }
};

export default authReducer;
