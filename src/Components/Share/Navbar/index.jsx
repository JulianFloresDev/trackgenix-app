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
                  <a href={endPoint === 'profile' ? `/${role}s/` : `/${endPoint}`}>
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
              <ul>
                <li>
                  <a href={'/home'}>Home</a>
                </li>
                <li>
                  <a href={'/auth/sign-up'}>Sign Up</a>
                </li>
                <li>
                  <a href={'/auth/login'}>Log In</a>
                </li>
                <li>
                  <a href="#">Contact Info</a>
                </li>
              </ul>
            </div>
            <div className={styles.containerLoggedOut}>
              <h2>Get in touch</h2>
              <p>
                Dictum at tempor commodo ullamcorper a lacus vestibulum sed arcu. Lacinia quis vel
                eros donec ac odio tempor orci. Nulla porttitor massa id neque aliquam.
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
          // <div className={styles.logginOptions}>
          //   <button
          //     className={styles.buttonItem}
          //     onClick={() => {
          //       history.push('/auth/login');
          //     }}
          //   >
          //     Log In
          //   </button>
          //   <a href={'/auth/sign-up'}>{`Don't have account? Create one here.`}</a>
          // </div>
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
