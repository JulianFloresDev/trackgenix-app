import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../Header/index';
import Footer from '../Footer/index';
import Admins from '../Admins/index';
import SuperAdmins from '../SuperAdmins/index';
import Home from '../Home/index';
import styles from './layout.module.css';
import Employees from '../Employees/index';
import Projects from '../Projects';
import TimeSheets from '../TimeSheets';
import Tasks from '../Tasks/index';

function Layout() {
  return (
    <Router>
      <div className={styles.container}>
        <Header />
        <Switch>
          <Route exact path={'/'} component={Home} />
          <Route path={'/admins'} component={Admins} />
          <Route path={'/super-admins'} component={SuperAdmins} />
          <Route path={'/employees'} component={Employees} />
          <Route path={'/projects'} component={Projects} />
          <Route path={'/time-sheets'} component={TimeSheets} />
          <Route path={'/tasks'} component={Tasks} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default Layout;
