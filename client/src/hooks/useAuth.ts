import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/reducers';
import { loginRequest, logoutRequest } from '@/store/actions/auth.action';
import { useCallback } from 'react';
import { AxiosError } from 'axios';

const useAuth = () => {
  const loginLoading = useSelector((state: RootState) => state.authReducers.login.loading);
  const loginErr = useSelector((state: RootState) => state.authReducers.login.err);
  const loginStatus = useSelector((state: RootState) => state.authReducers.login.status);
  const logoutLoading = useSelector((state: RootState) => state.authReducers.logout.loading);
  const logoutErr = useSelector((state: RootState) => state.authReducers.logout.err);
  const logoutStatus = useSelector((state: RootState) => state.authReducers.logout.status);

  const dispatch = useDispatch();

  const onLoginRequest = useCallback(({ email, pw }: { email: string; pw: string }) => dispatch(loginRequest({ email, pw })), [dispatch]);
  const onLogoutRequest = useCallback(() => dispatch(logoutRequest()), [dispatch]);

  return {
    loginLoading,
    loginErr,
    loginStatus,
    logoutLoading,
    logoutErr,
    logoutStatus,
    onLoginRequest,
    onLogoutRequest,
  };
};

export default useAuth;
