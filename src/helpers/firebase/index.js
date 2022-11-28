import { initializeApp } from 'firebase/app';
import { getAuth, onIdTokenChanged } from 'firebase/auth';
import store from 'redux/store';
import { setAuthentication, logoutSuccess, logoutError } from 'redux/Auth/actions';

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
      console.log('Before try');
      try {
        console.log('After try');
        const {
          token,
          claims: { role, email }
        } = await user.getIdTokenResult();
        console.log('After token');
        if (token) {
          sessionStorage.setItem('token', token);
          return store.dispatch(setAuthentication(role, email));
        }
      } catch (error) {
        console.error(error);
        return store.dispatch(logoutError());
      }
    } else {
      console.log('No user Logged! Else dispatch(logoutSuccess())');
      return store.dispatch(logoutSuccess());
    }
  });
};
