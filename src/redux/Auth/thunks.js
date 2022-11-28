import { loginPending, loginError, logoutPending, logoutError, setAuthentication } from './actions';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from 'helpers/firebase';

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

      dispatch(setAuthentication(inputData.email, role));
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('role', role);
      sessionStorage.setItem('email', inputData.email);

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
