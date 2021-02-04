import { all, fork, call, put, takeLatest, delay, debounce, takeEvery } from 'redux-saga/effects';
import {
  getTeamListRequest,
  GET_TEAMLIST_ERROR,
  GET_TEAMLIST_REQUEST,
  GET_TEAMLIST_SUCCESS,
  checkJoinedUserRequest,
  CHECK_JOINED_USER_REQUEST,
  CHECK_JOINED_USER_SUCCESS,
  CHECK_JOINED_USER_ERROR,
} from '@/store/actions/team.action';
import { teamService } from '@/services';

function* getTeamList({ payload }: ReturnType<typeof getTeamListRequest>) {
  try {
    const { firstLoad } = payload;
    const { data, status } = yield call(teamService.getTeamList);
    if (status === 200) {
      yield put({ type: GET_TEAMLIST_SUCCESS, payload: { firstLoad, teamList: data.teamList } });
    }
  } catch (err) {
    yield put({ type: GET_TEAMLIST_ERROR, payload: { err } });
  }
}

function* watchGetTeamList() {
  yield takeLatest(GET_TEAMLIST_REQUEST, getTeamList);
}

function* checkJoinedUser({ payload }: ReturnType<typeof checkJoinedUserRequest>) {
  try {
    const { teamId, userId } = payload;
    const { status } = yield call(teamService.isJoinedUser, { teamId, userId });
    if (status === 200) {
      yield put({ type: CHECK_JOINED_USER_SUCCESS, payload: { status } });
    }
  } catch (err) {
    yield put({ type: CHECK_JOINED_USER_ERROR, payload: { err } });
  }
}

function* watchCheckJoinedUser() {
  yield takeEvery(CHECK_JOINED_USER_REQUEST, checkJoinedUser);
}

export default function* teamSaga(): Generator {
  yield all([fork(watchGetTeamList), fork(watchCheckJoinedUser)]);
}
