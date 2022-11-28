import {
  SET_LOGGED_IN,
  LOGIN_PENDING,
  LOGIN_ERROR,
  SET_LOGGED_OUT,
  LOGOUT_PENDING,
  LOGOUT_ERROR,
  SIGN_UP_PENDING,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SET_AUTHENTICATION
} from './constans';

const INITIAL_STATE = {
  isLoading: true,
  authenticated: false,
  role: null,
  email: null,
  error: null
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
    case LOGOUT_PENDING:
    case SIGN_UP_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case LOGIN_ERROR:
    case LOGOUT_ERROR:
    case SIGN_UP_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case SET_LOGGED_IN:
      return {
        ...state,
        isLoading: false,
        authenticated: true,
        role: action.payload.role
      };
    case SET_LOGGED_OUT:
      return {
        ...state,
        isLoading: false,
        authenticated: false,
        role: null
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case SET_AUTHENTICATION:
      return {
        ...state,
        authenticated: true,
        role: action.payload.role,
        email: action.payload.email
      };
  }
};

export default authReducer;
