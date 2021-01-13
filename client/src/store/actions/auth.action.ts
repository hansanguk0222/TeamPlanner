import { LoginPayload, LoginSuccessPayload, LoginErrorPayload } from '@/types';

export const LOGIN_REQUEST = 'auth/LOGIN_REQUEST' as const;
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS' as const;
export const LOGIN_ERROR = 'auth/LOGIN_ERROR' as const;

export const loginRequest = ({ email, pw }: LoginPayload) => ({
  type: LOGIN_REQUEST,
  payload: { email, pw },
});

export const loginSuccess = ({ accessToken, refreshToken }: LoginSuccessPayload) => ({
  type: LOGIN_SUCCESS,
  payload: { accessToken, refreshToken },
});

export const loginError = ({ err }: LoginErrorPayload) => ({
  type: LOGIN_ERROR,
  payload: { err },
});
