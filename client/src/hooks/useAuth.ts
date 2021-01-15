import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/reducers';
import { loginRequest, loginSuccess, loginError } from '@/store/actions/auth.action';
import { useCallback } from 'react';
import { AxiosError } from 'axios';

const useAuth = () => {
  const loading = useSelector((state: RootState) => state.authReducers.login.loading);
  const err = useSelector((state: RootState) => state.authReducers.login.err);
  const status = useSelector((state: RootState) => state.authReducers.login.status);

  const dispatch = useDispatch();

  const onLoginRequest = useCallback(({ email, pw }: { email: string; pw: string }) => dispatch(loginRequest({ email, pw })), [dispatch]);

  return {
    loading,
    err,
    status,
    onLoginRequest,
  };
};

export default useAuth;
