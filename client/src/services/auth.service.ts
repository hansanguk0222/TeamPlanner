import axios from 'axios';

export const authService = {
  login({ email, pw }: { email: string; pw: string }) {
    return axios.post('/api/auth/login', { email, pw });
  },
  overlapEmail({ email }: { email: string }) {
    return axios.post('/api/auth/email/join', { email });
  },
  join({ email, pw, nickname }: { email: string; pw: string; nickname: string }) {
    return axios.post('/api/auth/join', { email, pw, nickname });
  },
  authorizeEmail({ email }: { email: string }) {
    return axios.post('/api/auth/email/code', { email });
  },
};
