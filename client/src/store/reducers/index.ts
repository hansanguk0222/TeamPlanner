import { combineReducers } from 'redux';
import { AuthState, SignupState, TeamState } from '@/types';
import authReducers from './auth.reducer';
import signupReducers from './signup.reducer';
import TeamReducers from './team.reducer';

const rootReducer = combineReducers({
  authReducers,
  signupReducers,
  TeamReducers,
});

export default rootReducer;

export interface RootState {
  authReducers: AuthState;
  signupReducers: SignupState;
  TeamReducers: TeamState;
}
