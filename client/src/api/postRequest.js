import axios from '../axios';

export const getTimelinePosts = (id) => axios.get(`/post/${id}/timeline`);
