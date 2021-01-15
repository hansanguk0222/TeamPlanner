import {
  AUTHORIZE_EMAIL_ERROR,
  AUTHORIZE_EMAIL_SUCCESS,
  AUTHORIZE_EMAIL_REQUEST,
  AUTHORIZE_EMAIL_INITIALIZE,
  SIGNUP_OVERLAP_ERROR,
  SIGNUP_OVERLAP_SUCCESS,
  SIGNUP_OVERLAP_REQUEST,
  SIGNUP_OVERLAP_INITIALIZE,
  authorizeEmailError,
  authorizeEmailRequest,
  authorizeEmailSuccess,
  authorizeEmailInitialize,
  signUpOverlapError,
  signUpOverlapRequest,
  signUpOverlapSuccess,
  signUpOverlapInitialize,
  JOIN_ERROR,
  JOIN_SUCCESS,
  JOIN_REQUEST,
  joinRequest,
  joinError,
  joinSuccess,
} from '@/store/actions/signup.action';
import { SignUpState } from '@/types';

type signUpActionType =
  | ReturnType<typeof authorizeEmailRequest>
  | ReturnType<typeof authorizeEmailSuccess>
  | ReturnType<typeof authorizeEmailError>
  | ReturnType<typeof authorizeEmailInitialize>
  | ReturnType<typeof signUpOverlapRequest>
  | ReturnType<typeof signUpOverlapSuccess>
  | ReturnType<typeof signUpOverlapError>
  | ReturnType<typeof signUpOverlapInitialize>
  | ReturnType<typeof joinRequest>
  | ReturnType<typeof joinError>
  | ReturnType<typeof joinSuccess>;

const initialState: SignUpState = {
  overlap: {
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

const signUpReducers = (state: SignUpState = initialState, action: signUpActionType) => {
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
    case SIGNUP_OVERLAP_REQUEST: {
      return {
        ...state,
        overlap: {
          loading: true,
          err: null,
        },
      };
    }
    case SIGNUP_OVERLAP_SUCCESS: {
      return {
        ...state,
        overlap: {
          loading: false,
          err: null,
          isNotExistEmail: true,
        },
      };
    }
    case SIGNUP_OVERLAP_ERROR: {
      const { err } = action.payload;
      return {
        ...state,
        overlap: {
          loading: false,
          err,
          isNotExistEmail: false,
        },
      };
    }
    case SIGNUP_OVERLAP_INITIALIZE: {
      return {
        ...state,
        overlap: {
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
