import axios from 'axios';
import { accessTokenVerify } from '@/utils/utils';

const instance = axios.create({
  timeout: 5000,
});

instance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        await accessTokenVerify(accessToken);
        return {
          ...config,
          headers: { ...config.headers, Authorization: `Bearer ${accessToken}` },
        };
      } catch (err) {
        try {
          const { data, status } = await axios.get('/api/auth/token/refresh');

          if (status === 200) {
            localStorage.setItem('accessToken', data.accessToken);
            return {
              ...config,
              headers: { ...config.headers, Authorization: `Bearer ${data.accessToken}` },
            };
          }
        } catch (error) {
          if (error?.response?.status === 401) {
            localStorage.removeItem('accessToken');
            document.cookie = 'refreshTokenKey=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
            window.location.href = '/login';
          }
        }
      }
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

export default instance;
