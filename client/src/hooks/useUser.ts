import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/reducers';
import { getUserRequest } from '@/store/actions/user.action';
import { useCallback } from 'react';

const useUser = () => {
  const getUserLoading = useSelector((state: RootState) => state.userReducers.getUser.loading);
  const getUserErr = useSelector((state: RootState) => state.userReducers.getUser.err);
  const user = useSelector((state: RootState) => state.userReducers.user);

  const dispatch = useDispatch();

  const onGetUserRequest = useCallback(() => dispatch(getUserRequest()), [dispatch]);

  return {
    getUserLoading,
    getUserErr,
    user,
    onGetUserRequest,
  };
};

export default useUser;
