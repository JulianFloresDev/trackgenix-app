import styles from './layout.module.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateForm from 'Components/Share/CreateForm';
import Header from 'Components/Header';
import Footer from 'Components/Footer';
import Admins from 'Components/Admins';
import SuperAdmins from 'Components/SuperAdmins';
import Home from 'Components/Home';
import Employees from 'Components/Employees';
import Projects from 'Components/Projects';
import TimeSheets from 'Components/TimeSheets';
import Tasks from 'Components/Tasks';
import Form from 'Components/Share/Form';

function Layout() {
  return (
    <Router>
      <div className={styles.container}>
        <div className={styles.navBar}>
          <Header />
        </div>
        <div className={styles.bodyContainer}>
          <Switch>
            <Route exact path={'/'} component={Home} />
            <Route exact path={'/admins'} component={Admins} />
            <Route path={'/admins/form/:id'} render={() => <Form />} />
            <Route path={'/admins/new'} render={() => <CreateForm />} />
            <Route exact path={'/super-admins'} component={SuperAdmins} />
            <Route path={'/super-admins/form/:id'} render={() => <Form />} />
            <Route path={'/super-admins/new'} render={() => <CreateForm />} />
            <Route exact path={'/employees'} component={Employees} />
            <Route path={'/employees/form/:id'} render={() => <Form />} />
            <Route path={'/employees/new'} render={() => <CreateForm />} />
            <Route exact path={'/projects'} component={Projects} />
            <Route path={'/projects/form/:id'} render={() => <Form />} />
            <Route path={'/projects/new'} render={() => <CreateForm />} />
            <Route exact path={'/time-sheets'} component={TimeSheets} />
            <Route path={'/time-sheets/form/:id'} render={() => <Form />} />
            <Route path={'/time-sheets/new'} render={() => <CreateForm />} />
            <Route exact path={'/tasks'} component={Tasks} />
            <Route path={'/tasks/form/:id'} render={() => <Form />} />
            <Route path={'/tasks/new'} render={() => <CreateForm />} />
          </Switch>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default Layout;
