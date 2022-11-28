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

export const loginPending = () => {
  return {
    type: LOGIN_PENDING
  };
};

export const logoutPending = () => {
  return {
    type: LOGOUT_PENDING
  };
};

export const singupPending = () => {
  return {
    type: SIGN_UP_PENDING
  };
};

export const loginError = (error) => {
  return {
    type: LOGIN_ERROR,
    payload: error
  };
};

export const logoutError = (error) => {
  return {
    type: LOGOUT_ERROR,
    payload: error
  };
};

export const signupError = (error) => {
  return {
    type: SIGN_UP_ERROR,
    payload: error
  };
};

export const loginSuccess = (data) => {
  return {
    type: SET_LOGGED_IN,
    payload: data
  };
};

export const logoutSuccess = (data) => {
  return {
    type: SET_LOGGED_OUT,
    payload: data
  };
};

export const signupSuccess = (data) => {
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
