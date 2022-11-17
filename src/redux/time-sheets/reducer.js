import {
  GET_TIMESHEETS_PENDING,
  GET_TIMESHEETS_SUCCESS,
  GET_TIMESHEETS_ERROR,
  DELETE_TIMESHEETS_SUCCESS
} from './constants';

const INITIAL_STATE = {
  list: [],
  isFetching: false,
  error: false
};

const employeesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TIMESHEETS_PENDING:
      return {
        ...state,
        isFetching: true
      };
    case GET_TIMESHEETS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isFetching: false
      };
    case GET_TIMESHEETS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: true
      };
    case DELETE_TIMESHEETS_SUCCESS:
      return {
        ...state,
        list: state.list.filter((item) => item._id !== action.payload)
      };
    default:
      return state;
  }
};

export default employeesReducer;
