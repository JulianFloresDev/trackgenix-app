import styles from './header.module.css';
import { Navbar } from 'Components/Share';
import { useSelector } from 'react-redux';

function Header() {
  const { role } = useSelector((state) => state.auth);
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <a className={styles.logoRR} href="/">
          <img src={`${process.env.PUBLIC_URL}/assets/images/logo-RR.svg`} />
          <img src={`${process.env.PUBLIC_URL}/assets/images/sub-logo-RR.svg`} />
        </a>
        {role === 'super-admin' && (
          <Navbar
            navOptions={[
              'super-admins',
              'admins',
              'employees',
              'projects',
              'time-sheets',
              'tasks',
              'profile'
            ]}
          />
        )}
        {role === 'admin' && (
          <Navbar navOptions={['admins', 'employees', 'projects', 'time-sheets', 'profile']} />
        )}
        {role === 'employee' && <Navbar navOptions={['time-sheets', 'projects', 'profile']} />}
        {!role && <Navbar navOptions={[]} />}
      </nav>
    </header>
  );
}

export default Header;
