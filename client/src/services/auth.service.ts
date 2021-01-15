import axios from 'axios';

export const authService = {
  login({ email, pw }: { email: string; pw: string }) {
    return axios.post('/api/auth/login', { email, pw });
  },
  overlap({ email }: { email: string }) {
    return axios.post('/api/auth/email/existance', { email });
  },
  join({ email, pw, nickname }: { email: string; pw: string; nickname: string }) {
    return axios.post('/api/auth/sign-up', { email, pw, nickname });
  },
  authorizeEmail({ email }: { email: string }) {
    return axios.post('/api/auth/email/code', { email });
  },
};
