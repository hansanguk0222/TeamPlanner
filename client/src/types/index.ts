import { AxiosError } from 'axios';

export interface AuthState {
  login: {
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

export interface SignUpState {
  overlap: {
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

export interface SignUpOverlapPayload {
  email: string;
}

export interface SignUpOverlapErrorPayload {
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

export type AuthToken = 'ACCESS' | 'REFRESH';
