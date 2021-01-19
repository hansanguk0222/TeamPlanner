import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import { loginRequest, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from '@/store/actions/auth.action';
import { authService } from '@/services';

function* login({ payload }: ReturnType<typeof loginRequest>) {
  try {
    const { email, pw } = payload;
    const { data, status } = yield call(authService.login, { email, pw });
    const { accessToken } = data;
    if (status === 200) {
      localStorage.setItem('accessToken', accessToken);
      yield put({ type: LOGIN_SUCCESS, payload: { status } });
    }
  } catch (err) {
    yield put({ type: LOGIN_ERROR, payload: { status: err.response.status, err } });
  }
}

function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, login);
}

export default function* authSaga() {
  yield all([fork(watchLogin)]);
}
