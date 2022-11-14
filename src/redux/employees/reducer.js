import {
  GET_EMPLOYEES_PENDING,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_ERROR,
  DELETE_EMPLOYEES_SUCCESS
} from './constants';

const INITIAL_STATE = {
  list: [],
  isFetching: false
};

const employeesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_EMPLOYEES_PENDING:
      return {
        ...state,
        isFetching: true
      };
    case GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isFetching: false
      };
    case GET_EMPLOYEES_ERROR:
      return {
        ...state,
        isFetching: false
      };
    case DELETE_EMPLOYEES_SUCCESS:
      return {
        ...state,
        list: state.list.filter((item) => item._id !== action.payload)
      };
    default:
      return state;
  }
};

export default employeesReducer;
