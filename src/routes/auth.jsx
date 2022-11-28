import Layout from 'routes';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Login from 'Components/Auth/LogIn';
import SignUp from 'Components/Auth/SingUp';

const AuthRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout>
      <Switch>
        <Route path={`${url}/login`} component={Login} />
        <Route path={`${url}/sign-up`} component={SignUp} />
        <Redirect path={`${url}/login`} />
      </Switch>
    </Layout>
  );
};

export default AuthRoutes;
