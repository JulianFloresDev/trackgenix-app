import { Switch, Route, Redirect } from 'react-router-dom';
import Login from 'Components/Auth/LogIn';
import SignUp from 'Components/Auth/SingUp';

const AuthRoutes = () => {
  // const { url } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={'/auth/login'} component={Login} />
      <Route exact path={'/auth/sign-up'} component={SignUp} />
      <Redirect to={'auth/login'} />
    </Switch>
  );
};

export default AuthRoutes;
