import { combineReducers } from 'redux';
import { AuthState, SignUpState } from '@/types';
import authReducers from './auth.reducer';
import signupReducers from './signup.reducer';

const rootReducer = combineReducers({
  authReducers,
  signupReducers,
});

export default rootReducer;

export interface RootState {
  authReducers: AuthState;
  signupReducers: SignUpState;
}
