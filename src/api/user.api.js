import api from './http.api';

export const PostUserInfo = (data) => {
  return api.post('/users/users/update', data);
};

export const GetUserInfo = (id) => {
  return api.get(`/users/users/${id}`);
};
