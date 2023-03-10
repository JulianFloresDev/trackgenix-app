import {
  GET_TASKS_PENDING,
  CREATE_TASKS_PENDING,
  EDIT_TASKS_PENDING,
  GET_TASKS_SUCCESS,
  DELETE_TASKS_SUCCESS,
  GET_TASKS_ERROR
} from './constants';

const INITIAL_STATE = {
  list: [],
  isFetching: false
};

const tasksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TASKS_PENDING:
    case CREATE_TASKS_PENDING:
    case EDIT_TASKS_PENDING:
      return {
        ...state,
        isFetching: true
      };
    case GET_TASKS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isFetching: false
      };
    case DELETE_TASKS_SUCCESS: {
      return {
        ...state,
        list: state.list.filter((task) => task._id !== action.payload)
      };
    }

    case GET_TASKS_ERROR:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};

export default tasksReducer;
