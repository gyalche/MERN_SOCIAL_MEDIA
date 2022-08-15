const authReducer = (
  state = { authData: null, loading: false, error: false },
  action
) => {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, loading: true, error: false };

    case 'AUTH_SUCCESS':
      localStorage.setItem('profile', JSON.stringify(...action?.data));
      return { ...state, authDate: action.date, loading: false, error: false };

    case 'AUTH_ERROR':
      return { ...state, loading: false, error: true };

    default:
      return state;
  }
};

export default authReducer;
