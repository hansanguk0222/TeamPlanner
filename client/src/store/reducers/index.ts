import { combineReducers } from 'redux';

import { AuthState } from '@/types';
import authReducers from './auth.reducer';

const rootReducer = combineReducers({
  authReducers,
});

export default rootReducer;

export interface RootState {
  authReducers: AuthState;
}
