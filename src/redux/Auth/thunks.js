import { loginPending, loginError, logoutPending, logoutError } from './actions';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from 'helpers/firebase';

/*
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
*/

export const login = (inputData) => {
  return async (dispatch) => {
    dispatch(loginPending());
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        inputData.email,
        inputData.password
      );

      const {
        token,
        claims: { role }
      } = await userCredentials.user.getIdTokenResult();

      sessionStorage.setItem('token', token);

      return role;
    } catch (error) {
      return dispatch(loginError());
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(logoutPending());
    try {
      const signOutReturn = await signOut(auth);
      sessionStorage.clear();
      return signOutReturn;
    } catch (error) {
      return dispatch(logoutError(error.toString()));
    }
  };
};
