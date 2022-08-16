import * as AuthApi from '../api/AuthRequest';

export const logIn = (formData) => async (dispatch) => {
  dispatch({ type: 'AUTH_START' });
  try {
    const loginresponse = await AuthApi.logIn(formData);
    dispatch({ type: 'AUTH_SUCCESS', data: loginresponse.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'AUTH_FAIL' });
  }
};

export const signUp = (formData) => async (dispatch) => {
  dispatch({ type: 'AUTH_START' });
  try {
    const response = await AuthApi.signUp(formData);
    dispatch({ type: 'AUTH_SUCCESS', data: response.data });
  } catch (error) {
    dispatch({ type: 'AUTH_FAIL' });
  }
};
