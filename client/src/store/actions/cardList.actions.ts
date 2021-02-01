import {
  GetCardListLumpRequestPayload,
  GetCardListLumpSuccessPayload,
  GetCardListLumpErrorPayload,
  CreateCardListRequestPayload,
  CreateCardListSuccessPayload,
  CreateCardListErrorPayload,
  CreateCardRequestPayload,
  CreateCardSuccessPayload,
  CreateCardErrorPayload,
} from '@/types';

export const GET_CARDlISTLUMP_REQUEST = 'cardList/GET_CARDlISTLUMP_REQUEST' as const;
export const GET_CARDlISTLUMP_SUCCESS = 'cardList/GET_CARDlISTLUMP_SUCCESS' as const;
export const GET_CARDlISTLUMP_ERROR = 'cardList/GET_CARDlISTLUMP_ERROR' as const;
export const CREATE_CARDLIST_REQUEST = 'cardList/CREATE_CARDlIST_REQUEST' as const;
export const CREATE_CARDLIST_SUCCESS = 'cardList/CREATE_CARDLIST_SUCCESS' as const;
export const CREATE_CARDLIST_ERROR = 'cardList/CREATE_CARDLIST_ERROR' as const;
export const CREATE_CARD_REQUEST = 'cardList/CREATE_CARD_REQUEST' as const;
export const CREATE_CARD_SUCCESS = 'cardList/CREATE_CARD_SUCCESS' as const;
export const CREATE_CARD_ERROR = 'cardList/CREATE_CARD_ERROR' as const;

export const getCardListLumpRequest = ({ teamId }: GetCardListLumpRequestPayload) => ({
  type: GET_CARDlISTLUMP_REQUEST,
  payload: { teamId },
});

export const getCardListLumpSuccess = ({ cardListLump }: GetCardListLumpSuccessPayload) => ({
  type: GET_CARDlISTLUMP_SUCCESS,
  payload: { cardListLump },
});

export const getCardListLumpError = ({ err }: GetCardListLumpErrorPayload) => ({
  type: GET_CARDlISTLUMP_ERROR,
  payload: { err },
});

export const createCardListRequest = ({ teamId, cardListName }: CreateCardListRequestPayload) => ({
  type: CREATE_CARDLIST_REQUEST,
  payload: { teamId, cardListName },
});

export const createCardListSuccess = ({ cardList }: CreateCardListSuccessPayload) => ({
  type: CREATE_CARDLIST_SUCCESS,
  payload: { cardList },
});

export const createCardListError = ({ err }: CreateCardListErrorPayload) => ({
  type: CREATE_CARDLIST_ERROR,
  payload: { err },
});

export const createCardRequest = ({ content, cardListId, cardOrder }: CreateCardRequestPayload) => ({
  type: CREATE_CARD_REQUEST,
  payload: { content, cardListId, cardOrder },
});

export const createCardSuccess = ({ card }: CreateCardSuccessPayload) => ({
  type: CREATE_CARD_SUCCESS,
  payload: { card },
});

export const createCardError = ({ err }: CreateCardErrorPayload) => ({
  type: CREATE_CARD_ERROR,
  payload: { err },
});
