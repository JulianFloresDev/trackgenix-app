import styles from './header.module.css';
import { Navbar } from 'Components/Share';
import { useSelector } from 'react-redux';

function Header() {
  const { user } = useSelector((state) => state.global);
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className={styles.logoRR}>
          <img src={`${process.env.PUBLIC_URL}/assets/images/logo-RR.svg`} />
          <img src={`${process.env.PUBLIC_URL}/assets/images/sub-logo-RR.svg`} />
        </div>
        {user._id ? (
          <Navbar navOptions={['time-sheets', 'projects', 'profile']} />
        ) : (
          <Navbar navOptions={[]} />
        )}
      </nav>
    </header>
  );
}

export default Header;
