import API from '@/api';

export const userService = {
  getUser({ userId }: { userId: number }) {
    return API.get(`/api/users/${userId}`);
  },
};
