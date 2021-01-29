import { all, fork, call, put, takeLatest, delay, debounce } from 'redux-saga/effects';
import { getTeamListRequest, GET_TEAMLIST_ERROR, GET_TEAMLIST_REQUEST, GET_TEAMLIST_SUCCESS, GET_JOIN_TEAMLIST } from '@/store/actions/team.action';
import { teamService } from '@/services';

function* getTeamList({ payload }: ReturnType<typeof getTeamListRequest>) {
  try {
    const { firstLoad } = payload;
    const { data, status } = yield call(teamService.getTeamList);
    if (status === 200) {
      yield put({ type: GET_TEAMLIST_SUCCESS, payload: { firstLoad, teamList: data.teamList } });
    }
  } catch (err) {
    yield put({ type: GET_TEAMLIST_ERROR });
  }
}

function* watchGetTeamList() {
  yield takeLatest(GET_TEAMLIST_REQUEST, getTeamList);
}

export default function* teamSaga(): Generator {
  yield all([fork(watchGetTeamList)]);
}
