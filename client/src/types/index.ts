import { AxiosError } from 'axios';
import 'react-dnd';

declare module 'react-dnd' {
  export interface DragObjectWithType {
    id: number;
    content: string;
    cardListId: number;
  }
}

export interface AuthState {
  login: {
    loading: boolean;
    err: AxiosError | null;
    status: number | null;
  };
  logout: {
    loading: boolean;
    err: AxiosError | null;
    status: number | null;
  };
}

export interface LoginPayload {
  email: string;
  pw: string;
}

export interface LoginSuccessPayload {
  status: number;
}

export interface LoginErrorPayload {
  status: number;
  err: AxiosError;
}

export interface LogoutSuccessPayload {
  status: number;
}

export interface LogoutErrorPayload {
  status: number;
  err: AxiosError;
}

export interface SignupState {
  overlapEmail: {
    loading: boolean;
    err: AxiosError | null;
    isNotExistEmail: boolean | null;
  };
  authorizeEmail: {
    loading: boolean;
    err: AxiosError | null;
    authorizeCode: string | null;
  };
  join: {
    loading: boolean;
    err: AxiosError | null;
    isJoinOk: boolean | null;
  };
}

export interface SignupOverlapEmailPayload {
  email: string;
}

export interface SignupOverlapEmailErrorPayload {
  err: AxiosError;
}

export interface AuthorizeEmailPayload {
  email: string;
}

export interface AuthorizeEmailSuccessPayload {
  authorizeCode: string;
}

export interface AuthorizeEmailErrorPayload {
  err: AxiosError;
}

export interface JoinRequestPayload {
  email: string;
  pw: string;
  nickname: string;
}

export interface JoinErrorPayload {
  err: AxiosError;
}

export interface Team {
  id: number;
  teamName: string;
  moveCnt: number;
  joinUsers: User[];
}

export interface User {
  id: number;
  email: string;
  nickname: string;
  profileImage: string;
}

export interface UserState {
  getUser: {
    loading: boolean;
    err: AxiosError | null;
  };
  user: User | null;
}

export interface TeamState {
  getTeamList: {
    loading: boolean;
    err: AxiosError | null;
  };
  checkJoinedUser: {
    loading: boolean;
    err: AxiosError | null;
    status: number | null;
  };
  teamList: Team[] | null;
}

export interface GetTeamListRequestPayload {
  firstLoad: boolean;
}

export interface GetTeamListSuccessPayload {
  teamList: Team[];
  firstLoad: boolean;
}

export interface GetTeamListErrorPayload {
  err: AxiosError;
}

export interface GetUserSuccessPayload {
  user: User;
}

export interface GetUserErrorPayload {
  err: AxiosError;
}

export interface CheckJoinedUserRequestPayload {
  userId: number;
  teamId: number;
}

export interface CheckJoinedUserSuccessPayload {
  status: number;
}

export interface CheckJoinedUserErrorPayload {
  err: AxiosError;
}

export interface Card {
  id: number;
  content: string;
  cardListId: number;
  cardOrder: number;
}

export interface CardList {
  id: number;
  cardListName: string;
  teamId: number;
  cardCount: number;
  cards?: Card[];
}

export interface CardListStatus {
  getCardListLump: {
    loading: boolean;
    err: AxiosError | null;
  };
  createCardList: {
    loading: boolean;
    err: AxiosError | null;
  };
  createCard: {
    loading: boolean;
    err: AxiosError | null;
  };
  changeCardOrder: {
    loading: boolean;
    err: AxiosError | null;
  };
  cardListLump: CardList[] | null;
}

export interface GetCardListLumpRequestPayload {
  teamId: number;
}

export interface GetCardListLumpSuccessPayload {
  cardListLump: CardList[];
}

export interface GetCardListLumpErrorPayload {
  err: AxiosError;
}

export interface CreateCardListRequestPayload {
  cardListName: string;
  teamId: number;
}

export interface CreateCardListSuccessPayload {
  cardList: CardList;
}

export interface CreateCardListErrorPayload {
  err: AxiosError;
}

export interface CreateCardRequestPayload {
  cardListId: number;
  content: string;
  cardOrder: number;
}

export interface CreateCardSuccessPayload {
  card: Card;
}

export interface CreateCardErrorPayload {
  err: AxiosError;
}

export interface ChangeCardOrderRequestPayload {
  cardId: number;
  beforeCardListId: number;
  nowCardListId: number;
  moveCnt: number;
  teamId: number;
  cardOrder: number;
  content: string;
}

export interface ChangeCardOrderSuccessPayload {
  card: Card;
  beforeCardListId: number;
  nowCardListId: number;
}

export interface ChangeCardOrderErrorPayload {
  err: AxiosError;
}

export interface UpdateTeamMoveCntPayload {
  teamId: number;
}

export interface PopoverProps {
  width: number;
  anchorEl: React.MutableRefObject<any>;
  anchorOrigin: { anchorVertical: string; anchorHorizontal: string };
  offset: { x: number; y: number };
  transformOrigin: { transformVertical: string; transformHorizontal: string };
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  popoverItems: Array<{ name: string; callback?: () => void }>;
}

export interface HandleMyInformPopupVisibleType {
  handleMyInformPopupVisible: () => void;
}

export interface URLParams {
  teamId: string | undefined;
}

export type AuthToken = 'ACCESS' | 'REFRESH';
