import axios from 'axios';
import { ACCESS_TOKEN } from '../redux/constants/auth';

const baseUrl = 'http://localhost:5500';

const api = axios.create({ baseURL: baseUrl });

api.interceptors.request.use(
    config => {
      let accessToken = localStorage.getItem(ACCESS_TOKEN);
      if (!accessToken) {
        accessToken = sessionStorage.getItem(ACCESS_TOKEN);
      }
      if (!accessToken) {
        accessToken = "NO_TOKEN";
      }
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    err => Promise.reject(err)
  );
  
const apiCalls = {
    login: data => api.post('/user/login', data),
    register: data => api.post('/user/signup', data),
    getCurrentUser: () => api.get('/user/current-user'),
    logout: token => api.delete(`/user/logout/${token}`),
    getUserProfile: user_id => api.get(`/user/profile/${user_id}`),
    createUserProfile: data => api.post('/user/profile', data),
}  

export default apiCalls;
