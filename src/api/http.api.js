import axios from 'axios';
import Cookies from 'js-cookie';

export const baseUrl = () => {
  return import.meta.env.VITE_BASE_URL;
  // return 'http://localhost:8080';
};

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    common: {
      'Content-Type': 'application/json',
    },
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    // const accessToken = localStorage.getItem("accessToken");
    const tokenString = Cookies.get('token');
    let accessToken = null;

    if (tokenString) {
      try {
        const tokenData = JSON.parse(tokenString);
        accessToken = tokenData.token;
      } catch (e) {
        console.error('Error parsing token from cookie:', e);
      }
    }
    console.log('accessToken:', accessToken);
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
  }
  return config;
});

export default api;
