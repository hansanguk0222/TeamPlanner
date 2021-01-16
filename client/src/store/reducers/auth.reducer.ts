import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, loginRequest, loginSuccess, loginError } from '@/store/actions/auth.action';
import { AuthState } from '@/types';

type authActionType = ReturnType<typeof loginRequest> | ReturnType<typeof loginSuccess> | ReturnType<typeof loginError>;

const initialState: AuthState = {
  login: {
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
    default: {
      return state;
    }
  }
};

export default authReducers;
