import axios from 'axios';

export const GetLogin = (code) => {
  return axios.get(`http://172.16.211.21/users/users/auth/login?code=${code}`);
};
