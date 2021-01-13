import axios from 'axios';

export const authService = {
  login({ email, pw }: { email: string; pw: string }) {
    return axios.post('/api/auth/login', { email, pw });
  },
};
