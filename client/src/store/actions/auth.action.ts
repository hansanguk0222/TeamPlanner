import { LoginPayload, LoginSuccessPayload, LoginErrorPayload, LogoutSuccessPayload, LogoutErrorPayload } from '@/types';

export const LOGIN_REQUEST = 'auth/LOGIN_REQUEST' as const;
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS' as const;
export const LOGIN_ERROR = 'auth/LOGIN_ERROR' as const;
export const LOGOUT_REQUEST = 'auth/LOGOUT_REQUEST' as const;
export const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS' as const;
export const LOGOUT_ERROR = 'auth/LOGOUT_ERROR' as const;

export const loginRequest = ({ email, pw }: LoginPayload) => ({
  type: LOGIN_REQUEST,
  payload: { email, pw },
});

export const loginSuccess = ({ status }: LoginSuccessPayload) => ({
  type: LOGIN_SUCCESS,
  payload: { status },
});

export const loginError = ({ status, err }: LoginErrorPayload) => ({
  type: LOGIN_ERROR,
  payload: { status, err },
});

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

export const logoutSuccess = ({ status }: LogoutSuccessPayload) => ({
  type: LOGOUT_SUCCESS,
  payload: { status },
});

export const logoutError = ({ status, err }: LogoutErrorPayload) => ({
  type: LOGOUT_ERROR,
  payload: { status, err },
});
