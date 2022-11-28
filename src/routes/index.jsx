import { tokenListener } from 'helpers/firebase';
import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import styles from './layout.module.css';
import Header from 'Components/Header';
import Footer from 'Components/Footer';
import { Spinner } from 'Components/Share';
import PrivateRoute from './PrivateRoute';

const Home = lazy(() => import('Components/Home'));
const SuperAdminsRoutes = lazy(() => import('routes/super-admins'));
const AdminsRoutes = lazy(() => import('routes/admins'));
const EmployeesRoutes = lazy(() => import('routes/employees'));
const ProjectsRoutes = lazy(() => import('routes/projects'));
const TasksRoutes = lazy(() => import('routes/tasks'));
const TimeSheetsRoutes = lazy(() => import('routes/time-sheets'));
const AuthRoutes = lazy(() => import('routes/auth'));

function Layout() {
  useEffect(() => tokenListener(), []);
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
              <PrivateRoute path={'/admins'} role={'ADMIN'} component={AdminsRoutes} />
              <PrivateRoute path={'/super-admins'} role={'ADMIN'} component={SuperAdminsRoutes} />
              <PrivateRoute path={'/employees'} role={'ADMIN'} component={EmployeesRoutes} />
              <PrivateRoute
                path={'/tasks'}
                role={['ADMIN', 'SUPER_ADMIN', 'EMPLOYEE']}
                component={TasksRoutes}
              />
              <PrivateRoute
                path={'/projects'}
                role={['ADMIN', 'SUPER_ADMIN', 'EMPLOYEE']}
                component={ProjectsRoutes}
              />
              <PrivateRoute
                path={'/time-sheets'}
                role={['ADMIN', 'SUPER_ADMIN', 'EMPLOYEE']}
                component={TimeSheetsRoutes}
              />
              <Route path={'/auth'} component={AuthRoutes} />
              <Redirect to={'/auth'} />
            </Switch>
            <Footer />
          </div>
        </div>
      </Router>
    </Suspense>
  );
}

export default Layout;
