import axios from 'axios';

export const baseUrl = () => {
  return import.meta.env.VITE_BASE_URL;
};

const httpApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    common: {
      'Content-Type': 'application/json',
    },
  },
});

export default httpApi;
