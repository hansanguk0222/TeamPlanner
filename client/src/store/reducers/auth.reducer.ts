import * as authActions from '@/store/actions/auth.action';
import { AuthState, LoginPayload, LoginSuccessPayload, LoginErrorPayload } from '@/types';
import { AxiosError } from 'axios';

interface authActionType {
  type: string;
  payload: {
    accessToken?: string | null;
    refreshToken?: string | null;
    err: AxiosError | null;
  };
}
const initialState: AuthState = {
  loading: false,
  err: null,
  accessToken: null,
  refreshToken: null,
};

const authReducers = (state: AuthState = initialState, action: authActionType) => {
  const { type, payload } = action;
  switch (type) {
    case authActions.LOGIN_REQUEST: {
      return {
        ...state,
        loading: true,
        err: null,
      };
    }
    case authActions.LOGIN_SUCCESS: {
      const { accessToken, refreshToken } = payload;
      return {
        ...state,
        loading: false,
        accessToken,
        refreshToken,
      };
    }
    case authActions.LOGIN_ERROR: {
      const { err } = payload;
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

export default authReducers;
