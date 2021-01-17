import { all, fork, call, put, takeLatest, delay, takeEvery } from 'redux-saga/effects';
import {
  AUTHORIZE_EMAIL_ERROR,
  AUTHORIZE_EMAIL_REQUEST,
  AUTHORIZE_EMAIL_SUCCESS,
  AUTHORIZE_EMAIL_INITIALIZE,
  authorizeEmailRequest,
  authorizeEmailInitialize,
  JOIN_ERROR,
  JOIN_REQUEST,
  JOIN_SUCCESS,
  joinRequest,
  SIGNUP_OVERLAP_ERROR,
  SIGNUP_OVERLAP_REQUEST,
  SIGNUP_OVERLAP_SUCCESS,
  signupOverlapRequest,
} from '@/store/actions/signup.action';
import { authService } from '@/services';

function* join({ payload }: ReturnType<typeof joinRequest>) {
  try {
    const { email, pw, nickname } = payload;
    const { data, status } = yield call(authService.join, { email, pw, nickname });
    if (status === 201) {
      yield put({ type: JOIN_SUCCESS });
    }
  } catch (err) {
    yield put({ type: JOIN_ERROR, payload: { err } });
  }
}

function* watchJoin() {
  yield takeLatest(JOIN_REQUEST, join);
}

function* signUpOverlap({ payload }: ReturnType<typeof signupOverlapRequest>) {
  try {
    yield delay(500);
    const { email } = payload;
    const { data, status } = yield call(authService.overlapEmail, { email });
    if (status === 200) {
      yield put({ type: SIGNUP_OVERLAP_SUCCESS });
    }
  } catch (err) {
    yield put({ type: SIGNUP_OVERLAP_ERROR, payload: { err } });
  }
}

function* watchSignUpOverlap() {
  yield takeEvery(SIGNUP_OVERLAP_REQUEST, signUpOverlap);
}

function* authorizeEmail({ payload }: ReturnType<typeof authorizeEmailRequest>) {
  try {
    const { email } = payload;
    const { data, status } = yield call(authService.authorizeEmail, { email });
    const { authorizeCode } = data;
    if (status === 200) {
      yield put({ type: AUTHORIZE_EMAIL_SUCCESS, payload: { authorizeCode } });
      yield delay(300000);
      yield put({ type: AUTHORIZE_EMAIL_INITIALIZE });
    }
  } catch (err) {
    yield put({ type: AUTHORIZE_EMAIL_ERROR, payload: { err } });
  }
}

function* watchAuthorizeEmail() {
  yield takeLatest(AUTHORIZE_EMAIL_REQUEST, authorizeEmail);
}

export default function* signupSaga(): Generator {
  yield all([fork(watchJoin), fork(watchSignUpOverlap), fork(watchAuthorizeEmail)]);
}
