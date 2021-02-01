import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import { loginRequest, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_ERROR } from '@/store/actions/auth.action';
import { authService } from '@/services';

function* login({ payload }: ReturnType<typeof loginRequest>) {
  try {
    const { email, pw } = payload;
    const { data, status } = yield call(authService.login, { email, pw });
    const { accessToken } = data;
    const { userId } = data;
    if (status === 200) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userId', userId);
      yield put({ type: LOGIN_SUCCESS, payload: { status } });
    }
  } catch (err) {
    yield put({ type: LOGIN_ERROR, payload: { status: err.response.status, err } });
  }
}

function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, login);
}

function* logout() {
  try {
    const { status } = yield call(authService.logout);
    if (status === 200) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');
      yield put({ type: LOGOUT_SUCCESS, payload: { status } });
    }
  } catch (err) {
    yield put({ type: LOGOUT_ERROR, payload: { status: err.response.status, err } });
  }
}

function* watchLogout() {
  yield takeLatest(LOGOUT_REQUEST, logout);
}

export default function* authSaga() {
  yield all([fork(watchLogin), fork(watchLogout)]);
}
