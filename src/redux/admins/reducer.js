import { GET_ADMINS_SUCCESS } from './constants';
import {
  GET_ADMINS_PENDING
  // GET_ADMINS_SUCCESS,
  // GET_ADMINS_ERROR,
  // PUT_ADMINS_PENDING,
  // PUT_ADMINS_SUCCESS,
  // PUT_ADMINS_ERROR,
  // POST_ADMINS_PENDING,
  // POST_ADMINS_SUCCESS,
  // POST_ADMINS_ERROR,
  // DELETE_ADMINS_PENDING,
  // DELETE_ADMINS_SUCCESS,
  // DELETE_ADMINS_ERROR
} from './constants';

const INITIAL_STATE = {
  list: [],
  isFetching: false,
  error: ''
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
        list: action.payload
      };
    default:
      return state;
  }
};

export default adminsReducer;
