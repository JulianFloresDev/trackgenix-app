import { lazy, Suspense } from 'react';
import styles from './layout.module.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from 'Components/Header';
import Footer from 'Components/Footer';

const Home = lazy(() => import('Components/Home'));
const AdminsRoutes = lazy(() => import('./admins'));
const EmployeesRoutes = lazy(() => import('./employees'));
const ProjectsRoutes = lazy(() => import('./projects'));
const SuperAdminsRoutes = lazy(() => import('./super-admins'));
const TasksRoutes = lazy(() => import('./tasks'));
const TimeSheetsRoutes = lazy(() => import('./time-sheets'));

import Spinner from 'Components/Share/Spinner';

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
