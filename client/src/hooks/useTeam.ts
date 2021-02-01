import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/reducers';
import { getTeamListRequest, checkJoinedUserRequest } from '@/store/actions/team.action';
import { useCallback } from 'react';

const useTeam = () => {
  const teamList = useSelector((state: RootState) => state.teamReducers.teamList);
  const getTeamListLoading = useSelector((state: RootState) => state.teamReducers.getTeamList.loading);
  const getTeamListErr = useSelector((state: RootState) => state.teamReducers.getTeamList.err);
  const checkJoinedUserStatus = useSelector((state: RootState) => state.teamReducers.checkJoinedUser.status);
  const dispatch = useDispatch();

  const onGetTeamListRequest = useCallback(({ firstLoad }: { firstLoad: boolean }) => dispatch(getTeamListRequest({ firstLoad })), [dispatch]);
  const onCheckJoinedUserRequest = useCallback(
    ({ userId, teamId }: { userId: number; teamId: number }) => dispatch(checkJoinedUserRequest({ userId, teamId })),
    [dispatch],
  );

  return {
    teamList,
    getTeamListLoading,
    getTeamListErr,
    checkJoinedUserStatus,
    onGetTeamListRequest,
    onCheckJoinedUserRequest,
  };
};

export default useTeam;
