import { GET_USER_ERROR, GET_USER_REQUEST, GET_USER_SUCCESS, getUserError, getUserRequest, getUserSuccess } from '@/store/actions/user.action';
import { UserState } from '@/types';

type userActionType = ReturnType<typeof getUserRequest> | ReturnType<typeof getUserSuccess> | ReturnType<typeof getUserError>;

const initialState: UserState = {
  getUser: {
    loading: false,
    err: null,
  },
  user: null,
};

const userReducers = (state: UserState = initialState, action: userActionType) => {
  switch (action.type) {
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUser: {
          loading: true,
          err: null,
        },
      };
    }
    case GET_USER_SUCCESS: {
      const { user } = action.payload;
      return {
        ...state,
        getUser: {
          loading: false,
          err: null,
        },
        user,
      };
    }
    case GET_USER_ERROR: {
      const { err } = action.payload;
      return {
        ...state,
        getUser: {
          loading: false,
          err,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducers;
