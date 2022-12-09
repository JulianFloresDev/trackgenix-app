import styles from './navbar.module.css';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from 'redux/auth/thunks';

const Navbar = ({ navOptions }) => {
  const { role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const rute = history.location.pathname.slice(1);

  return (
    <nav className={styles.flexContainer}>
      <a className={styles.logoRR} href="/">
        <img src={`${process.env.PUBLIC_URL}/assets/images/logo-RR.svg`} />
        <img src={`${process.env.PUBLIC_URL}/assets/images/sub-logo-RR.svg`} />
      </a>
      <ul className={styles.rutes}>
        {navOptions?.map((endPoint, index) => {
          return (
            <li key={index}>
              <a
                name={endPoint}
                className={rute === endPoint ? styles.current : undefined}
                href={endPoint === 'profile' ? `/profile/${role}` : `/${endPoint}`}
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
