import {
  GET_TASKS_PENDING,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  CREATE_TASKS_PENDING,
  CREATE_TASKS_SUCCESS,
  CREATE_TASKS_ERROR,
  EDIT_TASKS_PENDING,
  EDIT_TASKS_SUCCESS,
  EDIT_TASKS_ERROR,
  DELETE_TASKS_PENDING,
  DELETE_TASKS_SUCCESS,
  DELETE_TASKS_ERROR
} from './constants';

const INITIAL_STATE = {
  list: [],
  isFetching: false
};

const tasksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //  GET
    case GET_TASKS_PENDING: {
      console.log('Action-Type: GET_TASKS_PENDING');
      return {
        ...state,
        isFetching: true
      };
    }
    case GET_TASKS_SUCCESS: {
      console.log('Action-Type: GET_TASKS_SUCCESS');
      return {
        ...state,
        list: action.payload,
        isFetching: false
      };
    }
    case GET_TASKS_ERROR: {
      console.log('Action-Type: GET_TASKS_ERROR');
      return {
        ...state,
        isFetching: false
      };
    }
    //  CREATE
    case CREATE_TASKS_PENDING: {
      console.log('Action-Type: CREATE_TASKS_PENDING');
      return {
        ...state,
        isFetching: true
      };
    }
    case CREATE_TASKS_SUCCESS: {
      console.log('Action-Type: CREATE_TASKS_SUCCESS');
      return {
        ...state,
        list: state.list.filter(),
        isFetching: false
      };
    }
    case CREATE_TASKS_ERROR: {
      console.log('Action-Type: CREATE_TASKS_ERROR');
      return {
        ...state,
        isFetching: false
      };
    }
    //  EDIT
    case EDIT_TASKS_PENDING: {
      console.log('Action-Type: EDIT_TASKS_PENDING');
      return {
        ...state,
        isFetching: true
      };
    }
    case EDIT_TASKS_SUCCESS: {
      console.log('Action-Type: EDIT_TASKS_SUCCESS');
      return {
        ...state,
        list: state.list.filter(),
        isFetching: false
      };
    }
    case EDIT_TASKS_ERROR: {
      console.log('Action-Type: EDIT_TASKS_ERROR');
      return {
        ...state,
        isFetching: false
      };
    }
    //  DELETE
    case DELETE_TASKS_PENDING: {
      console.log('Action-Type: DELETE_TASKS_PENDING');
      return {
        ...state,
        isFetching: true
      };
    }
    case DELETE_TASKS_SUCCESS: {
      console.log('Action-Type: DELETE_TASKS_SUCCESS');
      return {
        ...state,
        list: state.list.filter((action) => action._id !== action.payload),
        isFetching: false
      };
    }
    case DELETE_TASKS_ERROR: {
      console.log('Action-Type: DELETE_TASKS_ERROR');
      return {
        ...state,
        isFetching: false
      };
    }
  }
};

export default tasksReducer;
