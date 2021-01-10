import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/reducers';
import { loginRequest, loginSuccess, loginError } from '@/store/actions/auth.action';
import { useCallback } from 'react';
import { AxiosError } from 'axios';

const useAuth = () => {
  const loading = useSelector((state: RootState) => state.authReducers.loading);
  const err = useSelector((state: RootState) => state.authReducers.err);
  const accessToken = useSelector((state: RootState) => state.authReducers.accessToken);
  const refreshToken = useSelector((state: RootState) => state.authReducers.refreshToken);

  const dispatch = useDispatch();

  const onLoginRequest = useCallback(({ email, pw }: { email: string; pw: string }) => dispatch(loginRequest({ email, pw })), [dispatch]);
  const onLoginSuccess = useCallback(
    ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => dispatch(loginSuccess({ accessToken, refreshToken })),
    [dispatch],
  );
  const onLoginError = useCallback(({ err }: { err: AxiosError }) => dispatch(loginError({ err })), [dispatch]);

  return {
    loading,
    err,
    accessToken,
    refreshToken,
    onLoginRequest,
    onLoginSuccess,
    onLoginError,
  };
};

export default useAuth;
