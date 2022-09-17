import axios from '../axios';

export const getMessages = (id) => axios.get(`/message/${id}`);
