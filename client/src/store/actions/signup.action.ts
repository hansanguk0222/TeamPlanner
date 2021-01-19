import {
  SignupOverlapEmailPayload,
  SignupOverlapEmailErrorPayload,
  AuthorizeEmailPayload,
  AuthorizeEmailSuccessPayload,
  AuthorizeEmailErrorPayload,
  JoinRequestPayload,
  JoinErrorPayload,
} from '@/types';

export const SIGNUP_OVERLAPEMAIL_REQUEST = 'signup/SIGNUP_OVERLAP_REQUEST' as const;
export const SIGNUP_OVERLAPEMAIL_SUCCESS = 'signup/SIGNUP_OVERLAP_SUCCESS' as const;
export const SIGNUP_OVERLAPEMAIL_ERROR = 'signup/SIGNUP_OVERLAP_ERROR' as const;
export const SIGNUP_OVERLAPEMAIL_INITIALIZE = 'signup/SIGNUP_OVERLAP_INITIALIZE' as const;
export const AUTHORIZE_EMAIL_REQUEST = 'signup/AUTHORIZE_EMAIL_REQUEST' as const;
export const AUTHORIZE_EMAIL_SUCCESS = 'signup/AUTHORIZE_EMAIL_SUCCESS' as const;
export const AUTHORIZE_EMAIL_ERROR = 'signup/AUTHORIZE_EMAIL_ERROR' as const;
export const AUTHORIZE_EMAIL_INITIALIZE = 'signup/AUTHORIZE_EMAIL_INITIALIZE' as const;
export const JOIN_REQUEST = 'signup/JOIN_REQUEST' as const;
export const JOIN_SUCCESS = 'signup/JOIN_SUCCESS' as const;
export const JOIN_ERROR = 'signup/JOIN_ERROR' as const;

export const signupOverlapEmailRequest = ({ email }: SignupOverlapEmailPayload) => ({
  type: SIGNUP_OVERLAPEMAIL_REQUEST,
  payload: { email },
});

export const signupOverlapEmailSuccess = () => ({
  type: SIGNUP_OVERLAPEMAIL_SUCCESS,
});

export const signupOverlapEmailError = ({ err }: SignupOverlapEmailErrorPayload) => ({
  type: SIGNUP_OVERLAPEMAIL_ERROR,
  payload: { err },
});

export const signupOverlapEmailInitialize = () => ({
  type: SIGNUP_OVERLAPEMAIL_INITIALIZE,
});

export const authorizeEmailRequest = ({ email }: AuthorizeEmailPayload) => ({
  type: AUTHORIZE_EMAIL_REQUEST,
  payload: { email },
});

export const authorizeEmailSuccess = ({ authorizeCode }: AuthorizeEmailSuccessPayload) => ({
  type: AUTHORIZE_EMAIL_SUCCESS,
  payload: { authorizeCode },
});

export const authorizeEmailError = ({ err }: AuthorizeEmailErrorPayload) => ({
  type: AUTHORIZE_EMAIL_ERROR,
  payload: { err },
});

export const authorizeEmailInitialize = () => ({
  type: AUTHORIZE_EMAIL_INITIALIZE,
});

export const joinRequest = ({ email, pw, nickname }: JoinRequestPayload) => ({
  type: JOIN_REQUEST,
  payload: { email, pw, nickname },
});

export const joinSuccess = () => ({
  type: JOIN_SUCCESS,
});

export const joinError = ({ err }: JoinErrorPayload) => ({
  type: JOIN_ERROR,
  payload: { err },
});
