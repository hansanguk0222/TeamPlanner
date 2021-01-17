import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/reducers';
import { authorizeEmailRequest, joinRequest, signupOverlapRequest, signupOverlapInitialize } from '@/store/actions/signup.action';
import { useCallback } from 'react';
import { AxiosError } from 'axios';
import { stringify } from 'qs';

const useSignup = () => {
  const isJoinOk = useSelector((state: RootState) => state.signupReducers.join.isJoinOk);
  const authorizeCode = useSelector((state: RootState) => state.signupReducers.authorizeEmail.authorizeCode);
  const isNotExistEmail = useSelector((state: RootState) => state.signupReducers.overlap.isNotExistEmail);

  const dispatch = useDispatch();

  const onJoinRequest = useCallback(
    ({ email, pw, nickname }: { email: string; pw: string; nickname: string }) => dispatch(joinRequest({ email, pw, nickname })),
    [dispatch],
  );
  const onAuthorizeEmailRequest = useCallback(({ email }: { email: string }) => dispatch(authorizeEmailRequest({ email })), [dispatch]);
  const onSignUpOverlapRequest = useCallback(({ email }: { email: string }) => dispatch(signupOverlapRequest({ email })), [dispatch]);
  const onSignUpOverlapInitialize = useCallback(() => dispatch(signupOverlapInitialize()), [dispatch]);

  return {
    isJoinOk,
    authorizeCode,
    isNotExistEmail,
    onJoinRequest,
    onAuthorizeEmailRequest,
    onSignUpOverlapRequest,
    onSignUpOverlapInitialize,
  };
};

export default useSignup;
