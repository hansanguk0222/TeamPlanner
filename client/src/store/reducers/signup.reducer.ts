import {
  AUTHORIZE_EMAIL_ERROR,
  AUTHORIZE_EMAIL_SUCCESS,
  AUTHORIZE_EMAIL_REQUEST,
  AUTHORIZE_EMAIL_INITIALIZE,
  SIGNUP_OVERLAPEMAIL_ERROR,
  SIGNUP_OVERLAPEMAIL_SUCCESS,
  SIGNUP_OVERLAPEMAIL_REQUEST,
  SIGNUP_OVERLAPEMAIL_INITIALIZE,
  authorizeEmailError,
  authorizeEmailRequest,
  authorizeEmailSuccess,
  authorizeEmailInitialize,
  signupOverlapEmailError,
  signupOverlapEmailRequest,
  signupOverlapEmailSuccess,
  signupOverlapEmailInitialize,
  JOIN_ERROR,
  JOIN_SUCCESS,
  JOIN_REQUEST,
  joinRequest,
  joinError,
  joinSuccess,
} from '@/store/actions/signup.action';
import { SignupState } from '@/types';

type signUpActionType =
  | ReturnType<typeof authorizeEmailRequest>
  | ReturnType<typeof authorizeEmailSuccess>
  | ReturnType<typeof authorizeEmailError>
  | ReturnType<typeof authorizeEmailInitialize>
  | ReturnType<typeof signupOverlapEmailRequest>
  | ReturnType<typeof signupOverlapEmailSuccess>
  | ReturnType<typeof signupOverlapEmailError>
  | ReturnType<typeof signupOverlapEmailInitialize>
  | ReturnType<typeof joinRequest>
  | ReturnType<typeof joinError>
  | ReturnType<typeof joinSuccess>;

const initialState: SignupState = {
  overlapEmail: {
    loading: false,
    err: null,
    isNotExistEmail: null,
  },
  authorizeEmail: {
    loading: false,
    err: null,
    authorizeCode: null,
  },
  join: {
    loading: false,
    err: null,
    isJoinOk: false,
  },
};

const signUpReducers = (state: SignupState = initialState, action: signUpActionType) => {
  switch (action.type) {
    case JOIN_REQUEST: {
      return {
        ...state,
        join: {
          loading: true,
          err: null,
        },
      };
    }
    case JOIN_SUCCESS: {
      return {
        ...state,
        join: {
          loading: false,
          err: null,
          isJoinOk: true,
        },
      };
    }
    case JOIN_ERROR: {
      const { err } = action.payload;
      return {
        ...state,
        join: {
          loading: false,
          err,
          isJoinOk: false,
        },
      };
    }
    case SIGNUP_OVERLAPEMAIL_REQUEST: {
      return {
        ...state,
        overlapEmail: {
          loading: true,
          err: null,
        },
      };
    }
    case SIGNUP_OVERLAPEMAIL_SUCCESS: {
      return {
        ...state,
        overlapEmail: {
          loading: false,
          err: null,
          isNotExistEmail: true,
        },
      };
    }
    case SIGNUP_OVERLAPEMAIL_ERROR: {
      const { err } = action.payload;
      return {
        ...state,
        overlapEmail: {
          loading: false,
          err,
          isNotExistEmail: false,
        },
      };
    }
    case SIGNUP_OVERLAPEMAIL_INITIALIZE: {
      console.log('초기화');
      return {
        ...state,
        overlapEmail: {
          loading: false,
          err: null,
          isNotExistEmail: null,
        },
      };
    }
    case AUTHORIZE_EMAIL_REQUEST: {
      return {
        ...state,
        authorizeEmail: {
          loading: true,
          err: null,
        },
      };
    }
    case AUTHORIZE_EMAIL_SUCCESS: {
      const { authorizeCode } = action.payload;
      return {
        ...state,
        authorizeEmail: {
          loading: false,
          err: null,
          authorizeCode,
        },
      };
    }
    case AUTHORIZE_EMAIL_ERROR: {
      const { err } = action.payload;
      return {
        ...state,
        authorizeEmail: {
          loading: false,
          err,
        },
      };
    }
    case AUTHORIZE_EMAIL_INITIALIZE: {
      return {
        ...state,
        authorizeEmail: {
          loading: false,
          err: null,
          authorizecode: null,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default signUpReducers;
