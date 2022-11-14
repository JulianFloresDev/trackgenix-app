import {
  GET_SUPER_ADMINS_PENDING,
  GET_SUPER_ADMINS_FULFILLED,
  GET_SUPER_ADMINS_REJECTED
} from './constants';

const INITIAL_STATE = {
  list: [],
  isFetching: false,
  error: ''
};

const superAdminsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SUPER_ADMINS_PENDING:
      return {
        ...state,
        isFetching: true
      };
    case GET_SUPER_ADMINS_FULFILLED:
      return {
        ...state,
        isFetching: false,
        error: '',
        list: action.payload.data
      };
    case GET_SUPER_ADMINS_REJECTED:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
        list: []
      };
    default:
      return state;
  }
};

export default superAdminsReducer;
