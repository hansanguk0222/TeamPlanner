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
  CHANGE_CARD_ORDER_ERROR,
  CHANGE_CARD_ORDER_REQUEST,
  CHANGE_CARD_ORDER_SUCCESS,
  changeCardOrderError,
  changeCardOrderRequest,
  changeCardOrderSuccess,
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
  | ReturnType<typeof createCardError>
  | ReturnType<typeof changeCardOrderRequest>
  | ReturnType<typeof changeCardOrderSuccess>
  | ReturnType<typeof changeCardOrderError>;

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
  changeCardOrder: {
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
        createCard: {
          loading: false,
          err,
        },
      };
    }
    case CHANGE_CARD_ORDER_REQUEST: {
      return {
        ...state,
        changeCardOrder: {
          loading: true,
          err: null,
        },
      };
    }
    case CHANGE_CARD_ORDER_SUCCESS: {
      const { beforeCardListId, card, nowCardListId } = action.payload;
      if (state.cardListLump) {
        if (beforeCardListId === nowCardListId) {
          const tempCardList = state.cardListLump.find((cardList) => cardList.id === nowCardListId);
          if (tempCardList) {
            const cards = tempCardList?.cards?.filter((beforeCard) => beforeCard.id !== card.id);
            if (cards) {
              const rightBeforeCardIdx = cards.findIndex((beforeCard) => beforeCard.cardOrder === card.cardOrder);
              cards.splice(rightBeforeCardIdx, 0, card);
              tempCardList.cards = [...cards];
              const cardListLump = state.cardListLump.map((cardList) => {
                if (cardList.id === tempCardList?.id) {
                  return tempCardList;
                }
                return cardList;
              });
              return {
                ...state,
                changeCardOrder: {
                  loading: false,
                  err: null,
                },
                cardListLump,
              };
            }
          }
        } else {
          const beforeCardList = state.cardListLump?.find((cardList) => cardList.id === beforeCardListId);
          const nowCardList = state.cardListLump?.find((cardList) => cardList.id === nowCardListId);
          console.log(beforeCardList, nowCardList);
          if (beforeCardList && nowCardList) {
            const newBeforeCardList = {
              ...beforeCardList,
              cardCount: beforeCardList.cardCount - 1,
              cards: beforeCardList.cards?.filter((beforeCard) => beforeCard.id !== card.id),
            };
            const rightBeforeCardIdx = nowCardList.cards?.findIndex((nowCard) => nowCard.cardOrder > card.cardOrder);
            console.log(newBeforeCardList, rightBeforeCardIdx);
            if (rightBeforeCardIdx !== undefined && nowCardList.cards) {
              nowCardList.cards.splice(rightBeforeCardIdx, 0, card);
              const newNowCardList = {
                ...nowCardList,
                cardCount: nowCardList.cardCount + 1,
                cards: nowCardList.cards,
              };
              console.log(newNowCardList);
              if (state.cardListLump) {
                const cardListLump = [...state.cardListLump];
                const changeBeforeCardListIdx = cardListLump.findIndex((cardList) => cardList.id === newBeforeCardList.id);
                const changeNowCardListIdx = cardListLump.findIndex((cardList) => cardList.id === nowCardList.id);
                if (changeBeforeCardListIdx !== undefined && changeNowCardListIdx !== undefined) {
                  cardListLump.splice(changeBeforeCardListIdx, 1, newBeforeCardList).splice(changeNowCardListIdx, 1, newNowCardList);
                  console.log(cardListLump);
                  return {
                    ...state,
                    changeCardOrder: {
                      loading: false,
                      err: null,
                    },
                    cardListLump,
                  };
                }
              }
            }
          }
        }
      }

      return state;
    }
    default: {
      return state;
    }
  }
};

export default cardListReducers;
