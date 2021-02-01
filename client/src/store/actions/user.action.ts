import { GetUserSuccessPayload, GetUserErrorPayload } from '@/types';

export const GET_USER_REQUEST = 'user/GET_USER_REQUEST' as const;
export const GET_USER_SUCCESS = 'user/GET_USER_SUCCESS' as const;
export const GET_USER_ERROR = 'user/GET_USER_ERROR' as const;

export const getUserRequest = () => ({
  type: GET_USER_REQUEST,
});

export const getUserSuccess = ({ user }: GetUserSuccessPayload) => ({
  type: GET_USER_SUCCESS,
  payload: { user },
});

export const getUserError = ({ err }: GetUserErrorPayload) => ({
  type: GET_USER_ERROR,
  payload: { err },
});
