import axios from 'axios';
import config from '../config.json'

const axiosInstance = axios.create({
  baseURL: config.API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;
