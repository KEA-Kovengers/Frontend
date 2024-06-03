import httpApi from './http.api';
import api from './api';

export const GetCommentedArticle = (id) => {
  return httpApi.get(`/articles/articles/comment/commentlist/${id}`);
};

export const GetArticleComment = (id) => {
  return httpApi.get(`/articles/articles/comment/${id}`);
};

export const PostComment = (postID, commentID, body) => {
  return api.post(`/articles/articles/comment/create`, {
    postID,
    commentID,
    body,
  });
};

export const DeleteComment = (id) => {
  return api.post(`/articles/articles/comment/delete`, id);
};
