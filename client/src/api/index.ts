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

instance.interceptors.response.use(
  (res) => {
    if (res.status >= 400) {
      console.error('api 요청 실패', res);
    }
    return res;
  },
  (err) => {
    if (axios.isCancel(err)) {
      console.error('요청 취소', err);
    } else {
      if (err?.response?.status === 401) {
        window.location.href = '/login';
      }
      console.error('api 에러', err);
    }

    return Promise.reject(err);
  },
);
export default instance;
