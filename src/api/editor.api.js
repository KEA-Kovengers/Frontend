import httpApi from './http.api';
import api from './api';

export const GetEditorList = (id) => {
  return httpApi.get(`/articles/editor/list/${id}`);
};

export const DeleteArticle = (postId, userID) => {
  return api.delete(`/articles/editor/deleteUser`, {
    postId: postId,
    userID: userID,
  });
};
