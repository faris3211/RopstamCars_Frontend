import axios from 'axios';
import { getUserFromLocalStorage } from './localStorage';

export const publicTypeReq = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const privateTypeReq = axios.create({
  baseURL: 'http://localhost:8000/api',
});

privateTypeReq.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();
  if (user) {
    config.headers.Authorization = user.token;
  }
  return config;
});
