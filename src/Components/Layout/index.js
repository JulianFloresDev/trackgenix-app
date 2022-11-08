import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateForm from '../Share/CreateForm';
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
          <Route exact path={'/admins'} component={Admins} />
          <Route path={'/admins/create-form'} render={() => <CreateForm />} />
          <Route exact path={'/super-admins'} component={SuperAdmins} />
          <Route path={'/super-admins/create-form'} render={() => <CreateForm />} />
          <Route exact path={'/employees'} component={Employees} />
          <Route path={'/employees/create-form'} render={() => <CreateForm />} />
          <Route exact path={'/projects'} component={Projects} />
          <Route path={'/projects/create-form'} render={() => <CreateForm />} />
          <Route exact path={'/time-sheets'} component={TimeSheets} />
          <Route path={'/time-sheets/create-form'} render={() => <CreateForm />} />
          <Route exact path={'/tasks'} component={Tasks} />
          <Route path={'/tasks/create-form'} render={() => <CreateForm />} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default Layout;
