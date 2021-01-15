import { all, fork } from 'redux-saga/effects';
import authSaga from './auth.saga';
import signupSaga from './signup.saga';

export default function* rootSaga(): Generator {
  yield all([fork(authSaga), fork(signupSaga)]);
}
