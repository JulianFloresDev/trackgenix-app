import styles from './landingNavBar.module.css';

const LandingNavBar = () => {
  return (
    <nav className={styles.flexContainer}>
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
          Gigatech is always looking for talented software developers to join our team. If you are
          interested in working with us, please get in touch. We would be happy to discuss your
          experience and skills.
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
    </nav>
  );
};

export default LandingNavBar;
