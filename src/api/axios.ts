import axios from 'axios';
import qs from 'qs';
import { addAxiosDateTransformer } from 'axios-date-transformer';

const _instance = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER_BASE_URL,
  withCredentials: true,
  paramsSerializer: (params) => qs.stringify(params),
});

const axiosInstance = addAxiosDateTransformer(_instance);

axiosInstance.interceptors.request.use(
  (config) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    if (apiKey) config.headers['x-api-key'] = `${apiKey}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
