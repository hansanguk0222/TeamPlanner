import { all, fork, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  GET_CARDlISTLUMP_ERROR,
  GET_CARDlISTLUMP_SUCCESS,
  GET_CARDlISTLUMP_REQUEST,
  getCardListLumpRequest,
  CREATE_CARDLIST_ERROR,
  CREATE_CARDLIST_REQUEST,
  CREATE_CARDLIST_SUCCESS,
  CREATE_CARD_ERROR,
  CREATE_CARD_REQUEST,
  CREATE_CARD_SUCCESS,
  createCardRequest,
  createCardListRequest,
  CHANGE_CARD_ORDER_ERROR,
  CHANGE_CARD_ORDER_REQUEST,
  CHANGE_CARD_ORDER_SUCCESS,
  changeCardOrderRequest,
} from '@/store/actions/cardList.actions';
import { cardListService, cardService } from '@/services';
import { Card, CardList } from '@/types';

function* getCardListLump({ payload }: ReturnType<typeof getCardListLumpRequest>) {
  try {
    const { teamId } = payload;
    const { data, status } = yield call(cardListService.getCardListLump, { teamId });
    const { cardLists } = data;
    if (status === 200) {
      const getCardListLumpAPIResults = yield all(
        cardLists.map((cardList: CardList) => {
          return call(cardService.getCardsOnCardList, { cardListId: cardList.id });
        }),
      );
      const cardListLump = getCardListLumpAPIResults.map((cardListLumpResult: any, idx: number) => {
        const { data } = cardListLumpResult;
        const { cards } = data;
        cardLists[idx].cards = cards;
        return cardLists[idx];
      });
      yield put({ type: GET_CARDlISTLUMP_SUCCESS, payload: { cardListLump } });
    }
  } catch (err) {
    yield put({ type: GET_CARDlISTLUMP_ERROR, payload: { err } });
  }
}

function* watchGetCardListLump() {
  yield takeEvery(GET_CARDlISTLUMP_REQUEST, getCardListLump);
}

function* createCardList({ payload }: ReturnType<typeof createCardListRequest>) {
  try {
    const { cardListName, teamId } = payload;
    const { data, status } = yield call(cardListService.createCardList, { cardListName, teamId });
    const { id } = data;
    if (status === 201) {
      const cardList: CardList = {
        cardCount: 0,
        cardListName,
        id,
        teamId,
        cards: [],
      };
      yield put({ type: CREATE_CARDLIST_SUCCESS, payload: { cardList } });
    }
  } catch (err) {
    yield put({ type: CREATE_CARDLIST_ERROR, payload: { err } });
  }
}

function* watchCreateCardList() {
  yield takeLatest(CREATE_CARDLIST_REQUEST, createCardList);
}

function* createCard({ payload }: ReturnType<typeof createCardRequest>) {
  try {
    const { cardListId, content, cardOrder } = payload;
    const { data, status } = yield call(cardService.createCard, { cardOrder, content, cardListId });
    const { id } = data;
    if (status === 201) {
      const card: Card = {
        cardListId,
        content,
        id,
        cardOrder,
      };
      yield put({ type: CREATE_CARD_SUCCESS, payload: { card } });
    }
  } catch (err) {
    yield put({ type: CREATE_CARD_ERROR, payload: { err } });
  }
}

function* watchCreateCard() {
  yield takeEvery(CREATE_CARD_REQUEST, createCard);
}

function* changeCardOrder({ payload }: ReturnType<typeof changeCardOrderRequest>) {
  try {
    const { beforeCardListId, nowCardListId, cardOrder, moveCnt, teamId, cardId, content } = payload;
    const { status } = yield call(cardService.changeCardOrder, { beforeCardListId, nowCardListId, cardOrder, moveCnt, teamId, cardId });
    if (status === 200) {
      const card: Card = {
        cardListId: nowCardListId,
        content,
        id: cardId,
        cardOrder,
      };
      yield put({ type: CHANGE_CARD_ORDER_SUCCESS, payload: { card, beforeCardListId, nowCardListId } });
    }
  } catch (err) {
    yield put({ type: CHANGE_CARD_ORDER_ERROR, payload: { err } });
  }
}

function* watchChangeCardOrder() {
  yield takeEvery(CHANGE_CARD_ORDER_REQUEST, changeCardOrder);
}

export default function* cardListSaga(): Generator {
  yield all([fork(watchGetCardListLump), fork(watchCreateCardList), fork(watchCreateCard), fork(watchChangeCardOrder)]);
}
