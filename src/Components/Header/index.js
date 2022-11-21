import styles from './header.module.css';
import { useHistory } from 'react-router-dom';

function Header() {
  const history = useHistory();
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className={styles.logoRR} onClick={() => history.push('/')}>
          <img src={`${process.env.PUBLIC_URL}/assets/images/logo-RR.svg`} />
          <img src={`${process.env.PUBLIC_URL}/assets/images/sub-logo-RR.svg`} />
        </div>
        <ul className={styles.rutes}>
          <li>
            <a href="/admins">admins</a>
          </li>
          <li>
            <a href="/super-admins">super admins</a>
          </li>
          <li>
            <a href="/employees">employees</a>
          </li>
          <li>
            <a href="/projects">projects</a>
          </li>
          <li>
            <a href="/time-sheets">timesheets</a>
          </li>
          <li>
            <a href="/tasks">tasks</a>
          </li>
        </ul>
        <button>Log Out</button>
      </nav>
    </header>
  );
}

export default Header;
