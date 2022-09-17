import axios from '../axios';
export const userChats = (id) => axios.get(`/chat/${id}`);
