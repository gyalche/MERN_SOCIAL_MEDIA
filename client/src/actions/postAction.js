import * as PostApi from '../api/postRequest';

export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: 'RETRIVING_START' });
  try {
    const { data } = await PostApi.getTimelinePosts(id);
    dispatch({ type: 'RETRIVING_SUCCESS', data: data });
  } catch (error) {
    dispatch({ type: 'RETRIVING_FAIL' });
    console.log(error);
  }
};
