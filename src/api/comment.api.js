import httpApi from './http.api';
import api from './api';

export const GetCommentedArticle = (id) => {
  return httpApi.get(`/articles/comment/commentlist/${id}`);
};

export const GetArticleComment = (id) => {
  return httpApi.get(`/articles/comment/userlist/${id}`);
};

export const PostComment = (postID, commentID, body) => {
  return api.post(`/articles/comment/create`, {
    postID: postID,
    commentID: commentID,
    body: body,
  });
};

export const DeleteComment = (id) => {
  return api.post(`/articles/comment/delete`);
};
