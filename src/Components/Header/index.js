import styles from './header.module.css';
import { Navbar, LandingNavBar } from 'Components/Share';
import { useSelector } from 'react-redux';

function Header() {
  const { authenticated, role, isLoading } = useSelector((state) => state.auth);
  return (
    <>
      {isLoading ? null : (
        <header className={styles.header}>
          {!authenticated && <LandingNavBar />}
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
        </header>
      )}
    </>
  );
}

export default Header;
