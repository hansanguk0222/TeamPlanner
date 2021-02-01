import { all, fork, call, put, takeEvery } from 'redux-saga/effects';
import { GET_USER_ERROR, GET_USER_SUCCESS, GET_USER_REQUEST } from '@/store/actions/user.action';
import { userService } from '@/services';
import { getUserId } from '@/utils/utils';

function* getUser() {
  try {
    const userId = getUserId();
    const { data, status } = yield call(userService.getUser, { userId: +userId });
    if (status === 200) {
      const { user } = data;
      yield put({ type: GET_USER_SUCCESS, payload: { user } });
    }
  } catch (err) {
    yield put({ type: GET_USER_ERROR, payload: { err } });
  }
}

function* watchGetUser() {
  yield takeEvery(GET_USER_REQUEST, getUser);
}

export default function* userSaga() {
  yield all([fork(watchGetUser)]);
}
