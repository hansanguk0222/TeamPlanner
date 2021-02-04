import CardListLumpBox from '@/components/CardListLumpBox/CardListLumpBox';
import {
  GET_CARDlISTLUMP_ERROR,
  getCardListLumpError,
  GET_CARDlISTLUMP_SUCCESS,
  getCardListLumpSuccess,
  GET_CARDlISTLUMP_REQUEST,
  getCardListLumpRequest,
  CREATE_CARD_ERROR,
  CREATE_CARD_REQUEST,
  CREATE_CARD_SUCCESS,
  CREATE_CARDLIST_ERROR,
  CREATE_CARDLIST_REQUEST,
  CREATE_CARDLIST_SUCCESS,
  createCardError,
  createCardSuccess,
  createCardRequest,
  createCardListError,
  createCardListRequest,
  createCardListSuccess,
} from '@/store/actions/cardList.actions';
import { CardListStatus } from '@/types';

type cardListActionType =
  | ReturnType<typeof getCardListLumpRequest>
  | ReturnType<typeof getCardListLumpSuccess>
  | ReturnType<typeof getCardListLumpError>
  | ReturnType<typeof createCardListRequest>
  | ReturnType<typeof createCardListSuccess>
  | ReturnType<typeof createCardListError>
  | ReturnType<typeof createCardRequest>
  | ReturnType<typeof createCardSuccess>
  | ReturnType<typeof createCardError>;

const initialState: CardListStatus = {
  getCardListLump: {
    loading: false,
    err: null,
  },
  createCard: {
    loading: false,
    err: null,
  },
  createCardList: {
    loading: false,
    err: null,
  },
  cardListLump: null,
};

const cardListReducers = (state: CardListStatus = initialState, action: cardListActionType) => {
  switch (action.type) {
    case GET_CARDlISTLUMP_REQUEST: {
      return {
        ...state,
        getCardListLump: {
          loading: true,
          err: null,
        },
        cardListLump: null,
      };
    }
    case GET_CARDlISTLUMP_SUCCESS: {
      const { cardListLump } = action.payload;
      return {
        ...state,
        getCardListLump: {
          loading: false,
          err: null,
        },
        cardListLump,
      };
    }
    case GET_CARDlISTLUMP_ERROR: {
      const { err } = action.payload;
      return {
        ...state,
        getCardListLump: {
          loading: false,
          err,
        },
      };
    }
    case CREATE_CARDLIST_REQUEST: {
      return {
        ...state,
        createCardList: {
          loading: true,
          err: null,
        },
      };
    }
    case CREATE_CARDLIST_SUCCESS: {
      const { cardList } = action.payload;
      return {
        ...state,
        createCardList: {
          loading: false,
          err: null,
        },
        cardListLump: state.cardListLump?.concat(cardList),
      };
    }
    case CREATE_CARDLIST_ERROR: {
      const { err } = action.payload;
      return {
        ...state,
        createCard: {
          loading: false,
          err,
        },
      };
    }
    case CREATE_CARD_REQUEST: {
      return {
        ...state,
        createCard: {
          loading: false,
          err: null,
        },
      };
    }
    case CREATE_CARD_SUCCESS: {
      const { card } = action.payload;
      const cardListLump = state.cardListLump?.map((cardList) => {
        if (cardList.id === card.cardListId) {
          cardList.cardCount += 1;
          cardList.cards?.push(card);
        }
        return cardList;
      });
      return {
        ...state,
        createCard: {
          loading: false,
          err: null,
        },
        cardListLump,
      };
    }
    case CREATE_CARD_ERROR: {
      const { err } = action.payload;
      return {
        ...state,
        loading: false,
        err,
      };
    }
    default: {
      return state;
    }
  }
};

export default cardListReducers;
