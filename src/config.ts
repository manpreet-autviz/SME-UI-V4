import axios from 'axios';

const API_URL   = axios.create({
  baseURL: 'https://dev.api.shirikihub.com/api/v1/',
});

export default API_URL 