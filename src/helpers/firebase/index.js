import { initializeApp } from 'firebase/app';
import { getAuth, onIdTokenChanged, updatePassword } from 'firebase/auth';
import store from 'redux/store';
import { setAuthentication, logoutSuccess, logoutError } from 'redux/auth/actions';
import { getUser } from 'redux/global/thunks';
import { getSuperAdmins } from 'redux/super-admins/thunks';
import { getAdmins } from 'redux/admins/thunks';
import { getEmployees } from 'redux/employees/thunks';
import { setModalContent, setShowModal } from 'redux/global/actions';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);

export const tokenListener = () => {
  onIdTokenChanged(auth, async (user) => {
    if (user) {
      try {
        const {
          token,
          claims: { role, email }
        } = await user.getIdTokenResult();
        if (token) {
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('email', email);
          store.dispatch(getUser(email));
          switch (role) {
            case 'super-admin':
              store.dispatch(getSuperAdmins(''));
              break;
            case 'admin':
              store.dispatch(getAdmins(''));
              break;
            case 'employee':
            case 'employee-pm':
              store.dispatch(getEmployees(''));
              break;
            default:
              break;
          }
          return store.dispatch(setAuthentication(role, email));
        }
      } catch (error) {
        console.error(error);
        return store.dispatch(logoutError());
      }
    } else {
      return store.dispatch(logoutSuccess());
    }
  });
};

export const chageUserPassword = (newPassword) => {
  const user = auth.currentUser;
  updatePassword(user, newPassword)
    .then(() => {
      store.dispatch(
        setModalContent(
          <>
            <h2>Password Changed Sussfully!!</h2>
          </>
        )
      );
      store.dispatch(setShowModal(true));
    })
    .catch((error) => {
      store.dispatch(setModalContent(error.toString()));
      store.dispatch(setShowModal(true));
    });
};
