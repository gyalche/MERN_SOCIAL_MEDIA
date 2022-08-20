import axios from '../axios';

axios.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`;
  }
});
export const getUser = (userId) => axios.get(`/user/${userId}`);

export const updateUser = (id, formData) => axios.put(`/user/${id}`, formData);

export const getAllUser = () => axios.get('/user');

export const followUser = (id, data) => axios.put(`/user/${id}/follow`, data);
export const unfollowUser = (id, data) =>
  axios.put(`/user/${id}/unfollow`, data);
