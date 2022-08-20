import axios from '../axios';
export const getUser = (userId) => axios.get(`/user/${userId}`);

export const updateUser = (id, formData) => axios.put(`/user/${id}`, formData);
