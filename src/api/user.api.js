import api from './http.api';

export const PostUserInfo = (data) => {
  return api.post('/users/users/update', data);
};

export const GetUserInfo = (id) => {
  return api.get(`/users/users/${id}`);
};

export const PostImage = (data) => {
  return api.post('/users/users/image', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const PostProfileImage = () => {
  return api.post('/users/users/updateImg');
};
