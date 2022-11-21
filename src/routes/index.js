import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './layout.module.css';
import Header from 'Components/Header';
import Footer from 'Components/Footer';
import { Spinner } from 'Components/Share';

const HomeRoutes = lazy(() => import('routes/home'));
const AdminsRoutes = lazy(() => import('routes/admins'));
const EmployeesRoutes = lazy(() => import('routes/employees'));
const ProjectsRoutes = lazy(() => import('./projects'));
const SuperAdminsRoutes = lazy(() => import('routes/super-admins'));
const TasksRoutes = lazy(() => import('routes/tasks'));
const TimeSheetsRoutes = lazy(() => import('routes/time-sheets'));

function Layout() {
  return (
    <Suspense fallback={<Spinner />}>
      <Router>
        <div className={styles.container}>
          <div className={styles.navBar}>
            <Header />
          </div>
          <div className={styles.bodyContainer}>
            <Switch>
              <Route exact path={'/home'} component={HomeRoutes} />
              <Route exact path={'/admins'} component={AdminsRoutes} />
              <Route exact path={'/employees'} component={EmployeesRoutes} />
              <Route exact path={'/projects'} component={ProjectsRoutes} />
              <Route exact path={'/super-admins'} component={SuperAdminsRoutes} />
              <Route exact path={'/tasks'} component={TasksRoutes} />
              <Route exact path={'/time-sheets'} component={TimeSheetsRoutes} />
            </Switch>
            <Footer />
          </div>
        </div>
      </Router>
    </Suspense>
  );
}

export default Layout;
