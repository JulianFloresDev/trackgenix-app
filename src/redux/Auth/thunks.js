import {
  setSingUpPending,
  setSignUpSuccess,
  setSignUpError,
  setLoggInPending,
  setLoggedInSuccess,
  setLoggedInError,
  setLoggOutPending,
  setLoggedOutSuccess,
  setLoggedOutError
} from './actions';

export const signUp = (data) => {
  return async (dispatch) => {
    dispatch(setSingUpPending());
    try {
      const request = await fetch(`${process.env.REACT_APP_API_URL}/employee`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const response = await request.json();
      if (response.error) {
        throw new Error(response.message);
      }
      return dispatch(setSignUpSuccess(response.data));
    } catch (error) {
      return dispatch(setSignUpError(error.toString()));
    }
  };
};

export const login = (credentials) => {
  return async (dispatch) => {
    dispatch(setLoggInPending);
    try {
      const request = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      const response = await request.json();

      if (response.error) {
        throw new Error(response.message);
      }

      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('role', response.data.role);
      sessionStorage.setItem('email', response.data.email);
      return dispatch(setLoggedInSuccess(response.data));
    } catch (error) {
      return dispatch(setLoggedInError(error.toString()));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(setLoggOutPending());
    try {
      const request = await fetch(`${process.env.REACT_APP_API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          toke: sessionStorage.getItem('token')
        }
      });
      const response = await request.json();

      if (response.error) {
        throw new Error(response.message);
      }

      sessionStorage.clear();
      return dispatch(setLoggedOutSuccess(response.data));
    } catch (error) {
      return dispatch(setLoggedOutError(error.toString()));
    }
  };
};
