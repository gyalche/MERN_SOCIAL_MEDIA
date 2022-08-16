import axios from '../axios';

export const uploadImage = (data) => axios.post('/upload', data);
export const uploadPost = (data) => axios.post('/post', data);
