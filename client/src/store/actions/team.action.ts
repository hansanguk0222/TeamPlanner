import {
  GetTeamListSuccessPayload,
  GetTeamListErrorPayload,
  GetTeamListRequestPayload,
  CheckJoinedUserRequestPayload,
  CheckJoinedUserSuccessPayload,
  CheckJoinedUserErrorPayload,
} from '@/types';

export const GET_TEAMLIST_REQUEST = 'team/GET_TEMLIST_REQUEST' as const;
export const GET_TEAMLIST_SUCCESS = 'team/GET_TEAMLIST_SUCCESS' as const;
export const GET_TEAMLIST_ERROR = 'team/GET_TEAMLIST_ERROR' as const;
export const CHECK_JOINED_USER_REQUEST = 'team/CHECK_JOINED_USER_REQUEST' as const;
export const CHECK_JOINED_USER_SUCCESS = 'team/CHECK_JOINED_USER_SUCCESS' as const;
export const CHECK_JOINED_USER_ERROR = 'team/CHECK_JOINED_USER_ERROR' as const;

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

export const checkJoinedUserRequest = ({ teamId, userId }: CheckJoinedUserRequestPayload) => ({
  type: CHECK_JOINED_USER_REQUEST,
  payload: { teamId, userId },
});

export const checkJoinedUserSuccess = ({ status }: CheckJoinedUserSuccessPayload) => ({
  type: CHECK_JOINED_USER_SUCCESS,
  payload: { status },
});

export const checkJoinedUserError = ({ err }: CheckJoinedUserErrorPayload) => ({
  type: CHECK_JOINED_USER_ERROR,
  payload: { err },
});
