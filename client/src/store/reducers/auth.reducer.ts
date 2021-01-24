import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  loginRequest,
  loginSuccess,
  loginError,
  logoutRequest,
  logoutSuccess,
  logoutError,
} from '@/store/actions/auth.action';
import { AuthState } from '@/types';

type authActionType =
  | ReturnType<typeof loginRequest>
  | ReturnType<typeof loginSuccess>
  | ReturnType<typeof loginError>
  | ReturnType<typeof logoutRequest>
  | ReturnType<typeof logoutSuccess>
  | ReturnType<typeof logoutError>;

const initialState: AuthState = {
  login: {
    loading: false,
    err: null,
    status: null,
  },
  logout: {
    loading: false,
    err: null,
    status: null,
  },
};

const authReducers = (state: AuthState = initialState, action: authActionType) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        login: {
          loading: true,
          err: null,
          status: null,
        },
      };
    }
    case LOGIN_SUCCESS: {
      const { status } = action.payload;
      return {
        ...state,
        login: {
          loading: false,
          err: null,
          status,
        },
      };
    }
    case LOGIN_ERROR: {
      const { status, err } = action.payload;
      return {
        ...state,
        login: {
          loading: false,
          err,
          status,
        },
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logout: {
          loading: true,
          err: null,
          status: null,
        },
      };
    }
    case LOGOUT_SUCCESS: {
      const { status } = action.payload;
      return {
        ...state,
        logout: {
          loading: false,
          status,
          err: null,
        },
      };
    }
    case LOGOUT_ERROR: {
      const { status, err } = action.payload;
      return {
        ...state,
        logout: {
          loading: false,
          status,
          err,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default authReducers;
