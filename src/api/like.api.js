import api from './http.api';

export const GetLikeArticle = (id) => {
  return api.get('/articles/articles/like/likelist', id);
};

export const PostLike = (id) => {
  return api.post(`/articles/articles/like/create`, id);
};

export const DeleteLike = (id) => {
  return api.delete(`/articles/articles/like/delete`, id);
};
