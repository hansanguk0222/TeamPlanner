import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import { loginRequest, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from '@/store/actions/auth.action';
import { authService } from '@/services';

function* login({ payload }: ReturnType<typeof loginRequest>) {
  try {
    const { email, pw } = payload;
    const { data, status } = yield call(authService.login, { email, pw });
    const { accessToken, refreshToken } = data;
    if (status === 200) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      yield put({ type: LOGIN_SUCCESS, payload: { accessToken, refreshToken } });
    }
  } catch (err) {
    yield put({ type: LOGIN_ERROR, payload: { err } });
  }
}

function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, login);
}

export default function* authSaga() {
  yield all([fork(watchLogin)]);
}
