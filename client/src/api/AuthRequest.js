import axios from '../axios';

// const API = axios.create({
//   baseURL: 'http://localhost:5000',
// });

export const logIn = (formData) => {
  axios.post('/auth/login', formData);
};
export const signUp = async (formData) => {
  await axios.post('/auth/register', formData);
};
