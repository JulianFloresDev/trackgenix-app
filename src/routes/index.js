import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import styles from './layout.module.css';
import Header from 'Components/Header';
import Footer from 'Components/Footer';
import { Spinner } from 'Components/Share';

const Home = lazy(() => import('Components/Home'));
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
              <Route exact path={'/'} component={Home} />
              <Route path={'/admins'} component={AdminsRoutes} />
              <Route path={'/super-admins'} component={SuperAdminsRoutes} />
              <Route path={'/employees'} component={EmployeesRoutes} />
              <Route path={'/tasks'} component={TasksRoutes} />
              <Route path={'/projects'} component={ProjectsRoutes} />
              <Route path={'/time-sheets'} component={TimeSheetsRoutes} />
              <Redirect to={'/'} />
            </Switch>
            <Footer />
          </div>
        </div>
      </Router>
    </Suspense>
  );
}

export default Layout;
