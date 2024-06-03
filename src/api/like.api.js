import api from './api';
import httpApi from './http.api';

export const GetLikeArticle = (id) => {
  return httpApi.get(`/articles/articles/like/likelist/${id}`);
};

export const GetLikedUser = (id) => {
  return httpApi.get(`/articles/articles/like/userlist/${id}`);
};

export const PostLike = (id) => {
  return api.post(`/articles/articles/like/create`, id);
};

export const DeleteLike = (id) => {
  return api.delete(`/articles/articles/like/delete`, id);
};
