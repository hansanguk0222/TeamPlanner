import API from '@/api';

export const cardService = {
  getCardsOnCardList({ cardListId }: { cardListId: number }) {
    return API.get(`/api/cards/cardLists/${cardListId}`);
  },
  createCard({ cardListId, content, cardOrder }: { cardListId: number; content: string; cardOrder: number }) {
    return API.post(`/api/cards/cardLists/${cardListId}`, { content, cardOrder });
  },
};
