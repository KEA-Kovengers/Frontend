import api from './http.api';

export const PostFolderUpdate = (data) => {
  return api.post('/users/users/folder/update', data);
};

export const PostFolderAdd = (name) => {
  return api.post(`/users/users/folder/add?folderName=${name}`);
};

export const PostFolderAddPost = (data) => {
  return api.post('/users/users/folder/add', data);
};

export const GetFolderList = (id) => {
  return api.get(`/users/users/folder/${id}`);
};

export const GetFolderArticleList = (id) => {
  return api.get(`/users/users/folder/post/${id}`);
};

export const DeleteFolder = (name) => {
  return api.delete(`/users/users/folder/delete?folderName=${name}`);
};
