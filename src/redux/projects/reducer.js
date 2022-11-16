import {
  GET_PROJECTS_PENDING,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  DELETE_PROJECTS_PENDING,
  DELETE_PROJECTS_SUCCESS,
  DELETE_PROJECTS_ERROR
} from './constants';

const INITIAL_STATE = {
  list: [],
  isFetching: false,
  error: false
};

const projectsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PROJECTS_PENDING:
      return {
        ...state,
        isFetching: true
      };
    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        list: action.payload
      };
    case GET_PROJECTS_ERROR:
      return {
        ...state,
        error: true
      };
    case DELETE_PROJECTS_PENDING:
      return {
        ...state,
        isFetching: true
      };
    case DELETE_PROJECTS_SUCCESS:
      return {
        ...state,
        list: state.list.filter((item) => item._id !== action.payload),
        isFetching: false
      };
    case DELETE_PROJECTS_ERROR:
      return {
        ...state,
        error: true
      };
    default:
      return state;
  }
};

export default projectsReducer;
