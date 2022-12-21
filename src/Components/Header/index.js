import styles from './header.module.css';
import { useState } from 'react';
import { Navbar, LandingNavBar } from 'Components/Share';
import { useSelector } from 'react-redux';

function Header() {
  const userEmail = sessionStorage.getItem('email');
  const { authenticated, role, isLoading } = useSelector((state) => state.auth);
  const { list: projectList } = useSelector((state) => state.projects);
  const [navbarState, setNavbarVisibility] = useState(true);
  const showNavBar = () => {
    setNavbarVisibility(!navbarState);
  };

  return (
    <>
      {isLoading ? null : (
        <header className={navbarState ? styles.header : styles.hidden}>
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
          {role === 'employee' && (
            <Navbar
              navOptions={
                projectList?.some((project) => project.employeePM?.employee?.email === userEmail)
                  ? ['projects', 'time-sheets', 'tasks', 'profile']
                  : ['projects', 'time-sheets', 'profile']
              }
            />
          )}
          <div className={styles.arrowContainer} onClick={() => showNavBar()}>
            <img
              className={navbarState ? styles.active : styles.inactive}
              src={`${process.env.PUBLIC_URL}/assets/images/right-vector-img.svg`}
            />
          </div>
        </header>
      )}
    </>
  );
}

export default Header;
