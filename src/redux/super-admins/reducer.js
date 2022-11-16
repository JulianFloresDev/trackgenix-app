import {
  GET_SUPER_ADMINS_PENDING,
  GET_SUPER_ADMINS_SUCCESS,
  GET_SUPER_ADMINS_ERROR,
  DELETE_SUPER_ADMINS_SUCCESS
} from './constants';

const INITIAL_STATE = {
  list: [],
  isFetching: false,
  error: false
};

const superAdminsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SUPER_ADMINS_PENDING:
      return {
        ...state,
        isFetching: true
      };
    case GET_SUPER_ADMINS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isFetching: false
      };
    case GET_SUPER_ADMINS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    case DELETE_SUPER_ADMINS_SUCCESS:
      return {
        ...state,
        list: state.list.filter((item) => item._id !== action.payload)
      };
    default:
      return state;
  }
};

export default superAdminsReducer;
