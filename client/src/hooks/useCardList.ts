import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/reducers';
import { getCardListLumpRequest, createCardListRequest, createCardRequest, changeCardOrderRequest } from '@/store/actions/cardList.actions';
import { useCallback } from 'react';

const useCardList = () => {
  const cardListLump = useSelector((state: RootState) => state.cardListReducers.cardListLump);
  const getCardListLumpError = useSelector((state: RootState) => state.cardListReducers.getCardListLump.err);
  const createCardListError = useSelector((state: RootState) => state.cardListReducers.createCardList.err);
  const createCardError = useSelector((state: RootState) => state.cardListReducers.createCard.err);

  const dispatch = useDispatch();

  const onGetCardListLumpRequest = useCallback(({ teamId }: { teamId: number }) => dispatch(getCardListLumpRequest({ teamId })), [dispatch]);
  const onCreateCardListRequest = useCallback(
    ({ cardListName, teamId }: { cardListName: string; teamId: number }) => dispatch(createCardListRequest({ cardListName, teamId })),
    [dispatch],
  );
  const onCreateCardRequest = useCallback(
    ({ content, cardListId, cardOrder }: { content: string; cardListId: number; cardOrder: number }) =>
      dispatch(createCardRequest({ content, cardListId, cardOrder })),
    [dispatch],
  );

  const onChangeCardOrderRequest = useCallback(
    ({
      teamId,
      beforeCardListId,
      nowCardListId,
      cardOrder,
      moveCnt,
      cardId,
      content,
    }: {
      teamId: number;
      beforeCardListId: number;
      nowCardListId: number;
      cardOrder: number;
      moveCnt: number;
      cardId: number;
      content: string;
    }) => dispatch(changeCardOrderRequest({ teamId, beforeCardListId, nowCardListId, cardOrder, moveCnt, cardId, content })),
    [dispatch],
  );

  return {
    cardListLump,
    getCardListLumpError,
    createCardListError,
    createCardError,
    onGetCardListLumpRequest,
    onCreateCardListRequest,
    onCreateCardRequest,
    onChangeCardOrderRequest,
  };
};

export default useCardList;
