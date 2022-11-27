import {
  SIGN_UP_PENDING,
  LOGIN_PENDING,
  LOGOUT_PENDING,
  SIGN_UP_SUCCESS,
  SET_LOGGED_IN,
  SET_LOGGED_OUT,
  SIGN_UP_ERROR,
  LOGIN_ERROR,
  LOGOUT_ERROR,
  SET_AUTHENTICATION
} from './constans';

export const setLoggInPending = () => {
  return {
    type: LOGIN_PENDING
  };
};

export const setLoggOutPending = () => {
  return {
    type: LOGOUT_PENDING
  };
};

export const setSingUpPending = () => {
  return {
    type: SIGN_UP_PENDING
  };
};

export const setLoggedInError = (error) => {
  return {
    type: LOGIN_ERROR,
    payload: error
  };
};

export const setLoggedOutError = (error) => {
  return {
    type: LOGOUT_ERROR,
    payload: error
  };
};

export const setSignUpError = (error) => {
  return {
    type: SIGN_UP_ERROR,
    payload: error
  };
};

export const setLoggedInSuccess = (data) => {
  return {
    type: SET_LOGGED_IN,
    payload: data
  };
};

export const setLoggedOutSuccess = (data) => {
  return {
    type: SET_LOGGED_OUT,
    payload: data
  };
};

export const setSignUpSuccess = (data) => {
  return {
    type: SIGN_UP_SUCCESS,
    payload: data
  };
};

export const setAuthentication = (role, email) => {
  return {
    type: SET_AUTHENTICATION,
    payload: {
      role: role,
      email: email
    }
  };
};
