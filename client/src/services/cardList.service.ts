import API from '@/api';

export const cardListService = {
  getCardListLump({ teamId }: { teamId: number }) {
    return API.get(`/api/cardLists/team/${teamId}`);
  },
  createCardList({ cardListName, teamId }: { cardListName: string; teamId: number }) {
    return API.post(`/api/cardLists/team/${teamId}`, { cardListName });
  },
};
