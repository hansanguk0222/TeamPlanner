import {
  GET_TEAMLIST_ERROR,
  GET_TEAMLIST_SUCCESS,
  GET_TEAMLIST_REQUEST,
  getTeamListSuccess,
  getTeamListError,
  getTeamListRequest,
  CHECK_JOINED_USER_ERROR,
  CHECK_JOINED_USER_REQUEST,
  CHECK_JOINED_USER_SUCCESS,
  checkJoinedUserError,
  checkJoinedUserRequest,
  checkJoinedUserSuccess,
} from '@/store/actions/team.action';
import { TeamState } from '@/types';

type teamActionType =
  | ReturnType<typeof getTeamListRequest>
  | ReturnType<typeof getTeamListSuccess>
  | ReturnType<typeof getTeamListError>
  | ReturnType<typeof checkJoinedUserRequest>
  | ReturnType<typeof checkJoinedUserSuccess>
  | ReturnType<typeof checkJoinedUserError>;

const initialState: TeamState = {
  getTeamList: {
    loading: false,
    err: null,
  },
  checkJoinedUser: {
    loading: false,
    err: null,
    status: null,
  },
  teamList: null,
};

const teamReducers = (state: TeamState = initialState, action: teamActionType) => {
  switch (action.type) {
    case GET_TEAMLIST_REQUEST: {
      return {
        ...state,
        loading: true,
        err: null,
      };
    }
    case GET_TEAMLIST_SUCCESS: {
      const { teamList, firstLoad } = action.payload;
      return {
        ...state,
        loading: false,
        err: null,
        teamList,
        firstLoad,
      };
    }
    case GET_TEAMLIST_ERROR: {
      const { err } = action.payload;
      return {
        ...state,
        loading: false,
        err,
        teamList: null,
      };
    }
    case CHECK_JOINED_USER_REQUEST: {
      return {
        ...state,
        checkJoinedUser: {
          loading: true,
          err: null,
          status: null,
        },
      };
    }
    case CHECK_JOINED_USER_SUCCESS: {
      const { status } = action.payload;
      return {
        ...state,
        checkJoinedUser: {
          loading: false,
          err: null,
          status,
        },
      };
    }
    case CHECK_JOINED_USER_ERROR: {
      const { err } = action.payload;
      const status = err.response?.status;
      return {
        ...state,
        checkJoinedUser: {
          loading: false,
          err,
          status,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default teamReducers;
