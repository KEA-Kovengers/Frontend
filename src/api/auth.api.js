import axios from 'axios';
import api from './api';

export const GetLogin = (code) => {
  return axios.get(`${import.meta.env.VITE_BASE_URL}/users/auth/login?code=${code}`);
};

export const PostWithdraw = () => {
  return api.post('/users/users/auth/withdraw');
};

export const GetAuthValidate = () => {
  return api.get('/users/users/auth/validate');
};
