import api from './api';
import httpApi from './http.api';

export const PostFolderUpdate = (data) => {
  return api.post('/users/folder/update', data);
};

export const PostFolderAdd = (name) => {
  return api.post(`/users/folder/add?folderName=${name}`);
};

export const PostFolderAddPost = (data) => {
  return api.post('/users/folder/add', data);
};

export const GetFolderList = (id) => {
  return httpApi.get(`/users/folder/view/${id}`);
};

export const GetFolderArticleList = (id) => {
  return httpApi.get(`/users/folder/view/post/${id}`);
};

export const DeleteFolder = (name) => {
  return api.delete(`/users/folder/delete?folderName=${name}`);
};
