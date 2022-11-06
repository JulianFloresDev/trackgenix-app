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
import Form from '../Share/Form/index';

function Layout() {
  return (
    <Router>
      <div className={styles.container}>
        <Header />
        <Switch>
          <Route exact path={'/'} component={Home} />
          <Route exact path={'/admins'} component={Admins} />
          <Route exact path={'/super-admins'} component={SuperAdmins} />
          <Route exact path={'/employees'} component={Employees} />
          <Route exact path={'/projects'} component={Projects} />
          <Route exact path={'/time-sheets'} component={TimeSheets} />
          <Route exact path={'/tasks'} component={Tasks} />
          <Route path={'/tasks/form/:id'} render={() => <Form />} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default Layout;
