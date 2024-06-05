import httpApi from './http.api';
import api from './api';

// 공동작업자 조회
export const GetEditorList = (postId) => {
  return api.get(`/articles/editor/list/${postId}`);
};

export const DeleteArticle = (postId, userID) => {
  return api.delete(`/articles/editor/deleteUser`, {
    postId: postId,
    userID: userID,
  });
};
// 공동작업자 추가
export const PostAddEditor = (postID, userID) => {
  return api.post('/articles/editor/addUser', {
    postId: postID,
    userID: userID,
  });
};

export const GetEditorDraft = () => {
  return api.get(`/articles/editor/drafts?page=0&size=100`);
};
