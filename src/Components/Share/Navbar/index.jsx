import styles from './navbar.module.css';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'redux/auth/thunks';

const Navbar = ({ navOptions }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const rute = history.location.pathname.slice(1);
  const { user } = useSelector((state) => state.global);
  const { role } = useSelector((state) => state.auth);

  return (
    <nav className={styles.flexContainer}>
      <div className={styles.userContainer}>
        <img
          className={styles.userPicture}
          src={`${process.env.PUBLIC_URL}/assets/images/user-picture.svg`}
        />
        <h3 className={styles.userName}>{`${user.firstName} ${user.lastName}`}</h3>
        <h4 className={styles.userRole}>{role}</h4>
      </div>
      <ul className={styles.rutes}>
        {navOptions?.map((endPoint, index) => {
          return (
            <li key={index}>
              <a
                name={endPoint}
                className={rute === endPoint ? styles.current : undefined}
                href={endPoint === 'profile' ? `/profile` : `/${endPoint}`}
              >
                {endPoint.toUpperCase()}
              </a>
            </li>
          );
        })}
      </ul>
      <div className={styles.buttonsContainer}>
        <button
          className={styles.buttonItem}
          onClick={() => {
            dispatch(logout());
            history.push('/home');
          }}
        >
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
