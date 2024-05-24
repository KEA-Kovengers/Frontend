import api from './http.api';

export const GetPostsList = (id) => {
  return api.get(`/articles/posts/${id}?page=0&size=10`);
};
