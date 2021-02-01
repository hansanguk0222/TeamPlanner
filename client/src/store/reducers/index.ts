import { combineReducers } from 'redux';
import { AuthState, SignupState, TeamState, UserState, CardListStatus } from '@/types';
import authReducers from './auth.reducer';
import signupReducers from './signup.reducer';
import teamReducers from './team.reducer';
import userReducers from './user.reducer';
import cardListReducers from './cardList.reducer';

const rootReducer = combineReducers({
  authReducers,
  signupReducers,
  teamReducers,
  userReducers,
  cardListReducers,
});

export default rootReducer;

export interface RootState {
  authReducers: AuthState;
  signupReducers: SignupState;
  teamReducers: TeamState;
  userReducers: UserState;
  cardListReducers: CardListStatus;
}
