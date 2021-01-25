import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/reducers';
import { authorizeEmailRequest, joinRequest, signupOverlapEmailRequest, signupOverlapEmailInitialize } from '@/store/actions/signup.action';
import { useCallback } from 'react';
import { AxiosError } from 'axios';
import { stringify } from 'qs';

const useSignup = () => {
  const isJoinOk = useSelector((state: RootState) => state.signupReducers.join.isJoinOk);
  const authorizeCode = useSelector((state: RootState) => state.signupReducers.authorizeEmail.authorizeCode);
  const isNotExistEmail = useSelector((state: RootState) => state.signupReducers.overlapEmail.isNotExistEmail);
  const accessCodeError = useSelector((state: RootState) => state.signupReducers.authorizeEmail.err);
  const dispatch = useDispatch();

  const onJoinRequest = useCallback(
    ({ email, pw, nickname }: { email: string; pw: string; nickname: string }) => dispatch(joinRequest({ email, pw, nickname })),
    [dispatch],
  );
  const onAuthorizeEmailRequest = useCallback(({ email }: { email: string }) => dispatch(authorizeEmailRequest({ email })), [dispatch]);
  const onSignUpOverlapEmailRequest = useCallback(({ email }: { email: string }) => dispatch(signupOverlapEmailRequest({ email })), [dispatch]);
  const onSignUpOverlapEmailInitialize = useCallback(() => dispatch(signupOverlapEmailInitialize()), [dispatch]);

  return {
    isJoinOk,
    authorizeCode,
    isNotExistEmail,
    accessCodeError,
    onJoinRequest,
    onAuthorizeEmailRequest,
    onSignUpOverlapEmailRequest,
    onSignUpOverlapEmailInitialize,
  };
};

export default useSignup;
