import axios from 'axios';
import api from './http.api';

export const GetLogin = (code) => {
  return axios.get(`${import.meta.env.VITE_BASE_URL}/users/users/auth/login?code=${code}`);
  // return axios.get('http://localhost:8080/users/users/auth/login?code=' + code);
};

export const PostLogout = () => {
  return api.post('/users/users/auth/logout');
};

export const PostWithdraw = () => {
  return api.post('/users/users/auth/withdraw');
};

export const GetAuthValidate = () => {
  return api.get('/users/users/auth/validate');
};
