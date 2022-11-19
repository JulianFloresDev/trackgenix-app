import {
  GET_ADMINS_PENDING,
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
  DELETE_ADMINS_PENDING,
  DELETE_ADMINS_SUCCESS,
  DELETE_ADMINS_ERROR
} from './constants';

const INITIAL_STATE = {
  list: [],
  isFetching: false,
  error: false
};

const adminsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ADMINS_PENDING:
      return {
        ...state,
        isFetching: true
      };
    case GET_ADMINS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        list: action.payload,
        error: false
      };
    case GET_ADMINS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    case DELETE_ADMINS_PENDING:
      return {
        ...state,
        isFetching: true
      };
    case DELETE_ADMINS_SUCCESS:
      return {
        ...state,
        list: state.list.filter((item) => item._id !== action.payload),
        isFetching: false
      };
    case DELETE_ADMINS_ERROR:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};

export default adminsReducer;
