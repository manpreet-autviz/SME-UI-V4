import axios from 'axios';

const instance   = axios.create({
  baseURL: 'https://dev.api.shirikihub.com/api/v1/',
});

// Add a request interceptor to set token in header
instance .interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
   
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance