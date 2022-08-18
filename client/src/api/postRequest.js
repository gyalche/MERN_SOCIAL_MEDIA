import axios from '../axios';

export const getTimelinePosts = (id, userId) =>
  axios.get(`/post/${id}/timeline`, { userId: userId });
export const likePost = (id, userId) => axios.put(`/post/${id}/like`);
