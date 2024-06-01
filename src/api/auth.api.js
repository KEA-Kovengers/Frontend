import axios from 'axios';
import api from './api';

export const GetLogin = (code) => {
  return axios.get(`${import.meta.env.VITE_BASE_URL}/users/auth/login?code=${code}`);
};

export const PostWithdraw = (token) => {
  return api.post('/users/auth/withdraw?Authorization=${token}');
};

export const GetAuthValidate = () => {
  return api.get('/users/auth/validate');
};

export const PostWithdraw1 = () => {
  return api.post(`/users/auth/withdraw`);
};