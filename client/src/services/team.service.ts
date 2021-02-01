import API from '@/api';

export const teamService = {
  getTeamList() {
    return API.get('/api/teams');
  },
  isJoinedUser({ teamId, userId }: { teamId: number; userId: number }) {
    return API.get(`/api/teams/${teamId}/authentication/users/${userId}`);
  },
};
