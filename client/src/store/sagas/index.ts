import { all, fork } from 'redux-saga/effects';
import authSaga from './auth.saga';
import signupSaga from './signup.saga';
import teamSaga from './team.saga';
import userSaga from './user.saga';
import cardListSaga from './cardList.saga';

export default function* rootSaga(): Generator {
  yield all([fork(authSaga), fork(signupSaga), fork(teamSaga), fork(userSaga), fork(cardListSaga)]);
}
