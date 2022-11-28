import Layout from 'routes';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from 'Components/Auth/LogIn';
import SignUp from 'Components/Auth/SingUp';

const AuthRoutes = () => {
  // const { url } = useRouteMatch();
  return (
    <Layout>
      <Switch>
        <Route exact path={'auth/login'} component={Login} />
        <Route exact path={'auth/sign-up'} component={SignUp} />
        <Redirect to={'auth/login'} />
      </Switch>
    </Layout>
  );
};

export default AuthRoutes;
