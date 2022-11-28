import {
  SET_LOGGED_IN,
  LOGIN_PENDING,
  LOGIN_ERROR,
  SET_LOGGED_OUT,
  LOGOUT_PENDING,
  LOGOUT_ERROR,
  SET_AUTHENTICATION
} from './constans';

export const loginPending = () => {
  console.log('LOGIN_PENDING');
  return {
    type: LOGIN_PENDING
  };
};

export const logoutPending = () => {
  console.log('LOGOUT_PENDING');
  return {
    type: LOGOUT_PENDING
  };
};

export const loginError = (error) => {
  console.log('LOGIN_ERROR');
  return {
    type: LOGIN_ERROR,
    payload: error
  };
};

export const logoutError = (error) => {
  console.log('LOGOUT_ERROR');
  return {
    type: LOGOUT_ERROR,
    payload: error
  };
};

export const loginSuccess = (data) => {
  console.log('SET_LOGGED_IN');
  return {
    type: SET_LOGGED_IN,
    payload: data
  };
};

export const logoutSuccess = () => {
  console.log('SET_LOGGED_OUT');
  return {
    type: SET_LOGGED_OUT
  };
};

export const setAuthentication = (role, email) => {
  console.log('SET_AUTHENTICATION');
  return {
    type: SET_AUTHENTICATION,
    payload: {
      role: role,
      email: email
    }
  };
};
