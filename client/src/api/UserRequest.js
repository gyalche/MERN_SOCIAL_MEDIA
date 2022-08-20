import axios from '../axios';
export const getUser = (userId) => axios.get(`/user/${userId}`);

export const updateUser = (id, formData) => axios.put(`/user/${id}`, formData);

export const getAllUser = () => axios.get('/user');

export const followUser = (id, data) => axios.put(`/user/${id}/follow`, data);
export const unfollowUser = (id, data) =>
  axios.put(`/user/${id}/unfollow`, data);
