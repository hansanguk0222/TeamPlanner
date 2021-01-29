import {
  GET_TEAMLIST_ERROR,
  GET_TEAMLIST_SUCCESS,
  GET_TEAMLIST_REQUEST,
  GET_JOIN_TEAMLIST,
  getTeamListSuccess,
  getTeamListError,
  getTeamListRequest,
  getJoinTeamList,
} from '@/store/actions/team.action';
import { TeamState } from '@/types';

type teamActionType =
  | ReturnType<typeof getTeamListRequest>
  | ReturnType<typeof getTeamListSuccess>
  | ReturnType<typeof getTeamListError>
  | ReturnType<typeof getJoinTeamList>;

const initialState: TeamState = {
  loading: false,
  err: null,
  teamList: null,
  firstLoad: false,
};

const teamReducers = (state: TeamState = initialState, action: teamActionType) => {
  switch (action.type) {
    case GET_TEAMLIST_REQUEST:
      return {
        ...state,
        loading: true,
        err: null,
      };
    case GET_TEAMLIST_SUCCESS:
      const { teamList, firstLoad } = action.payload;
      return {
        ...state,
        loading: false,
        err: null,
        teamList,
        firstLoad,
      };
    case GET_TEAMLIST_ERROR:
      const { err } = action.payload;
      return {
        ...state,
        loading: false,
        err,
        teamList: null,
      };
    case GET_JOIN_TEAMLIST:
      const { userId } = action.payload;
      const joinTeamList = state.teamList?.filter((team) => team.joinUsers.some((user) => user.id === userId));
      return {
        ...state,
        loading: false,
        err,
        teamList: joinTeamList,
      };
    default: {
      return state;
    }
  }
};

export default teamReducers;
