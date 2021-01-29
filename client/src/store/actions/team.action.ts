import { GetTeamListSuccessPayload, GetTeamListErrorPayload, GetJoinTeamList, GetTeamListRequestPayload, Team } from '@/types';

export const GET_TEAMLIST_REQUEST = 'team/GET_TEMLIST_REQUEST' as const;
export const GET_TEAMLIST_SUCCESS = 'team/GET_TEAMLIST_SUCCESS' as const;
export const GET_TEAMLIST_ERROR = 'team/GET_TEAMLIST_ERROR' as const;
export const GET_JOIN_TEAMLIST = 'team/GET_JOIN_TEAMLIST' as const;

export const getTeamListRequest = ({ firstLoad }: GetTeamListRequestPayload) => ({
  type: GET_TEAMLIST_REQUEST,
  payload: { firstLoad },
});

export const getTeamListSuccess = ({ teamList, firstLoad }: GetTeamListSuccessPayload) => ({
  type: GET_TEAMLIST_SUCCESS,
  payload: { teamList, firstLoad },
});

export const getTeamListError = ({ err }: GetTeamListErrorPayload) => ({
  type: GET_TEAMLIST_ERROR,
  payload: { err },
});

export const getJoinTeamList = ({ userId }: GetJoinTeamList) => ({
  type: GET_JOIN_TEAMLIST,
  payload: { userId },
});
