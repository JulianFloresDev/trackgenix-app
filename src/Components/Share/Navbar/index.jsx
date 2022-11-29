import styles from './navbar.module.css';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSuperAdmins } from 'redux/super-admins/thunks';
import { getAdmins } from 'redux/admins/thunks';
import { getEmployees } from 'redux/employees/thunks';
import { logout } from 'redux/Auth/thunks';

const Navbar = ({ navOptions }) => {
  const { authenticated, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    authenticated &&
      (dispatch(getSuperAdmins('')), dispatch(getAdmins('')), dispatch(getEmployees('')));
  }, []);

  return (
    <>
      <div className={styles.flexContainer}>
        <ul className={styles.rutes}>
          {navOptions?.map((endPoint, index) => {
            return (
              <li key={index}>
                <a href={endPoint === 'profile' ? `/${role}s` : `/${endPoint}`}>
                  {endPoint.toUpperCase()}
                </a>
              </li>
            );
          })}
        </ul>
        <div className={styles.buttonsContainer}>
          {!authenticated && (
            <div className={styles.logginOptions}>
              <button
                className={styles.buttonItem}
                onClick={() => {
                  history.push('/auth/login');
                }}
              >
                Log In
              </button>
              <a href={'/auth/sign-up'}>{`Don't have account? Create one here.`}</a>
            </div>
          )}
          {authenticated && (
            <button
              className={styles.buttonItem}
              onClick={() => {
                dispatch(logout());
                history.push('/');
              }}
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
