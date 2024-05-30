import api from './api';
import httpApi from './http.api';

export const PostUserInfo = (data) => {
  return api.post('/users/update', data);
};

export const GetUserInfo = (id) => {
  return httpApi.get(`/users/view/${id}`);
};

export const PostImage = (data) => {
  return api.post('/users/image', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const PostProfileImage = () => {
  return api.post('/users/updateImg');
};
