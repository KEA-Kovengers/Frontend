import api from './api';
import httpApi from './http.api';

export const GetPostsList = (id) => {
  return httpApi.get(`/articles/posts/list/${id}?page=0&size=10`);
};

export const GetPostDetail = (id) => {
  return httpApi.get(`/articles/posts/${id}`);
};
