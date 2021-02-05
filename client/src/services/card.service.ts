import API from '@/api';

export const cardService = {
  getCardsOnCardList({ cardListId }: { cardListId: number }) {
    return API.get(`/api/cards/cardLists/${cardListId}`);
  },
  createCard({ cardListId, content, cardOrder }: { cardListId: number; content: string; cardOrder: number }) {
    return API.post(`/api/cards/cardLists/${cardListId}`, { content, cardOrder });
  },
  changeCardOrder({
    beforeCardListId,
    nowCardListId,
    cardOrder,
    moveCnt,
    teamId,
    cardId,
  }: {
    beforeCardListId: number;
    nowCardListId: number;
    cardOrder: number;
    moveCnt: number;
    teamId: number;
    cardId: number;
  }) {
    return API.post(`/api/cards/${cardId}/order`, { beforeCardListId, nowCardListId, cardOrder, moveCnt, teamId });
  },
};
