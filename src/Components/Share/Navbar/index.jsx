import styles from './navbar.module.css';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from 'redux/auth/thunks';

const Navbar = ({ navOptions }) => {
  const { authenticated, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <>
      <div className={styles.flexContainer}>
        {authenticated && (
          <ul className={styles.rutes}>
            {navOptions?.map((endPoint, index) => {
              return (
                <li key={index}>
                  <a
                    href={endPoint === 'profile' ? `/${role}s/` : `/${endPoint}`}
                    className={styles.navbarBtn}
                  >
                    {endPoint.toUpperCase()}
                  </a>
                </li>
              );
            })}
          </ul>
        )}
        {!authenticated && (
          <div className={styles.navBarLoggedOut}>
            <div className={styles.containerLoggedOut}>
              <h2>Menu</h2>
              <ul className={styles.rutes}>
                <li>
                  <a href={'/home'} className={styles.navbarBtn}>
                    Home
                  </a>
                </li>
                <li>
                  <a href={'/auth/sign-up'} className={styles.navbarBtn}>
                    Sign Up
                  </a>
                </li>
                <li>
                  <a href={'/auth/login'} className={styles.navbarBtn}>
                    Log In
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.navbarBtn}>
                    Contact Info
                  </a>
                </li>
              </ul>
            </div>
            <div className={styles.containerLoggedOut}>
              <h2>Get in touch</h2>
              <p>
                Gigatech is always looking for talented software developers to join our team. If you
                are interested in working with us, please get in touch. We would be happy to discuss
                your experience and skills.
              </p>
            </div>
            <div className={styles.containerContactInfo}>
              <div>
                <img src={`${process.env.PUBLIC_URL}/assets/images/envelope.svg`} alt="" />
                <a href="">trackgenix@gigatech.com</a>
              </div>
              <div>
                <img src={`${process.env.PUBLIC_URL}/assets/images/phone.svg`} alt="" />
                <a href="">+598 99123456</a>
              </div>
              <div>
                <img src={`${process.env.PUBLIC_URL}/assets/images/home.svg`} alt="" />
                <a href="">Av. Montevideo 1234, 11200</a>
              </div>
            </div>
          </div>
        )}
        {authenticated && (
          <div className={styles.buttonsContainer}>
            <button
              className={styles.buttonItem}
              onClick={() => {
                dispatch(logout());
                history.push('/');
              }}
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
