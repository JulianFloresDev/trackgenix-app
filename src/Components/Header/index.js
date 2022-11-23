import styles from './header.module.css';
import { Navbar } from 'Components/Share';
import { useSelector } from 'react-redux';

function Header() {
  const { user } = useSelector((state) => state.global);
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <a className={styles.logoRR} href="/">
          <img src={`${process.env.PUBLIC_URL}/assets/images/logo-RR.svg`} />
          <img src={`${process.env.PUBLIC_URL}/assets/images/sub-logo-RR.svg`} />
        </a>
        {user?.token === 'super-admins' && (
          <Navbar
            navOptions={['admins', 'employees', 'projects', 'time-sheets', 'tasks', 'profile']}
          />
        )}
        {user?.token === 'admins' && (
          <Navbar navOptions={['employees', 'projects', 'time-sheets', 'profile']} />
        )}
        {user?.token === 'employees' && (
          <Navbar navOptions={['time-sheets', 'projects', 'profile']} />
        )}
        {Object.keys(user).length === 0 && <Navbar navOptions={[]} />}
      </nav>
    </header>
  );
}

export default Header;
